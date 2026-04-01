/**
 * Mohamad Moukaddem Portfolio - Professional Scripting
 * Enhanced for Performance and UX
 */

// --- Navbar Scroll Logic ---
const navbar = document.querySelector('.navbar');

const handleScroll = () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Use passive: true for better scroll performance
window.addEventListener('scroll', handleScroll, { passive: true });

// --- Horizontal Scroll Tracks ---
function scrollTrack(trackId, amount) {
    const track = document.getElementById(trackId);
    if (track) {
        track.scrollBy({ 
            left: amount, 
            behavior: 'smooth' 
        });
    }
}

// --- Universal Overlay Controller ---
const allOverlays = ['modal', 'lightbox', 'cv-modal'];

function closeAllOverlays() {
    allOverlays.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    
    // Reset specific contents after transition
    setTimeout(() => {
        const modalContent = document.getElementById('modal-content');
        if (modalContent) modalContent.innerHTML = '';
        
        const lbImage = document.getElementById('lb-image');
        if (lbImage) lbImage.src = '';
    }, 300);

    document.body.style.overflow = '';
}

// --- Modal System ---
function openModal(templateId, title) {
    const overlay = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    const titleEl = document.getElementById('modal-title');
    const tpl = document.getElementById(templateId);
    
    if (tpl && content) {
        content.innerHTML = '';
        const clone = tpl.content.cloneNode(true);
        content.appendChild(clone);
        
        if (titleEl) titleEl.innerText = title;
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Alias for HTML compatibility
const closeModal = closeAllOverlays;

// --- Lightbox & Media ---
function openImage(src) {
    const overlay = document.getElementById('lightbox');
    const img = document.getElementById('lb-image');
    
    if (img && overlay) {
        img.src = src;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

const closeLightbox = closeAllOverlays;

// --- CV System ---
function openCV() {
    const cvModal = document.getElementById('cv-modal');
    if (cvModal) {
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

const closeCV = closeAllOverlays;

// --- Global Event Listeners ---
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllOverlays();
    }
});

// Optional: Close on clicking outside the modal box (Overlay Background)
document.querySelectorAll('.overlay-bg').forEach(bg => {
    bg.addEventListener('click', closeAllOverlays);
});
