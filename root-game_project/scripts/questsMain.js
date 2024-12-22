document.addEventListener('DOMContentLoaded', () => {
    const quests = [
        {
            id: 'territoryDefense',
            name: 'Защита территории',
            reward: { gold: 50, xp: 10 },
            cooldown: 5 * 60 * 1000, // 5 минут
            page: './battleZoneMain.html'
        },
        {
            id: 'artifactSearch',
            name: 'Поиск артефакта',
            reward: { gold: 100, xp: 20 },
            cooldown: 10 * 60 * 1000, // 10 минут
            page: './artifactSearchMain.html'
        },
        {
            id: 'bossFight',
            name: 'Победа над боссом',
            reward: { gold: 200, xp: 50 },
            cooldown: 15 * 60 * 1000, // 15 минут
            page: './boss-fight.html'
        },
        {
            id: 'mysticExpedition',
            name: 'Мистическая экспедиция',
            reward: { gold: 150, xp: 30 },
            cooldown: 20 * 60 * 1000, // 20 минут
            page: './mystic-expedition.html'
        },
        {
            id: 'monsterHunt',
            name: 'Охота на чудовище',
            reward: { gold: 120, xp: 25 },
            cooldown: 8 * 60 * 1000, // 8 минут
            page: './monster-hunt.html'
        },
        {
            id: 'secretResearch',
            name: 'Секретные исследования',
            reward: { gold: 80, xp: 15 },
            cooldown: 7 * 60 * 1000, // 7 минут
            page: './secret-research.html'
        }
    ];

    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');

    // Данные игрока
    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;

    // Обновление ресурсов на странице
    const updateResources = () => {
        goldDisplay.textContent = playerGold;
        energyDisplay.textContent = playerEnergy;
    };

    // Проверка и отображение статуса квестов
    quests.forEach(quest => {
        const questButton = document.querySelector(`button[onclick="startQuest('${quest.id}')"]`);

        const cooldownEnd = localStorage.getItem(`${quest.id}-cooldown`);
        const now = Date.now();

        if (cooldownEnd && now < cooldownEnd) {
            const remainingTime = Math.ceil((cooldownEnd - now) / 1000);
            questButton.textContent = `Перезарядка (${remainingTime}с)`;
            questButton.disabled = true;
            questButton.style.backgroundColor = 'gray';
            questButton.style.cursor = 'not-allowed';

            // Обновляем текст кнопки каждую секунду
            const interval = setInterval(() => {
                const updatedRemaining = Math.ceil((cooldownEnd - Date.now()) / 1000);
                if (updatedRemaining <= 0) {
                    clearInterval(interval);
                    questButton.textContent = 'Начать';
                    questButton.disabled = false;
                    questButton.style.backgroundColor = '';
                    questButton.style.cursor = '';
                } else {
                    questButton.textContent = `Перезарядка (${updatedRemaining}с)`;
                }
            }, 1000);
        } else {
            questButton.addEventListener('click', () => {
                window.location.href = quest.page;
                localStorage.setItem(`${quest.id}-cooldown`, Date.now() + quest.cooldown);
                playerGold += quest.reward.gold;
                sessionStorage.setItem('gold', playerGold);
                updateResources();
                questButton.textContent = 'Перезарядка';
                questButton.disabled = true;
                questButton.style.backgroundColor = 'gray';
                questButton.style.cursor = 'not-allowed';
            });
        }
    });

    updateResources();
});
