// Navbar Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Modal Logic
function openModal(id, title) {
    const tpl = document.getElementById(id);
    const body = document.getElementById('modal-body');
    
    if(tpl) {
        body.innerHTML = '';
        body.appendChild(tpl.content.cloneNode(true));
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal').classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scroll
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = ''; // Resume scroll
}

// Lightbox Logic
function openImage(src) {
    const lbImg = document.getElementById('lb-img');
    if(lbImg) {
        lbImg.src = src;
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// CV Logic
function openCV() {
    document.getElementById('cv-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    document.getElementById('cv-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Escape Key
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
