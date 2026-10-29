const presets = {
  interface: { title:'界面标题', kicker:'PRODUCT / UI TYPOGRAPHY', use:'比例字宽、直立字形与中粗字重，为产品界面建立清晰层级。', text:'Make room for\nbetter ideas.', size:48, axes:{MONO:0,CASL:0,wght:650,slnt:0,CRSV:0.5} },
  code: { title:'等宽代码', kicker:'MONO / CODE & DATA', use:'MONO 1 固定拉丁字形宽度，适合代码、终端与数据。这里仅演示字体，不提供编辑器或语法解析。', text:'const palette = {\n  forest: "#245b45",\n  paper:  "#f5f5f1"\n};\n\n0123456789  Aa ag', size:19, axes:{MONO:1,CASL:0,wght:450,slnt:0,CRSV:0} },
  poster: { title:'个性海报', kicker:'CASUAL / EDITORIAL DISPLAY', use:'使用 Casual、重字重和草写字形制作拉丁标题。大字号优先使用 CASL 和 slnt 的端点，避免小字堆叠重字重。', text:'Stay\ncurious.', size:72, axes:{MONO:0,CASL:1,wght:900,slnt:-15,CRSV:1} },
};
const $ = id => document.getElementById(id);
const tabs = [...document.querySelectorAll('[data-preset][role="tab"]')];
const query = new URLSearchParams(location.search);
const themeMedia = matchMedia('(prefers-color-scheme: dark)');
let active = 'interface';
let fontLoaded = false;
let fontFailed = false;
const supportsVariations = CSS.supports('font-variation-settings', '"MONO" 1');

function applyTheme() {
  let theme = query.get('theme');
  if (theme !== 'light' && theme !== 'dark') {
    try { theme = window.parent !== window ? window.parent.document.documentElement.dataset.atlasTheme : localStorage.getItem('atlas-color-scheme'); }
    catch { theme = null; }
  }
  document.documentElement.dataset.theme = theme === 'light' || theme === 'dark' ? theme : themeMedia.matches ? 'dark' : 'light';
}
applyTheme();
themeMedia.addEventListener('change', applyTheme);
window.addEventListener('storage', applyTheme);
if (window.parent !== window) {
  try { new MutationObserver(applyTheme).observe(window.parent.document.documentElement, {attributes:true,attributeFilter:['data-atlas-theme']}); }
  catch { /* Cross-origin embeds use the URL theme or system preference. */ }
}

function render() {
  const settings = Object.keys(presets[active].axes).map(axis => {
    const value = Number($(`axis-${axis}`).value);
    if ($(`value-${axis}`)) $(`value-${axis}`).textContent = value;
    return `"${axis}" ${value}`;
  }).join(', ');
  const size = Number($('font-size').value);
  $('size-value').textContent = `${size}px`;
  $('specimen').style.fontVariationSettings = settings;
  $('specimen').style.fontSize = `${size}px`;
  $('specimen').textContent = $('sample-text').value;
  $('stage').dataset.fallback = String($('fallback').checked || !supportsVariations || fontFailed);
  $('font-status').textContent = $('fallback').checked ? '模拟后备 · 当前使用系统字体，自定义轴不生效；取消勾选恢复。' : !supportsVariations ? '系统后备 · 浏览器不支持可变字体设置；保留试排文字。' : fontFailed ? '系统后备 · Recursive 字体加载失败；请检查字体文件与网络。' : fontLoaded ? 'Recursive v1.085 已加载 · 五轴作用于字体覆盖的字形。' : '字体加载中；当前使用系统后备。';
  $('example-code').textContent = `@font-face {\n  font-family: "Recursive";\n  src: url("./fonts/Recursive_VF_1.085.woff2") format("woff2");\n  font-weight: 300 1000;\n  font-style: normal;\n  font-display: swap;\n}\n\n.specimen {\n  font-family: "Recursive", "Microsoft YaHei", ${active === 'code' ? 'monospace' : 'sans-serif'};\n  font-synthesis: none;\n  font-size: ${size}px;\n  font-variation-settings: ${settings};\n  line-height: ${active === 'code' ? '1.6' : '1.15'};\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}`;
}

function selectPreset(id) {
  active = Object.hasOwn(presets, id) ? id : 'interface';
  const preset = presets[active];
  $('stage').dataset.preset = active;
  $('specimen-panel').setAttribute('aria-labelledby', `tab-${active}`);
  $('preset-title').textContent = preset.title;
  $('preset-use').textContent = preset.use;
  $('specimen-kicker').textContent = preset.kicker;
  $('sample-text').value = preset.text;
  $('font-size').value = preset.size;
  for (const [axis, value] of Object.entries(preset.axes)) $(`axis-${axis}`).value = value;
  for (const tab of tabs) { const selected = tab.dataset.preset === active; tab.setAttribute('aria-selected', selected); tab.tabIndex = selected ? 0 : -1; }
  $('copy-status').textContent = '';
  render();
}
for (const tab of tabs) {
  tab.addEventListener('click', () => selectPreset(tab.dataset.preset));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const index = tabs.indexOf(tab);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    selectPreset(tabs[next].dataset.preset);
  });
}
for (const control of document.querySelectorAll('input,select,textarea')) control.addEventListener('input', render);
$('reset').addEventListener('click', () => selectPreset(active));
$('copy-css').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('example-code').textContent); $('copy-status').textContent = '已复制 CSS'; }
  catch {
    const range = document.createRange();
    range.selectNodeContents($('example-code'));
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(range);
    $('copy-status').textContent = '已选中代码，可手动复制';
  }
});
selectPreset(query.get('preset'));
document.fonts.load('16px Recursive').then(fonts => { fontLoaded = fonts.length > 0; fontFailed = !fontLoaded; render(); }).catch(() => { fontFailed = true; render(); });
