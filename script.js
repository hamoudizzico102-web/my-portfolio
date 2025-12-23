// Cursor Follow
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
});

function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Interactive Elements Hover
document.querySelectorAll('a, button, .glass-card, .img-btn').forEach(el => {
    el.addEventListener('mouseenter', () => outline.style.transform = 'translate(-50%, -50%) scale(1.5)');
    el.addEventListener('mouseleave', () => outline.style.transform = 'translate(-50%, -50%) scale(1)');
});

// Modal & Lightbox Logic
function openModal(tplId, title) {
    const tpl = document.getElementById(tplId);
    const content = document.getElementById('modal-content');
    content.innerHTML = '';
    content.appendChild(tpl.content.cloneNode(true));
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal').classList.add('active');
}

function closeModal() { document.getElementById('modal').classList.remove('active'); }

function openImage(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = src;
    lb.classList.add('active');
}

function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }

function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

window.addEventListener('keydown', (e) => { if(e.key === 'Escape') { closeModal(); closeLightbox(); closeCV(); } });
