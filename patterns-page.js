(() => {
  'use strict';
  let toastTimer;
  function toast(message) {
    const element = document.querySelector('#toast');
    element.textContent = message; element.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('show'), 3000);
  }
  function route() {
    window.DesignAtlasPlayground.disposeDetached();
    window.DesignAtlasPatterns.renderRoute();
    window.DesignAtlasPlayground.disposeDetached();
    const showcase = document.querySelector('#pattern-showcase');
    if (document.querySelector('#patterns-library').hidden) window.DesignAtlasPlayground.dispose(showcase);
    else window.DesignAtlasPlayground.mount(showcase, { type: document.querySelector('#pattern-showcase-type').value });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.DesignAtlasPatterns.init({ toast });
  document.querySelector('#pattern-showcase-type').addEventListener('change', event => {
    window.DesignAtlasPlayground.mount(document.querySelector('#pattern-showcase'), { type: event.target.value });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== '/' || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    event.preventDefault(); window.DesignAtlasPatterns.focusSearch();
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('popstate', route);
  route();
})();
