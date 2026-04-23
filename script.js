// 1. Анімації AOS
AOS.init({ duration: 1200, once: true, offset: 50 });

// 2. ІНТЕРАКТИВ "СКРЕТЧ-КАРТКА"
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("scratch-canvas");
    const ctx = canvas.getContext("2d");
    const wrapper = document.getElementById("scratch-wrapper");

    // Встановлюємо розмір канвасу відповідно до блоку
    function resizeCanvas() {
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
        drawOverlay();
    }

    // Малюємо захисний шар
    function drawOverlay() {
        // Темно-зелений фон
        ctx.fillStyle = "#14321e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Патерн / Лінії для текстури
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(212, 175, 55, 0.1)"; // Золотий напівпрозорий
        for(let i = 0; i < canvas.width * 2; i+=20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i - canvas.height, canvas.height);
            ctx.stroke();
        }

        // Текст "Гриф: Секретно"
        ctx.fillStyle = "#d4af37";
        ctx.font = "bold 18px Montserrat";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ГРИФ: ЦІЛКОМ ТАЄМНО", canvas.width / 2, canvas.height / 2 - 15);
        
        ctx.fillStyle = "#f4f1ea";
        ctx.font = "14px Montserrat";
        ctx.fillText("Зітріть захисний шар", canvas.width / 2, canvas.height / 2 + 15);
    }

    // Логіка стирання
    let isDrawing = false;

    function getMousePos(evt) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let clientX = evt.clientX || (evt.touches && evt.touches[0].clientX);
        let clientY = evt.clientY || (evt.touches && evt.touches[0].clientY);
        
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function startPosition(e) {
        isDrawing = true;
        scratch(e);
    }

    function endPosition() {
        isDrawing = false;
        ctx.beginPath();
    }

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault();

        const pos = getMousePos(e);

        ctx.globalCompositeOperation = "destination-out"; // "Стирає" пікселі
        ctx.lineWidth = 40; // Товщина пальця/пензля
        ctx.lineCap = "round";

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    // Події для мишки та сенсорних екранів
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", scratch);

    canvas.addEventListener("touchstart", startPosition, {passive: false});
    canvas.addEventListener("touchend", endPosition);
    canvas.addEventListener("touchmove", scratch, {passive: false});

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});