document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const questsButton = document.querySelector('.actions button:nth-child(1)'); // Кнопка "Задания"

    // Загрузка данных игрока из sessionStorage
    const playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    const playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;
    const completedQuests = JSON.parse(sessionStorage.getItem('completedQuests')) || [];

    // Обновление отображения золота и энергии
    if (goldDisplay) {
        goldDisplay.textContent = playerGold;
    }

    if (energyDisplay) {
        energyDisplay.textContent = playerEnergy;
    }

    // Проверка завершения всех заданий
    const allQuests = ['Защита территории', 'Поиск артефакта']; // Список всех заданий

    if (allQuests.every(quest => completedQuests.includes(quest))) {
        questsButton.textContent = 'Выполнено';
        questsButton.classList.add('completedQuest');
        questsButton.disabled = true;
        questsButton.style.backgroundColor = 'gray';
        questsButton.style.cursor = 'not-allowed';
    } else {
        questsButton.addEventListener('click', () => {
            window.location.href = './quests.html';
        });
    }
});
