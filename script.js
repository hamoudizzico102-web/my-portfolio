// Function to open project modals
function openModal(templateId, title) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    const tpl = document.getElementById(templateId);
    
    if (tpl) {
        body.innerHTML = '';
        body.appendChild(tpl.content.cloneNode(true));
        document.getElementById('modal-title').innerText = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scroll
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.getElementById('modal-body').innerHTML = '';
    document.body.style.overflow = 'auto'; // Restore scroll
}

// Function for Image Lightbox
function openImage(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Function for CV
function openCV() {
    document.getElementById('cv-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    document.getElementById('cv-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close everything on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
