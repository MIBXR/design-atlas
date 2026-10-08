(() => {
  'use strict';
  const key = 'atlas-color-scheme';
  const preference = matchMedia('(prefers-color-scheme: dark)');
  function savedChoice() {
    try {
      const saved = localStorage.getItem(key);
      if (['system', 'light', 'dark'].includes(saved)) return saved;
    } catch {}
    return 'system';
  }
  let choice = savedChoice();
  function apply() {
    const resolved = choice === 'system' ? (preference.matches ? 'dark' : 'light') : choice;
    document.documentElement.dataset.atlasTheme = resolved;
    document.documentElement.style.colorScheme = resolved;
    document.querySelectorAll('[data-atlas-theme-choice]').forEach(select => { select.value = choice; });
  }
  document.addEventListener('change', event => {
    if (!event.target.matches('[data-atlas-theme-choice]')) return;
    choice = event.target.value;
    try { localStorage.setItem(key, choice); } catch {}
    apply();
  });
  preference.addEventListener('change', () => { if (choice === 'system') apply(); });
  // Same-origin embedded experiments share the website's display preference.
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    choice = savedChoice();
    apply();
  });
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  apply();
})();
