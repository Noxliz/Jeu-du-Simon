const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const startBtn = document.getElementById('start');
const levelDisplay = document.getElementById('level');

let sequence = [];
let playerSequence = [];
let level = 1;
let isPlaying = false;

// Sons (peut être remplacé par des fichiers audio réels)
function playSound(color) {
    const sounds = {
        green: 392,
        red: 329.63,
        yellow: 261.63,
        blue: 440
    };
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(sounds[color], audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
}

// Animation du bouton clignotant
function animateButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    playSound(color);
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
}

// Génère une nouvelle séquence
function generateSequence() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    sequence.push(colors[Math.floor(Math.random() * 4)]);
}

// Affiche la séquence
function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        animateButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 600);
}

// Vérifie la séquence du joueur
function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            gameOver();
            return;
        }
    }
    if (playerSequence.length === sequence.length) {
        levelUp();
    }
}

// Passe au niveau suivant
function levelUp() {
    level++;
    levelDisplay.textContent = level;
    playerSequence = [];
    setTimeout(() => {
        generateSequence();
        playSequence();
    }, 1000);
}

// Fin du jeu
function gameOver() {
    alert(`Game Over! Votre score: ${level - 1}`);
    sequence = [];
    playerSequence = [];
    level = 1;
    levelDisplay.textContent = level;
    isPlaying = false;
    startBtn.textContent = 'Start';
}

// Gestion des clics
green.addEventListener('click', () => handleClick('green'));
red.addEventListener('click', () => handleClick('red'));
yellow.addEventListener('click', () => handleClick('yellow'));
blue.addEventListener('click', () => handleClick('blue'));

function handleClick(color) {
    if (!isPlaying) return;
    animateButton(color);
    playerSequence.push(color);
    checkSequence();
}

// Démarrer le jeu
startBtn.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        startBtn.textContent = 'En cours...';
        sequence = [];
        playerSequence = [];
        level = 1;
        levelDisplay.textContent = level;
        generateSequence();
        playSequence();
    }
});