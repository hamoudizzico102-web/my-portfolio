/**
 * Mohamad Moukaddem Portfolio - Professional Scripting
 * Netflix UI Edition - Enhanced for Performance and UX
 */

// --- Navbar Scroll Logic ---
const navbar = document.querySelector('.navbar');

const handleScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Use passive: true for better scroll performance
window.addEventListener('scroll', handleScroll, { passive: true });

// --- Netflix Style Horizontal Scroll ---
function scrollTrack(trackId, amount) {
    const track = document.getElementById(trackId);
    if (track) {
        // حساب المسافة بناءً على عرض الشاشة لضمان تجربة Netflix الحقيقية
        const scrollAmount = amount === 0 ? track.clientWidth * 0.8 : amount;
        
        track.scrollBy({ 
            left: scrollAmount, 
            behavior: 'smooth' 
        });
    }
}

// --- Universal Overlay Controller ---
const allOverlays = ['modal', 'lightbox', 'cv-modal'];

function closeAllOverlays() {
    allOverlays.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('active');
            // إخفاء الـ Overlay بعد انتهاء الترانزيشن
            setTimeout(() => {
                if (!el.classList.contains('active')) {
                    el.style.display = 'none';
                }
            }, 300);
        }
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
        
        overlay.style.display = 'flex';
        // Delay small to trigger CSS transition
        setTimeout(() => overlay.classList.add('active'), 10);
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
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }
}

const closeLightbox = closeAllOverlays;

// --- CV System ---
function openCV() {
    const cvModal = document.getElementById('cv-modal');
    if (cvModal) {
        cvModal.style.display = 'flex';
        setTimeout(() => cvModal.classList.add('active'), 10);
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

// --- Initialize Display States ---
// التأكد من أن جميع الـ Overlays مخفية في البداية برمجياً
document.addEventListener('DOMContentLoaded', () => {
    allOverlays.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
});
