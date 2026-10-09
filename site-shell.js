(() => {
  'use strict';
  if (document.documentElement?.dataset.labEmbed === 'home') return;
  const themeControl = document.querySelector('[data-theme-toggle]');
  if (themeControl) {
    const cacheButton = document.createElement('button');
    cacheButton.className = 'atlas-cache-toggle';
    cacheButton.type = 'button';
    cacheButton.setAttribute('aria-label', '管理已下载的素材');
    cacheButton.setAttribute('title', '已下载的素材');
    cacheButton.setAttribute('aria-haspopup', 'dialog');
    cacheButton.setAttribute('aria-controls', 'asset-cache-dialog');
    cacheButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></svg>';
    themeControl.insertAdjacentElement('beforebegin', cacheButton);
    const cacheDialog = document.createElement('dialog');
    cacheDialog.id = 'asset-cache-dialog';
    cacheDialog.className = 'atlas-cache-dialog';
    cacheDialog.setAttribute('aria-labelledby', 'asset-cache-title');
    cacheDialog.innerHTML = '<form method="dialog"><button class="dialog-close" aria-label="关闭素材缓存管理">×</button></form><h2 id="asset-cache-title">已下载的素材</h2><p>嵌入预览与独立页面共享当前站点的素材缓存。浏览器空间不足时会重新下载。</p><p id="cache-status" role="status"></p><button id="cache-clear" class="atlas-ui-button" disabled>清除素材缓存</button>';
    document.body.append(cacheDialog);
    let cacheReady;
    async function showCacheStatus(clear = false) {
      const status = cacheDialog.querySelector('#cache-status');
      const button = cacheDialog.querySelector('#cache-clear');
      status.textContent = clear ? '正在清除素材缓存…' : '正在检查素材缓存…';
      button.disabled = true;
      if (!window.DesignAtlasAssetCache) {
        cacheReady ||= new Promise(resolve => {
          const script = document.createElement('script');
          script.src = 'asset-cache.js';
          script.onload = script.onerror = resolve;
          document.head.append(script);
        });
        await cacheReady;
      }
      const api = window.DesignAtlasAssetCache;
      const result = api ? await api[clear ? 'clear' : 'status']() : { available: false };
      status.textContent = result.available ? `${result.files} 项 · ${(result.bytes / 1024 / 1024).toFixed(1)} MiB${clear ? ' · 下次打开时按需重新下载' : ''}` : '此浏览器暂不支持持久素材缓存，页面仍可正常加载。';
      button.disabled = !result.available;
    }
    cacheButton.addEventListener('click', async () => {
      cacheDialog.showModal();
      await showCacheStatus();
    });
    cacheDialog.querySelector('#cache-clear').addEventListener('click', () => showCacheStatus(true));
  }
  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'atlas-ui-button atlas-back-to-top';
  backToTop.textContent = '回到顶部';
  backToTop.hidden = true;
  document.body.append(backToTop);
  const syncBackToTop = () => { backToTop.hidden = window.scrollY <= window.innerHeight; };
  window.addEventListener('scroll', syncBackToTop, {passive:true});
  window.addEventListener('resize', syncBackToTop);
  backToTop.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    document.querySelector('main')?.focus({preventScroll:true});
  });
  syncBackToTop();
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
