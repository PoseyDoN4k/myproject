document.addEventListener('DOMContentLoaded', () => {
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

    // Начало битвы с монстром
    window.startBattle = () => {
        if (playerEnergy < 20) {
            alert('Недостаточно энергии для начала битвы!');
            return;
        }

        // Снижение энергии на 20 единиц
        playerEnergy -= 20;
        sessionStorage.setItem('energy', playerEnergy);
        updateResources();

        // Перенаправление на страницу битвы
        window.location.href = './battle.html';
    };

    updateResources();
});
