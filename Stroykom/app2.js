document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Заказ пока недоступен');
    });
  });
});
