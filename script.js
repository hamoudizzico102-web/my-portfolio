// --- GLOW MOUSE EFFECT ---
const glow = document.querySelector('.mouse-glow');

window.addEventListener('mousemove', (e) => {
    // Moves the glow to cursor position
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// --- MODAL LOGIC ---
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

// --- LIGHTBOX LOGIC ---
function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// --- CV LOGIC ---
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
