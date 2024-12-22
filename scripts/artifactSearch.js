document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const searchButtons = document.querySelectorAll('.searchButton');
    const searchResult = document.getElementById('searchResult');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;
    const completedQuests = JSON.parse(sessionStorage.getItem('completedQuests')) || [];

    let artifactFound = false;

    // Обновляем отображение золота и энергии
    goldDisplay.textContent = playerGold;
    energyDisplay.textContent = playerEnergy;

    // Обработчик кнопок поиска
    searchButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (artifactFound || button.classList.contains('disabled')) {
                return;
            }

            const energyCost = parseInt(button.getAttribute('data-energy'));

            if (playerEnergy < energyCost) {
                searchResult.textContent = 'У вас недостаточно энергии!';
                return;
            }

            playerEnergy -= energyCost;
            energyDisplay.textContent = playerEnergy;
            sessionStorage.setItem('energy', playerEnergy);

            button.classList.add('disabled');
            button.style.backgroundColor = 'gray';

            if (index === searchButtons.length - 1) {
                // Последняя локация - артефакт найден
                artifactFound = true;
                button.textContent = 'Артефакт найден!';

                const artifact = {
                    name: 'Древний артефакт',
                    description: 'Могущественный магический артефакт, усиливающий способности владельца.',
                    bonuses: {
                        attackBoost: 10,
                        defenseBoost: 5
                    }
                };

                sessionStorage.setItem('artifact', JSON.stringify(artifact));
                completedQuests.push('Поиск артефакта');
                sessionStorage.setItem('completedQuests', JSON.stringify(completedQuests));

                showVictoryMessage();
            } else {
                // Локация пустая
                button.textContent = 'Ничего не найдено';
                searchResult.textContent = `${button.textContent}`;
            }
        });
    });

    function showVictoryMessage() {
        const victoryMessage = document.createElement('div');
        victoryMessage.classList.add('victoryMessage');
        victoryMessage.innerHTML = `
            <h2>Поздравляем!</h2>
            <p>Вы нашли <strong>Древний артефакт</strong>!</p>
            <p>Возвращение к заданиям...</p>
            <button id="returnButton">Вернуться</button>
        `;
        document.body.appendChild(victoryMessage);

        document.getElementById('returnButton').addEventListener('click', () => {
            window.location.href = './quests.html';
        });
    }
});
