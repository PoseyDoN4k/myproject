document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');
    const weaponsSection = document.getElementById('weapons');
    const armorSection = document.getElementById('armor');
    const artifactsSection = document.getElementById('artifacts');
    const potionsSection = document.getElementById('potions');

    const weaponsList = weaponsSection.querySelector('.itemList');
    const armorList = armorSection.querySelector('.itemList');
    const artifactsList = artifactsSection.querySelector('.itemList');
    const potionsList = potionsSection.querySelector('.itemList');

    // Загрузка данных игрока из sessionStorage
    const playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    const playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;
    const artifact = JSON.parse(sessionStorage.getItem('artifact'));
    const tutorialCompleted = sessionStorage.getItem('inventoryTutorialCompleted') === 'true';

    // Обновление отображения золота и энергии
    goldDisplay.textContent = playerGold;
    energyDisplay.textContent = playerEnergy;

    // Очистка всех секций инвентаря
    weaponsList.innerHTML = '';
    armorList.innerHTML = '';
    artifactsList.innerHTML = '';
    potionsList.innerHTML = '';

    // Проверка наличия артефакта и добавление в раздел артефактов
    if (artifact) {
        const artifactElement = document.createElement('div');
        artifactElement.classList.add('item');
        artifactElement.id = 'artifact1';
        artifactElement.innerHTML = `
            <p>${artifact.name}</p>
            <button onclick="useItem('artifact1')" disabled style="background-color: gray; cursor: not-allowed;">Использовать</button>
            <button onclick="sellItem('artifact1')" disabled style="background-color: gray; cursor: not-allowed;">Продать</button>
        `;
        artifactsList.appendChild(artifactElement);
    }

    // Удаление пустых секций
    if (!weaponsList.children.length) {
        weaponsSection.remove();
    }

    if (!armorList.children.length) {
        armorSection.remove();
    }

    if (!artifactsList.children.length) {
        artifactsSection.remove();
    }

    if (!potionsList.children.length) {
        potionsSection.remove();
    }

    // Показ обучающего окна, если обучение не завершено
    if (!tutorialCompleted && artifact) {
        const tutorialMessage = document.createElement('div');
        tutorialMessage.classList.add('tutorialMessage');
        tutorialMessage.innerHTML = `
            <h2>Ваш артефакт</h2>
            <p>Вы получили <strong>${artifact.name}</strong>! Этот артефакт можно использовать для усиления или продать за золото.</p>
            <p><strong>Характеристики:</strong> Атака +${artifact.bonuses.attackBoost}, Защита +${artifact.bonuses.defenseBoost}</p>
            <button id="continueButton">Продолжить</button>
        `;
        document.body.appendChild(tutorialMessage);

        document.getElementById('continueButton').addEventListener('click', () => {
            sessionStorage.setItem('inventoryTutorialCompleted', 'true');
            window.location.href = './mainGame.html';
        });
    }

    // Функции для управления предметами
    window.useItem = (itemId) => {
        if (itemId === 'artifact1' && artifact) {
            alert(`Вы используете ${artifact.name}: ${artifact.description}`);
        } else {
            alert('Этот предмет не может быть использован.');
        }
    };

    window.sellItem = (itemId) => {
        if (itemId === 'artifact1' && artifact) {
            const sellPrice = 50; // Установите цену продажи артефакта
            sessionStorage.removeItem('artifact');
            playerGold += sellPrice;
            sessionStorage.setItem('gold', playerGold);
            goldDisplay.textContent = playerGold;
            document.getElementById(itemId).remove();
            alert(`${artifact.name} продан за ${sellPrice} золота.`);
        } else {
            alert('Этот предмет нельзя продать.');
        }
    };
});
