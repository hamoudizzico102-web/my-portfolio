/**
 * Mohamad Moukaddem Portfolio Core Logic
 * Clean, Optimized & Professional ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Smart Navbar (Performance Optimized) ---
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // إذا غاب الـ Hero عن العين، نغير ستايل النبار
            if (!entry.isIntersecting) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }, { threshold: 0.1 });

    if (hero) navObserver.observe(hero);


    // --- 2. Unified Overlay System (Modals, Lightbox, CV) ---
    const toggleBodyScroll = (lock) => {
        document.body.style.overflow = lock ? 'hidden' : '';
    };

    window.openOverlay = (id) => {
        const overlay = document.getElementById(id);
        if (overlay) {
            overlay.classList.add('active');
            toggleBodyScroll(true);
        }
    };

    window.closeAllOverlays = () => {
        document.querySelectorAll('.overlay').forEach(ov => ov.classList.remove('active'));
        toggleBodyScroll(false);
        // تنظيف المحتوى بعد الإغلاق لضمان الأداء
        setTimeout(() => {
            const modalContent = document.getElementById('modal-content');
            if (modalContent) modalContent.innerHTML = '';
        }, 300);
    };


    // --- 3. Dynamic Modal Engine ---
    window.openModal = (templateId, title) => {
        const content = document.getElementById('modal-content');
        const tpl = document.getElementById(templateId);
        const titleElement = document.getElementById('modal-title');

        if (tpl && content) {
            content.innerHTML = '';
            content.appendChild(tpl.content.cloneNode(true));
            if (titleElement) titleElement.innerText = title;
            openOverlay('modal');
        }
    };


    // --- 4. Lightbox Engine ---
    window.openImage = (src) => {
        const lbImg = document.getElementById('lb-image');
        if (lbImg) {
            lbImg.src = src;
            openOverlay('lightbox');
        }
    };


    // --- 5. CV Loader (Lazy Loading) ---
    window.openCV = () => {
        const frame = document.getElementById('cv-frame');
        // شحن ملف الـ PDF فقط عند الطلب
        if (frame && frame.src === 'about:blank') {
            frame.src = 'Mohamad Mokaddem CV 2025 (1).pdf';
        }
        openOverlay('cv-modal');
    };


    // --- 6. Smooth Scroll Track Control ---
    window.scrollTrack = (trackId, amount) => {
        const track = document.getElementById(trackId);
        if (track) {
            track.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    // ميزة إضافية: Drag-to-Scroll للـ Tracks (اختياري لكنه احترافي)
    const tracks = document.querySelectorAll('.scroll-track-wrapper');
    tracks.forEach(track => {
        let isDown = false;
        let scrollLeft;
        let startX;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('active-drag');
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => { isDown = false; });
        track.addEventListener('mouseup', () => { isDown = false; });
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
    });


    // --- 7. Event Listeners (Global) ---
    
    // إغلاق أي Overlay بمجرد الضغط على الـ Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllOverlays();
    });

    // ربط أزرار الإغلاق بشكل موحد
    window.closeModal = closeAllOverlays;
    window.closeLightbox = closeAllOverlays;
    window.closeCV = closeAllOverlays;

});
