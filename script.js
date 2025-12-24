// --- SMOOTH CURSOR ---
const dot = document.querySelector('.cursor-dot');
const circle = document.querySelector('.cursor-circle');

let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
    // Faster Interpolation for snappy feel
    circleX += (mouseX - circleX) * 0.25; 
    circleY += (mouseY - circleY) * 0.25;
    
    circle.style.transform = `translate(${circleX - 22}px, ${circleY - 22}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// --- HOVER EFFECT ---
const links = document.querySelectorAll('.hover-link');
links.forEach(link => {
    link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// --- MODAL SYSTEM ---
function openModal(tid, title) {
    const tpl = document.getElementById(tid);
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

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') { closeModal(); closeLightbox(); closeCV(); }
});
