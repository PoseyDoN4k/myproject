document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const currentWaveDisplay = document.getElementById('currentWave');
    const remainingEnemiesDisplay = document.getElementById('remainingEnemies');
    const missionResult = document.getElementById('missionResult');
    const resultMessage = document.getElementById('resultMessage');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;

    const waves = [
        { wave: 1, enemies: [
            { name: 'Маленький враг 1', hp: 50, defense: 5, attack: 10 },
            { name: 'Маленький враг 2', hp: 50, defense: 5, attack: 10 },
            { name: 'Маленький враг 3', hp: 50, defense: 5, attack: 10 },
            { name: 'Маленький враг 4', hp: 50, defense: 5, attack: 10 },
            { name: 'Маленький враг 5', hp: 50, defense: 5, attack: 10 },
        ] },
        { wave: 2, enemies: [
            { name: 'Средний враг 1', hp: 100, defense: 10, attack: 20 },
            { name: 'Средний враг 2', hp: 100, defense: 10, attack: 20 },
            { name: 'Средний враг 3', hp: 100, defense: 10, attack: 20 },
        ] },
        { wave: 3, enemies: [
            { name: 'Большой босс', hp: 300, defense: 20, attack: 40 }
        ] },
    ];

    let currentWaveIndex = 0;
    let currentEnemyIndex = 0;
    let currentEnemy = waves[currentWaveIndex].enemies[currentEnemyIndex];

    const updateResources = () => {
        goldDisplay.textContent = playerGold;
        energyDisplay.textContent = playerEnergy;
        currentWaveDisplay.textContent = waves[currentWaveIndex].wave;
        remainingEnemiesDisplay.textContent = waves[currentWaveIndex].enemies.length - currentEnemyIndex;

        // Обновление информации о текущем враге
        if (currentEnemy) {
            document.getElementById('enemyName').textContent = currentEnemy.name;
            document.getElementById('enemyHP').textContent = `HP: ${currentEnemy.hp}`;
            document.getElementById('enemyDefense').textContent = `Defense: ${currentEnemy.defense}`;
            document.getElementById('enemyAttack').textContent = `Attack: ${currentEnemy.attack}`;
        }
    };

    const attackEnemy = () => {
        if (currentEnemy) {
            const playerAttack = 30; // Урон игрока
            const damage = Math.max(playerAttack - currentEnemy.defense, 0);
            currentEnemy.hp -= damage;

            if (currentEnemy.hp <= 0) {
                currentEnemyIndex++;
                if (currentEnemyIndex < waves[currentWaveIndex].enemies.length) {
                    currentEnemy = waves[currentWaveIndex].enemies[currentEnemyIndex];
                } else {
                    advanceWave();
                }
            }

            updateResources();
        }
    };

    const advanceWave = () => {
        if (currentWaveIndex < waves.length - 1) {
            currentWaveIndex++;
            currentEnemyIndex = 0;
            currentEnemy = waves[currentWaveIndex].enemies[currentEnemyIndex];
            updateResources();
        } else {
            completeMission();
        }
    };

    const completeMission = () => {
        // Награда
        const rewardGold = 50;
        const rewardXP = 10;

        playerGold += rewardGold;
        sessionStorage.setItem('gold', playerGold);

        // Показать кастомное окно
        resultMessage.textContent = `Миссия завершена! Вы получили ${rewardGold} золота и ${rewardXP} опыта.`;
        missionResult.classList.add('visible');

        // Через кнопку возвращаемся к заданиям
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Вернуться к заданиям';
        returnButton.onclick = () => {
            window.location.href = './questsMain.html';
        };

        missionResult.appendChild(returnButton);
    };

    document.getElementById('attackEnemy').addEventListener('click', attackEnemy);

    updateResources();
});
