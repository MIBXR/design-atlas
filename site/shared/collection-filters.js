(() => {
  'use strict';
  const tools = document.querySelector('.collection-tools');
  if (!tools) return;
  window.AtlasIcons.paint(tools);
  const controls = [...tools.querySelectorAll('select[data-filter-label]')].map(select => ({ select, wrap: select.parentElement }));
  const mobile = matchMedia('(max-width:800px)');
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'text-button collection-filter-toggle';
  trigger.setAttribute('aria-haspopup','dialog');
  trigger.setAttribute('aria-controls','collection-filter-dialog');
  const dialog = document.createElement('dialog');
  dialog.id = 'collection-filter-dialog';
  dialog.className = 'collection-filter-dialog';
  dialog.setAttribute('aria-labelledby','collection-filter-title');
  dialog.innerHTML = '<div class="collection-filter-head"><h2 id="collection-filter-title">筛选</h2><button type="button" class="text-button" data-filter-clear>清除</button></div><div class="collection-filter-fields"></div><button type="button" class="primary-button" data-filter-done>完成</button>';
  const fields = dialog.querySelector('.collection-filter-fields');
  for (const control of controls) {
    const row = document.createElement('label');
    row.className = 'collection-filter-field';
    row.htmlFor = control.select.id;
    const name = document.createElement('span');
    name.textContent = control.select.dataset.filterLabel;
    row.append(name);
    fields.append(row);
    control.row = row;
    control.select.addEventListener('change',sync);
  }
  tools.querySelector('.sort-control').before(trigger);
  document.body.append(dialog);
  function sync() {
    const count = controls.filter(({select}) => !select.hidden && select.value !== 'all').length;
    trigger.innerHTML = window.AtlasIcons.svg('filter')+'<span>筛选'+(count?' · '+count:'')+'</span>';
    trigger.classList.toggle('active',count>0);
    for (const {select,row} of controls) row.hidden = select.hidden;
  }
  function layout() {
    if (dialog.open) dialog.close();
    for (const {row,wrap} of controls) {
      if (mobile.matches) row.append(wrap);
      else tools.insertBefore(wrap,tools.querySelector('.toolbar-divider'));
    }
    sync();
  }
  trigger.addEventListener('click',() => { sync();dialog.showModal(); });
  dialog.querySelector('[data-filter-clear]').addEventListener('click',() => {
    for (const {select} of controls) {
      if (select.value === 'all') continue;
      select.value = 'all';
      select.dispatchEvent(new Event('change',{bubbles:true}));
    }
    sync();
  });
  dialog.querySelector('[data-filter-done]').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close',() => trigger.focus({preventScroll:true}));
  mobile.addEventListener('change',layout);
  window.AtlasCollectionFilters = {sync};
  layout();
})();
