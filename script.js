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

  // Title mapping (so it looks clean)
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

  // optional cleanup
  setTimeout(() => { folderContent.innerHTML = ""; }, 150);
}

// ===== Event Delegation (so dynamic folder items work) =====
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

  // Close design lightbox
  if (e.target && e.target.getAttribute('data-close') === '1') {
    closeLightbox();
    return;
  }

  // Close folder lightbox
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
