// Navbar Glass Effect on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    // Changed threshhold to 20px for quicker response
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Scroll Track Function (For Nav Buttons)
function scrollTrack(trackId, amount) {
    const track = document.getElementById(trackId);
    if(track) {
        track.scrollBy({ left: amount, behavior: 'smooth' });
    }
}

// --- MODAL SYSTEM ---
function openModal(templateId, title) {
    const overlay = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        content.innerHTML = '';
        // Using true to deep clone the template content
        content.appendChild(tpl.content.cloneNode(true));
        document.getElementById('modal-title').innerText = title;
        overlay.classList.add('active');
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('modal');
    overlay.classList.remove('active');
    // Wait for animation to finish before clearing content
    setTimeout(() => { 
        if(document.getElementById('modal-content'))
            document.getElementById('modal-content').innerHTML = ''; 
    }, 400); // Matches CSS transition time
    document.body.style.overflow = '';
}

// --- LIGHTBOX SYSTEM ---
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

// --- CV MODAL ---
function openCV() {
    document.getElementById('cv-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    document.getElementById('cv-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Global Keyboard Support (Escape Key to close everything)
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});

// Close Modals by clicking outside (Overlay BG)
// Already handled by onclick="close..." in HTML, but good practice to double check.
