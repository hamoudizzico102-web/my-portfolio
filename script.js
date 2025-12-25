// Navbar Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Modal System
function openModal(templateId, title) {
    const wrapper = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        content.innerHTML = '';
        content.appendChild(tpl.content.cloneNode(true));
        document.getElementById('modal-title').innerText = title;
        wrapper.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scroll
    }
}

function closeModal() {
    const wrapper = document.getElementById('modal');
    wrapper.classList.remove('active');
    setTimeout(() => { document.getElementById('modal-content').innerHTML = ''; }, 300);
    document.body.style.overflow = '';
}

// Lightbox System (Improved)
function openImage(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lb-image');
    img.src = src;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// CV System
function openCV() {
    document.getElementById('cv-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    document.getElementById('cv-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Keyboard Support
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
