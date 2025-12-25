// DOM Elements
const darkScreen = document.getElementById('darkScreen');
const wrapper = document.getElementById('wrapper');
const lightsBtn = document.getElementById('lightsBtn');
const musicBtnContainer = document.getElementById('musicBtnContainer');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const flyingCake = document.getElementById('flyingCake');
const finalCake = document.querySelector('.final-cake-container');
const btnPostcard = document.getElementById('btn__postcard');
const postcardOverlay = document.getElementById('postcardOverlay');
const closePostcard = document.querySelector('.close-postcard');
const postcardCard = document.getElementById('postcardCard');
const dateOfBirth = document.querySelector('.date__of__birth span');

// Birthday Date
let birthdayDate = "27 May";
let charArrDate = birthdayDate.split('');
let currentIndex = 0;

// Step 1: Turn on the lights - Show background and decorations
lightsBtn.addEventListener('click', function() {
    // Fade out dark screen
    darkScreen.classList.add('hidden');
    
    // Show wrapper with lights on
    wrapper.classList.remove('lights-off');
    wrapper.classList.add('lights-on');
    
    // Show music button after 1.5s
    setTimeout(() => {
        musicBtnContainer.classList.add('show');
    }, 1500);
});

// Step 2: Turn on the music
musicBtn.addEventListener('click', function() {
    // Play music
    bgMusic.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
    
    // Hide music button
    musicBtnContainer.classList.add('hide');
    
    // Start cake flying animation after 1s
    setTimeout(() => {
        flyingCake.classList.add('fly-up');
    }, 1000);
    
    // After cake reaches center, move it to final position
    setTimeout(() => {
        flyingCake.classList.add('move-to-position');
        startMainAnimations();
    }, 5000);
    
    // Show final cake in its position
    setTimeout(() => {
        finalCake.classList.add('show');
    }, 7500);
});

// Start main animations
function startMainAnimations() {
    // Show content
    setTimeout(() => {
        document.querySelector('.content').classList.add('show');
    }, 500);
    
    // Animate title letters
    setTimeout(() => {
        document.querySelectorAll('.title .happy span, .title .birthday span').forEach(span => {
            span.classList.add('animate');
        });
    }, 800);
    
    // Show hat
    setTimeout(() => {
        document.querySelector('.hat').classList.add('animate');
    }, 2500);
    
    // Show date of birth
    setTimeout(() => {
        const dateElement = document.querySelector('.date__of__birth');
        dateElement.classList.add('show');
        
        // Animate text
        setTimeout(() => {
            let timeDatetxt = setInterval(function() {
                if (currentIndex < charArrDate.length) {
                    dateOfBirth.textContent += charArrDate[currentIndex];
                    currentIndex++;
                } else {
                    let star1 = document.createElement("i");
                    star1.className = "fa-solid fa-star";
                    star1.style.color = "var(--color-terracotta)";
                    let star2 = star1.cloneNode(true);
                    document.querySelector(".date__of__birth").prepend(star1);
                    document.querySelector(".date__of__birth").appendChild(star2);
                    clearInterval(timeDatetxt);
                }
            }, 100);
        }, 1000);
    }, 3500);
    
    // Show image box
    setTimeout(() => {
        document.querySelector('.box__account').classList.add('show');
    }, 4000);
    
    // Show circle badge
    setTimeout(() => {
        document.querySelector('.cricle').classList.add('show');
    }, 4500);
    
    // Show button
    setTimeout(() => {
        document.querySelector('.btn').classList.add('show');
    }, 5000);
}

// Open postcard
btnPostcard.addEventListener('click', function() {
    postcardOverlay.classList.add('active');
});

// Close postcard
closePostcard.addEventListener('click', function() {
    postcardOverlay.classList.remove('active');
});

// Close when clicking outside
postcardOverlay.addEventListener('click', function(e) {
    if (e.target === postcardOverlay) {
        postcardOverlay.classList.remove('active');
    }
});

// 3D Postcard Rotation with Mouse/Touch
let isDragging = false;
let startX, startY;
let currentRotationX = -15;
let currentRotationY = 15;

postcardCard.addEventListener('mousedown', startDrag);
postcardCard.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);

document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchend', stopDrag);

function startDrag(e) {
    isDragging = true;
    if (e.type === 'mousedown') {
        startX = e.clientX;
        startY = e.clientY;
    } else {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let clientX, clientY;
    if (e.type === 'mousemove') {
        clientX = e.clientX;
        clientY = e.clientY;
    } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;
    
    // Limit rotation
    currentRotationX = Math.max(-90, Math.min(90, currentRotationX));
    
    postcardCard.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    
    startX = clientX;
    startY = clientY;
}

function stopDrag() {
    isDragging = false;
}

// Auto-rotate postcard initially
let autoRotate = setInterval(() => {
    if (!postcardOverlay.classList.contains('active')) return;
    
    if (!isDragging) {
        currentRotationY += 0.5;
        postcardCard.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    }
}, 30);

// Keep music playing
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && bgMusic.paused && wrapper.classList.contains('lights-on')) {
        bgMusic.play().catch(error => console.log('Resume failed:', error));
    }
});

