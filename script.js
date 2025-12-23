// SMART CURSOR - Fast & Precise
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.style.transform = 'scale(0.7)');
document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1)');

// Navbar State
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// Modal Actions
function openModal(templateId, title) {
    const template = document.getElementById(templateId);
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '';
    modalContent.appendChild(template.content.cloneNode(true));
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Fixed Lightbox Preview
function openImage(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lb-img').src = src;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeLightbox(); closeCV(); }
});
