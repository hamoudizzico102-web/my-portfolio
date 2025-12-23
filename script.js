// Modal Logic
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');

// Open Modal Function
function openModal(templateId, title) {
    // 1. Get content from template
    const template = document.getElementById(templateId);
    if (!template) return;

    // 2. Clear current content
    modalContent.innerHTML = '';

    // 3. Clone content and append
    const clone = template.content.cloneNode(true);
    modalContent.appendChild(clone);

    // 4. Set Title
    modalTitle.textContent = title;

    // 5. Show Modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
}

// Close Modal Function
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Resume scroll
    
    // Slight delay to clear content after transition
    setTimeout(() => {
        modalContent.innerHTML = '';
    }, 300);
}

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
