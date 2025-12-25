// DOM Elements
const darkScreen = document.getElementById('darkScreen');
const wrapper = document.getElementById('wrapper');
const lightsBtn = document.getElementById('lightsBtn');
const musicBtnContainer = document.getElementById('musicBtnContainer');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const birthdayMessage = document.getElementById('birthdayMessage');
const birthdayBanner = document.querySelector('.birthday-banner');
const flyingCake = document.getElementById('flyingCake');
const curvedHappyBirthday = document.getElementById('curvedHappyBirthday');
const finalCake = document.querySelector('.final-cake-container');
const btnPostcard = document.getElementById('btn__postcard');
const postcardOverlay = document.getElementById('postcardOverlay');
const closePostcard = document.getElementById('closePostcard');
const postcardCard = document.getElementById('postcardCard');
const confettiContainer = document.getElementById('confetti-container');
const dateOfBirth = document.querySelector('.date__of__birth span');

// Birthday messages
const messages = [
    "Hey Bella! 🎨",
    "Today is December 27, 2025",
    "Your special day! 🎂",
    "I'm miles away in Delhi",
    "And you're shining in Gangtok ✨",
    "Couldn't send a physical present",
    "So I created this for you 💝",
    "Keep creating your beautiful art",
    "May all your dreams come true",
    "Happy Birthday from miles away! 🎉"
];

let currentMessageIndex = 0;

// Birthday Date
let birthdayDate = "27 December";
let charArrDate = birthdayDate.split('');
let currentIndex = 0;

// Step 1: Turn on the lights
lightsBtn.addEventListener('click', function() {
    darkScreen.classList.add('hidden');
    wrapper.classList.remove('lights-off');
    wrapper.classList.add('lights-on');
    
    setTimeout(() => {
        musicBtnContainer.classList.add('show');
    }, 1500);
});

// Step 2: Turn on the music
musicBtn.addEventListener('click', function() {
    bgMusic.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
    
    musicBtnContainer.classList.add('hide');
    
    setTimeout(() => {
        showNextMessage();
    }, 1000);
});

// Show messages one by one
function showNextMessage() {
    if (currentMessageIndex < messages.length) {
        const messageContainer = birthdayMessage.querySelector('.message-line');
        
        birthdayMessage.classList.add('show');
        
        messageContainer.textContent = messages[currentMessageIndex];
        messageContainer.classList.add('show');
        
        setTimeout(() => {
            messageContainer.classList.remove('show');
            messageContainer.classList.add('hide');
            
            setTimeout(() => {
                messageContainer.classList.remove('hide');
                currentMessageIndex++;
                showNextMessage();
            }, 600);
        }, 3500);
    } else {
        birthdayMessage.classList.add('hide');
        setTimeout(() => {
            startCakeAnimation();
        }, 1000);
    }
}

// Start cake animation
function startCakeAnimation() {
    birthdayBanner.classList.add('show');
    
    setTimeout(() => {
        flyingCake.classList.add('fly-up');
    }, 500);
    
    setTimeout(() => {
        curvedHappyBirthday.classList.add('show');
    }, 3000);
    
    setTimeout(() => {
        flyingCake.classList.add('hold-center');
        createConfetti();
    }, 6500);
    
    setTimeout(() => {
        curvedHappyBirthday.classList.add('hide');
        flyingCake.classList.add('move-to-position');
        startMainAnimations();
    }, 10500);
    
    setTimeout(() => {
        finalCake.classList.add('show');
    }, 14500);
}

// Create confetti
function createConfetti() {
    const colors = ['#b05f5f', '#d98b7f', '#c88f5f', '#8b9b7e', '#e8d5c4'];
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
            confetti.style.setProperty('--duration', (Math.random() * 3 + 3) + 's');
            confetti.style.setProperty('--rotation', (Math.random() * 720 - 360) + 'deg');
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 6000);
        }, i * 20);
    }
}

// Start main animations
function startMainAnimations() {
    setTimeout(() => {
        document.querySelector('.content').classList.add('show');
    }, 500);
    
    // Animate title and picture at SAME TIME
    setTimeout(() => {
        document.querySelectorAll('.title .happy span, .title .birthday span').forEach(span => {
            span.classList.add('animate');
        });
        
        // Show Bella's picture at same time
        document.querySelector('.box__account').classList.add('show');
    }, 800);
    
    setTimeout(() => {
        document.querySelector('.hat').classList.add('animate');
    }, 3500);
    
    setTimeout(() => {
        const dateElement = document.querySelector('.date__of__birth');
        dateElement.classList.add('show');
        
        setTimeout(() => {
            let timeDatetxt = setInterval(function() {
                if (currentIndex < charArrDate.length) {
                    dateOfBirth.textContent += charArrDate[currentIndex];
                    currentIndex++;
                } else {
                    let star1 = document.createElement("i");
                    star1.className = "fa-solid fa-star";
                    let star2 = star1.cloneNode(true);
                    document.querySelector(".date__of__birth").prepend(star1);
                    document.querySelector(".date__of__birth").appendChild(star2);
                    clearInterval(timeDatetxt);
                }
            }, 100);
        }, 2000);
    }, 9000);
    
    setTimeout(() => {
        document.querySelector('.cricle').classList.add('show');
    }, 10000);
    
    setTimeout(() => {
        document.querySelector('.btn').classList.add('show');
    }, 11000);
}

// Open postcard
btnPostcard.addEventListener('click', function() {
    postcardOverlay.classList.add('active');
});

// Close postcard
closePostcard.addEventListener('click', function(e) {
    e.stopPropagation();
    postcardOverlay.classList.remove('active');
});

// 3D Postcard Rotation
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationY = 15;
let rotationX = -15;

postcardCard.addEventListener('mousedown', startDrag);
postcardCard.addEventListener('touchstart', startDrag, { passive: false });

function startDrag(e) {
    isDragging = true;
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    previousMouseX = clientX;
    previousMouseY = clientY;
}

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    
    const deltaX = clientX - previousMouseX;
    const deltaY = clientY - previousMouseY;
    
    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;
    
    rotationX = Math.max(-90, Math.min(90, rotationX));
    
    postcardCard.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    
    previousMouseX = clientX;
    previousMouseY = clientY;
}

document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);

function stopDrag() {
    isDragging = false;
}

// Keep music playing
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && bgMusic.paused && wrapper.classList.contains('lights-on')) {
        bgMusic.play().catch(error => console.log('Resume failed:', error));
    }
});

