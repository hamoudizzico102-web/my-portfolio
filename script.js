// تحديد العناصر من الـ HTML
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const cvModal = document.getElementById('cv-modal');

// --- وظيفة فتح المودال (للفولدرات) ---
function openModal(templateId, title) {
    const template = document.getElementById(templateId);
    if (!template) {
        console.error('Template not found:', templateId);
        return;
    }

    // تنظيف المحتوى القديم
    modalContent.innerHTML = ''; 
    // نسخ المحتوى الجديد من التمبلت
    const clone = template.content.cloneNode(true);
    modalContent.appendChild(clone);
    
    // تعيين العنوان وعرض المودال
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // منع السكرول بالصفحة الخلفية
}

// --- وظيفة إغلاق المودال ---
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- وظيفة فتح الصورة (Lightbox) ---
// تستخدم عند الضغط على صورة داخل الفولدر لتكبيرها
function openImage(src, altText) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// --- وظيفة إغلاق الصورة ---
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 200); // تنظيف الرابط
}

// --- وظيفة فتح الـ CV ---
function openCV() {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// --- وظيفة إغلاق الـ CV ---
function closeCV() {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- إغلاق النوافذ عند ضغط زر ESC ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});

// --- إغلاق عند الضغط خارج المربع (اختياري) ---
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) closeCV();
});
