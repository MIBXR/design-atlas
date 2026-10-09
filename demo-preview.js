(() => {
  'use strict';
  function mount(wrap, controls, initialMode = 'desktop') {
    let mode = initialMode;
    const resize = () => {
      const frame = wrap.querySelector('iframe');
      if (!frame || !wrap.clientWidth) return;
      const panel = wrap.closest('.demo-panel');
      const headerHeight = document.querySelector('.atlas-site-header').getBoundingClientRect().height;
      const controlsHeight = wrap.getBoundingClientRect().top - panel.getBoundingClientRect().top;
      const height = Math.max(1, window.innerHeight - headerHeight - controlsHeight - 36);
      const style = getComputedStyle(wrap);
      const inset = ['borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'].reduce((total, property) => total + parseFloat(style[property]), 0);
      const contentHeight = Math.max(1, height - inset);
      const scale = mode === 'wide' ? Math.min(1, wrap.clientWidth / 1440) : 1;
      wrap.style.height = `${height}px`;
      wrap.style.setProperty('--preview-scale', scale);
      frame.style.height = `${contentHeight / scale}px`;
    };
    const setMode = value => {
      mode = value;
      const loaded = !!wrap.querySelector('iframe');
      wrap.classList.toggle('mobile', loaded && mode === 'mobile');
      wrap.classList.toggle('wide', loaded && mode === 'wide');
      controls.forEach(button => {
        const active = button.dataset.viewport === mode;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      resize();
    };
    controls.forEach(button => button.addEventListener('click', () => setMode(button.dataset.viewport)));
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    window.addEventListener('resize', resize);
    setMode(mode);
    return {
      refresh() { setMode(mode); },
      disconnect() { observer.disconnect(); window.removeEventListener('resize', resize); },
    };
  }
  window.DesignAtlasPreview = { mount };
})();
