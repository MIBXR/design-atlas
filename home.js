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

  const schemes = {
    paper: {alt: '现有实验室纸页方案，拾光笔记的暖色阅读界面', description: '纸页：暖纸底、衬线字与疏朗留白。'},
    friendly: {alt: '现有实验室亲和方案，拾光笔记的柔和配色与圆角界面', description: '亲和：柔和配色、清晰文字与圆角形状。'},
    tool: {alt: '现有实验室工具方案，拾光笔记的深色等宽界面', description: '工具：深色背景、等宽文字与紧凑信息。'}
  };
  const image = document.getElementById('home-lab-image');
  const status = document.getElementById('home-lab-status');
  let selected = 'paper';
  function imageFailed() {
    status.textContent = '方案截图暂时无法加载。可以直接进入实验室查看与调整。';
  }
  image.addEventListener('error', imageFailed);
  image.addEventListener('load', () => { status.textContent = schemes[selected].description; });
  if (image.complete && !image.naturalWidth) imageFailed();
  document.querySelectorAll('[data-home-scheme]').forEach(button => {
    button.addEventListener('click', () => {
      selected = button.dataset.homeScheme;
      if (!schemes[selected]) return;
      document.querySelectorAll('[data-home-scheme]').forEach(option => {
        option.setAttribute('aria-pressed', String(option === button));
      });
      image.alt = schemes[selected].alt;
      status.textContent = schemes[selected].description;
      image.src = `previews/landing/lab-${selected}.jpg`;
    });
  });

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
