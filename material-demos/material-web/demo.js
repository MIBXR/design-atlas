const $ = id => document.getElementById(id);
const query = new URLSearchParams(location.search);
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let ready = false;
let active = 'actions';
const snippets = {
  actions: `<md-filled-button type="button">加入计划</md-filled-button>\n<md-outlined-button type="button">查看安排</md-outlined-button>\n<md-text-button type="button">重置</md-text-button>`,
  form: `<form novalidate>\n  <md-outlined-text-field label="电子邮箱" type="email" required>\n  </md-outlined-text-field>\n  <md-filled-button type="submit">检查资料</md-filled-button>\n</form>\n// 用 checkValidity() 判断，error / errorText 呈现业务错误。\n// 校验通过后再接入自己的提交逻辑。`,
  preferences: `<md-switch aria-label="显示完成标记" selected icons></md-switch>\n<md-slider aria-label="每日目标" min="1" max="8"\n  step="1" value="4" ticks labeled></md-slider>\n// switch: change → selected；slider: input → value。`,
  dialog: `<md-dialog type="alert">\n  <div slot="headline">归档这个计划？</div>\n  <div slot="content">说明影响与恢复方式。</div>\n  <div slot="actions">…</div>\n</md-dialog>\nawait dialog.show();\nawait dialog.close('archive');\n// 减少动态时设置 dialog.quick = true。`,
};

function applyTheme() {
  let theme = $('theme').value;
  if (theme === 'auto') {
    theme = query.get('theme');
    try { theme ||= parent !== window ? parent.document.documentElement.dataset.atlasTheme : localStorage.getItem('atlas-color-scheme'); }
    catch { theme = null; }
  }
  document.documentElement.dataset.theme = ['light', 'dark'].includes(theme) ? theme : systemDark.matches ? 'dark' : 'light';
  document.documentElement.dataset.palette = $('palette').value;
}
applyTheme();
$('theme').addEventListener('change', applyTheme);
$('palette').addEventListener('change', applyTheme);
systemDark.addEventListener('change', applyTheme);
window.addEventListener('storage', applyTheme);
if (parent !== window) {
  try { new MutationObserver(applyTheme).observe(parent.document.documentElement, { attributes:true, attributeFilter:['data-atlas-theme'] }); }
  catch { /* Cross-origin embeds use their URL or system theme. */ }
}
$('shape').addEventListener('input', () => {
  document.documentElement.style.setProperty('--shape', `${$('shape').value}px`);
  $('shape-value').textContent = `${$('shape').value}px`;
});

function showSample(id) {
  active = Object.hasOwn(snippets, id) ? id : 'actions';
  document.querySelectorAll('[data-sample]').forEach(button => button.setAttribute('aria-pressed', button.dataset.sample === active));
  document.querySelectorAll('[data-panel]').forEach(panel => panel.hidden = panel.dataset.panel !== active);
  $('example-code').textContent = `import './vendor/material-web.js';\n\n${snippets[active]}`;
}
document.querySelectorAll('[data-sample]').forEach(button => button.addEventListener('click', () => showSample(button.dataset.sample)));
showSample(query.get('sample'));

function shadowRoots(root = document) {
  return [...root.querySelectorAll('*')].flatMap(element => element.shadowRoot ? [element.shadowRoot, ...shadowRoots(element.shadowRoot)] : []);
}
function applyMotion() {
  const reduce = $('reduce-motion').checked || reducedMotion.matches || document.hidden;
  $('archive-dialog').quick = reduce;
  for (const root of shadowRoots()) {
    let style = root.querySelector('style[data-atlas-motion]');
    if (!style) { style = document.createElement('style'); style.dataset.atlasMotion = ''; root.append(style); }
    style.textContent = (root.host.localName === 'md-slider' ? '.label{transition:none!important}' : '') + (reduce ? '*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important}' : '');
    for (const ripple of root.querySelectorAll('md-ripple')) ripple.disabled = reduce;
    if (reduce) for (const animation of root.getAnimations()) animation.finish();
  }
}
$('reduce-motion').checked = reducedMotion.matches;
$('reduce-motion').addEventListener('change', applyMotion);
reducedMotion.addEventListener('change', () => { $('reduce-motion').checked = reducedMotion.matches; applyMotion(); });
document.addEventListener('visibilitychange', applyMotion);

function updateGoals() {
  const count = Number($('goal').value);
  const complete = $('completion').selected;
  $('goal-value').textContent = `${count} 项`;
  $('goal-preview').innerHTML = Array.from({length:count}, (_, i) => `<div class="goal-item">${complete ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>' : ''}<span>目标 ${i + 1}</span></div>`).join('');
  $('preference-feedback').textContent = `${count} 项目标，${complete ? '显示' : '隐藏'}完成标记。`;
}
function resetSample() {
  if (!ready) return;
  if (active === 'actions') { $('save-plan').disabled = false; $('action-feedback').textContent = '选择一个操作，观察层级与状态反馈。'; }
  if (active === 'form') { $('signup').reset(); }
  if (active === 'preferences') { $('goal').value = 4; $('completion').selected = true; updateGoals(); }
  if (active === 'dialog') { $('archive-state').textContent = '进行中'; $('dialog-feedback').textContent = '计划仍在进行中。'; }
}
$('reset').addEventListener('click', resetSample);

try {
  await import('./vendor/material-web.js');
  await Promise.all([...document.querySelectorAll('*')].filter(element => element.localName.startsWith('md-')).map(element => element.updateComplete));
  ready = true;
  $('fallback').hidden = true;
  $('live-demo').hidden = false;
  $('runtime-status').textContent = '官方组件已加载 · 本地运行';
  $('save-plan').addEventListener('click', () => { $('save-plan').disabled = true; $('action-feedback').textContent = '已加入本地示例计划。主要操作禁用，避免重复添加；点击重置可恢复。'; });
  $('preview-plan').addEventListener('click', () => { $('action-feedback').textContent = '10:00 街区漫步 → 14:00 速写 → 17:00 整理笔记。仅为本地示例安排。'; });
  $('clear-plan').addEventListener('click', resetSample);
  $('signup').addEventListener('submit', event => {
    event.preventDefault();
    const fields = [$('display-name'), $('email')];
    fields.forEach(field => { field.error = !field.checkValidity(); field.errorText = field.id === 'email' ? '请输入有效邮箱，例如 hello@example.com' : '请填写显示名称（最多 24 个字符）'; });
    const invalid = fields.find(field => field.error);
    $('form-feedback').textContent = invalid ? '资料还不完整，请按字段提示修正。' : '资料格式检查通过。没有发送或保存任何输入。';
    invalid?.focus();
  });
  $('signup').addEventListener('reset', () => { [$('display-name'), $('email')].forEach(field => { field.error = false; field.errorText = ''; }); $('form-feedback').textContent = '可以先留空提交，再填写有效邮箱比较状态。'; });
  $('goal').addEventListener('input', updateGoals);
  $('completion').addEventListener('change', updateGoals);
  $('open-dialog').addEventListener('click', () => { $('open-dialog').disabled = true; $('archive-dialog').returnValue = ''; $('archive-dialog').show(); });
  $('cancel-dialog').addEventListener('click', () => $('archive-dialog').close('cancel'));
  $('confirm-dialog').addEventListener('click', () => $('archive-dialog').close('archive'));
  $('archive-dialog').addEventListener('closed', async () => {
    const archived = $('archive-dialog').returnValue === 'archive';
    if (archived) $('archive-state').textContent = '已归档';
    $('dialog-feedback').textContent = archived ? '本地示例已归档，可点击恢复计划撤回。' : '已取消归档，计划状态保持不变。';
    $('open-dialog').disabled = false;
    await $('open-dialog').updateComplete;
    $('open-dialog').focus();
  });
  $('restore-plan').addEventListener('click', resetSample);
  updateGoals();
  await Promise.all(shadowRoots().flatMap(root => [...root.querySelectorAll('*')]).filter(element => element.updateComplete).map(element => element.updateComplete));
  applyMotion();
} catch (error) {
  $('fallback').hidden = false;
  $('live-demo').hidden = true;
  $('runtime-status').textContent = '静态后备 · 真实组件未运行';
  $('reset').disabled = true;
  $('fallback-message').textContent = '组件加载失败或浏览器能力不足。这份静态结构说明不代表实际组件运行；请通过 HTTP/HTTPS 打开完整素材包，或查看官方文档。';
  console.error('Material Web demo could not start:', error);
}
