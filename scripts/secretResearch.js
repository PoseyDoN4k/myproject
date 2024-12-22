document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const researchResult = document.getElementById('researchResult');
    const resultMessage = document.getElementById('resultMessage');
    const customMessage = document.createElement('div');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;
    let collectedArtifacts = 0;

    customMessage.id = 'customMessage';
    customMessage.style.position = 'fixed';
    customMessage.style.top = '50%';
    customMessage.style.left = '50%';
    customMessage.style.transform = 'translate(-50%, -50%)';
    customMessage.style.background = 'rgba(0, 0, 0, 0.8)';
    customMessage.style.color = 'white';
    customMessage.style.padding = '20px';
    customMessage.style.borderRadius = '10px';
    customMessage.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
    customMessage.style.textAlign = 'center';
    customMessage.style.display = 'none';
    document.body.appendChild(customMessage);

    const showMessage = (message) => {
        customMessage.textContent = message;
        customMessage.style.display = 'block';
        setTimeout(() => {
            customMessage.style.display = 'none';
        }, 2000);
    };

    const updateResources = () => {
        goldDisplay.textContent = playerGold;
        energyDisplay.textContent = playerEnergy;
    };

    const exploreLab = (lab) => {
        if (playerEnergy < 10) {
            showMessage('Недостаточно энергии для исследования лаборатории!');
            return;
        }

        playerEnergy -= 10;
        sessionStorage.setItem('energy', playerEnergy);
        updateResources();

        const success = Math.random() > 0.3; // 70% шанс на успех

        if (success) {
            collectedArtifacts++;
            document.getElementById(lab).style.backgroundColor = 'green';
            document.querySelector(`#${lab} button`).textContent = 'Артефакт найден';
            document.querySelector(`#${lab} button`).disabled = true;

            if (collectedArtifacts === 3) {
                completeResearch();
            } else {
                showMessage('Вы нашли артефакт!');
            }
        } else {
            showMessage('Артефакт не найден. Попробуйте снова!');
        }
    };

    const completeResearch = () => {
        const rewardGold = 80;
        const rewardXP = 15;

        playerGold += rewardGold;
        sessionStorage.setItem('gold', playerGold);

        resultMessage.textContent = `Миссия завершена! Вы собрали все артефакты и получили ${rewardGold} золота и ${rewardXP} опыта.`;
        researchResult.classList.add('visible');
    };

    document.querySelectorAll('button[onclick^="exploreLab"]').forEach(button => {
        button.addEventListener('click', () => {
            const lab = button.parentElement.id;
            exploreLab(lab);
        });
    });

    updateResources();
});
