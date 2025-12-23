// --- MODAL SYSTEM ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');

// Open Folder Modal
function openModal(templateId, title) {
    const template = document.getElementById(templateId);
    if (!template) return;

    modalContent.innerHTML = ''; // Clear previous
    const clone = template.content.cloneNode(true);
    modalContent.appendChild(clone);

    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { modalContent.innerHTML = ''; }, 300);
}

// --- CV MODAL SYSTEM ---
const cvModal = document.getElementById('cv-modal');

function openCV() {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- LIGHTBOX SYSTEM (For Single Images) ---
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
    setTimeout(() => { lightboxImg.src = ''; }, 300);
}

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeCV();
        closeLightbox();
    }
});
