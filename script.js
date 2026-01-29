// Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Scroll Track Buttons
function scrollTrack(trackId, amount) {
    const track = document.getElementById(trackId);
    if(track) track.scrollBy({ left: amount, behavior: 'smooth' });
}

// Modal System
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
    document.getElementById('modal').classList.remove('active');
    setTimeout(() => { 
        if(document.getElementById('modal-content')) 
            document.getElementById('modal-content').innerHTML = ''; 
    }, 200);
    document.body.style.overflow = '';
}

function openImage(src) {
    const overlay = document.getElementById('lightbox');
    document.getElementById('lb-image').src = src;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function openCV() {
    document.getElementById('cv-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    document.getElementById('cv-modal').classList.remove('active');
    document.body.style.overflow = '';
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(); closeLightbox(); closeCV();
    }
});
