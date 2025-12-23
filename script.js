// LIQUID CURSOR PHYSICS
const inner = document.querySelector('.cursor-inner');
const outer = document.querySelector('.cursor-outer');
let mx = 0, my = 0, ox = 0, oy = 0;

window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    inner.style.transform = `translate(${mx}px, ${my}px)`;
});

function tick() {
    ox += (mx - ox) * 0.15;
    oy += (my - oy) * 0.15;
    outer.style.transform = `translate(${ox - 12}px, ${oy - 12}px)`;
    requestAnimationFrame(tick);
}
tick();

// CURSOR INTERACTION
document.querySelectorAll('.hover-target').forEach(item => {
    item.addEventListener('mouseenter', () => {
        outer.style.width = '60px';
        outer.style.height = '60px';
        outer.style.background = 'rgba(0, 81, 255, 0.1)';
    });
    item.addEventListener('mouseleave', () => {
        outer.style.width = '30px';
        outer.style.height = '30px';
        outer.style.background = 'transparent';
    });
});

// MODAL SYSTEM
function openModal(tid, title) {
    const t = document.getElementById(tid);
    const content = document.getElementById('modal-content');
    content.innerHTML = '';
    content.appendChild(t.content.cloneNode(true));
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

function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

window.addEventListener('keydown', (e) => { if(e.key === 'Escape') { closeModal(); closeLightbox(); closeCV(); } });
