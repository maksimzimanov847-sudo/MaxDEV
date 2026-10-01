//Код для акции
  // Устанавливаем дату окончания акции: через 90 дней от текущего момента
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 90);
    countdownDate.setHours(0, 0, 0, 0); // чтобы таймер шёл ровно 90 дней с начала сегодняшнего дня (опционально)
    // Если нужно точное время окончания относительно момента загрузки, можно оставить setDate + 90 без обнуления времени.
    // Для красоты сделаем так, чтобы оставалось 90 дней 00:00:00 от текущего момента загрузки:
    // лучше использовать разницу от текущего момента, а не от полуночи. Оставим как есть (setDate + 90, время сохраняется текущее).
    // Но для наглядности на картинке 05:08:51:10 - это пример, мы сделаем работающий таймер.

    // Повторно установим countdownDate, чтобы избежать эффекта полуночи:
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 90);
    endDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const updateTimer = () => {
        const nowTime = new Date().getTime();
        const distance = endDate.getTime() - nowTime;

        if (distance <= 0) {
            clearInterval(timerInterval);
            daysElement.innerText = '00';
            hoursElement.innerText = '00';
            minutesElement.innerText = '00';
            secondsElement.innerText = '00';
            document.querySelector('.timer').innerHTML = '<div class="text-white fs-3">Акция завершена!</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.innerText = days.toString().padStart(2, '0');
        hoursElement.innerText = hours.toString().padStart(2, '0');
        minutesElement.innerText = minutes.toString().padStart(2, '0');
        secondsElement.innerText = seconds.toString().padStart(2, '0');
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000); // обновляем каждую секунду