(() => {
  'use strict';
  const key = 'atlas-color-scheme';
  const modes = ['system', 'dark', 'light'];
  const names = { system: '跟随系统', dark: '深色', light: '浅色' };
  const preference = matchMedia('(prefers-color-scheme: dark)');
  function savedChoice() {
    try {
      const saved = localStorage.getItem(key);
      if (modes.includes(saved)) return saved;
    } catch {}
    return 'system';
  }
  let choice = savedChoice();
  function nextChoice() {
    return modes[(modes.indexOf(choice) + 1) % modes.length];
  }
  function apply() {
    const resolved = choice === 'system' ? (preference.matches ? 'dark' : 'light') : choice;
    document.documentElement.dataset.atlasTheme = resolved;
    // Set in the head, before the header exists, so its icon and page theme agree at first paint.
    document.documentElement.dataset.atlasThemeChoice = choice;
    document.documentElement.style.colorScheme = resolved;
    document.querySelectorAll('button[data-theme-toggle]').forEach(button => {
      const description = `显示主题：${names[choice]}；点击切换为${names[nextChoice()]}`;
      button.dataset.themeState = choice;
      button.setAttribute('aria-label', description);
      button.setAttribute('title', description);
    });
    // Retain the previous interface while documents migrate to the common icon button.
    document.querySelectorAll('select[data-atlas-theme-choice]').forEach(select => { select.value = choice; });
  }
  function selectChoice(next) {
    if (!modes.includes(next)) return;
    choice = next;
    try { localStorage.setItem(key, choice); } catch {}
    apply();
  }
  // Native buttons already turn pointer, Enter and Space activation into one click.
  document.addEventListener('click', event => {
    const button = event.target.closest?.('button[data-theme-toggle]');
    if (!button || button.disabled) return;
    selectChoice(nextChoice());
  });
  document.addEventListener('change', event => {
    if (!event.target.matches?.('select[data-atlas-theme-choice]')) return;
    selectChoice(event.target.value);
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
