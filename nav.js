(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  var trigger = nav.querySelector('.nav-labs-trigger');
  var panel = nav.querySelector('.nav-dropdown-panel');
  var dropdown = nav.querySelector('.nav-dropdown');
  var mobile = window.matchMedia('(max-width: 768px)');

  // Hamburger toggle
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    if (!open && trigger) closeDropdown();
  });

  // Close mobile menu when a nav link or dropdown item is clicked
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      if (trigger) closeDropdown();
    }
  });

  if (trigger && panel && dropdown) {
    var hoverTimeout;

    // Desktop: hover to open/close
    dropdown.addEventListener('mouseenter', function () {
      if (mobile.matches) return;
      clearTimeout(hoverTimeout);
      openDropdown();
    });

    dropdown.addEventListener('mouseleave', function () {
      if (mobile.matches) return;
      hoverTimeout = setTimeout(closeDropdown, 120);
    });

    // Mobile: click to toggle
    trigger.addEventListener('click', function () {
      if (!mobile.matches) return;
      if (panel.classList.contains('open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Arrow key navigation within dropdown
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && panel.classList.contains('open')) {
        e.preventDefault();
        var first = panel.querySelector('.nav-dropdown-item');
        if (first) first.focus();
      }
    });

    panel.addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(panel.querySelectorAll('.nav-dropdown-item'));
      var idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var next = items[idx + 1] || items[0];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = items[idx - 1] || items[items.length - 1];
        prev.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown();
        trigger.focus();
      }
    });
  }

  // Escape key: close dropdown or mobile menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (trigger && panel && panel.classList.contains('open')) {
        closeDropdown();
        trigger.focus();
      } else if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  function openDropdown() {
    panel.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        panel.classList.add('visible');
      });
    });
  }

  function closeDropdown() {
    panel.classList.remove('visible');
    panel.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
})();
