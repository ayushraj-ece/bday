// Get elements
const darkScreen = document.getElementById('darkScreen');
const wrapper = document.getElementById('wrapper');
const lightsBtn = document.getElementById('lightsBtn');
const musicBtn = document.getElementById('musicBtn');
const musicBtnContainer = document.getElementById('musicBtnContainer');
const bgMusic = document.getElementById('bgMusic');
const birthdayMessage = document.getElementById('birthdayMessage');
const flyingCake = document.getElementById('flyingCake');
const confettiContainer = document.getElementById('confetti-container');
const banner = document.querySelector('.birthday-banner');
const dateOfBirth = document.querySelector('.date__of__birth span');

// Postcard elements
const btnPostcard = document.getElementById('btn__postcard');
const postcardOverlay = document.getElementById('postcardOverlay');
const closePostcard = document.getElementById('closePostcard');
const postcardCard = document.getElementById('postcardCard');
const postcardScene = document.getElementById('postcardScene');

// Custom GIFs Container
const customGifsContainer = document.getElementById('customGifsContainer');

// Message sequence
const messages = [
    "Hey Bella! 🎨",
    "Today is your special day! 🎉",
    "Time to celebrate YOU! 🎂",
    "Let's make it magical! ✨"
];
let currentMessageIndex = 0;

// Date text
const dateText = "27 December";
const charArrDate = dateText.split("");
let currentIndex = 0;

// Confetti interval
let confettiInterval;

// Turn on lights
lightsBtn.addEventListener('click', function() {
    // Hide dark screen
    darkScreen.classList.add('hidden');
    
    // Show main wrapper with lights on
    wrapper.classList.remove('lights-off');
    wrapper.classList.add('lights-on');
    
    // Show music button after 2 seconds (NO BANNER YET)
    setTimeout(() => {
        musicBtnContainer.classList.add('show');
    }, 2000);
});

// Turn on music
musicBtn.addEventListener('click', function() {
    // Play music
    bgMusic.play().catch(e => console.log("Audio play failed:", e));
    
    // Hide music button
    musicBtnContainer.classList.add('hide');
    
    // Show birthday messages immediately
    setTimeout(() => {
        showNextMessage();
    }, 1000);
});

// Show birthday messages one by one
function showNextMessage() {
    if (currentMessageIndex < messages.length) {
        const messageElement = birthdayMessage.querySelector('.message-line');
        
        // Hide previous message
        if (currentMessageIndex > 0) {
            messageElement.classList.remove('show');
            messageElement.classList.add('hide');
        }
        
        setTimeout(() => {
            // Update message text
            messageElement.textContent = messages[currentMessageIndex];
            
            // Show container
            birthdayMessage.classList.add('show');
            
            // Show message
            messageElement.classList.remove('hide');
            messageElement.classList.add('show');
            
            currentMessageIndex++;
            
            // Show next message after 2 seconds
            setTimeout(() => {
                showNextMessage();
            }, 2000);
        }, currentMessageIndex > 0 ? 600 : 0);
    } else {
        // All messages shown, hide container
        setTimeout(() => {
            birthdayMessage.classList.add('hide');
            
            // START CONFETTI, BANNER, AND GIFS TOGETHER
            setTimeout(() => {
                startConfettiBannerAndGifs();
            }, 1000);
        }, 2000);
    }
}

// ========================================== //
// START CONFETTI, BANNER, AND GIFS TOGETHER  //
// This happens AFTER messages disappear      //
// ========================================== //
function startConfettiBannerAndGifs() {
    // Start confetti (keeps falling forever)
    createConfetti();
    confettiInterval = setInterval(createConfetti, 3000);
    
    // Show banner
    banner.classList.add('show');
    
    // Show custom GIFs
    showCustomGifs();
    
    // Start flying cake animation
    setTimeout(() => {
        startFlyingCake();
    }, 1000);
}

// Show custom GIFs
function showCustomGifs() {
    const gifsContainer = document.getElementById('customGifsContainer');
    const gifItems = document.querySelectorAll('.gif-item');
    
    // Show container
    gifsContainer.classList.add('show');
    
    // Show each GIF with their individual delays
    gifItems.forEach((gif) => {
        gif.classList.add('show');
    });
}

// Flying cake animation
function startFlyingCake() {
    flyingCake.classList.add('fly-up');
    
    // Hold at center for 3 seconds
    setTimeout(() => {
        flyingCake.classList.remove('fly-up');
        flyingCake.classList.add('hold-center');
        
        // Move to final position
        setTimeout(() => {
            flyingCake.classList.remove('hold-center');
            flyingCake.classList.add('move-to-position');
            
            // Start main animations
            setTimeout(() => {
                startMainAnimations();
            }, 1000);
        }, 3000);
    }, 6000);
}

// Start main animations (FASTER TIMING)
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
    
    // Show final cake behind birthday text
    setTimeout(() => {
        document.querySelector('.final-cake-container').classList.add('show');
    }, 4000);
    
    // FASTER DATE APPEARANCE (was 9s, now 6s)
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
    }, 6000);
    
    // FASTER CIRCLE (was 10s, now 7s)
    setTimeout(() => {
        document.querySelector('.cricle').classList.add('show');
    }, 7000);
    
    // FASTER BUTTON (was 11s, now 7.5s)
    setTimeout(() => {
        document.querySelector('.btn').classList.add('show');
    }, 7500);
}

// Create confetti (keeps falling forever)
function createConfetti() {
    const colors = ['#b05f5f', '#d98b7f', '#c88f5f', '#8b9b7e', '#e8d5c4'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        confetti.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        confetti.style.setProperty('--rotation', (Math.random() * 360) + 'deg');
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// ========================================== //
// 3D POSTCARD FUNCTIONALITY                  //
// ========================================== //

// Open postcard
btnPostcard.addEventListener('click', function() {
    postcardOverlay.classList.add('active');
});

// Close postcard
closePostcard.addEventListener('click', function() {
    postcardOverlay.classList.remove('active');
});

// Close on overlay click
postcardOverlay.addEventListener('click', function(e) {
    if (e.target === postcardOverlay) {
        postcardOverlay.classList.remove('active');
    }
});

// 3D Rotation with mouse
let isDragging = false;
let startX, startY;
let currentRotationX = -15;
let currentRotationY = 15;

postcardCard.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    postcardCard.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;
    
    postcardCard.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    
    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    postcardCard.style.cursor = 'grab';
});

// Touch support for mobile
postcardCard.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;
    
    postcardCard.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

