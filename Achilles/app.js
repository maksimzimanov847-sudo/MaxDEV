//Код для слайдера на странице экспонаты

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicators = document.querySelectorAll('.indicator'); 
let currentIndex = 0;
let interval;

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}


function showNextSlide() {
  currentIndex = (currentIndex + 1) % slide.length;
  updateSlider();
}


function showPrevSlide() {
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  updateSlider();
}


function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`; 
  updateIndicators();
}


function startAutoSlider() {
  interval = setInterval(showNextSlide, 3000); 
}


function stopAutoSlide() {
  clearInterval(interval);
}


nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPrevSlide);


indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});


const slider = document.getElementById('slider');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlider);


startAutoSlider(); 