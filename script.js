// --- 1. Custom Smooth Cursor (LERP) ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateCursor() {
    // Linear Interpolation for smooth delay
    let speed = 0.15; // Lower = smoother/slower
    outlineX += (mouseX - outlineX) * speed;
    outlineY += (mouseY - outlineY) * speed;
    
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Interactive Elements Hover Effect
const interactiveEls = document.querySelectorAll('a, button, .project-card');
interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
});


// --- 2. Scroll Reveal Animation (Intersection Observer) ---
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Trigger once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-scroll').forEach(el => {
    observer.observe(el);
});


// --- 3. Modal System Logic ---
const modalContainer = document.getElementById('modal-container');
const modalBody = document.getElementById('modal-body-content');
const modalTitle = document.getElementById('modal-title-text');

function openModal(templateId, title) {
    const template = document.getElementById(templateId);
    if (!template) return;

    modalBody.innerHTML = '';
    modalBody.appendChild(template.content.cloneNode(true));
    modalTitle.innerText = title;

    modalContainer.style.display = 'flex';
    // Small delay to allow CSS display:flex to apply before opacity transition
    setTimeout(() => modalContainer.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalContainer.classList.remove('show');
    setTimeout(() => {
        modalContainer.style.display = 'none';
        modalBody.innerHTML = ''; // Clean up iframes to stop audio
    }, 400); // Matches CSS transition duration
    document.body.style.overflow = '';
}


// --- 4. Lightbox Logic ---
const lightbox = document.getElementById('lightbox-view');
const lbImg = document.getElementById('lightbox-img');

function openImage(src) {
    lbImg.src = src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}


// --- 5. CV Modal ---
const cvModal = document.getElementById('cv-container');

function openCV() {
    cvModal.style.display = 'flex';
    setTimeout(() => cvModal.classList.add('show'), 10);
}

function closeCV() {
    cvModal.classList.remove('show');
    setTimeout(() => cvModal.style.display = 'none', 400);
}


// --- 6. Horizontal Scroll Wheel Support ---
const scrollContainers = document.querySelectorAll('.scroll-wrapper');

scrollContainers.forEach(container => {
    container.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        container.scrollLeft += evt.deltaY;
    });
});

// Escape Key to Close All
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
