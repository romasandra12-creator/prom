// Я огорнув весь код у спеціальну функцію, яка чекає, поки сайт повністю завантажиться.
// Це гарантує, що всі лічильники та кнопки будуть працювати на 100%.

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Ініціалізація анімацій
    AOS.init({ duration: 1000, once: true });

    // 2. Лічильники (Дні, Випускники, Групи)
    const statsSection = document.querySelector('.stats-section');
    const numbers = document.querySelectorAll('.num');
    let countersStarted = false;

    if (statsSection && numbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                
                numbers.forEach(num => {
                    const target = +num.getAttribute('data-target');
                    let count = 0;
                    // Швидкість бігу цифр. Чим менше ділене, тим швидше.
                    const increment = target / 60; 
                    
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            num.innerText = Math.ceil(count);
                            // Використовуємо плавну анімацію браузера
                            requestAnimationFrame(updateCount); 
                        } else {
                            num.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        }, { threshold: 0.3 });
        
        observer.observe(statsSection);
    }

    // 3. ТАЙМЕР ДО СВЯТКУВАННЯ (17 Червня 2026, 13:00)
    const targetDate = new Date("June 17, 2026 13:00:00").getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    if (daysEl && hoursEl && minsEl && secsEl) {
        setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;
            
            if (diff > 0) {
                daysEl.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
                hoursEl.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minsEl.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                secsEl.innerText = Math.floor((diff % (1000 * 60)) / 1000);
            }
        }, 1000);
    }

    // 4. ІНТЕРАКТИВНА КАРТКА ЛОКАЦІЇ (Тап/Клік для перевороту)
    const locationCard = document.getElementById('location-card');
    
    if (locationCard) {
        locationCard.addEventListener('click', () => {
            locationCard.classList.toggle('revealed');
        });
    }

});
