// 1. Анімації
AOS.init({ duration: 1200, once: true });

// 2. Точні лічильники
function animateNumbers() {
    const numbers = document.querySelectorAll('.num');
    numbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        let count = 0;
        const speed = target / 100;
        
        const update = () => {
            if (count < target) {
                count += speed;
                num.innerText = Math.ceil(count);
                setTimeout(update, 20);
            } else {
                num.innerText = target;
            }
        };
        update();
    });
}

// Запуск лічильників при скролі
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        animateNumbers();
        observer.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });
observer.observe(document.querySelector('.stats-section'));

// 3. ТАЙМЕР до 17.06.2026 13:00
function startCountdown() {
    const target = new Date("June 17, 2026 13:00:00").getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        
        if (diff > 0) {
            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        }
    }, 1000);
}
startCountdown();

// 4. Інтерактивна локація (Переворот картки)
function revealLocation() {
    document.getElementById('location-card').classList.add('revealed');
}
