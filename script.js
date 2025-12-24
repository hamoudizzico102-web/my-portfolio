// --- 1. DYNAMIC CURSOR ---
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot moves instantly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
    // Lerp for smooth ring movement (0.15 = speed)
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover Effects
document.querySelectorAll('.magnetic-link, .cinematic-card, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
});

// --- 2. MODAL SYSTEM ---
function openModal(templateId, title) {
    const tpl = document.getElementById(templateId);
    const content = document.getElementById('modal-content');
    
    // Clean & Inject
    content.innerHTML = '';
    content.appendChild(tpl.content.cloneNode(true));
    
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scroll
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

// --- 3. LIGHTBOX SYSTEM ---
function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// --- 4. CV SYSTEM ---
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// Close on Escape
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
