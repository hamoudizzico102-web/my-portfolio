// script.js

// =========================================
// 1. Core Utilities (Lock/Unlock Scroll)
// =========================================
const body = document.body;

function lockScroll() {
  // Prevent shifting if scrollbar disappears
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.paddingRight = `${scrollBarWidth}px`;
  body.classList.add('modal-open');
}

function unlockScroll() {
  body.classList.remove('modal-open');
  body.style.paddingRight = '';
}

// =========================================
// 2. Lightbox (Images)
// =========================================
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbTitle = document.getElementById('lightboxTitle');

function openLightbox(src, title) {
  requestAnimationFrame(() => {
    lbImg.src = src;
    lbImg.alt = title || "Preview";
    lbTitle.textContent = title || "";
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    lockScroll();
  });
}

function closeLightbox() {
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
  unlockScroll();
  // Clear after animation ends to avoid flickering
  setTimeout(() => {
    lbImg.src = "";
    lbTitle.textContent = "";
  }, 300);
}

// =========================================
// 3. Folder Lightbox (Dynamic Content)
// =========================================
const fb = document.getElementById('folderbox');
const folderTitle = document.getElementById('folderTitle');
const folderContent = document.getElementById('folderContent');

function openFolder(key, triggerBtn) {
  const tpl = document.getElementById(`tpl-${key}`);
  if (!tpl) return; // If no template found, do nothing

  // ✨ Magic: Get title directly from the HTML card, no hardcoding needed!
  let titleText = "Folder";
  if (triggerBtn) {
    const titleEl = triggerBtn.querySelector('.card-title');
    if (titleEl) titleText = titleEl.textContent;
  }

  folderTitle.textContent = titleText;
  folderContent.innerHTML = ""; // Clear previous
  folderContent.appendChild(tpl.content.cloneNode(true)); // Inject new

  fb.classList.add('is-open');
  fb.setAttribute('aria-hidden', 'false');
  lockScroll();
}

function closeFolder() {
  fb.classList.remove('is-open');
  fb.setAttribute('aria-hidden', 'true');
  unlockScroll();

  // Stop videos immediately (reset src)
  const iframes = fb.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    const src = iframe.getAttribute('src');
    iframe.setAttribute('src', src);
  });

  setTimeout(() => {
    folderContent.innerHTML = "";
  }, 300);
}

// =========================================
// 4. CV Modal
// =========================================
const cvBox = document.getElementById('cvbox');
const navCv = document.querySelector('.nav-cv');

function openCV() {
  cvBox.classList.add('is-open');
  cvBox.setAttribute('aria-hidden', 'false');
  lockScroll();
  if (navCv) navCv.classList.add('is-open'); // Keep navbar glowing
}

function closeCV() {
  cvBox.classList.remove('is-open');
  cvBox.setAttribute('aria-hidden', 'true');
  unlockScroll();
  if (navCv) navCv.classList.remove('is-open');
}

// =========================================
// 5. Global Event Listener (The Brain)
// =========================================
document.addEventListener('click', (e) => {
  const target = e.target;

  // A. Open Logic
  const cvBtn = target.closest('[data-open-cv="1"]');
  if (cvBtn) {
    e.preventDefault(); openCV(); return;
  }

  const previewBtn = target.closest('[data-preview]');
  if (previewBtn) {
    e.preventDefault();
    const src = previewBtn.getAttribute('data-preview');
    const title = previewBtn.getAttribute('data-title');
    openLightbox(src, title);
    return;
  }

  const folderBtn = target.closest('[data-open-folder]');
  if (folderBtn) {
    e.preventDefault();
    const key = folderBtn.getAttribute('data-open-folder');
    openFolder(key, folderBtn); // Pass button to grab title
    return;
  }

  // B. Close Logic (Any button with data-close/folder-close/cv-close)
  if (target.closest('[data-close="1"]')) {
    closeLightbox(); return;
  }
  if (target.closest('[data-folder-close="1"]')) {
    closeFolder(); return;
  }
  if (target.closest('[data-cv-close="1"]')) {
    closeCV(); return;
  }

  // C. Close on Backdrop Click (Optional UX improvement)
  if (target.classList.contains('lightbox-backdrop')) {
    if (lb.classList.contains('is-open')) closeLightbox();
    if (fb.classList.contains('is-open')) closeFolder();
    if (cvBox.classList.contains('is-open')) closeCV();
  }
});

// ESC Key to Close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (cvBox.classList.contains('is-open')) closeCV();
    else if (fb.classList.contains('is-open')) closeFolder();
    else if (lb.classList.contains('is-open')) closeLightbox();
  }
});

// =========================================
// 6. Custom Tooltip (Performance Optimized)
// =========================================

// Only run tooltip logic on non-touch devices
const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouch) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  let activeEl = null;

  const showTooltip = (el) => {
    let title = el.getAttribute('data-title') || el.getAttribute('aria-label');
    let sub = "";

    // Special case for CV
    if (el.getAttribute('data-open-cv') === "1") {
      title = "View CV";
      sub = "PDF Preview";
    }
    // Fallback: Try to find text inside the card
    else if (!title) {
      const tEl = el.querySelector('.card-title');
      const sEl = el.querySelector('.card-meta');
      if (tEl) title = tEl.textContent.trim();
      if (sEl) sub = sEl.textContent.trim();
    }
    
    // Image fallback
    if (!title) {
      const img = el.querySelector('img');
      if (img) title = img.alt;
    }

    if (!title) return; // Nothing to show

    tooltip.innerHTML = `<strong>${title}</strong>${sub ? `<div class="tt-sub">${sub}</div>` : ''}`;
    tooltip.style.display = 'block';
    activeEl = el;
  };

  const hideTooltip = () => {
    tooltip.style.display = 'none';
    activeEl = null;
  };

  const moveTooltip = (e) => {
    const gap = 15;
    let x = e.clientX + gap;
    let y = e.clientY + gap;

    // Boundary check (keep inside screen)
    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth) x = e.clientX - rect.width - gap;
    if (y + rect.height > window.innerHeight) y = e.clientY - rect.height - gap;

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  };

  // Event Delegation for Tooltips (Better Performance)
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-preview], [data-open-folder], [data-open-cv], .card-click');
    if (target) showTooltip(target);
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-preview], [data-open-folder], [data-open-cv], .card-click');
    if (target) hideTooltip();
  });

  document.addEventListener('mousemove', (e) => {
    if (activeEl) moveTooltip(e);
  });
}
