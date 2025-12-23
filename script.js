// DOM Elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const cvModal = document.getElementById('cv-modal');

// --- FOLDER MODAL FUNCTION ---
function openModal(templateId, title) {
    const template = document.getElementById(templateId);
    if (!template) return;

    modalContent.innerHTML = ''; // Clean old content
    modalContent.appendChild(template.content.cloneNode(true));
    modalTitle.textContent = title;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scrolling
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- LIGHTBOX FUNCTION (For clicking images inside folders) ---
function openImage(src, altText) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
}

// --- CV FUNCTION ---
function openCV() {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- CLOSE ON ESCAPE KEY ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
