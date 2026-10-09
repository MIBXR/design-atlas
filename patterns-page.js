(() => {
  'use strict';
  let toastTimer;
  function toast(message) {
    const element = document.querySelector('#toast');
    element.textContent = message; element.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('show'), 3000);
  }
  const panel = document.querySelector('#pattern-showcase-panel');
  const showcase = document.querySelector('#pattern-showcase');
  let currentType = 'all', mountedType;
  function syncShowcase({ type = currentType } = {}) {
    currentType = type;
    const exampleType = type === 'all' ? 'visual' : type;
    const label = window.DesignAtlasPlayground.labels[exampleType];
    document.querySelector('#pattern-showcase-label').textContent = `体验示意 · ${label}${type === 'all' ? '（全部类型预览）' : ''}`;
    document.querySelector('#pattern-showcase-description').textContent = `${type === 'all' ? '全部类型浏览时展示视觉构成示意；选择体验类型后同步切换。' : `当前为${label}示意。`}示意使用通用内容，原始样式与组合请在来源案例核对。`;
    if (!panel.open || document.querySelector('#patterns-library').hidden) {
      window.DesignAtlasPlayground.dispose(showcase);
      mountedType = undefined;
    } else if (mountedType !== exampleType) {
      window.DesignAtlasPlayground.mount(showcase, { type: exampleType });
      mountedType = exampleType;
    }
  }
  function route() {
    window.DesignAtlasPlayground.disposeDetached();
    window.DesignAtlasPatterns.renderRoute();
    window.DesignAtlasPlayground.disposeDetached();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.DesignAtlasPatterns.init({ toast, onStateChange: syncShowcase });
  panel.addEventListener('toggle', () => syncShowcase());
  document.addEventListener('keydown', event => {
    if (event.key !== '/' || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    event.preventDefault(); window.DesignAtlasPatterns.focusSearch();
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('popstate', route);
  window.addEventListener('pageshow', event => {
    if (event.persisted) { mountedType = undefined; syncShowcase(); }
  });
  route();
})();
