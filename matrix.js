const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters (including some Mario-themed characters)
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ🍄⭐🌟';
const charArray = chars.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Draw the Matrix rain
function draw() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green text
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop if it reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Animate
setInterval(draw, 33); 