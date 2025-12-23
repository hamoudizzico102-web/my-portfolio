(() => {
  const inner = document.querySelector('.cursor-inner');
  const outer = document.querySelector('.cursor-outer');

  // Detect touch devices (no custom cursor)
  const isFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  let mx = 0, my = 0, ox = 0, oy = 0;
  let rafId = null;

  function startCursor() {
    if (!inner || !outer || !isFinePointer) return;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      inner.style.transform = `translate(${mx}px, ${my}px)`;
    });

    const tick = () => {
      ox += (mx - ox) * 0.15;
      oy += (my - oy) * 0.15;
      outer.style.transform = `translate(${ox - 12}px, ${oy - 12}px)`;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    document.querySelectorAll('.hover-target').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        outer.style.width = '60px';
        outer.style.height = '60px';
        outer.style.background = 'rgba(0, 81, 255, 0.12)';
      });
      item.addEventListener('mouseleave', () => {
        outer.style.width = '30px';
        outer.style.height = '30px';
        outer.style.background = 'transparent';
      });
    });

    // Fix: cursor freezing over iframes (they steal mouse events)
    document.querySelectorAll('iframe').forEach((ifr) => {
      ifr.addEventListener('mouseenter', () => {
        outer.style.width = '30px';
        outer.style.height = '30px';
        outer.style.background = 'transparent';
      });
    });
  }

  // ===== MODAL SYSTEM =====
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');

  const cvModal = document.getElementById('cv-modal');

  let scrollY = 0;
  function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }
  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }

  window.openModal = function (tid, title) {
    const t = document.getElementById(tid);
    if (!t || !modal || !modalContent || !modalTitle) return;

    modalContent.innerHTML = '';
    modalContent.appendChild(t.content.cloneNode(true));
    modalTitle.textContent = title || '';
    modal.classList.add('active');
    lockScroll();
  };

  window.closeModal = function () {
    if (!modal) return;
    modal.classList.remove('active');
    // Small cleanup so videos stop faster in some browsers
    if (modalContent) modalContent.innerHTML = '';
    unlockScroll();
  };

  window.openImage = function (src) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lightbox.classList.add('active');
    lockScroll();
  };

  window.closeLightbox = function () {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    unlockScroll();
  };

  window.openCV = function () {
    if (!cvModal) return;
    cvModal.classList.add('active');
    lockScroll();
  };

  window.closeCV = function () {
    if (!cvModal) return;
    cvModal.classList.remove('active');
    unlockScroll();
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeModal();
      window.closeLightbox();
      window.closeCV();
    }
  });

  // Boot
  document.addEventListener('DOMContentLoaded', () => {
    startCursor();
  });
})();
