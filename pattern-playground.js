(() => {
  'use strict';
  const labels = { visual: '视觉构成', 'micro-motion': '微动效', 'page-motion': '页面动效', sound: '声音反馈', structure: '内容与状态' };
  const examples = { visual: 'restrained-signal-color', 'micro-motion': 'state-shape-feedback', 'page-motion': 'directional-section-wipe', sound: 'sound-opt-in', structure: 'single-open-accordion' };
  const cleanups = new Map();
  const libraryUrl = new URL('patterns.html', document.currentScript.src).href;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function mount(root, options = {}) {
    cleanups.get(root)?.();
    const type = options.type || root.dataset.type || 'visual';
    const status = text => { root.querySelector('.pg-status').textContent = text; };
    const note = `<p class="pg-caption">本地机制示意 · <a href="${libraryUrl}#pattern/${examples[type]}">阅读对应巧思与来源</a></p>`;
    let body = '';
    if (type === 'visual') body = `<div class="pg-stage pg-visual"><span class="pg-eyebrow">A SMALL OBSERVATION</span><h3>让重点，<br><span class="pg-highlight">一眼可见。</span></h3><div class="pg-visual-card"><span class="pg-geometry" aria-hidden="true"></span><strong>今天的发现</strong><p>颜色标记重点，形状组织信息。</p></div></div><div class="pg-controls"><label>强调方式<select data-highlight><option value="color">强调色</option><option value="underline">下划线</option><option value="none">无强调</option></select></label><label>容器圆角 <output>16px</output><input data-radius type="range" min="0" max="32" value="16" aria-label="示意容器圆角"></label></div>`;
    if (type === 'micro-motion') body = `<div class="pg-stage pg-micro"><span class="pg-eyebrow">A RESPONSE TO YOUR ACTION</span><button class="pg-action" aria-pressed="false">选择这条灵感</button><p>悬停或聚焦，观察按钮浮起；离开后回落。</p></div><div class="pg-controls"><label>局部反馈<select data-feedback><option value="lift">浮起</option><option value="shape">形状变化</option></select></label><button data-enter>模拟进入</button><button data-leave>模拟离开</button></div>`;
    if (type === 'page-motion') body = `<div class="pg-stage pg-page"><div class="pg-chapter"><span class="pg-eyebrow">CHAPTER <b data-chapter>01</b></span><h3 data-chapter-title>看见设计。</h3><p data-chapter-text>先确定信息的主角。</p><span class="pg-chapter-art" aria-hidden="true"></span></div><div class="pg-wipe" aria-hidden="true"></div></div><div class="pg-controls"><button data-prev>← 上一章</button><button data-next>下一章 →</button><label>转场时长 <output>800ms</output><input data-duration type="range" min="240" max="1600" step="40" value="800" aria-label="示意转场时长"></label></div>`;
    if (type === 'sound') body = `<div class="pg-stage pg-sound"><span class="pg-eyebrow">SOUND FOLLOWS INTENT</span><div class="pg-sound-mark" aria-hidden="true">♪</div><h3>听见确认。</h3><p>操作短音补充反馈，文字始终说明结果。</p><button data-note>确认一次操作</button></div><div class="pg-controls"><button data-sound aria-pressed="false">启用示意声音</button><span>默认静音 · 合成短音 · 无配乐</span></div>`;
    if (type === 'structure') body = `<div class="pg-stage pg-structure"><span class="pg-eyebrow">ONE QUESTION AT A TIME</span><details open><summary>01 / 先明确任务</summary><p>为当前内容选择一个主要机制。</p></details><details><summary>02 / 再组合反馈</summary><p>让辅助机制服务于阅读和操作。</p></details><details><summary>03 / 最后核对边界</summary><p>检查来源、设备与实际可用的状态。</p></details></div>`;
    root.classList.add('pattern-playground');
    root.dataset.type = type;
    root.innerHTML = body + `<p class="pg-status" role="status">${labels[type]} · ${type === 'sound' ? '声音关闭' : '初始状态'}</p>` + note;
    let cleanup = () => {};
    if (type === 'visual') {
      root.style.setProperty('--pg-radius', '16px');
      root.querySelector('[data-highlight]').onchange = event => {
        root.querySelector('.pg-visual').dataset.highlight = event.target.value;
        status('强调方式已改变；观察阅读重点。');
      };
      root.querySelector('[data-radius]').oninput = event => {
        root.style.setProperty('--pg-radius', event.target.value + 'px');
        root.querySelector('output').textContent = event.target.value + 'px';
        status('容器圆角 ' + event.target.value + 'px；内容与位置保持一致。');
      };
    }
    if (type === 'micro-motion') {
      const action = root.querySelector('.pg-action');
      const activate = on => { action.classList.toggle('pg-active', on); status(on ? '反馈状态 · 局部变化说明可以操作。' : '返回初始位置 · 选择结果保留。'); };
      action.onpointerenter = action.onfocus = () => activate(true);
      action.onpointerleave = action.onblur = () => activate(false);
      root.querySelector('[data-enter]').onclick = () => activate(true);
      root.querySelector('[data-leave]').onclick = () => activate(false);
      action.onclick = () => { const selected = action.getAttribute('aria-pressed') !== 'true'; action.setAttribute('aria-pressed', String(selected)); status(selected ? '已选择这条灵感。' : '已取消选择。'); };
      root.querySelector('[data-feedback]').onchange = event => { root.querySelector('.pg-micro').dataset.feedback = event.target.value; activate(false); };
    }
    if (type === 'page-motion') {
      const chapters = [['看见设计。', '先确定信息的主角。'], ['理解机制。', '用转场解释内容的交接。'], ['组合你的页面。', '同一操作也能反向返回。']];
      const cover = root.querySelector('.pg-wipe');
      let target = 0, revision = 0, animation;
      const show = () => {
        root.querySelector('b[data-chapter]').textContent = String(target + 1).padStart(2, '0');
        root.querySelector('[data-chapter-title]').textContent = chapters[target][0];
        root.querySelector('[data-chapter-text]').textContent = chapters[target][1];
        root.querySelector('.pg-chapter').dataset.chapter = target;
      };
      async function change(direction) {
        target = (target + direction + chapters.length) % chapters.length;
        const current = ++revision;
        animation?.cancel();
        cover.style.transform = 'scaleX(0)';
        if (reduced()) { show(); status('第 ' + (target + 1) + ' 章 · 减少动态，直接交接。'); return; }
        cover.style.transformOrigin = direction > 0 ? 'left' : 'right';
        const duration = Number(root.querySelector('[data-duration]').value) / 2;
        status('遮罩进入 · 覆盖当前内容。');
        animation = cover.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
        await animation.finished.catch(() => {});
        if (current !== revision) return;
        cover.style.transform = 'scaleX(1)'; animation.cancel();
        show(); status('内容交接 · 遮罩退出。');
        cover.style.transformOrigin = direction > 0 ? 'right' : 'left';
        animation = cover.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
        await animation.finished.catch(() => {});
        if (current === revision) {
          cover.style.transform = 'scaleX(0)'; animation.cancel();
          status('第 ' + (target + 1) + ' 章 · 交接完成，可反向返回。');
        }
      }
      root.querySelector('[data-prev]').onclick = () => change(-1);
      root.querySelector('[data-next]').onclick = () => change(1);
      root.querySelector('[data-duration]').oninput = event => { root.querySelector('output').textContent = event.target.value + 'ms'; };
      cleanup = () => { revision++; animation?.cancel(); };
    }
    if (type === 'sound') {
      const toggle = root.querySelector('[data-sound]');
      let context, oscillator, gain, enabled = false;
      function stop() { oscillator?.stop(); oscillator = undefined; }
      function mute() { stop(); enabled = false; toggle.setAttribute('aria-pressed', 'false'); toggle.textContent = '启用示意声音'; status('声音关闭 · 文字反馈仍可用。'); context?.suspend(); }
      toggle.onclick = async () => {
        if (enabled) { mute(); return; }
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (!Audio) { status('此浏览器不支持示意声音，仍可使用文字反馈。'); return; }
        context ||= new Audio();
        try { await context.resume(); enabled = context.state === 'running'; }
        catch { status('声音未能启用，请继续使用文字反馈。'); return; }
        toggle.setAttribute('aria-pressed', String(enabled)); toggle.textContent = enabled ? '关闭示意声音' : '启用示意声音';
        status(enabled ? '声音已启用 · 点击确认播放短音。' : '声音未能启用。');
      };
      root.querySelector('[data-note]').onclick = () => {
        status(enabled ? '操作已确认 · 短音反馈。' : '操作已确认 · 当前静音。');
        if (!enabled) return;
        stop();
        oscillator = context.createOscillator(); gain = context.createGain();
        oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(660, context.currentTime);
        gain.gain.setValueAtTime(0, context.currentTime); gain.gain.linearRampToValueAtTime(.08, context.currentTime + .01); gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .12);
        oscillator.connect(gain); gain.connect(context.destination); oscillator.start();
        const note = oscillator, voiceGain = gain; note.onended = () => { note.disconnect(); voiceGain.disconnect(); if (oscillator === note) oscillator = undefined; }; note.stop(context.currentTime + .13);
      };
      const visibility = () => { if (document.hidden) mute(); };
      document.addEventListener('visibilitychange', visibility);
      cleanup = () => { stop(); context?.close(); document.removeEventListener('visibilitychange', visibility); };
    }
    if (type === 'structure') root.querySelectorAll('details').forEach(detail => detail.ontoggle = () => {
      if (!detail.open) return;
      root.querySelectorAll('details').forEach(other => { if (other !== detail) other.open = false; });
      status('当前展开：' + detail.querySelector('summary').textContent);
    });
    cleanups.set(root, cleanup);
  }
  function dispose(root) { cleanups.get(root)?.(); cleanups.delete(root); }
  function disposeDetached() { for (const root of cleanups.keys()) if (!root.isConnected) dispose(root); }
  window.DesignAtlasPlayground = { mount, dispose, disposeDetached, labels };
  const init = () => document.querySelectorAll('[data-pattern-playground]').forEach(root => mount(root));
  window.addEventListener('pagehide', () => { for (const root of cleanups.keys()) dispose(root); });
  window.addEventListener('pageshow', event => { if (event.persisted) document.querySelectorAll('[data-pattern-playground]').forEach(root => { if (!root.closest('[hidden]')) mount(root); }); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
