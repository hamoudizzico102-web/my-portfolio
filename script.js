// تأثير الـ Navbar عند السكرول
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// فتح الـ Modal للمشاريع (مثل فيديوهات يوتيوب أو انستقرام)
function openModal(id, title) {
    const tpl = document.getElementById(id);
    const content = document.getElementById('modal-body');
    
    if (tpl && content) {
        content.innerHTML = '';
        content.appendChild(tpl.content.cloneNode(true));
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal').classList.add('active');
        document.body.style.overflow = 'hidden'; // منع السكرول خلف المودال
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
    // تنظيف المحتوى لتوقيف الفيديوهات عند الإغلاق
    document.getElementById('modal-body').innerHTML = '';
}

// فتح الـ Lightbox للصور (مثل بوستر GamePass)
function openImage(src) {
    const lbImg = document.getElementById('lb-img');
    if (lbImg) {
        lbImg.src = src;
        document.getElementById('lightbox').classList.add('active');
    }
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// التحكم بالـ CV
function openCV() { 
    document.getElementById('cv-modal').classList.add('active'); 
}
function closeCV() { 
    document.getElementById('cv-modal').classList.remove('active'); 
}

// إغلاق كل شيء عند الضغط على زر ESC
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
