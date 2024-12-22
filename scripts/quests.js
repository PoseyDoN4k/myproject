document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const questElements = document.querySelectorAll('.quest');

    // Загрузка данных игрока из sessionStorage
    const playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    const playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;
    const completedQuests = JSON.parse(sessionStorage.getItem('completedQuests')) || [];

    // Обновление отображения золота и энергии
    goldDisplay.textContent = playerGold;
    energyDisplay.textContent = playerEnergy;

    // Обновление состояния заданий
    questElements.forEach(questElement => {
        const questName = questElement.querySelector('h2').textContent.trim();
        const questButton = questElement.querySelector('button');

        if (completedQuests.includes(questName)) {
            // Если задание выполнено
            questElement.classList.add('completedQuest'); // Добавляем класс для стилизации
            questButton.textContent = 'Выполнено'; // Обновление текста кнопки
            questButton.disabled = true; // Делаем кнопку неактивной
        } else {
            // Привязываем обработчик к активным заданиям
            questButton.addEventListener('click', () => {
                sessionStorage.setItem('currentQuest', questName);
                navigateToQuest(questName);
            });
        }
    });

    // Проверяем, все ли задания выполнены
    const allQuests = Array.from(questElements).map(questElement => 
        questElement.querySelector('h2').textContent.trim()
    );

    if (allQuests.every(quest => completedQuests.includes(quest))) {
        showCompletionMessage();
    }

    // Функция навигации к заданию
    function navigateToQuest(questName) {
        if (questName === 'Защита территории') {
            window.location.href = './battleZone.html';
        } else if (questName === 'Поиск артефакта') {
            window.location.href = './artifactSearch.html';
        }
    }

    // Функция отображения сообщения о завершении всех заданий
    function showCompletionMessage() {
        const completionBlock = document.createElement('div');
        completionBlock.classList.add('completionBlock');
        completionBlock.innerHTML = `
            <h2>Поздравляем!</h2>
            <p>Вы выполнили все задания!</p>
            <button id="returnToGame">Вернуться в игру</button>
        `;
        document.body.insertAdjacentElement('afterbegin', completionBlock);

        document.getElementById('returnToGame').addEventListener('click', () => {
            window.location.href = './gameStart.html';
        });
    }
});
function startQuest(quest) {
    alert(`Вы начали задание: ${quest.name}`);

    // Сохранить текущий квест как активный
    sessionStorage.setItem('currentQuest', quest.id);

    // Перенаправить на страницу выполнения задания
    window.location.href = `./${quest.id}.html`;
}

