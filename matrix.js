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
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ🥋👊🤜🤛🦶';
const fighters = ['🥋', '👊', '🤜', '🤛', '🦶'];
const charArray = chars.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];
const fighterStates = [];

// Initialize drops and fighter states
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
    fighterStates[i] = {
        isFighter: Math.random() < 0.1, // 10% chance of being a fighter
        fighterIndex: Math.floor(Math.random() * fighters.length),
        isAttacking: false,
        frameCount: 0
    };
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
        let char;
        
        // Handle fighter animation
        if (fighterStates[i].isFighter) {
            fighterStates[i].frameCount++;
            
            // Change fighter state every 20 frames
            if (fighterStates[i].frameCount % 20 === 0) {
                fighterStates[i].isAttacking = !fighterStates[i].isAttacking;
                if (fighterStates[i].isAttacking) {
                    fighterStates[i].fighterIndex = Math.floor(Math.random() * (fighters.length - 1)) + 1;
                } else {
                    fighterStates[i].fighterIndex = 0;
                }
            }
            
            char = fighters[fighterStates[i].fighterIndex];
        } else {
            char = charArray[Math.floor(Math.random() * (charArray.length - fighters.length))];
        }
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop if it reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
            // Randomize fighter state for next drop
            fighterStates[i].isFighter = Math.random() < 0.1;
            fighterStates[i].fighterIndex = Math.floor(Math.random() * fighters.length);
            fighterStates[i].isAttacking = false;
            fighterStates[i].frameCount = 0;
        }

        drops[i]++;
    }
}

// Animate at 60 FPS for smoother animations
setInterval(draw, 1000/60); 