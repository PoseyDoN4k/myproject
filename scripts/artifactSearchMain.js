document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const searchResult = document.getElementById('searchResult');
    const resultMessage = document.getElementById('resultMessage');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;
    let artifactFound = false;

    const locations = [
        { id: 'ancientLibrary', name: 'Древняя библиотека' },
        { id: 'hiddenCave', name: 'Скрытая пещера' },
        { id: 'ruinedTemple', name: 'Разрушенный храм' }
    ];

    // Случайно выбираем локацию, где находится артефакт
    const artifactLocation = locations[Math.floor(Math.random() * locations.length)].id;

    const updateResources = () => {
        goldDisplay.textContent = playerGold;
        energyDisplay.textContent = playerEnergy;
    };

    const disableLocation = (locationId, button) => {
        const locationElement = document.getElementById(locationId);
        locationElement.style.backgroundColor = 'gray';
        button.textContent = 'Не найдено';
        button.disabled = true;
    };

    const showSuccessMessage = () => {
        const rewardGold = 100;
        const rewardXP = 20;

        playerGold += rewardGold;
        sessionStorage.setItem('gold', playerGold);

        resultMessage.textContent = `Артефакт найден! Вы получили ${rewardGold} золота и ${rewardXP} опыта.`;
        searchResult.classList.add('visible');

        const returnButton = document.createElement('button');
        returnButton.textContent = 'Вернуться к заданиям';
        returnButton.onclick = () => {
            window.location.href = './questsMain.html';
        };

        // Очищаем и добавляем только одну кнопку
        searchResult.innerHTML = '';
        searchResult.appendChild(resultMessage);
        searchResult.appendChild(returnButton);
    };

    const searchLocation = (locationId) => {
        if (artifactFound) return;

        const button = document.querySelector(`#${locationId} button`);

        if (locationId === artifactLocation) {
            artifactFound = true;
            showSuccessMessage();
        } else {
            disableLocation(locationId, button);
        }
    };

    // Привязка событий поиска к кнопкам
    locations.forEach(location => {
        const button = document.querySelector(`#${location.id} button`);
        button.addEventListener('click', () => searchLocation(location.id));
    });

    updateResources();
});
