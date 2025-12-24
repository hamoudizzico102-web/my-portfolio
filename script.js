// --- 1. DIFFERENCE CURSOR LOGIC ---
const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hover Grow Effect
document.querySelectorAll('.link-hover').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// --- 2. MODAL LOGIC ---
function openModal(id, title) {
    const tpl = document.getElementById(id);
    const content = document.getElementById('modal-content');
    
    // Clear & Inject
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

// --- 3. LIGHTBOX LOGIC ---
function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// --- 4. CV LOGIC ---
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// Escape Key
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
