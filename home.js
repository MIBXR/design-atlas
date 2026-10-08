(() => {
  'use strict';
  const entries = window.DESIGN_ATLAS;
  if (Array.isArray(entries)) {
    const studies = entries.filter(entry => entry.implementation === 'reference-study').length;
    const counts = {all: entries.length, studies, classics: entries.length - studies};
    document.querySelectorAll('[data-home-count]').forEach(element => {
      element.textContent = String(counts[element.dataset.homeCount]);
    });
  }

  const labFrame = document.querySelector('.landing-lab-frame');
  if (labFrame) {
    window.addEventListener('message', event => {
      if (event.origin !== location.origin || event.source !== labFrame.contentWindow || event.data?.type !== 'design-atlas:lab-height') return;
      const height = event.data.height;
      if (typeof height !== 'number' || !Number.isFinite(height) || height <= 0) return;
      labFrame.style.height = `${Math.max(300, Math.min(2000, Math.ceil(height)))}px`;
    });
  }

  const prompt = document.getElementById('home-agent-prompt');
  const copyStatus = document.getElementById('home-copy-status');
  document.getElementById('home-copy-prompt').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(prompt.value);
      copyStatus.textContent = '调用示例已复制。安装 design-atlas skill 后，在 Agent 对话中使用。';
    } catch {
      prompt.focus();
      prompt.select();
      copyStatus.textContent = '示例已选中，请手动复制；随后在 Agent 对话中使用。';
    }
  });
})();
