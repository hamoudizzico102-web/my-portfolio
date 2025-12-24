// --- SMOOTH & SNAPPY CURSOR ---
const dot = document.querySelector('.cursor-dot');
const circle = document.querySelector('.cursor-circle');

let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot moves instantly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
    // Circle follows with LERP (Linear Interpolation)
    // 0.2 is the speed factor. Higher = Snappier, Lower = Floatier
    circleX += (mouseX - circleX) * 0.2; 
    circleY += (mouseY - circleY) * 0.2;
    
    circle.style.transform = `translate(${circleX - 20}px, ${circleY - 20}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// --- HOVER INTERACTIONS ---
const hoverLinks = document.querySelectorAll('.hover-link');
hoverLinks.forEach(link => {
    link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// --- MODAL SYSTEM ---
function openModal(templateId, title) {
    const tpl = document.getElementById(templateId);
    const content = document.getElementById('modal-content');
    
    content.innerHTML = '';
    // Clone content to ensure clean slate
    const clone = tpl.content.cloneNode(true);
    content.appendChild(clone);
    
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

// --- LIGHTBOX SYSTEM ---
function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// --- CV SYSTEM ---
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// --- ESCAPE KEY CLOSE ---
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
