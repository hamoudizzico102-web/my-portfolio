function openModal(id, title) {
    const tpl = document.getElementById(id);
    const body = document.getElementById('modal-body');
    body.innerHTML = '';
    body.appendChild(tpl.content.cloneNode(true));
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('modal-body').innerHTML = '';
    document.body.style.overflow = 'auto';
}

function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openCV() {
    document.getElementById('cv-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCV() {
    document.getElementById('cv-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}
