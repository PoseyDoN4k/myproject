// main.js: Общие функции для переходов между страницами

// Функция для перехода на другую страницу
function navigateTo(page) {
    window.location.href = page;
}

// Функция для сохранения данных в sessionStorage
function saveToSession(key, value) {
    sessionStorage.setItem(key, value);
}

// Функция для получения данных из sessionStorage
function getFromSession(key) {
    return sessionStorage.getItem(key);
}

// Пример: Применение на главной странице (index.html)
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('button');
    if (startButton) {
        startButton.addEventListener('click', () => navigateTo('./pages/factionSelection.html'));
    }
});
