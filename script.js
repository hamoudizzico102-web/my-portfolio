// --- CUSTOM CURSOR (نظام الحركة السلس الجديد) ---
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

// متغيرات لحساب الموقع الحالي والمستهدف
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// تحديث موقع الماوس عند الحركة
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // النقطة الداخلية تتحرك فوراً
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

// حلقة تكرار لتحريك الدائرة الخارجية بنعومة (Physics/Lerp effect)
function animateCursor() {
    // حساب المسافة بين الموقع الحالي والمستهدف
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    // التحرك بنسبة بسيطة من المسافة في كل فريم (0.15 = سرعة النعومة)
    outlineX += distX * 0.15;
    outlineY += distY * 0.15;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    // استمرار الحلقة
    requestAnimationFrame(animateCursor);
}
// تشغيل الحلقة
animateCursor();


// تأثير التكبير عند المرور على الروابط والأزرار
const interactiveElements = document.querySelectorAll('a, button, .card-3d, .card-folder');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});


// --- SCROLL REVEAL (ظهور الأقسام عند السكرول) ---
const observerOptions = {
    threshold: 0.15 // تظهر عندما يظهر 15% من القسم
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});


// --- HEADER SCROLL EFFECT (تغيير الهيدر عند السكرول) ---
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// --- MODAL SYSTEM (للفولدرات) ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');

function openModal(templateId, title) {
    const template = document.getElementById(templateId);
    if (!template) return;
    
    modalContent.innerHTML = '';
    modalContent.appendChild(template.content.cloneNode(true));
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- LIGHTBOX SYSTEM (للصور - تم الإصلاح) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openImage(src, title) {
    lightboxImg.src = src;
    // lightboxCaption.textContent = title; // (اختياري: إذا بدك عنوان تحت الصورة)
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // تأخير بسيط لمسح الصورة بعد إغلاق الأنيميشن
    setTimeout(() => {
        lightboxImg.src = '';
    }, 300);
}

// --- CV MODAL ---
const cvModal = document.getElementById('cv-modal');
function openCV() {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeCV() {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
}

// إغلاق أي نافذة عند ضغط ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(); closeLightbox(); closeCV();
    }
});
