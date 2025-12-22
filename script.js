// prevent background scroll when modal open
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
    "client-intellident": "Intellident Dental Clinic",
    "client-oqunet": "Oqunet Software"
  };

  folderTitle.textContent = titles[key] || "Folder";
  folderContent.innerHTML = "";
  folderContent.appendChild(tpl.content.cloneNode(true));
}

function openFolder(key){
  setFolder(key);
  fb.classList.add('is-open');
  fb.setAttribute('aria-hidden','false');
  lock();
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

// ===== Event Delegation (dynamic folder items work) =====
document.addEventListener('click', (e) => {
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
});

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (fb.classList.contains('is-open')) closeFolder();
    else if (lb.classList.contains('is-open')) closeLightbox();
  }
});


// =====================================================
// NEW: Hover Pop-up (Tooltip) for ALL clickable cards
// =====================================================

// Create tooltip element once
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.setAttribute('aria-hidden', 'true');
document.body.appendChild(tooltip);

let ttActiveEl = null;

// Helper: get tooltip text (title first, then aria-label, then img alt)
function getTooltipText(el){
  if(!el) return null;

  // Prefer data-title if exists
  const dt = el.getAttribute('data-title');
  if(dt && dt.trim()) return { title: dt.trim(), sub: '' };

  // If folder cover: use card titles inside foot if possible
  const t1 = el.querySelector?.('.card-title')?.textContent?.trim();
  const t2 = el.querySelector?.('.card-meta')?.textContent?.trim();
  if(t1) return { title: t1, sub: t2 || '' };

  // aria-label fallback
  const ar = el.getAttribute('aria-label');
  if(ar && ar.trim()) return { title: ar.trim(), sub: '' };

  // image alt fallback
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
  // offset so it doesn’t cover the cursor
  const offsetX = 14;
  const offsetY = 18;

  // keep inside viewport
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

// Escape HTML
function escapeHtml(str){
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Disable tooltip on touch devices (avoids annoying behavior)
const isTouch =
  ('ontouchstart' in window) ||
  (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

if(!isTouch){
  // We show tooltip for: buttons/links with data-preview OR data-open-folder
  // plus .card, .post-card, .folder-cover (safe broad match)
  document.addEventListener('mouseover', (e) => {
    const el =
      e.target.closest('[data-preview]') ||
      e.target.closest('[data-open-folder]') ||
      e.target.closest('.post-card') ||
      e.target.closest('.folder-cover') ||
      e.target.closest('.card');

    if(!el) return;

    // Don’t show tooltip when any modal is open if you prefer—comment out if you want it inside modals too.
    // if (document.body.classList.contains('modal-open')) return;

    // Avoid re-showing when moving inside same element
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

    // If mouse left the active element entirely, hide
    const related = e.relatedTarget;
    if(related && ttActiveEl.contains(related)) return;

    // If leaving active element
    const leaving = e.target;
    if(leaving === ttActiveEl || ttActiveEl.contains(leaving)){
      hideTooltip();
    }
  });

  // Hide tooltip on scroll (especially inside folder modal)
  window.addEventListener('scroll', hideTooltip, { passive:true });
  fb?.addEventListener('scroll', hideTooltip, { passive:true });
}
