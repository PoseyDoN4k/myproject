document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const shopMessage = document.getElementById('shopMessage');
    const messageText = document.getElementById('messageText');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let inventory = JSON.parse(sessionStorage.getItem('inventory')) || {};

    const updateResources = () => {
        goldDisplay.textContent = playerGold;
        Object.keys(inventory).forEach(item => {
            const itemCountDisplay = document.querySelector(`.potionItems li[data-item="${item}"] .itemCount`);
            if (itemCountDisplay) {
                itemCountDisplay.textContent = `В наличии: ${inventory[item]}`;
            }
        });
    };

    const showMessage = (message, success = true) => {
        messageText.textContent = message;
        shopMessage.style.backgroundColor = success ? 'rgba(0, 128, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)';
        shopMessage.classList.add('visible');
        setTimeout(() => {
            shopMessage.classList.remove('visible');
        }, 2000);
    };

    const buyPotion = (potionName, price) => {
        const button = document.querySelector(`button[onclick*="${potionName}"]`);
        if (playerGold >= price) {
            playerGold -= price;
            inventory[potionName] = (inventory[potionName] || 0) + 1;
            sessionStorage.setItem('gold', playerGold);
            sessionStorage.setItem('inventory', JSON.stringify(inventory));
            updateResources();
            showMessage(`Вы успешно купили: ${potionName}`);

            if (button) {
                const originalText = button.textContent;
                button.textContent = 'Куплено';
                button.disabled = true;
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 400);
            }
        } else {
            showMessage('Недостаточно золота для покупки!', false);
        }
    };

    updateResources();

    // Экспорт функции для использования в HTML
    window.buyPotion = buyPotion;
});
