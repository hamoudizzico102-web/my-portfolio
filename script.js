// CUSTOM CURSOR & LIGHT
const cursor = document.querySelector('.custom-cursor');
const light = document.querySelector('.light-follower');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.transform = `translate(${x}px, ${y}px)`;
    
    // Light follows with a smooth delay
    light.animate({
        left: `${x}px`,
        top: `${y}px`
    }, { duration: 1000, fill: "forwards" });
});

// INTERACTIVE CARDS (Tilt Effect)
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        card.style.transform = `scale(1.03) rotateX(${-y/20}deg) rotateY(${x/20}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `scale(1) rotateX(0) rotateY(0)`;
    });
});

// MODAL LOGIC
function openModal(id, title) {
    const tpl = document.getElementById(id);
    const content = document.getElementById('modal-content');
    content.innerHTML = '';
    content.appendChild(tpl.content.cloneNode(true));
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

function openImage(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') { closeModal(); closeLightbox(); closeCV(); }
});
