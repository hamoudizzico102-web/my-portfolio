// ADVANCED CURSOR
const dot = document.querySelector('.cursor-dot');
const blob = document.querySelector('.cursor-blob');
let mx = 0, my = 0, bx = 0, by = 0;

window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
});

function moveBlob() {
    bx += (mx - bx) * 0.15;
    by += (my - by) * 0.15;
    blob.style.transform = `translate(${bx - 20}px, ${by - 20}px)`;
    requestAnimationFrame(moveBlob);
}
moveBlob();

// MAGNETIC CARD EFFECT
document.querySelectorAll('.m-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        card.style.transform = `scale(1.05) translate(${x/15}px, ${y/15}px) rotateX(${-y/20}deg) rotateY(${x/20}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `scale(1) translate(0,0) rotateX(0) rotateY(0)`;
    });
});

// MODAL CONTROLS
function openModal(tid, title) {
    const tpl = document.getElementById(tid);
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
    document.body.style.overflow = 'hidden';
}

function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); document.body.style.overflow = ''; }
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }

window.addEventListener('keydown', (e) => { if(e.key === 'Escape') { closeModal(); closeLightbox(); closeCV(); } });
