document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const bossHPDisplay = document.getElementById('bossHP');
    const bossAttackDisplay = document.getElementById('bossAttack');
    const bossDefenseDisplay = document.getElementById('bossDefense');
    const playerHPDisplay = document.getElementById('playerHP');
    const playerAttackDisplay = document.getElementById('playerAttack');
    const playerDefenseDisplay = document.getElementById('playerDefense');
    const battleResult = document.getElementById('battleResult');
    const resultMessage = document.getElementById('resultMessage');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;

    const player = {
        hp: 300,
        attack: 40,
        defense: 15
    };

    const boss = {
        name: 'Великий дракон',
        hp: 1000,
        attack: 50,
        defense: 20
    };

    const updateStats = () => {
        goldDisplay.textContent = playerGold;
        energyDisplay.textContent = playerEnergy;

        bossHPDisplay.textContent = boss.hp;
        bossAttackDisplay.textContent = boss.attack;
        bossDefenseDisplay.textContent = boss.defense;

        playerHPDisplay.textContent = player.hp;
        playerAttackDisplay.textContent = player.attack;
        playerDefenseDisplay.textContent = player.defense;
    };

    const attackBoss = () => {
        const playerDamage = Math.max(player.attack - boss.defense, 0);
        const bossDamage = Math.max(boss.attack - player.defense, 0);

        // Player attacks boss
        boss.hp -= playerDamage;
        if (boss.hp <= 0) {
            completeBattle(true);
            return;
        }

        // Boss attacks player
        player.hp -= bossDamage;
        if (player.hp <= 0) {
            completeBattle(false);
            return;
        }

        updateStats();
    };

    const usePotion = () => {
        if (player.hp < 300) {
            player.hp = Math.min(player.hp + 50, 300); // Heal by 50 but do not exceed max HP
            updateStats();
        }
    };

    const completeBattle = (victory) => {
        if (victory) {
            resultMessage.textContent = 'Вы победили босса! Вы получаете 200 золота и 50 опыта.';
            playerGold += 200;
            sessionStorage.setItem('gold', playerGold);
        } else {
            resultMessage.textContent = 'Вы проиграли. Попробуйте снова позже.';
        }

        battleResult.classList.add('visible');
    };

    document.getElementById('attackBoss').addEventListener('click', attackBoss);
    document.getElementById('usePotion').addEventListener('click', usePotion);

    updateStats();
});
