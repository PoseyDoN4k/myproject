document.addEventListener('DOMContentLoaded', () => {
    const goldDisplay = document.getElementById('gold');
    const energyDisplay = document.getElementById('energy');

    // Данные игрока
    const playerGold = parseInt(sessionStorage.getItem('gold')) || 100;
    const playerEnergy = parseInt(sessionStorage.getItem('energy')) || 50;

    // Обновление отображения золота и энергии
    if (goldDisplay) {
        goldDisplay.textContent = playerGold;
    }

    if (energyDisplay) {
        energyDisplay.textContent = playerEnergy;
    }

    // Обновляем кнопки для перехода на свои страницы
    const locations = {
        tavern: './tavern.html',
        shops: './shops.html',
        forge: './forge.html',
        arena: './arena.html',
        guild: './guild.html',
        zones: './zones.html',
        dungeons: './dungeons.html',
        factions: './factions.html',
        map: './map.html',
        settings: './settings.html'
    };

    Object.keys(locations).forEach((key) => {
        const button = document.querySelector(`#${key} > button`);
        if (button) {
            button.addEventListener('click', () => {
                window.location.href = locations[key];
            });
        }
    });

    // Для вложенных кнопок в каждой секции
    const subPageLinks = {
        'Набор квестов': './questsMain.html',
        'Информация о прогрессе': './progress.html',
        'Экипировка': './weapon-shop.html',
        'Магазин брони': './armor-shop.html',
        'Магазин зелий и расходников': './potions-shop.html',
        'Магазин редких товаров': './rare-items-shop.html',
        'Улучшение оружия и брони': './upgrade.html',
        'Заточка снаряжения': './sharpening.html',
        'Крафт предметов': './crafting.html',
        'Бой 1v1': './arena-1v1.html',
        'Групповой бой': './arena-team.html',
        'Турнир недели': './weekly-tournament.html',
        'Управление гильдией': './guild-management.html',
        'Гильдейные миссии': './guild-missions.html',
        'Вклад ресурсов': './resource-contribution.html',
        'Лес': './forest.html',
        'Поле': './field.html',
        'Болото': './swamp.html',
        'Зоны с мобами': './mob-zones.html',
        'Босс-зоны': './boss-zones.html',
        'Пазлы и ловушки': './puzzles-traps.html',
        'Фракционные задания': './faction-quests.html',
        'Тренировочные зоны': './training-zones.html',
        'Уникальные торговцы': './unique-merchants.html',
        'Метка персонажа': './character-marker.html',
        'Доступные зоны': './available-zones.html',
        'Активные задания': './active-quests.html',
        'Игра': './game-settings.html',
        'Графика и звук': './graphics-audio.html',
        'Аккаунт': './account-settings.html'
    };

    document.querySelectorAll('.location-details button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const targetPage = subPageLinks[event.target.textContent.trim()];
            if (targetPage) {
                window.location.href = targetPage;
            } else {
                console.error(`Page not found for: ${event.target.textContent}`);
            }
        });
    });

    // Функция для переключения видимости локаций
    window.toggleDetails = (id) => {
        const details = document.getElementById(id);
        if (details) {
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
        }
    };
});
