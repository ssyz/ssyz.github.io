(() => {
  'use strict';

  // ===== Sticky header shadow =====
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile nav toggle =====
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
  }

  // ===== FAQ smooth animation =====
  document.querySelectorAll('.faq-item').forEach((item) => {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.faq-answer');

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.open) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        requestAnimationFrame(() => { answer.style.maxHeight = '0px'; });
        answer.addEventListener('transitionend', () => {
          item.open = false;
          answer.style.maxHeight = '';
        }, { once: true });
      } else {
        item.open = true;
        const h = answer.scrollHeight;
        answer.style.maxHeight = '0px';
        requestAnimationFrame(() => { answer.style.maxHeight = h + 'px'; });
        answer.addEventListener('transitionend', () => {
          answer.style.maxHeight = '';
        }, { once: true });
      }
    });
  });

  // ===== Scroll nav active link =====
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((s) => observer.observe(s));

  // ===== Application Modal =====
  const modal = document.getElementById('applyModal');
  const modalInner = modal.querySelector('.modal');
  const form = document.getElementById('applyForm');
  const successEl = document.getElementById('formSuccess');
  const errorEl = document.getElementById('formError');
  const retryBtn = document.getElementById('retryBtn');
  const closeBtn = modal.querySelector('.modal-close');
  const textarea = document.getElementById('productDescription');
  const charCounter = modal.querySelector('.char-counter');

  function openModal() {
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
    });
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    modal.addEventListener('transitionend', () => {
      modal.setAttribute('hidden', '');
    }, { once: true });
  }

  // Open triggers
  document.querySelectorAll('[data-open-apply]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close triggers
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // Focus trap
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modalInner.querySelectorAll('input,textarea,select,button,[tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Character counter
  textarea.addEventListener('input', () => {
    charCounter.textContent = `${textarea.value.length} / 500`;
  });

  // Validation
  function validateField(field) {
    const errorSpan = field.closest('.form-field').querySelector('.field-error');
    if (!errorSpan) return true;
    let msg = '';

    if (field.required && !field.value.trim()) {
      msg = 'This field is required.';
    } else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      msg = 'Please enter a valid email address.';
    } else if (field.type === 'url' && field.value && !/^https?:\/\/.+/.test(field.value)) {
      msg = 'Please enter a valid URL starting with http:// or https://';
    }

    errorSpan.textContent = msg;
    field.classList.toggle('invalid', !!msg);
    return !msg;
  }

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validateField(field);
    });
  });

  // Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    const fields = form.querySelectorAll('input, textarea');
    let valid = true;
    fields.forEach((f) => {
      if (!validateField(f)) valid = false;
    });
    if (!valid) {
      form.querySelector('.invalid')?.focus();
      return;
    }

    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';
    errorEl.hidden = true;

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });

      if (!res.ok) throw new Error('Submission failed');

      form.hidden = true;
      successEl.hidden = false;
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Application';
      errorEl.hidden = false;
    }
  });

  // Retry
  retryBtn.addEventListener('click', () => {
    errorEl.hidden = true;
    form.querySelector('.form-submit').click();
  });

  // ===== Comparison table column hover =====
  const table = document.querySelector('.comparison-table');
  if (table) {
    const highlightCells = table.querySelectorAll('.col-highlight');
    highlightCells.forEach((cell) => {
      cell.addEventListener('mouseenter', () => {
        highlightCells.forEach((c) => c.classList.add('col-hover'));
      });
      cell.addEventListener('mouseleave', () => {
        highlightCells.forEach((c) => c.classList.remove('col-hover'));
      });
    });
  }
})();
