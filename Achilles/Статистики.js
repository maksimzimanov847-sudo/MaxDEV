//Анимация для блока достижения музея
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.counter');
  const duration = 2000; // длительность анимации в мс

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const step = target / (duration / 16); // ~60 FPS
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
});

