// --- 1. CURSOR ---
const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .card-3d').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// --- 2. 3D TILT EFFECT ---
document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const content = card.querySelector('.card-content');
        const rect = card.getBoundingClientRect();
        
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        content.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        const content = card.querySelector('.card-content');
        content.style.transform = `rotateY(0) rotateX(0)`;
    });
});

// --- 3. MODAL LOGIC ---
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

// --- 4. LIGHTBOX & CV ---
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
