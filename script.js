// Navbar Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Modal Control
function openModal(id, title) {
    const tpl = document.getElementById(id);
    const content = document.getElementById('modal-body');
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

// Lightbox
function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// CV
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// Close on ESC
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
