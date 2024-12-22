document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const shopMessage = document.getElementById('shopMessage');
    const messageText = document.getElementById('messageText');

    let playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    let inventory = JSON.parse(sessionStorage.getItem('inventory')) || [];

    const updateResources = () => {
        goldDisplay.textContent = playerGold;
    };

    const showMessage = (message, success = true) => {
        messageText.textContent = message;
        shopMessage.style.backgroundColor = success ? 'rgba(255, 69, 0, 0.9)' : 'rgba(255, 0, 0, 0.8)';
        shopMessage.classList.add('visible');
        setTimeout(() => {
            shopMessage.classList.remove('visible');
        }, 2000);
    };

    const buyEquipment = (itemName, price) => {
        if (playerGold >= price) {
            playerGold -= price;
            inventory.push(itemName);
            sessionStorage.setItem('gold', playerGold);
            sessionStorage.setItem('inventory', JSON.stringify(inventory));
            updateResources();
            showMessage(`Вы успешно купили: ${itemName}`);

            // Блокировка кнопки после покупки
            const buttons = document.querySelectorAll(`button[onclick*="${itemName}"]`);
            buttons.forEach(button => {
                button.disabled = true;
                button.textContent = 'Куплено';
            });
        } else {
            showMessage('Недостаточно золота для покупки!', false);
        }
    };

    const buySet = (setName, totalPrice) => {
        if (playerGold >= totalPrice) {
            playerGold -= totalPrice;

            const setItems = document.querySelectorAll(`.equipmentSet h2`);
            setItems.forEach(setItem => {
                const items = setItem.nextElementSibling.querySelectorAll('li strong');
                items.forEach(item => {
                    const itemName = item.textContent;
                    if (!inventory.includes(itemName)) {
                        inventory.push(itemName);
                    }
                });
            });

            sessionStorage.setItem('gold', playerGold);
            sessionStorage.setItem('inventory', JSON.stringify(inventory));
            updateResources();
            showMessage(`Вы успешно купили весь комплект: ${setName}`);

            // Блокировка всех кнопок комплекта
            const setButtons = document.querySelectorAll(`.equipmentSet button`);
            setButtons.forEach(button => {
                button.disabled = true;
                button.textContent = 'Куплено';
            });
        } else {
            showMessage('Недостаточно золота для покупки комплекта!', false);
        }
    };

    updateResources();

    // Экспорт функций для использования в HTML
    window.buyEquipment = buyEquipment;
    window.buySet = buySet;
});
