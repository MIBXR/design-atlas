(() => {
  'use strict';
  if (document.documentElement?.dataset.labEmbed === 'home') return;
  const menus = [...document.querySelectorAll('.atlas-page-menu')];
  if (!menus.length) return;
  const compact = window.matchMedia('(max-width: 800px)');
  function syncMenuLayout() {
    for (const menu of menus) {
      const summary = menu.querySelector('summary');
      if (compact.matches && menu.contains(document.activeElement) && document.activeElement !== summary) {
        summary?.focus({ preventScroll: true });
      }
      menu.open = !compact.matches;
    }
  }
  syncMenuLayout();
  // Only a breakpoint change resets the layout default; user toggles stay native.
  compact.addEventListener('change', syncMenuLayout);
})();
