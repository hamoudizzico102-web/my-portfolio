// --- 1. THE HACKER TEXT EFFECT (DECODING) ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function runHackerEffect(element) {
    let iterations = 0;
    const targetText = element.dataset.value; 
    // Save original text if needed, but data-value is source of truth
    
    const interval = setInterval(() => {
        element.innerText = targetText
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return targetText[index];
                }
                return letters[Math.floor(Math.random() * 36)];
            })
            .join("");

        if (iterations >= targetText.length) {
            clearInterval(interval);
        }

        iterations += 1 / 2; // Speed of decoding
    }, 30);
}

// Apply on Hover
document.querySelectorAll('.hacker-effect, .hacker-hover').forEach(item => {
    item.addEventListener('mouseenter', () => runHackerEffect(item));
});

// Run on Load for Hero Title (Optional: You can add class 'hacker-effect' to hero spans if you want)
// Or keep Hero as pure reveal for elegance.

// --- 2. MAGNETIC CURSOR ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
});

function animateCursor() {
    posX += (mouseX - posX) / 8;
    posY += (mouseY - posY) / 8;
    follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('.magnetic-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.classList.add('active');
        cursor.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
        follower.classList.remove('active');
        cursor.style.opacity = '1';
    });
});

// --- 3. SCROLL REVEAL (POP IN) ---
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // If it has hacker effect, run it once on reveal
            if(entry.target.classList.contains('hacker-effect')) {
                runHackerEffect(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-text, .reveal-card').forEach(el => observer.observe(el));


// --- 4. MODALS & LIGHTBOX (PRESERVED FUNCTIONALITY) ---
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');

function openModal(id, title) {
    const tpl = document.getElementById(id);
    if (!tpl) return;
    modalContent.innerHTML = '';
    modalContent.appendChild(tpl.content.cloneNode(true));
    modalTitle.innerText = title;
    modalTitle.dataset.value = title; // Update for hacker effect
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }

function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// Horizontal Scroll Support
document.querySelectorAll('.gallery-track-wrapper').forEach(track => {
    track.addEventListener('wheel', (e) => {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
    });
});

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') { closeModal(); closeLightbox(); closeCV(); }
});
