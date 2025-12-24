// --- MAGNETIC CURSOR LOGIC ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
const magneticItems = document.querySelectorAll('.magnetic-item');

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Direct cursor
    cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
});

// Smooth follower animation
function animate() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
    
    follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0)`;
    requestAnimationFrame(animate);
}
animate();

// Hover Effects
magneticItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        follower.classList.add('active');
        cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(0)`;
    });
    item.addEventListener('mouseleave', () => {
        follower.classList.remove('active');
        cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0) scale(1)`;
    });
});

// --- MODAL SYSTEM ---
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');

function openModal(templateId, title) {
    const tpl = document.getElementById(templateId);
    if (!tpl) return;
    
    modalContent.innerHTML = ''; // Clear previous
    modalContent.appendChild(tpl.content.cloneNode(true));
    modalTitle.innerText = title;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => modalContent.innerHTML = '', 300); // Stop videos
}

// --- LIGHTBOX SYSTEM ---
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');

function openImage(src) {
    lbImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

// --- CV SYSTEM ---
const cvModal = document.getElementById('cv-modal');
function openCV() {
    cvModal.classList.add('active');
}
function closeCV() {
    cvModal.classList.remove('active');
}

// --- CLOSE ON ESCAPE ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});

// --- HORIZONTAL SCROLL ENHANCEMENT ---
const tracks = document.querySelectorAll('.gallery-track-wrapper');
tracks.forEach(track => {
    track.addEventListener('wheel', (e) => {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
    });
});
