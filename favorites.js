(() => {
  'use strict';
  const key = 'atlas-favorites-v2', legacyKey = 'atlas-favorites';
  const format = 'design-atlas-favorites';
  const valid = {
    cases: new Set((window.DESIGN_ATLAS || []).map(entry => entry.id)),
    patterns: new Set((window.DESIGN_PATTERNS || []).map(pattern => pattern.id)),
  };
  const clean = (kind, ids) => [...new Set(ids.filter(id => typeof id === 'string' && valid[kind].has(id)))];
  const listeners = new Set();
  let state = { cases: [], patterns: [] }, persisted = true, error = '';
  function readBackup(value) {
    const data = typeof value === 'string' ? JSON.parse(value) : value;
    if (Array.isArray(data)) return { cases: clean('cases', data), patterns: [] };
    if (data?.version === 2 && data.format === format && Array.isArray(data.cases) && Array.isArray(data.patterns)) {
      return { cases: clean('cases', data.cases), patterns: clean('patterns', data.patterns) };
    }
    if (Array.isArray(data?.favorites) && (data.version === undefined || data.version === 1)) {
      return { cases: clean('cases', data.favorites), patterns: [] };
    }
    throw new Error('格式错误，请粘贴导出的收藏 JSON。');
  }
  function readLegacy() {
    const value = localStorage.getItem(legacyKey);
    return value === null ? [] : readBackup(value).cases;
  }
  try {
    const value = localStorage.getItem(key);
    state = value === null ? { cases: readLegacy(), patterns: [] } : readBackup(value);
  } catch {
    persisted = false; error = '无法读取本地收藏，可导入备份恢复。';
  }
  const payload = () => ({ format, version: 2, cases: [...state.cases], patterns: [...state.patterns] });
  function notify() {
    listeners.forEach(listener => listener({ persisted, error }));
  }
  function save(mirrorCases) {
    try {
      localStorage.setItem(key, JSON.stringify(payload()));
      if (mirrorCases) localStorage.setItem(legacyKey, JSON.stringify(state.cases));
      persisted = true; error = '';
    } catch {
      persisted = false; error = '未能完整保存本地收藏，本次修改保留在当前页面。请导出备份。';
    }
    notify();
    return persisted;
  }
  const api = {
    has: (kind, id) => state[kind].includes(id),
    ids: kind => [...state[kind]],
    toggle(kind, id) {
      if (!valid[kind].has(id)) return { selected: false, persisted };
      const selected = !api.has(kind, id);
      state[kind] = selected ? [...state[kind], id] : state[kind].filter(value => value !== id);
      return { selected, persisted: save(kind === 'cases') };
    },
    exportBackup: () => ({ ...payload(), exportedAt: new Date().toISOString() }),
    importBackup(value) {
      const incoming = readBackup(value);
      const added = {};
      for (const kind of ['cases', 'patterns']) {
        const merged = [...new Set([...state[kind], ...incoming[kind]])];
        added[kind] = merged.length - state[kind].length;
        state[kind] = merged;
      }
      return { added, total: { cases: state.cases.length, patterns: state.patterns.length }, persisted: save(added.cases > 0) };
    },
    subscribe(listener) {
      listeners.add(listener); listener({ persisted, error });
      return () => listeners.delete(listener);
    },
  };
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== legacyKey && event.key !== null) return;
    try {
      if (event.key === null) state = { cases: [], patterns: [] };
      else if (event.key === legacyKey) {
        state.cases = event.newValue === null ? [] : readBackup(event.newValue).cases;
        save(false); return;
      } else state = event.newValue === null ? { cases: readLegacy(), patterns: [] } : readBackup(event.newValue);
      persisted = true; error = ''; notify();
    } catch {
      persisted = false; error = '无法读取另一页面的收藏更新，当前收藏仍保留。'; notify();
    }
  });
  window.DesignAtlasFavorites = api;
})();
