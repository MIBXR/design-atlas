(() => {
  'use strict';
  const patterns = window.DESIGN_PATTERNS || [];
  const entries = window.DESIGN_ATLAS || [];
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const categories = [...new Set(patterns.map(pattern => pattern.category))];
  const sourceEntries = entries.filter(entry => patterns.some(pattern => pattern.sources.some(source => source.caseId === entry.id)));
  const evidenceLabels = { observed: '实访观察', adapted: '练习适配', inferred: '设计推断' };
  const roleLabels = { foundation: '主要结构', support: '辅助机制', accent: '局部强调' };
  let state = { query: '', category: 'all', source: 'all' };
  let notify = () => {};
  let onStateChange = () => {};

  const items = values => values?.length ? `<ul>${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>` : '<p class="pattern-muted">暂无单独记录；请结合来源案例确认。</p>';
  const patternHref = id => `#pattern/${encodeURIComponent(id)}${stateQuery()}`;
  const caseTitle = id => entries.find(entry => entry.id === id)?.title || id;
  const caseHref = id => `#style/${encodeURIComponent(id)}`;
  function stateQuery() {
    const params = new URLSearchParams();
    if (state.query) params.set('q', state.query);
    if (state.category !== 'all') params.set('category', state.category);
    if (state.source !== 'all') params.set('source', state.source);
    return params.size ? `?${params}` : '';
  }
  function readState(params) {
    state = {
      query: (params.get('q') || '').trim(),
      category: categories.includes(params.get('category')) ? params.get('category') : 'all',
      source: sourceEntries.some(entry => entry.id === params.get('source')) ? params.get('source') : 'all',
    };
  }
  function sourceLinks(pattern) {
    return [...new Set(pattern.sources.map(source => source.caseId))].map(id => `<a class="pattern-source-link" href="${caseHref(id)}">查看来源案例 · ${esc(caseTitle(id))} <span aria-hidden="true">↗</span></a>`).join('');
  }
  function combinationItems(values) {
    return values?.length ? `<ul>${values.map(value => {
      const pattern = patterns.find(item => item.id === value);
      return `<li>${pattern ? `<a href="${patternHref(pattern.id)}">${esc(pattern.title)}</a>` : esc(value)}</li>`;
    }).join('')}</ul>` : '<p class="pattern-muted">根据当前页面的层级与动态预算判断。</p>';
  }
  function safeReference(href) {
    try { const url = new URL(href, location.href); return /^https?:$/.test(url.protocol) ? url.href : ''; } catch { return ''; }
  }
  function renderCards() {
    const terms = state.query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const results = patterns.filter(pattern => (state.category === 'all' || pattern.category === state.category)
      && (state.source === 'all' || pattern.sources.some(source => source.caseId === state.source))
      && terms.every(term => [pattern.title, pattern.category, pattern.summary, pattern.mechanism, pattern.trigger, pattern.effect,
        ...pattern.useCases, ...pattern.constraints, ...pattern.sources.map(source => caseTitle(source.caseId))].join(' ').toLocaleLowerCase().includes(term)));
    $('#pattern-cards').innerHTML = results.map(pattern => `<article class="pattern-card"><div class="pattern-card-top"><span class="eyebrow">${esc(pattern.category)}</span><span class="pattern-role">${esc(roleLabels[pattern.composition?.role] || '可复用机制')}</span></div><h2><a href="${patternHref(pattern.id)}">${esc(pattern.title)}</a></h2><p class="pattern-card-summary">${esc(pattern.summary)}</p><dl class="pattern-card-mechanism"><div><dt>触发</dt><dd>${esc(pattern.trigger)}</dd></div><div><dt>效果</dt><dd>${esc(pattern.effect)}</dd></div></dl><div class="tags">${pattern.useCases.slice(0, 2).map(value => `<span class="tag">${esc(value)}</span>`).join('')}</div><div class="pattern-card-bottom"><a class="pattern-detail-link" href="${patternHref(pattern.id)}">查看机制与复用方法 <span aria-hidden="true">→</span></a><div class="pattern-source-links">${sourceLinks(pattern)}</div></div></article>`).join('');
    $('#pattern-results-label').textContent = `${state.category === 'all' ? '全部设计巧思' : state.category} / ${results.length} 个机制${state.source !== 'all' ? ' · ' + caseTitle(state.source) : ''}${state.query ? ' · ' + state.query : ''}`;
    $('#patterns-empty').hidden = !!results.length;
    updateNavigation(true);
  }
  function updateNavigation(active) {
    document.querySelectorAll('#pattern-navigation a').forEach(link => {
      const isCurrent = active && (link.dataset.patternCategory || 'all') === state.category;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
    });
    if (active) document.querySelectorAll('[data-filter]').forEach(button => {
      button.classList.remove('active'); button.setAttribute('aria-pressed', 'false');
    });
  }
  function writeState({ replace = false } = {}) {
    const url = new URL(location.href);
    url.hash = `patterns${stateQuery()}`;
    history[replace ? 'replaceState' : 'pushState'](null, '', url);
    renderCards();
    onStateChange();
  }
  function renderDetail(pattern) {
    const evidence = pattern.sources.map(source => {
      const reference = safeReference(source.referenceUrl);
      return `<article class="pattern-evidence"><div><span class="source-badge">${esc(evidenceLabels[source.evidence] || source.evidence)}</span><a href="${caseHref(source.caseId)}">${esc(caseTitle(source.caseId))}</a></div><p>${esc(source.observation)}</p><p class="pattern-muted">取材位置：${esc(source.locator)}${source.capturedAt ? ' · 采集 / 核验：' + esc(source.capturedAt) : ''}</p>${reference ? `<a href="${esc(reference)}" target="_blank" rel="noopener noreferrer">对照原始参考 <span aria-hidden="true">↗</span></a>` : ''}</article>`;
    }).join('');
    $('#pattern-detail').innerHTML = `<div class="detail-top"><a class="back" href="#patterns${stateQuery()}">返回设计巧思</a><div><a class="copy-button" href="agent/patterns/${encodeURIComponent(pattern.id)}.json" download="${esc(pattern.id)}-pattern.json">下载 Agent 巧思包</a><button class="primary-button" id="copy-pattern-prompt">复制复用 Prompt</button></div></div><div class="detail-title pattern-title"><div><p class="eyebrow">DESIGN PATTERN / ${esc(pattern.category)} / ${esc(roleLabels[pattern.composition?.role] || '可复用机制')}</p><h1>${esc(pattern.title)}</h1><p>${esc(pattern.summary)}</p></div></div><div class="pattern-detail-layout"><div class="pattern-notes"><section><h2>01 / 机制、触发与效果</h2><p>${esc(pattern.mechanism)}</p><dl class="pattern-mechanism"><div><dt>触发条件</dt><dd>${esc(pattern.trigger)}</dd></div><div><dt>设计效果</dt><dd>${esc(pattern.effect)}</dd></div></dl></section><section><h2>02 / 迁移到你的页面</h2><h3>适合</h3>${items(pattern.useCases)}<h3>谨慎使用</h3>${items(pattern.avoid)}<h3>实现约束</h3>${items(pattern.constraints)}</section><section><h2>03 / 可调参数</h2>${pattern.parameters?.length ? `<div class="pattern-parameter-scroll"><table class="pattern-parameters"><caption>取材基线与适配提示</caption><thead><tr><th scope="col">参数</th><th scope="col">参考值</th><th scope="col">适配提示</th></tr></thead><tbody>${pattern.parameters.map(parameter => `<tr><th scope="row">${esc(parameter.name)}</th><td>${esc(parameter.value)}</td><td>${esc(parameter.note)}</td></tr>`).join('')}</tbody></table></div>` : '<p>按内容和目标设备调节；当前条目未记录独立参数。</p>'}</section><section><h2>04 / 键盘与减少动态</h2><h3>键盘操作</h3><p>${esc(pattern.accessibility?.keyboard)}</p><h3>减少动态</h3><p>${esc(pattern.accessibility?.reducedMotion)}</p></section><section><h2>05 / 复用 Prompt</h2><p>把你的内容、技术栈和页面目标代入这段 Prompt，再按来源案例验证效果。</p><textarea id="pattern-prompt" class="prompt-box" aria-label="设计巧思复用 Prompt" readonly>${esc(pattern.prompt)}</textarea></section><section><h2>06 / 来源与证据</h2><p>观察、练习适配与设计推断分别标记。来源案例保留该机制与其他元素共同出现的完整上下文。</p>${evidence}</section></div><aside class="pattern-context"><section><h2>在完整案例中查看</h2><div class="pattern-source-links">${sourceLinks(pattern)}</div><p>进入案例后，可操作完整 demo，并对照来源资料与实现范围。</p></section><section><h2>组合建议</h2><p class="pattern-role">${esc(roleLabels[pattern.composition?.role] || '可复用机制')}</p><p>${esc(pattern.composition?.notes)}</p><h3>可搭配</h3>${combinationItems(pattern.composition?.pairsWellWith)}<h3>冲突与取舍</h3>${combinationItems(pattern.composition?.conflicts)}</section><section><h2>复用顺序</h2><ol><li>确定这个机制解决的具体问题。</li><li>在来源案例中验证触发和视觉效果。</li><li>先实现主要结构，再加入辅助反馈。</li><li>检查内容密度、键盘与减少动态。</li></ol></section></aside></div>`;
    $('#copy-pattern-prompt').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(pattern.prompt); notify('设计巧思 Prompt 已复制。'); }
      catch { const area = $('#pattern-prompt'); area.focus(); area.select(); notify('已选中 Prompt，请按 Ctrl+C 复制。'); }
    });
  }
  function renderRoute() {
    const [rawPath, rawQuery = ''] = location.hash.slice(1).split('?');
    let path;
    try { path = decodeURIComponent(rawPath); } catch { return false; }
    if (path !== 'patterns' && !path.startsWith('pattern/')) { updateNavigation(false); return false; }
    readState(new URLSearchParams(rawQuery));
    updateNavigation(true);
    if (path === 'patterns') {
      $('#patterns-library').hidden = false;
      $('#pattern-search').value = state.query;
      $('#pattern-category').value = state.category;
      $('#pattern-source').value = state.source;
      renderCards();
    } else {
      const pattern = patterns.find(item => item.id === path.slice(8));
      $('#pattern-detail').hidden = false;
      if (pattern) renderDetail(pattern);
      else $('#pattern-detail').innerHTML = `<div class="detail-top"><a class="back" href="#patterns${stateQuery()}">返回设计巧思</a></div><h1>没有找到这个设计巧思</h1><p>这个链接可能来自另一个归档版本。请回到巧思库重新选择。</p>`;
    }
    return true;
  }
  function caseLinks(id) {
    const related = patterns.filter(pattern => pattern.sources.some(source => source.caseId === id));
    if (!related.length) return '';
    return `<section class="case-patterns" aria-labelledby="case-patterns-heading"><div class="prompt-head"><h2 id="case-patterns-heading">这个案例的设计巧思</h2><a href="#patterns?source=${encodeURIComponent(id)}">按来源浏览全部 ${related.length} 项</a></div><p>这些机制可以独立借用；查看每项的触发、约束与组合建议。</p><ul>${related.map(pattern => `<li><a href="#pattern/${encodeURIComponent(pattern.id)}?source=${encodeURIComponent(id)}">${esc(pattern.title)}</a><span>${esc(pattern.category)}</span></li>`).join('')}</ul></section>`;
  }
  function init(options = {}) {
    notify = options.toast || notify;
    onStateChange = options.onStateChange || onStateChange;
    $('#pattern-count').textContent = patterns.length;
    $('#patterns-total').textContent = patterns.length;
    $('#pattern-category').innerHTML = '<option value="all">全部类别</option>' + categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join('');
    $('#pattern-source').innerHTML = '<option value="all">全部案例</option>' + sourceEntries.map(entry => `<option value="${esc(entry.id)}">${esc(entry.title)}</option>`).join('');
    $('#pattern-navigation').innerHTML = `<a class="nav-item" href="#patterns"><span>全部设计巧思</span><b>${patterns.length}</b></a>` + categories.map(category => `<a class="nav-item" data-pattern-category="${esc(category)}" href="#patterns?category=${encodeURIComponent(category)}"><span>${esc(category)}</span><b>${patterns.filter(pattern => pattern.category === category).length}</b></a>`).join('');
    $('#pattern-search').addEventListener('input', event => { state.query = event.target.value.trim(); writeState({ replace: true }); });
    $('#pattern-category').addEventListener('change', event => { state.category = event.target.value; writeState(); });
    $('#pattern-source').addEventListener('change', event => { state.source = event.target.value; writeState(); });
    $('#pattern-reset').addEventListener('click', () => {
      state = { query: '', category: 'all', source: 'all' };
      $('#pattern-search').value = ''; $('#pattern-category').value = 'all'; $('#pattern-source').value = 'all';
      writeState(); $('#pattern-search').focus();
    });
  }
  function focusSearch() {
    if ($('#patterns-library').hidden && $('#pattern-detail').hidden) return false;
    if (!$('#pattern-detail').hidden) {
      $('#pattern-detail').hidden = true; $('#patterns-library').hidden = false;
      $('#pattern-search').value = state.query; $('#pattern-category').value = state.category; $('#pattern-source').value = state.source;
      writeState();
    }
    $('#pattern-search').focus();
    return true;
  }
  window.DesignAtlasPatterns = { init, renderRoute, caseLinks, focusSearch };
})();
