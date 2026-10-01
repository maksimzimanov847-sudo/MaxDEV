// Находим основной контейнер со слайдами (внутри него лежат все картинки)
const slides = document.querySelector('.slides');

// Находим все отдельные слайды (каждый .slide — это одна картинка)
const slide = document.querySelectorAll('.slide');

// Находим кнопки «вперёд» и «назад»
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Находим индикаторы (точки внизу, которые показывают, какой слайд сейчас активен)
const indicators = document.querySelectorAll('.indicator');

// Переменная, которая хранит номер текущего слайда (начинаем с 0 — первый слайд)
let currentIndex = 0;

// Переменная для хранения таймера автопереключения (чтобы можно было его остановить)
let interval;


// Функция: обновить индикаторы (подсветить нужную точку)
function updateIndicators() {
  // Проходимся по всем точкам
  indicators.forEach((indicator, index) => {
    // Если индекс точки совпадает с текущим слайдом — добавляем класс active, иначе убираем
    indicator.classList.toggle('active', index === currentIndex);
  });
}


// Функция: показать следующий слайд
function showNextSlide() {
  // Увеличиваем индекс на 1; если дошли до конца — возвращаемся к первому слайду
  currentIndex = (currentIndex + 1) % slide.length;
  // Обновляем положение слайдера и индикаторы
  updateSlider();
}


// Функция: показать предыдущий слайд
function showPrevSlide() {
  // Уменьшаем индекс на 1; если были на первом — переходим к последнему слайду
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  // Обновляем положение слайдера и индикаторы
  updateSlider();
}


// Функция: сдвинуть слайдер на нужный слайд и обновить индикаторы
function updateSlider() {
  // Сдвигаем контейнер .slides влево на процент, равный номеру текущего слайда
  // Например: currentIndex = 2 → сдвиг на -200%, то есть показываем третий слайд
  slides.style.transform = `translateX(-${currentIndex * 100}%)`; 
  // Обновляем подсветку точек-индикаторов
  updateIndicators();
}


// Функция: запустить автопереключение слайдов (каждые 3 секунды)
function startAutoSlider() {
  interval = setInterval(showNextSlide, 3000); // Меняй 3000 на нужное время в миллисекундах
}


// Функция: остановить автопереключение
function stopAutoSlide() {
  clearInterval(interval); // Останавливаем таймер
}


// Вешаем обработчик клика на кнопку «вперёд»: при клике показываем следующий слайд
nextButton.addEventListener('click', showNextSlide);

// Вешаем обработчик клика на кнопку «назад»: при клике показываем предыдущий слайд
prevButton.addEventListener('click', showPrevSlide);


// Для каждой точки-индикатора добавляем клик: при клике переходим на соответствующий слайд
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index; // Устанавливаем текущий индекс равным номеру точки
    updateSlider();       // Сдвигаем слайдер и обновляем индикаторы
  });
});


// Находим сам блок слайдера по id="slider"
const slider = document.getElementById('slider');

// Если мышь зашла на слайдер — останавливаем автопереключение (чтобы пользователь успел рассмотреть)
slider.addEventListener('mouseenter', stopAutoSlide);

// Если мышь ушла со слайдера — снова запускаем автопереключение
slider.addEventListener('mouseleave', startAutoSlider);


// Запускаем автопереключение сразу после загрузки страницы
startAutoSlider();
