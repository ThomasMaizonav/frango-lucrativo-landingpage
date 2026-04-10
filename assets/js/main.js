  // ======== SCROLL REVEAL ========
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  // ======== FAQ ACCORDION ========
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ======== SMOOTH SCROLL CTA ========
  document.querySelectorAll('a[href="#oferta"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ======== EXIT INTENT ========
  const exitModal = document.getElementById('exit-intent-modal');
  const exitDismiss = document.getElementById('exit-intent-dismiss');
  const exitCloseTriggers = document.querySelectorAll('[data-close-exit-modal]');
  const exitOfferCta = exitModal?.querySelector('.exit-intent-cta');

  let exitModalOpen = false;
  let exitMousePromptShown = false;
  let allowExit = false;
  let hasUserInteraction = false;

  const markUserInteraction = () => {
    hasUserInteraction = true;
  };

  ['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach(eventName => {
    window.addEventListener(eventName, markUserInteraction, { passive: true, once: true });
  });

  function openExitModal() {
    if (!exitModal || exitModalOpen) return;
    exitModalOpen = true;
    exitModal.setAttribute('aria-hidden', 'false');
    exitModal.classList.add('is-open');
    document.body.classList.add('exit-intent-open');
  }

  function closeExitModal() {
    if (!exitModal) return;
    exitModalOpen = false;
    exitModal.classList.remove('is-open');
    exitModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('exit-intent-open');
  }

  if (exitModal) {
    exitCloseTriggers.forEach(trigger => {
      trigger.addEventListener('click', closeExitModal);
    });

    exitDismiss?.addEventListener('click', () => {
      closeExitModal();
      allowExit = true;
      setTimeout(() => {
        if (window.history.length > 1) {
          window.history.back();
        }
      }, 40);
    });

    exitOfferCta?.addEventListener('click', () => {
      closeExitModal();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && exitModal.classList.contains('is-open')) {
        closeExitModal();
      }
    });

    document.addEventListener('mouseout', event => {
      if (allowExit || !hasUserInteraction || exitModalOpen || exitMousePromptShown) return;
      if (event.relatedTarget || event.clientY > 12) return;
      exitMousePromptShown = true;
      openExitModal();
    });

    if (window.history && typeof window.history.pushState === 'function') {
      window.history.pushState({ exitIntent: true }, '', window.location.href);
      window.addEventListener('popstate', () => {
        if (allowExit) return;
        openExitModal();
        window.history.pushState({ exitIntent: true }, '', window.location.href);
      });
    }

    window.addEventListener('beforeunload', event => {
      if (!hasUserInteraction || allowExit) return;
      event.preventDefault();
      event.returnValue = 'Você ainda pode comprar o produto por R$49,90.';
    });
  }
