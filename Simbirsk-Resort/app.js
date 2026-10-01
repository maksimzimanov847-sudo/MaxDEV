const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator'); // Исправленный селектор
let currentIndex = 0;
let interval;

// Функция для обновления активного индикатора
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

// Функция для показа следующего слайда
function showNextSlide() {
  currentIndex = (currentIndex + 1) % slide.length;
  updateSlider();
}

// Функция для показа предыдущего слайда
function showPrevSlide() {
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  updateSlider();
}

// Функция для обновления позиции слайдера и индикаторов
function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`; 
  updateIndicators();
}

// Функция для запуска автоматической смены слайдов
function startAutoSlider() {
  interval = setInterval(showNextSlide, 3000); // Настройте интервал по необходимости
}

// Функция для остановки автоматической смены слайдов
function stopAutoSlide() {
  clearInterval(interval);
}

// Обработчики событий для кнопок навигации
nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPrevSlide);

// Обработчики событий для индикаторов
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});

// Обработчики для управления автопрокруткой
const slider = document.getElementById('slider');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlider);

// Запуск автослайдера при загрузке страницы
startAutoSlider();
