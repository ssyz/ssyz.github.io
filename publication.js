/* Reading Progress Bar */
(function () {
  var fill = document.querySelector('.reading-progress-fill');
  if (!fill) return;

  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

/* TOC Scroll-Spy */
(function () {
  var links = document.querySelectorAll('.pub-toc-link');
  if (!links.length) return;

  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: link });
  });

  var THRESHOLD = 100;

  function update() {
    var current = null;
    var atBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 2;

    if (atBottom) {
      // At the bottom of the page: pick the section whose top is
      // closest to the viewport top (the one the user is looking at)
      var bestDist = Infinity;
      for (var i = 0; i < sections.length; i++) {
        var top = sections[i].el.getBoundingClientRect().top;
        var dist = Math.abs(top);
        if (dist < bestDist) {
          bestDist = dist;
          current = sections[i];
        }
      }
    } else {
      // Normal case: last section whose top has scrolled past the threshold
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].el.getBoundingClientRect().top <= THRESHOLD) {
          current = sections[i];
        }
      }
    }

    links.forEach(function (l) { l.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* Footnote Popovers */
(function () {
  var refs = document.querySelectorAll('.footnote-ref');
  if (!refs.length) return;

  var activePopover = null;

  function dismiss() {
    if (activePopover) {
      activePopover.remove();
      activePopover = null;
    }
  }

  refs.forEach(function (ref) {
    ref.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      e.preventDefault();
      e.stopPropagation();
      dismiss();

      var fnId = 'fn-' + ref.getAttribute('data-footnote');
      var fnEl = document.getElementById(fnId);
      if (!fnEl) return;

      ref.style.position = 'relative';

      var popover = document.createElement('div');
      popover.className = 'footnote-popover';
      popover.innerHTML = fnEl.innerHTML;
      ref.appendChild(popover);

      requestAnimationFrame(function () {
        popover.classList.add('visible');
      });

      activePopover = popover;
    });
  });

  document.addEventListener('click', dismiss);
})();

/* Sourced Term Popovers */
(function () {
  var terms = document.querySelectorAll('.sourced-term');
  if (!terms.length) return;

  var activePopover = null;
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  var isMobile = function () { return window.innerWidth < 768; };

  function dismiss() {
    if (activePopover) {
      activePopover.classList.remove('visible');
      var pop = activePopover;
      setTimeout(function () { pop.remove(); }, 200);
      activePopover = null;
    }
  }

  function buildPopover(term) {
    var text = term.getAttribute('data-source-text');
    var url = term.getAttribute('data-source-url');
    var label = term.getAttribute('data-source-label');

    var popover = document.createElement('div');
    popover.className = 'sourced-term-popover';
    if (isMobile()) popover.classList.add('bottom-sheet');

    var html = '';
    if (text) html += '<span>' + text + '</span>';
    if (label && url) {
      html += ' <a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
    } else if (label) {
      html += ' <span class="source-label">' + label + '</span>';
    }
    popover.innerHTML = html;
    return popover;
  }

  function show(term) {
    dismiss();
    var popover = buildPopover(term);
    term.appendChild(popover);
    requestAnimationFrame(function () {
      popover.classList.add('visible');
    });
    activePopover = popover;
  }

  terms.forEach(function (term) {
    if (isTouch) {
      term.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (activePopover && activePopover.parentElement === term) {
          dismiss();
        } else {
          show(term);
        }
      });
    } else {
      var hideTimeout;
      term.addEventListener('mouseenter', function () {
        clearTimeout(hideTimeout);
        show(term);
      });
      term.addEventListener('mouseleave', function () {
        hideTimeout = setTimeout(dismiss, 120);
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (activePopover && !e.target.closest('.sourced-term')) {
      dismiss();
    }
  });
})();

/* Image Lightbox */
(function () {
  var imgs = document.querySelectorAll('.pub-figure img, .pub-hero-image img');
  if (!imgs.length) return;

  function open(src) {
    var overlay = document.createElement('div');
    overlay.className = 'pub-lightbox';

    var img = document.createElement('img');
    img.src = src;
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
      overlay.classList.add('visible');
    });

    overlay.addEventListener('click', function () {
      overlay.classList.remove('visible');
      overlay.addEventListener('transitionend', function () {
        overlay.remove();
      });
    });

    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('visible');
        overlay.addEventListener('transitionend', function () {
          overlay.remove();
        });
        document.removeEventListener('keydown', onKey);
      }
    });
  }

  imgs.forEach(function (img) {
    img.addEventListener('click', function () {
      open(img.src);
    });
  });
})();
