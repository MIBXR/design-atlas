const UPSTREAM_COMMIT = '81fd4ece5d493ca6c424a2af41f0e2c361ec8258';
const imageUrl = new URL('reference.svg', import.meta.url).href;
const definitions = [
  {
    id: 'mesh-gradient', component: 'MeshGradient', title: '流动网格渐变', category: '背景 / 生成图层',
    description: '颜色锚点缓慢漂移，混合成柔和的有机色块。调整速度、点数与旋涡，比较同一配色的不同节奏。',
    hint: '调整参数，观察颜色如何流动', use: '适合首屏背景与品牌氛围；正文放在独立 HTML 层，保持对比度。',
    defaults: { colorA: '#183c64', colorB: '#b3f6dc', stops: null, speed: 0.6, count: 5, swirl: 0.3, smoothness: 2, drift: 0.5, wrapping: 0.15 },
    controls: [
      { prop: 'speed', label: '流动速度', min: 0, max: 2, step: 0.1 },
      { prop: 'count', label: '颜色点数', min: 2, max: 8, step: 1 },
      { prop: 'swirl', label: '旋涡方向', min: -1, max: 1, step: 0.05 },
      { prop: 'smoothness', label: '混合柔度', min: 0, max: 5, step: 0.1 },
      { prop: 'colorA', label: '颜色 A', type: 'color' },
      { prop: 'colorB', label: '颜色 B', type: 'color' },
    ],
  },
  {
    id: 'fluted-glass', component: 'FlutedGlass', title: '条纹玻璃折射', category: '材质 / 图层滤镜',
    description: '把原创几何图形作为输入，透过重复的圆柱玻璃条折射。条数、折射强度与光泽共同决定材质感。',
    hint: '拖动折射强度，比较图形与玻璃', use: '适合卡片封面与局部装饰；避免让阅读文本经过强折射。',
    defaults: { frequency: 10, refraction: 1.5, angle: 0, highlight: 0.35, aberration: 0.2, softness: 0.5, speed: 0 },
    controls: [
      { prop: 'frequency', label: '玻璃条数', min: 1, max: 20, step: 1 },
      { prop: 'refraction', label: '折射强度', min: 0, max: 4, step: 0.1 },
      { prop: 'angle', label: '条纹方向', min: 0, max: 180, step: 1, unit: '°' },
      { prop: 'highlight', label: '高光强度', min: 0, max: 2, step: 0.05 },
    ],
  },
  {
    id: 'cursor-ripples', component: 'CursorRipples', title: '指针与触摸波纹', category: '交互 / 图层滤镜',
    description: '移动指针或在画面内触摸拖动，输入图形会产生水面般的折射波纹。波纹随时间衰减，响应移动速度。',
    hint: '在画面内移动指针或触摸拖动', use: '适合可探索的展示区域；保留普通控件与触摸滚动路径，不把波纹作为必要操作。',
    defaults: { intensity: 10, decay: 10, radius: 0.5, chromaticSplit: 1, edges: 'stretch' },
    controls: [
      { prop: 'intensity', label: '波纹强度', min: 0, max: 20, step: 0.5 },
      { prop: 'decay', label: '衰减速度', min: 0, max: 20, step: 0.5 },
      { prop: 'radius', label: '影响半径', min: 0.1, max: 1, step: 0.05 },
      { prop: 'chromaticSplit', label: '边缘色散', min: 0, max: 3, step: 0.1 },
    ],
  },
  {
    id: 'noise-dissolve', component: 'NoiseDissolve', title: '噪声溶解转场', category: '转场 / 图层滤镜',
    description: '用固定的有机噪声分布控制图层显隐。手动拖动进度观察起始、过程与完成，再反向拖动查看回程。',
    hint: '进度 0 为完整图形，1 为全部消失', use: '适合封面切换与局部揭示；这里的进度由滑块控制，可在项目中接入实际状态。',
    defaults: { progress: 0.35, scale: 3, softness: 0.25, seed: 4, invert: false },
    controls: [
      { prop: 'progress', label: '溶解进度', min: 0, max: 1, step: 0.01 },
      { prop: 'scale', label: '噪声密度', min: 0.5, max: 20, step: 0.5 },
      { prop: 'softness', label: '边缘柔度', min: 0, max: 1, step: 0.05 },
    ],
  },
];
const $ = (id) => document.getElementById(id);
const stage = $('stage');
const canvas = $('shader-canvas');
const tabs = [...document.querySelectorAll('[data-effect]')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const themeMedia = matchMedia('(prefers-color-scheme: dark)');
const query = new URLSearchParams(location.search);
let active = definitions[0];
let props = { ...active.defaults };
let shader = null;
let runtimePromise;
let mountQueue = Promise.resolve();
let generation = 0;
let ready = false;
let userPaused = reducedMotion.matches;
let redrawGeneration = 0;

function applyTheme() {
  let theme = query.get('theme');
  if (theme !== 'light' && theme !== 'dark') {
    try {
      theme = window.parent !== window ? window.parent.document.documentElement.dataset.atlasTheme : localStorage.getItem('atlas-color-scheme');
    } catch {
      theme = null;
    }
  }
  document.documentElement.dataset.theme = theme === 'light' || theme === 'dark' ? theme : themeMedia.matches ? 'dark' : 'light';
}
applyTheme();
themeMedia.addEventListener('change', applyTheme);
window.addEventListener('storage', applyTheme);
if (window.parent !== window) {
  try {
    new MutationObserver(applyTheme).observe(window.parent.document.documentElement, { attributes: true, attributeFilter: ['data-atlas-theme'] });
  } catch {
    // A cross-origin embed follows the URL theme or the local system preference.
  }
}

function preset(reference = imageUrl) {
  const effect = { type: active.component, id: 'effect', props: { ...props } };
  if (active.id !== 'mesh-gradient') effect.children = [{ type: 'ImageTexture', props: { url: reference, objectFit: 'cover' } }];
  return { components: active.id === 'noise-dissolve' ? [{ type: 'SolidColor', props: { color: '#102533' } }, effect] : [effect] };
}

function refreshExample() {
  $('example-code').textContent = `import { createShader } from 'shaders/js';\n\nconst canvas = document.querySelector('canvas');\ncanvas.style.width = '100%';\ncanvas.style.height = '400px';\n\nconst shader = await createShader(canvas, ${JSON.stringify(preset('./reference.svg'), null, 2)}, { disableTelemetry: true });\n\nshader.update('effect', ${JSON.stringify({ [active.controls[0].prop]: props[active.controls[0].prop] })});`;
}

function syncPlayback() {
  $('toggle-play').disabled = !shader || !ready;
  $('toggle-play').textContent = userPaused ? '开始演示' : '暂停演示';
  if (!shader || !ready) return;
  if (userPaused || document.hidden) shader.pause(); else shader.resume();
  $('render-status').textContent = document.hidden ? 'WebGPU 已就绪；页面在后台，演示已暂停。' : userPaused ? 'WebGPU 已就绪；演示已暂停。调整参数会更新静止画面。' : 'WebGPU 实时渲染 · 使用本地固定版本组件。';
}

function redrawIfPaused() {
  if (!shader || !ready || !userPaused || document.hidden) return;
  const current = shader;
  const frame = ++redrawGeneration;
  current.resume();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (shader === current && frame === redrawGeneration && userPaused) current.pause();
  }));
}

function showFallback(reason) {
  ready = false;
  stage.dataset.mode = 'fallback';
  $('toggle-play').disabled = true;
  const why = reason === 'unsupported' ? '当前浏览器未提供 WebGPU' : reason === 'no-adapter' || reason === 'no-device' ? '当前环境未提供可用的 WebGPU 设备' : 'WebGPU 效果未能启动';
  $('render-status').textContent = `静态参考 · ${why}。图像用于查看配色与输入构成，参数不会产生 GPU 效果。`;
}

function renderControls() {
  $('parameters').replaceChildren();
  for (const control of active.controls) {
    const wrapper = document.createElement('div');
    wrapper.className = 'parameter';
    const line = document.createElement('div');
    line.className = 'parameter-line';
    const label = document.createElement('label');
    label.htmlFor = `parameter-${control.prop}`;
    label.textContent = control.label;
    const output = document.createElement('output');
    output.htmlFor = label.htmlFor;
    const format = (value) => control.type === 'color' ? value.toUpperCase() : `${Number(value).toFixed(control.step < 0.1 ? 2 : control.step < 1 ? 1 : 0)}${control.unit || ''}`;
    output.textContent = format(props[control.prop]);
    const input = document.createElement('input');
    input.id = label.htmlFor;
    input.type = control.type || 'range';
    if (input.type === 'range') {
      input.min = control.min;
      input.max = control.max;
      input.step = control.step;
    }
    input.value = props[control.prop];
    input.addEventListener('input', () => {
      props[control.prop] = input.type === 'color' ? input.value : Number(input.value);
      output.textContent = format(props[control.prop]);
      shader?.update('effect', { [control.prop]: props[control.prop] });
      redrawIfPaused();
      refreshExample();
    });
    line.append(label, output);
    wrapper.append(line, input);
    $('parameters').append(wrapper);
  }
}

function selectEffect(id) {
  active = definitions.find((definition) => definition.id === id || definition.component === id) || definitions[0];
  props = { ...active.defaults };
  shader?.destroy();
  shader = null;
  ready = false;
  const token = ++generation;
  stage.dataset.effect = active.id;
  stage.dataset.mode = 'loading';
  canvas.setAttribute('aria-label', `${active.title}，真实 Shaders 组件演示`);
  $('component-name').textContent = active.component;
  $('stage-hint').textContent = active.hint;
  $('effect-title').textContent = active.title;
  $('effect-category').textContent = active.category;
  $('effect-description').textContent = active.description;
  $('effect-use').textContent = active.use;
  $('component-source').href = `https://github.com/shader-effects-inc/shaders/blob/${UPSTREAM_COMMIT}/packages/core/src/shaders/${active.component}/index.ts`;
  $('effect-panel').setAttribute('aria-labelledby', `tab-${active.id}`);
  for (const tab of tabs) {
    const selected = tab.dataset.effect === active.id;
    tab.setAttribute('aria-selected', selected);
    tab.tabIndex = selected ? 0 : -1;
  }
  renderControls();
  refreshExample();
  syncPlayback();
  $('render-status').textContent = '正在准备真实 WebGPU 效果；当前画面为静态参考。';
  const effectPreset = preset();
  mountQueue = mountQueue.then(async () => {
    if (token !== generation) return;
    if (!navigator.gpu) { showFallback('unsupported'); return; }
    try {
      runtimePromise ||= import('./vendor/shaders-4.0.4.js');
      const runtime = await runtimePromise;
      if (token !== generation) return;
      const support = await runtime.getWebGPUSupport();
      if (token !== generation) return;
      if (!support.supported) { showFallback(support.reason); return; }
      const instance = await runtime.createShader(canvas, effectPreset, {
        disableTelemetry: true,
        onReady() {
          if (token !== generation) return;
          ready = true;
          stage.dataset.mode = 'gpu';
          syncPlayback();
        },
        onError(reason) {
          if (token === generation) showFallback(reason);
        },
      });
      if (token !== generation) { instance.destroy(); return; }
      shader = instance;
      shader.update('effect', props);
      if (instance.getFailureReason()) showFallback(instance.getFailureReason()); else syncPlayback();
    } catch {
      if (token === generation) showFallback('init-failed');
    }
  });
}

for (const tab of tabs) {
  tab.addEventListener('click', () => selectEffect(tab.dataset.effect));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = tabs.indexOf(tab);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    selectEffect(tabs[next].dataset.effect);
  });
}
$('toggle-play').addEventListener('click', () => { userPaused = !userPaused; syncPlayback(); });
$('reset').addEventListener('click', () => selectEffect(active.id));
document.addEventListener('visibilitychange', syncPlayback);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) userPaused = true; syncPlayback(); });
window.addEventListener('pagehide', () => { ++generation; shader?.destroy(); shader = null; });

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    $('copy-status').textContent = '已复制';
  } catch {
    $('example-code').textContent = text;
    const range = document.createRange();
    range.selectNodeContents($('example-code'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    $('copy-status').textContent = '已选中文字，可手动复制';
  }
}
$('copy-example').addEventListener('click', () => { refreshExample(); copyText($('example-code').textContent); });
$('copy-install').addEventListener('click', () => copyText('npm install shaders@4.0.4'));
selectEffect(query.get('effect'));
