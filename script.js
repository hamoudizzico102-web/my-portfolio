// script.js

function lock(){ document.body.classList.add('modal-open'); }
function unlock(){ document.body.classList.remove('modal-open'); }

// ===== Design/Preview Lightbox =====
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbTitle = document.getElementById('lightboxTitle');

function openLightbox(src, title){
  lbImg.src = src;
  lbImg.alt = title ? (title + " preview") : "Preview";
  lbTitle.textContent = title || "";
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', 'false');
  lock();
}

function closeLightbox(){
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
  unlock();
  setTimeout(() => {
    lbImg.src = "";
    lbTitle.textContent = "";
  }, 150);
}

// ===== Folder Lightbox (Editing + Client Work) =====
const fb = document.getElementById('folderbox');
const folderTitle = document.getElementById('folderTitle');
const folderContent = document.getElementById('folderContent');

function setFolder(key){
  const tpl = document.getElementById(`tpl-${key}`);
  if(!tpl) return;

  const titles = {
    "sebastien": "Sébastien Koubar",
    "hisham-ghanem-library": "hisham.ghanem.library",
    "client-intellident": "Intellident Dental Clinic",
    "client-oqunet": "Oqunet Software",
    "client-marketing-maven": "The Marketing maven"
  };

  folderTitle.textContent = titles[key] || "Folder";
  folderContent.innerHTML = "";
  folderContent.appendChild(tpl.content.cloneNode(true));
}

// ===== Instagram embed loader (loads once) =====
let igEmbedLoading = false;
let igEmbedReady = false;

function loadInstagramEmbedScript(){
  if(igEmbedReady) return Promise.resolve(true);

  if(igEmbedLoading){
    return new Promise((resolve) => {
      const t = setInterval(() => {
        if(igEmbedReady){
          clearInterval(t);
          resolve(true);
        }
      }, 60);
    });
  }

  igEmbedLoading = true;

  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.async = true;
    s.defer = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = () => {
      igEmbedReady = true;
      igEmbedLoading = false;
      resolve(true);
    };
    s.onerror = () => {
      igEmbedLoading = false;
      resolve(false);
    };
    document.body.appendChild(s);
  });
}

async function processInstagramEmbeds(){
  if(window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === "function"){
    window.instgrm.Embeds.process();
    return;
  }

  const ok = await loadInstagramEmbedScript();
  if(ok && window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === "function"){
    window.instgrm.Embeds.process();
  }
}

function openFolder(key){
  setFolder(key);
  fb.classList.add('is-open');
  fb.setAttribute('aria-hidden','false');
  lock();

  if(key === "hisham-ghanem-library"){
    setTimeout(() => { processInstagramEmbeds(); }, 40);
  }
}

function closeFolder(){
  fb.classList.remove('is-open');
  fb.setAttribute('aria-hidden','true');
  unlock();

  // stop videos on close (reset iframes)
  fb.querySelectorAll('iframe').forEach(f => {
    const src = f.getAttribute('src');
    f.setAttribute('src', src);
  });

  setTimeout(() => { folderContent.innerHTML = ""; }, 150);
}

// ===== CV Lightbox =====
const cvBox = document.getElementById('cvbox');
const navCv = document.querySelector('.nav-cv');

function openCV(){
  cvBox.classList.add('is-open');
  cvBox.setAttribute('aria-hidden','false');
  lock();
  if(navCv) navCv.classList.add('is-open');
}

function closeCV(){
  cvBox.classList.remove('is-open');
  cvBox.setAttribute('aria-hidden','true');
  unlock();
  if(navCv) navCv.classList.remove('is-open');
}

// ===== Event Delegation =====
document.addEventListener('click', (e) => {

  // open CV
  const cvBtn = e.target.closest('[data-open-cv="1"]');
  if(cvBtn){
    e.preventDefault();
    e.stopPropagation();
    openCV();
    return;
  }

  const previewBtn = e.target.closest('[data-preview]');
  if(previewBtn){
    e.preventDefault();
    e.stopPropagation();
    const src = previewBtn.getAttribute('data-preview');
    const title = previewBtn.getAttribute('data-title') || "";
    openLightbox(src, title);
    return;
  }

  const folderBtn = e.target.closest('[data-open-folder]');
  if(folderBtn){
    e.preventDefault();
    e.stopPropagation();
    const key = folderBtn.getAttribute('data-open-folder');
    openFolder(key);
    return;
  }

  if (e.target && e.target.getAttribute('data-close') === '1') {
    closeLightbox();
    return;
  }

  if (e.target && e.target.getAttribute('data-folder-close') === '1') {
    closeFolder();
    return;
  }

  if (e.target && e.target.getAttribute('data-cv-close') === '1') {
    closeCV();
    return;
  }
});

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (cvBox.classList.contains('is-open')) closeCV();
    else if (fb.classList.contains('is-open')) closeFolder();
    else if (lb.classList.contains('is-open')) closeLightbox();
  }
});


// =====================================================
// Hover Pop-up (Tooltip) for ALL clickable elements
// =====================================================

const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.setAttribute('aria-hidden', 'true');
document.body.appendChild(tooltip);

let ttActiveEl = null;

function getTooltipText(el){
  if(!el) return null;

  if(el.matches && el.matches('[data-open-cv="1"]')){
    return { title: 'Open CV', sub: 'PDF Preview (blur + red glow)' };
  }

  const dt = el.getAttribute && el.getAttribute('data-title');
  if(dt && dt.trim()) return { title: dt.trim(), sub: '' };

  const t1 = el.querySelector?.('.card-title')?.textContent?.trim();
  const t2 = el.querySelector?.('.card-meta')?.textContent?.trim();
  if(t1) return { title: t1, sub: t2 || '' };

  const ar = el.getAttribute && el.getAttribute('aria-label');
  if(ar && ar.trim()) return { title: ar.trim(), sub: '' };

  const imgAlt = el.querySelector?.('img')?.getAttribute('alt');
  if(imgAlt && imgAlt.trim()) return { title: imgAlt.trim(), sub: '' };

  return null;
}

function showTooltip(el){
  const data = getTooltipText(el);
  if(!data) return;

  tooltip.innerHTML = `
    <strong>${escapeHtml(data.title)}</strong>
    ${data.sub ? `<div class="tt-sub">${escapeHtml(data.sub)}</div>` : ``}
  `;
  tooltip.style.display = 'block';
  tooltip.setAttribute('aria-hidden', 'false');
  ttActiveEl = el;
}

function hideTooltip(){
  tooltip.style.display = 'none';
  tooltip.setAttribute('aria-hidden', 'true');
  ttActiveEl = null;
}

function moveTooltip(x, y){
  const offsetX = 14;
  const offsetY = 18;

  const pad = 10;
  const rect = tooltip.getBoundingClientRect();
  let left = x + offsetX;
  let top  = y + offsetY;

  const maxLeft = window.innerWidth - rect.width - pad;
  const maxTop  = window.innerHeight - rect.height - pad;

  if(left > maxLeft) left = Math.max(pad, x - rect.width - offsetX);
  if(top > maxTop) top = Math.max(pad, y - rect.height - offsetY);

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
}

function escapeHtml(str){
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const isTouch =
  ('ontouchstart' in window) ||
  (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

if(!isTouch){
  document.addEventListener('mouseover', (e) => {
    const el =
      e.target.closest('[data-open-cv="1"]') ||
      e.target.closest('[data-preview]') ||
      e.target.closest('[data-open-folder]') ||
      e.target.closest('.folder-cover') ||
      e.target.closest('.card');

    if(!el) return;
    if(ttActiveEl === el) return;

    showTooltip(el);
  });

  document.addEventListener('mousemove', (e) => {
    if(tooltip.style.display === 'block'){
      moveTooltip(e.clientX, e.clientY);
    }
  });

  document.addEventListener('mouseout', (e) => {
    if(!ttActiveEl) return;
    const related = e.relatedTarget;
    if(related && ttActiveEl.contains(related)) return;

    const leaving = e.target;
    if(leaving === ttActiveEl || ttActiveEl.contains(leaving)){
      hideTooltip();
    }
  });

  window.addEventListener('scroll', hideTooltip, { passive:true });
  fb?.addEventListener('scroll', hideTooltip, { passive:true });
  cvBox?.addEventListener('scroll', hideTooltip, { passive:true });
}
