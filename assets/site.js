// Shared page behaviour: fade-in, figure lightbox, TANGO figure tabs, project filters.
(function () {
  // Fade-in on scroll
  var fadeEls = document.querySelectorAll('.am-fade');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    fadeEls.forEach(function (el) { obs.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Lightbox for figures
  var lb = document.getElementById('amLightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.am-figure img').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.getAttribute('data-full') || img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  // Tabs
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('.am-tab');
    var root = document.getElementById(group.getAttribute('data-tabs'));
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
        root.querySelectorAll('.am-tabpanel').forEach(function (p) {
          p.classList.toggle('active', p.id === tab.getAttribute('data-target'));
        });
      });
    });
  });

  // Project filter chips (and loop nodes that set a filter)
  var chips = document.querySelectorAll('.am-chip[data-filter]');
  function applyFilter(f) {
    chips.forEach(function (c) { c.classList.toggle('active', c.getAttribute('data-filter') === f); });
    document.querySelectorAll('.am-projcol').forEach(function (col) {
      var stages = (col.getAttribute('data-stages') || '').split(' ');
      col.classList.toggle('hide', f !== 'all' && stages.indexOf(f) === -1);
    });
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () { applyFilter(c.getAttribute('data-filter')); });
  });
  document.querySelectorAll('[data-setfilter]').forEach(function (a) {
    a.addEventListener('click', function () { applyFilter(a.getAttribute('data-setfilter')); });
  });
})();
