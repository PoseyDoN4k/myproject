document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const characterHealthDisplay = document.getElementById('characterHealth');
    const characterEnergyDisplay = document.getElementById('characterEnergy');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;
    let playerHealth = parseInt(sessionStorage.getItem('health')) || 1000;

    const maxHealth = 1000;
    const maxEnergy = 50;

    // Обновление ресурсов на экране
    const updateResources = () => {
        goldDisplay.textContent = playerGold;
        energyDisplay.textContent = playerEnergy;
        characterHealthDisplay.textContent = playerHealth;
        characterEnergyDisplay.textContent = playerEnergy;
    };

    // Логика изменения экипировки
    window.changeItem = (type) => {
        alert(`Вы хотите изменить ${type}. Эта функциональность скоро будет доступна.`);
    };

    // Логика использования расходников
    window.useConsumable = (type) => {
        switch (type) {
            case 'healthPotion':
                if (playerHealth < maxHealth) {
                    const healAmount = 500;
                    playerHealth = Math.min(playerHealth + healAmount, maxHealth);
                    alert(`Вы восстановили ${healAmount} здоровья.`);
                } else {
                    alert('Ваше здоровье уже на максимуме.');
                }
                break;
            case 'energyPotion':
                if (playerEnergy < maxEnergy) {
                    const energyAmount = 50;
                    playerEnergy = Math.min(playerEnergy + energyAmount, maxEnergy);
                    alert(`Вы восстановили ${energyAmount} энергии.`);
                } else {
                    alert('Ваша энергия уже на максимуме.');
                }
                break;
            case 'boostPotion':
                alert('Вы получили временное усиление атаки на 10%.');
                break;
            default:
                alert('Неизвестный расходник.');
        }
        sessionStorage.setItem('health', playerHealth);
        sessionStorage.setItem('energy', playerEnergy);
        updateResources();
    };

    // Логика начала битвы
    window.startBattle = () => {
        if (playerEnergy < 20) {
            alert('Недостаточно энергии для начала битвы!');
            return;
        }

        playerEnergy -= 20;
        sessionStorage.setItem('energy', playerEnergy);
        sessionStorage.setItem('health', playerHealth);
        updateResources();
        window.location.href = './battle.html';
    };

    updateResources();
});
