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
