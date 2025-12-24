// --- 1. CURSOR LOGIC ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mx = 0, my = 0; // Mouse Coordinates
let ox = 0, oy = 0; // Outline Coordinates

window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    
    // Dot follows instantly
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
});

function animateCursor() {
    // Outline follows with smooth delay (0.15 factor)
    ox += (mx - ox) * 0.15;
    oy += (my - oy) * 0.15;
    
    outline.style.left = ox + 'px';
    outline.style.top = oy + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover class to cursor on interactive elements
document.querySelectorAll('a, button, .card-3d').forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
});

// --- 2. 3D TILT EFFECT (Physics) ---
document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const content = card.querySelector('.card-content');
        const rect = card.getBoundingClientRect();
        
        // Calculate center of the card
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        
        // Apply rotation (Dividing by 20 controls sensitivity)
        // rotateY is based on X movement, rotateX is based on Y movement (inverted)
        content.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    });

    // Reset when mouse leaves
    card.addEventListener('mouseleave', () => {
        const content = card.querySelector('.card-content');
        content.style.transform = `rotateY(0) rotateX(0)`;
    });
});

// --- 3. MODAL SYSTEM ---
function openModal(templateId, title) {
    const tpl = document.getElementById(templateId);
    const content = document.getElementById('modal-content');
    
    // Clear previous content
    content.innerHTML = '';
    // Clone template content
    content.appendChild(tpl.content.cloneNode(true));
    
    // Set title and show modal
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

// --- 4. LIGHTBOX & CV ---
function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// Close on Escape Key
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        closeModal();
        closeLightbox();
        closeCV();
    }
});
