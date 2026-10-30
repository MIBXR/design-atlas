(() => {
  'use strict';
  const dialog = document.querySelector('#favorite-dialog');
  const store = window.AtlasFavorites;
  dialog.innerHTML = '<form method="dialog"><button class="dialog-close" aria-label="关闭收藏管理"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg></button></form><h2>收藏备份</h2><p>案例、巧思与素材收藏保存在当前浏览器中。下载同一份备份即可一起保存；换设备或清理网站数据后，可导入备份恢复。</p><p id="favorite-total"></p><button id="favorite-export" class="primary-button">下载收藏备份</button><p>备份也会显示在下方，方便复制。导入会合并三类收藏。</p><textarea id="favorite-json" aria-label="收藏备份 JSON" placeholder="粘贴收藏备份…"></textarea><button id="favorite-import" class="primary-button">导入并合并</button><p id="favorite-status" role="status"></p>';
  const area = dialog.querySelector('#favorite-json');
  const status = dialog.querySelector('#favorite-status');
  store.subscribe(({ error }) => {
    dialog.querySelector('#favorite-total').textContent = `案例 ${store.ids('cases').length} 项 · 巧思 ${store.ids('patterns').length} 项 · 素材 ${store.ids('materials').length} 项`;
    if (error) status.textContent = error;
  });
  document.querySelector('#favorite-manage').addEventListener('click', () => dialog.showModal());
  dialog.querySelector('#favorite-export').addEventListener('click', () => {
    const json = JSON.stringify(store.exportBackup(), null, 2);
    area.value = json;
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'web-atlas-favorites.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = '已生成案例、巧思与素材的共同备份，下方也可复制。';
  });
  dialog.querySelector('#favorite-import').addEventListener('click', () => {
    try {
      const result = store.importBackup(area.value);
      status.textContent = `已新增 ${result.added.cases} 个案例、${result.added.patterns} 个巧思、${result.added.materials} 个素材；现有 ${result.total.cases} 个案例、${result.total.patterns} 个巧思、${result.total.materials} 个素材收藏。${result.persisted ? '' : '当前浏览器未允许保存，请下载备份留存。'}`;
    } catch { status.textContent = '备份格式有误，请粘贴导出的收藏 JSON。'; }
  });
})();
