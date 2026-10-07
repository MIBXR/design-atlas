(() => {
  'use strict';
  const key = 'atlas-color-scheme';
  const preference = matchMedia('(prefers-color-scheme: dark)');
  let choice = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (['system', 'light', 'dark'].includes(saved)) choice = saved;
  } catch {}
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
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  apply();
})();
