// 1. Анімації при прокручуванні
AOS.init({ duration: 1000, once: true });

// 2. ЛОГІКА ЛІЧИЛЬНИКІВ (STATS)
const stats = document.querySelectorAll('.stat-number');
const speed = 200;

const startCounters = () => {
    stats.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Запуск лічильників, коли користувач до них доскролив
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });

if(document.querySelector('.stats-section')) {
    observer.observe(document.querySelector('.stats-section'));
}

// 3. ТАЙМЕР ДО ПОЧАТКУ СВЯТКУВАННЯ (17 червня 2026, 13:00)
const partyDate = new Date("June 17, 2026 13:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = partyDate - now;

    if (diff > 0) {
        document.getElementById('p-days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('p-hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('p-mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('p-secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// 4. СКРЕТЧ-КАРТКА
const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('scratch-wrapper');

function initScratch() {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    
    // Заливаємо темно-зеленим
    ctx.fillStyle = '#1d4e1d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#c5a059';
    ctx.font = 'bold 20px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('СЕКРЕТНА ЛОКАЦІЯ', canvas.width/2, canvas.height/2);
}

function scratch(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousemove', (e) => { if(e.buttons === 1) scratch(e); });
canvas.addEventListener('touchmove', (e) => scratch(e));

window.addEventListener('load', initScratch);
window.addEventListener('resize', initScratch);
