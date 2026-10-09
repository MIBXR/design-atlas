(() => {
  'use strict';
  const collectionKeys = ['category', 'country', 'q', 'sort'];
  function restoreLegacyCollectionLink() {
    const current = new URL(window.location.href);
    let route = current.hash;
    try { route = decodeURIComponent(route); } catch {}
    if (['/', '/index.html', '/cases.html', '/cases'].includes(current.pathname) && (route === '#patterns' || route.startsWith('#patterns?') || route.startsWith('#pattern/'))) {
      const destination = new URL('patterns.html', current);
      destination.search = current.search; destination.hash = current.hash;
      window.location.replace(destination.href);
      return;
    }
    if (current.pathname !== '/' && current.pathname !== '/index.html') return;
    const caseRoute = route.startsWith('#style/') || route === '#compare';
    if (!caseRoute && !collectionKeys.some(key => current.searchParams.has(key))) return;
    const destination = new URL('cases.html', current);
    destination.search = current.search;
    destination.hash = current.hash;
    // Replace the compatibility entry so Back returns to the visitor's prior page.
    window.location.replace(destination.href);
  }
  restoreLegacyCollectionLink();
  window.addEventListener('hashchange', restoreLegacyCollectionLink);
  window.addEventListener('popstate', restoreLegacyCollectionLink);
})();
