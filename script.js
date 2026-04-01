/**
 * Mohamad Moukaddem Portfolio - Professional Netflix-Style Scripting
 * Optimized for Cinematic UX & Performance
 */

// --- Navbar Scroll & Transparency Logic ---
const navbar = document.querySelector('.navbar');

const handleScroll = () => {
    // نيتفلكس بتغير شفافية النافبار بمجرد التحرك البسيط
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = "rgba(20, 20, 20, 0.95)";
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)";
    }
};

window.addEventListener('scroll', handleScroll, { passive: true });

// --- Horizontal Netflix-Style Scroll ---
function scrollTrack(trackId, amount) {
    const track = document.getElementById(trackId);
    if (track) {
        // إضافة لمسة سلاسة إضافية تتناسب مع تكبير الكروت
        track.scrollBy({ 
            left: amount, 
            behavior: 'smooth' 
        });
    }
}

// --- Universal Overlay Controller (Netflix Modal Logic) ---
const allOverlays = ['modal', 'lightbox', 'cv-modal'];

function closeAllOverlays() {
    allOverlays.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // إضافة Fade-out قبل الإغلاق التام
            el.style.opacity = '0';
            setTimeout(() => {
                el.classList.remove('active');
                el.style.opacity = '1';
            }, 300);
        }
    });
    
    // تنظيف المحتوى بعد الإغلاق لضمان عدم بقاء صوت الفيديو
    setTimeout(() => {
        const modalContent = document.getElementById('modal-content');
        if (modalContent) modalContent.innerHTML = '';
        
        const lbImage = document.getElementById('lb-image');
        if (lbImage) lbImage.src = '';
    }, 400);

    document.body.style.overflow = '';
}

// --- Netflix Modal System (Full Screen View) ---
function openModal(templateId, title) {
    const overlay = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    const titleEl = document.getElementById('modal-title');
    const tpl = document.getElementById(templateId);
    
    if (tpl && content) {
        content.innerHTML = '';
        const clone = tpl.content.cloneNode(true);
        content.appendChild(clone);
        
        if (titleEl) {
            titleEl.innerText = title;
            // تأثير ظهور العنوان ببطء (Netflix Fade-In)
            titleEl.style.animation = 'fadeIn 0.8s ease forwards';
        }
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // منع السكرول خلف المودال
    }
}

// Global Alias
const closeModal = closeAllOverlays;

// --- Cinematic Lightbox ---
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

// --- Luxury CV / Resume System ---
function openCV() {
    const cvModal = document.getElementById('cv-modal');
    if (cvModal) {
        cvModal.classList.add('active');
        // تأثير دخول فخم للـ CV
        const box = cvModal.querySelector('.cv-box');
        if(box) box.style.animation = 'netflixOpen 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.overflow = 'hidden';
    }
}

const closeCV = closeAllOverlays;

// --- Keyboard Navigation (UX) ---
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllOverlays();
    }
});

// Close on clicking outside the modal content
document.querySelectorAll('.overlay-bg').forEach(bg => {
    bg.addEventListener('click', closeAllOverlays);
});

// --- Bonus: Image Placeholder Logic ---
// في حال تعذر تحميل أي صورة، تظهر خلفية داكنة لضمان فخامة الموقع
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        this.style.background = '#141414';
        this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    };
});
