// Physical Smooth Cursor
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mx = 0, my = 0, ox = 0, oy = 0;

window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});

function animate() {
    ox += (mx - ox) * 0.15;
    oy += (my - oy) * 0.15;
    outline.style.left = ox + 'px';
    outline.style.top = oy + 'px';
    requestAnimationFrame(animate);
}
animate();

// Hover Effects
document.querySelectorAll('a, button, .netflix-card').forEach(el => {
    el.addEventListener('mouseenter', () => outline.style.transform = 'translate(-50%, -50%) scale(1.5)');
    el.addEventListener('mouseleave', () => outline.style.transform = 'translate(-50%, -50%) scale(1)');
});

// Modal Logic
function openModal(tid, title) {
    const t = document.getElementById(tid);
    const c = document.getElementById('modal-content');
    c.innerHTML = '';
    c.appendChild(t.content.cloneNode(true));
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

function openImage(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

// Navbar Transparency
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) header.style.background = '#141414';
    else header.style.background = 'transparent';
});
