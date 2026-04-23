document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Ініціалізація AOS (Анімація при скролі)
    AOS.init({ duration: 1000, once: true });

    // 2. Таймер зворотного відліку (Гарантований запуск)
    const targetDate = new Date("June 17, 2026 13:00:00").getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;
        
        if (diff > 0) {
            if(daysEl) daysEl.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            if(hoursEl) hoursEl.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            if(minsEl) minsEl.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            if(secsEl) secsEl.innerText = Math.floor((diff % (1000 * 60)) / 1000);
        } else {
            if(daysEl) daysEl.innerText = "00";
            if(hoursEl) hoursEl.innerText = "00";
            if(minsEl) minsEl.innerText = "00";
            if(secsEl) secsEl.innerText = "00";
        }
    }
    
    // Запускаємо відразу і потім кожну секунду
    updateTimer();
    setInterval(updateTimer, 1000);

    // 3. Анімація чисел (Лічильники)
    const statsSection = document.querySelector('.stats-section');
    const numbers = document.querySelectorAll('.num');
    let countersStarted = false;

    if (statsSection && numbers.length > 0) {
        // Використовуємо подію скролу як надійний fallback, якщо IntersectionObserver тупить
        window.addEventListener('scroll', function() {
            if (countersStarted) return;
            
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;

            if (sectionPos < screenPos) {
                countersStarted = true;
                
                numbers.forEach(num => {
                    const target = +num.getAttribute('data-target');
                    let count = 0;
                    const increment = target / 50; 
                    
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            num.innerText = Math.ceil(count);
                            requestAnimationFrame(updateCount); 
                        } else {
                            num.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }

    // 4. Розкриття локації (Заміна непрацюючої кнопки/скретчу)
    const revealBtn = document.getElementById('reveal-btn');
    const secretLocation = document.getElementById('secret-location');

    if (revealBtn && secretLocation) {
        revealBtn.addEventListener('click', function() {
            revealBtn.style.display = 'none'; // Ховаємо кнопку
            secretLocation.classList.remove('hidden'); // Показуємо блок
            secretLocation.classList.add('fade-in'); // Додаємо анімацію плавної появи
        });
    }

});
