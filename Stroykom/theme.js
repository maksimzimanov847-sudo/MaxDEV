(function() {
  // Объявляем константы: ключ для localStorage и названия тем
  const THEME_KEY = 'site-theme';   // Ключ, по которому будем хранить тему в браузере пользователя
  const DARK = 'dark';              // Значение для тёмной темы
  const LIGHT = 'light';            // Значение для светлой темы

  // Функция: получить сохранённую тему из localStorage
  function getStoredTheme() {
    // Если тема сохранена — возвращаем её, если нет — возвращаем светлую (LIGHT) по умолчанию
    return localStorage.getItem(THEME_KEY) || LIGHT;
  }

  // Функция: установить тему (и в DOM, и в localStorage)
  function setTheme(theme) {
    // Добавляем атрибут data-theme="dark" или data-theme="light" на <html> — именно по нему CSS подтягивает нужные цвета
    document.documentElement.setAttribute('data-theme', theme);
    // Сохраняем выбор пользователя в localStorage, чтобы при перезагрузке тема не сбрасывалась
    localStorage.setItem(THEME_KEY, theme);
  }

  // Функция: переключить тему на противоположную (если была тёмная — станет светлая, и наоборот)
  function toggleTheme() {
    // Получаем текущую тему: если атрибута нет — берём светлую
    const current = document.documentElement.getAttribute('data-theme') || LIGHT;
    // Передаём в setTheme противоположное значение: если current === DARK, то ставим LIGHT, иначе DARK
    setTheme(current === DARK ? LIGHT : DARK);
  }

  // Функция: создать и вставить переключатель темы (чекбокс + стилизованный слайдер) в шапку сайта
  function createToggle() {
    // Если переключатель уже есть (по id), ничего не делаем — чтобы не создать два одинаковых
    if (document.getElementById('theme-toggle-btn')) return;

    // Ищем контейнер внутри .navbar, куда будем вставлять переключатель (обычно это .navbar .container)
    const nav = document.querySelector('.navbar .container');
    // Если такого контейнера нет — выходим, чтобы не ломать скрипт
    if (!nav) return;

    // Создаём обёртку для переключателя (div с классом theme-switch)
    const wrapper = document.createElement('div');
    wrapper.className = 'theme-switch';

    // Создаём сам чекбокс (скрытый input type="checkbox")
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'theme-toggle-btn';
    // При изменении состояния чекбокса (клик) запускаем функцию toggleTheme
    checkbox.addEventListener('change', toggleTheme);

    // Создаём label, который будет выглядеть как «слайдер» (визуальная часть переключателя)
    const label = document.createElement('label');
    label.htmlFor = 'theme-toggle-btn';  // Привязываем label к чекбоксу по id
    label.className = 'slider-toggle';  // Класс, который рисует фон и кружок (из твоего CSS)

    // Проверяем, какая тема была сохранена у пользователя
    const stored = getStoredTheme();
    if (stored === DARK) {
      // Если тёмная — ставим галочку в чекбоксе
      checkbox.checked = true;
      // И сразу применяем атрибут data-theme="dark" к <html>, чтобы CSS сразу покрасил страницу
      document.documentElement.setAttribute('data-theme', DARK);
    }

    // Вставляем чекбокс и label внутрь обёртки
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    // Вставляем всю обёртку в шапку сайта (в .navbar .container)
    nav.appendChild(wrapper);
  }

  // Проверяем: если страница ещё грузится, ждём события DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createToggle);
  } else {
    // Если страница уже загружена — сразу запускаем создание переключателя
    createToggle();
  }
})();
