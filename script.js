// Modal System
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');

function openModal(templateId, title) {
    const tpl = document.getElementById(templateId);
    if (!tpl) return;
    
    // Smooth scroll to top then show
    window.scrollTo({top: 0, behavior: 'smooth'});
    
    modalContent.innerHTML = '';
    modalContent.appendChild(tpl.content.cloneNode(true));
    modalTitle.innerText = title;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scrolling
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Stop any playing video by clearing content
    setTimeout(() => { modalContent.innerHTML = ''; }, 500);
}

// Lightbox for Images
function openImage(src) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    lbImg.src = src;
    lb.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Resume CV
function openCV() {
    document.getElementById('cv-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    document.getElementById('cv-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
