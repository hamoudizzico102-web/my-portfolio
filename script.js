// --- MODAL SYSTEM ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');

function openModal(templateId, title) {
    const template = document.getElementById(templateId);
    if (!template) { console.error("Missing template:", templateId); return; }
    
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

// --- LIGHTBOX SYSTEM ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openImage(src, title) {
    lightboxImg.src = src;
    lightboxCaption.textContent = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
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

// --- EVENT LISTENERS ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeLightbox(); closeCV(); }
});
