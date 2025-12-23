// --- LERP CURSOR PHYSICS ---
const dot = document.querySelector('.cursor-dot');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0; // Target position
let followX = 0, followY = 0; // Current position

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
    // Linear Interpolation (Lerp) for smoothness
    followX += (mouseX - followX) * 0.12;
    followY += (mouseY - followY) * 0.12;
    
    follower.style.transform = `translate(${followX}px, ${followY}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// --- 3D CARD TILT EFFECT ---
document.querySelectorAll('.nft-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `scale(1.4) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `scale(1) rotateX(0) rotateY(0)`;
    });
});

// --- MODAL SYSTEM ---
function openModal(id, title) {
    const tpl = document.getElementById(id);
    const content = document.getElementById('modal-content');
    content.innerHTML = '';
    content.appendChild(tpl.content.cloneNode(true));
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// Navbar Transparency on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 100) nav.style.background = 'rgba(0,0,0,0.95)';
    else nav.style.background = 'transparent';
});
