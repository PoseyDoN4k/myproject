document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;

    const updateResources = () => {
        goldDisplay.textContent = playerGold;
        energyDisplay.textContent = playerEnergy;
    };

    window.startMission = () => {
        if (playerEnergy < 10) {
            alert('Недостаточно энергии для выполнения задания!');
            return;
        }

        playerEnergy -= 10;
        sessionStorage.setItem('energy', playerEnergy);
        updateResources();

        // Переход на страницу, соответствующую квесту
        window.location.href = '/pages/territoryDefenseMission.html';
    };

    updateResources();
});
