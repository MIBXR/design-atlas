(() => {
  'use strict';
  if (document.documentElement?.dataset.labEmbed === 'home') return;
  const directory = document.querySelector('[data-page-directory]');
  const toggle = document.querySelector('[data-directory-toggle]');
  if (!directory || !toggle) return;
  const menus = [...directory.querySelectorAll('.atlas-page-menu')];
  const closeButton = directory.querySelector('[data-directory-close]');
  const favoriteDialog = document.querySelector('#favorite-dialog');
  const compact = window.matchMedia('(max-width: 800px)');
  let open = false;
  let restoreFavoriteFocus = false;
  function syncVisibility() {
    directory.hidden = compact.matches && !open;
    directory.toggleAttribute('data-directory-open', compact.matches && open);
    toggle.hidden = !compact.matches;
    toggle.setAttribute('aria-expanded', String(compact.matches && open));
    toggle.setAttribute('aria-label', open ? '收起页面目录' : '打开页面目录');
  }
  function close({ restoreFocus = false } = {}) {
    if (!open) return;
    open = false;
    if (restoreFocus || directory.contains(document.activeElement)) toggle.focus({ preventScroll: true });
    syncVisibility();
  }
  function show() {
    if (!compact.matches) return;
    open = true;
    // The one header control reveals the entire directory in one operation.
    for (const menu of menus) menu.open = true;
    syncVisibility();
    directory.scrollTop = 0;
    directory.focus({ preventScroll: true });
  }
  function syncLayout() {
    const active = document.activeElement;
    const inside = directory.contains(active);
    const controlFocused = active === toggle || active === closeButton;
    open = false;
    for (const menu of menus) menu.open = true;
    syncVisibility();
    if (compact.matches && inside) toggle.focus({ preventScroll: true });
    else if (!compact.matches && controlFocused) directory.querySelector('nav a[href], nav button')?.focus({ preventScroll: true });
  }
  function focusDestination(action) {
    let destination;
    const href = action.getAttribute('href');
    if (href) {
      try {
        const url = new URL(href, window.location.href);
        const here = new URL(window.location.href);
        if (url.origin === here.origin && url.pathname === here.pathname && url.hash) {
          destination = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        }
      } catch {}
    }
    destination ||= document.querySelector('main');
    if (!destination) return;
    if (!destination.hasAttribute('tabindex')) destination.setAttribute('tabindex', '-1');
    destination.focus({ preventScroll: true });
  }
  toggle.addEventListener('click', () => open ? close({ restoreFocus: true }) : show());
  closeButton?.addEventListener('click', () => close({ restoreFocus: true }));
  favoriteDialog?.addEventListener('close', () => {
    if (!restoreFavoriteFocus) return;
    restoreFavoriteFocus = false;
    if (!compact.matches || !directory.hidden) return;
    const active = document.activeElement;
    // Native dialog restoration cannot focus an opener in the closed drawer.
    // Restore this opener's visible control only if focus has been stranded.
    if (!active || active === document.body || active === document.documentElement || favoriteDialog.contains(active) || directory.contains(active)) toggle.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !open) return;
    event.preventDefault();
    close({ restoreFocus: true });
  });
  document.addEventListener('click', event => {
    if (!compact.matches || !open || toggle.contains(event.target)) return;
    if (!directory.contains(event.target)) {
      // A newly focused page control keeps focus when an outside click dismisses.
      close();
      return;
    }
    const action = event.target.closest('a[href], button[data-filter], #favorite-manage');
    if (!action) return;
    if (action.id === 'favorite-manage' && favoriteDialog?.open) restoreFavoriteFocus = true;
    const focusWasInside = directory.contains(document.activeElement);
    open = false;
    syncVisibility();
    // A tool may have opened a dialog before this bubbling listener runs.
    // Leave that dialog's focus intact; ordinary filters and links go to content.
    if (focusWasInside) focusDestination(action);
  });
  syncLayout();
  compact.addEventListener('change', syncLayout);
})();
