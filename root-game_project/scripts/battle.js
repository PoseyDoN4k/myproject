document.addEventListener('DOMContentLoaded', () => {
    const playerHealthDisplay = document.getElementById('playerHealth');
    const enemyHealthDisplay = document.getElementById('enemyHealth');
    const logMessages = document.getElementById('logMessages');

    let playerHealth = 1000;
    let enemyHealth = 3000;

    const playerAttack = { min: 150, max: 200 };
    const enemyAttack = { min: 200, max: 250 };

    const logMessage = (message) => {
        const p = document.createElement('p');
        p.textContent = message;
        logMessages.appendChild(p);
        logMessages.scrollTop = logMessages.scrollHeight;
    };

    const getRandomDamage = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const updateHealth = () => {
        playerHealthDisplay.textContent = playerHealth;
        enemyHealthDisplay.textContent = enemyHealth;

        if (playerHealth <= 0) {
            logMessage('Вы проиграли битву!');
            endBattle(false);
        } else if (enemyHealth <= 0) {
            logMessage('Вы победили!');
            endBattle(true);
        }
    };

    const endBattle = (isWin) => {
        const resultWindow = document.createElement('div');
        resultWindow.classList.add('resultWindow');
        resultWindow.innerHTML = `
            <div class="resultContent">
                <h2>${isWin ? 'Поздравляем, вы победили!' : 'К сожалению, вы проиграли.'}</h2>
                <button id="backToQuests">Вернуться к заданиям</button>
            </div>
        `;
        document.body.appendChild(resultWindow);

        document.getElementById('backToQuests').addEventListener('click', () => {
            window.location.href = './questsMain.html';
        });

        document.getElementById('attackButton').disabled = true;
        document.getElementById('defendButton').disabled = true;
        document.getElementById('useItemButton').disabled = true;
        document.getElementById('fleeButton').disabled = true;
    };

    document.getElementById('attackButton').addEventListener('click', () => {
        const playerDamage = getRandomDamage(playerAttack.min, playerAttack.max);
        const enemyDamage = getRandomDamage(enemyAttack.min, enemyAttack.max);

        enemyHealth -= playerDamage;
        logMessage(`Вы нанесли ${playerDamage} урона врагу.`);

        if (enemyHealth > 0) {
            playerHealth -= enemyDamage;
            logMessage(`Враг нанёс вам ${enemyDamage} урона.`);
        }

        updateHealth();
    });

    document.getElementById('defendButton').addEventListener('click', () => {
        const reducedDamage = getRandomDamage(enemyAttack.min / 2, enemyAttack.max / 2);
        playerHealth -= reducedDamage;
        logMessage(`Вы защитились, получив только ${reducedDamage} урона.`);
        updateHealth();
    });

    document.getElementById('useItemButton').addEventListener('click', () => {
        if (playerHealth < 1000) {
            const healAmount = 200;
            playerHealth = Math.min(playerHealth + healAmount, 1000);
            logMessage(`Вы восстановили ${healAmount} здоровья.`);
            updateHealth();
        } else {
            logMessage('Ваше здоровье уже на максимуме.');
        }
    });

    document.getElementById('fleeButton').addEventListener('click', () => {
        logMessage('Вы сбежали с поля боя.');
        endBattle(false);
    });

    updateHealth();
});
