(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var burger = document.querySelector('.burger'), menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
  }

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  var par = document.querySelectorAll('[data-parallax]');
  if (par.length && !reduce) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        par.forEach(function (el) { el.style.transform = 'translateY(' + window.scrollY * parseFloat(el.dataset.parallax) + 'px)'; });
        tick = false;
      });
    }, { passive: true });
  }

  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    var pre = new URLSearchParams(location.search).get('package');
    if (pre) {
      var sel = form.querySelector('select[name="package"]');
      Array.prototype.some.call(sel.options, function (o) { if (o.text.indexOf(pre) === 0) { sel.value = o.value || o.text; return true; } });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var endpoint = form.dataset.endpoint, d = new FormData(form);
      if (endpoint) {
        status.textContent = 'Sending…';
        fetch(endpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error(); form.reset(); status.textContent = 'Thank you. Your enquiry has been sent.'; })
          .catch(function () { status.textContent = 'Sorry, something went wrong. Please email us directly.'; });
      } else {
        var body = ['Name: ' + d.get('name'), 'Business: ' + d.get('business'), 'Email: ' + d.get('email'), 'Package: ' + d.get('package'), '', d.get('message')].join('\n');
        window.location.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent('Website enquiry') + '&body=' + encodeURIComponent(body);
        status.textContent = 'Your email app should open. This is not stored on the website.';
      }
    });
  }
})();
