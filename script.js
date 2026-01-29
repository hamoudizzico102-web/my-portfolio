// Navbar Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// NEW: Scroll Track Function (For Nav Buttons)
function scrollTrack(trackId, amount) {
    const track = document.getElementById(trackId);
    if(track) {
        track.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

// Modals
function openModal(templateId, title) {
    const overlay = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        content.innerHTML = '';
        content.appendChild(tpl.content.cloneNode(true));
        document.getElementById('modal-title').innerText = title;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('modal');
    overlay.classList.remove('active');
    setTimeout(() => { 
        if(document.getElementById('modal-content'))
            document.getElementById('modal-content').innerHTML = ''; 
    }, 300);
    document.body.style.overflow = '';
}

// Lightbox
function openImage(src) {
    const overlay = document.getElementById('lightbox');
    const img = document.getElementById('lb-image');
    img.src = src;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// CV Modal
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
