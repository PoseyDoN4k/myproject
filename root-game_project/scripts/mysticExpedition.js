document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const expeditionResult = document.getElementById('expeditionResult');
    const resultMessage = document.getElementById('resultMessage');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;

    const updateResources = () => {
        goldDisplay.textContent = playerGold;
        energyDisplay.textContent = playerEnergy;
    };

    const startExpedition = () => {
        if (playerEnergy < 15) {
            alert('Недостаточно энергии для начала экспедиции!');
            return;
        }

        playerEnergy -= 15;
        sessionStorage.setItem('energy', playerEnergy);
        updateResources();

        runExpedition();
    };

    const runExpedition = () => {
        const challenges = [
            { type: 'trap', successRate: 0.7, message: 'Вы успешно избежали ловушки!' },
            { type: 'enemy', successRate: 0.6, message: 'Вы победили охранника!' },
            { type: 'puzzle', successRate: 0.8, message: 'Вы решили головоломку!' }
        ];

        let success = true;

        for (const challenge of challenges) {
            const outcome = Math.random() < challenge.successRate;
            if (!outcome) {
                success = false;
                resultMessage.textContent = `Экспедиция провалена. ${challenge.type === 'trap' ? 'Ловушка остановила вас.' : challenge.type === 'enemy' ? 'Охранник оказался сильнее.' : 'Головоломка осталась нерешенной.'}`;
                expeditionResult.classList.add('visible');
                return;
            }
        }

        if (success) {
            completeExpedition();
        }
    };

    const completeExpedition = () => {
        const rewardGold = 150;
        const rewardXP = 30;

        playerGold += rewardGold;
        sessionStorage.setItem('gold', playerGold);

        resultMessage.textContent = `Экспедиция завершена! Вы получили ${rewardGold} золота и ${rewardXP} опыта.`;
        expeditionResult.classList.add('visible');
    };

    document.getElementById('startExpedition').addEventListener('click', startExpedition);

    updateResources();
});
