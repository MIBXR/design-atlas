(() => {
  'use strict';
  const collectionKeys = ['category', 'country', 'q', 'sort'];
  function restoreLegacyCollectionLink() {
    const current = new URL(window.location.href);
    if (current.pathname !== '/' && current.pathname !== '/index.html') return;
    let route = current.hash;
    try { route = decodeURIComponent(route); } catch {}
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
