document.addEventListener('DOMContentLoaded', () => {
    const factionButtons = document.querySelectorAll('.faction button');

    factionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const factionElement = button.closest('.faction');
            const factionId = factionElement.id;

            // Сохраняем выбранную фракцию в sessionStorage
            sessionStorage.setItem('selectedFaction', factionId);

            // Перенаправляем на страницу gameStart.html
            window.location.href = './gameStart.html';
        });
    });
});