(() => {
  'use strict';
  function mount(wrap, controls, initialMode = 'desktop', { scaleWide = true } = {}) {
    let mode = initialMode;
    const panel = wrap.closest('.demo-panel');
    const header = document.querySelector('.atlas-site-header');
    const actions = panel.closest('.detail-layout').parentElement.querySelector('.detail-top');
    const resize = () => {
      const frame = wrap.querySelector('iframe');
      if (!frame || !wrap.clientWidth) return;
      const controlsHeight = wrap.getBoundingClientRect().top - panel.getBoundingClientRect().top;
      const panelTop = header.getBoundingClientRect().height + actions.getBoundingClientRect().height + 24;
      const height = Math.max(1, window.innerHeight - panelTop - controlsHeight - 24);
      const style = getComputedStyle(wrap);
      const inset = ['borderTopWidth', 'borderBottomWidth', 'paddingTop', 'paddingBottom'].reduce((total, property) => total + parseFloat(style[property]), 0);
      const contentHeight = Math.max(1, height - inset);
      const scale = mode === 'wide' && scaleWide ? Math.min(1, (wrap.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)) / 1440) : 1;
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
    observer.observe(header);
    observer.observe(actions);
    observer.observe(panel.querySelector('.demo-toolbar'));
    window.addEventListener('resize', resize);
    setMode(mode);
    return {
      refresh() { setMode(mode); },
      disconnect() { observer.disconnect(); window.removeEventListener('resize', resize); },
    };
  }
  window.AtlasPreview = { mount };
})();
