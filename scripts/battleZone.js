document.addEventListener('DOMContentLoaded', () => {
    const attackButton = document.getElementById('attackButton');
    const defendButton = document.getElementById('defendButton');
    const fleeButton = document.getElementById('fleeButton');
    const playerHealthDisplay = document.getElementById('playerHealthDisplay');
    const playerAttackDisplay = document.getElementById('playerAttackDisplay');
    const playerDefenseDisplay = document.getElementById('playerDefenseDisplay');
    const enemyHealthDisplay = document.getElementById('enemyHealth');
    const logContainer = document.getElementById('logContainer');

    // Получаем фракцию игрока из sessionStorage
    const playerFaction = sessionStorage.getItem('selectedFaction');

    let player = {
        health: parseInt(playerHealthDisplay.textContent),
        attack: parseInt(playerAttackDisplay.textContent),
        defense: parseInt(playerDefenseDisplay.textContent),
        gold: parseInt(sessionStorage.getItem('gold')) || 100,
        experience: parseInt(sessionStorage.getItem('experience')) || 0
    };

    let enemy = {};

    // Определяем врага в зависимости от фракции игрока
    if (playerFaction === 'vampires') {
        enemy = {
            name: 'Оборотень',
            health: 100,
            attack: 15,
            rewardGold: 50,
            rewardExperience: 10
        };
    } else if (playerFaction === 'werewolves') {
        enemy = {
            name: 'Вампир',
            health: 100,
            attack: 15,
            rewardGold: 50,
            rewardExperience: 10
        };
    } else {
        console.error('Фракция игрока не определена.');
        return;
    }

    function updateDisplays() {
        playerHealthDisplay.textContent = player.health;
        enemyHealthDisplay.textContent = enemy.health;
    }

    function logAction(message) {
        const logEntry = document.createElement('p');
        logEntry.textContent = message;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    function clearLog() {
        logContainer.innerHTML = '';
    }

    function attackEnemy() {
        if (enemy.health <= 0) return; // Блокируем атаку, если враг побеждён

        const damage = Math.max(player.attack - Math.floor(Math.random() * enemy.attack), 5);
        enemy.health -= damage;
        logAction(`Вы атаковали врага и нанесли ${damage} урона.`);

        if (enemy.health <= 0) {
            logAction('Вы победили врага!');
            rewardPlayer();
            startCountdown(3, 'Враг побеждён, возврат к заданиям через');
            return;
        }

        enemyAttacks();
    }

    function defend() {
        if (enemy.health <= 0) return; // Блокируем защиту, если враг побеждён

        const reducedDamage = Math.max(enemy.attack - player.defense, 0);
        player.health -= reducedDamage;
        logAction(`Вы защитились, уменьшив урон до ${reducedDamage}.`);

        if (player.health <= 0) {
            logAction('Вы погибли в бою.');
            startCountdown(3, 'Вы погибли, возврат к заданиям через');
            return;
        }

        enemyAttacks();
    }

    function flee() {
        logAction('Вы решили сбежать с поля боя.');
        startCountdown(1, 'Вы сбежали, возврат к заданиям через');
    }

    function enemyAttacks() {
        const damage = Math.max(enemy.attack - Math.floor(Math.random() * player.defense), 5);
        player.health -= damage;
        logAction(`Враг атаковал вас и нанёс ${damage} урона.`);

        if (player.health <= 0) {
            logAction('Вы погибли в бою.');
            startCountdown(3, 'Вы погибли, возврат к заданиям через');
        }

        updateDisplays();
    }

    function rewardPlayer() {
        player.gold += enemy.rewardGold;
        player.experience += enemy.rewardExperience;
        sessionStorage.setItem('gold', player.gold);
        sessionStorage.setItem('experience', player.experience);

        // Обновляем список выполненных заданий
        const completedQuests = JSON.parse(sessionStorage.getItem('completedQuests')) || [];
        if (!completedQuests.includes('Защита территории')) {
            completedQuests.push('Защита территории');
        }
        sessionStorage.setItem('completedQuests', JSON.stringify(completedQuests));

        logAction(`Вы получили ${enemy.rewardGold} золота и ${enemy.rewardExperience} опыта.`);
        disableActions();
    }

    function disableActions() {
        attackButton.disabled = true;
        defendButton.disabled = true;
        fleeButton.disabled = true;
    }

    function startCountdown(seconds, message) {
        clearLog();
        let counter = seconds;

        const countdown = setInterval(() => {
            logAction(`${message} ${counter}...`);
            counter--;

            if (counter < 0) {
                clearInterval(countdown);
                navigateTo('./quests.html');
            }
        }, 1000);
    }

    function navigateTo(url) {
        window.location.href = url;
    }

    attackButton.addEventListener('click', attackEnemy);
    defendButton.addEventListener('click', defend);
    fleeButton.addEventListener('click', flee);

    updateDisplays();
});
