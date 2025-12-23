const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0, outX = 0, outY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
});

function animate() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    outline.style.left = outX + 'px';
    outline.style.top = outY + 'px';
    requestAnimationFrame(animate);
}
animate();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.section').forEach(s => observer.observe(s));

function openModal(tid, title) {
    const t = document.getElementById(tid);
    const c = document.getElementById('modal-content');
    c.innerHTML = '';
    c.appendChild(t.content.cloneNode(true));
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() { document.getElementById('modal').classList.remove('active'); document.body.style.overflow = ''; }
function openImage(src) { document.getElementById('lightbox-img').src = src; document.getElementById('lightbox').classList.add('active'); }
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }
function openCV() { document.getElementById('cv-modal').classList.add('active'); }
function closeCV() { document.getElementById('cv-modal').classList.remove('active'); }
