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
