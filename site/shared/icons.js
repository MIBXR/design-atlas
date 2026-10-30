(() => {
  'use strict';
  const paths = {
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"/><path d=\"M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7L7 17M17 7l1.7-1.7\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
  "moon": "<path d=\"M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/>",
  "system": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"/><path d=\"M8 20h8M12 16v4\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
  "menu": "<path d=\"M4 7h16M4 12h16M4 17h16\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"6.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"/><path d=\"M16 16l4.5 4.5\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
  "star": "<path d=\"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/>",
  "starFill": "<path d=\"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z\" fill=\"currentColor\"/>",
  "back": "<path d=\"M19 12H5M11 6l-6 6 6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "external": "<path d=\"M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "copy": "<rect x=\"8\" y=\"8\" width=\"12\" height=\"12\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"/><path d=\"M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"/>",
  "download": "<path d=\"M12 4v11M7 10l5 5 5-5M5 20h14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "upload": "<path d=\"M12 20V9M7 14l5-5 5 5M5 4h14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "replay": "<path d=\"M5 12a7 7 0 1 0 2.05-4.95M5 4.5V9h4.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "play": "<path d=\"M8 5.5v13l10.5-6.5z\" fill=\"currentColor\"/>",
  "pause": "<path d=\"M7 5h3.5v14H7zM13.5 5H17v14h-3.5z\" fill=\"currentColor\"/>",
  "filter": "<path d=\"M4 6h16M7 12h10M10 18h4\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>",
  "up": "<path d=\"M12 19V5M6 11l6-6 6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "arrow": "<path d=\"M5 12h14M13 6l6 6-6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "down": "<path d=\"M12 5v14M6 13l6 6 6-6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "chevronDown": "<path d=\"m6 9 6 6 6-6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "more": "<circle cx=\"5\" cy=\"12\" r=\"1.5\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\"/><circle cx=\"19\" cy=\"12\" r=\"1.5\" fill=\"currentColor\"/>",
  "plus": "<path d=\"M5 12h14M12 5v14\"/>",
  "minus": "<path d=\"M5 12h14\"/>",
  "stop": "<rect x=\"6.5\" y=\"6.5\" width=\"11\" height=\"11\" rx=\"1.5\" fill=\"currentColor\"/>",
  "landscape": "<rect x=\"2.5\" y=\"6.5\" width=\"19\" height=\"11\" rx=\"1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M6 10.5v3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "portrait": "<rect x=\"6.5\" y=\"2.5\" width=\"11\" height=\"19\" rx=\"1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M10.5 18h3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "soundOn": "<path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\" fill=\"currentColor\"/><path d=\"M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11\"/>",
  "soundOff": "<path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4z\" fill=\"currentColor\"/><path d=\"M16 9.5l5 5M21 9.5l-5 5\"/>",
  "expand": "<path d=\"M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5\"/>",
  "collapse": "<path d=\"M9 4v5H4M15 4v5h5M15 20v-5h5M9 20v-5H4\"/>",
  "tap": "<circle cx=\"12\" cy=\"12\" r=\"3.4\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"12\" r=\"7.6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" opacity=\".55\"/>",
  "rec": "<circle cx=\"12\" cy=\"12\" r=\"6\" fill=\"currentColor\"/>",
  "wave": "<path d=\"M3 12h1.5M7 8.5v7M10.5 5v14M14 9v6M17.5 6.5v11M21 12h-.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
  "sortAsc": "<path d=\"M12 19V5M12 5l-6 6M12 5l6 6\"/>",
  "sortDesc": "<path d=\"M12 5v14M12 19l-6-6M12 19l6-6\"/>",
  "close": "<path d=\"m6 6 12 12M18 6 6 18\"/>",
  "cache": "<ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"3\"/><path d=\"M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7\"/>"
};
  const svg = name => '<svg class="atlas-icon" data-icon="'+name+'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+paths[name]+'</svg>';
  const disclosure = () => '<span class="atlas-disclosure" aria-hidden="true">'+svg('plus')+svg('minus')+'</span>';
  function paint(root = document) {
    root.querySelectorAll('select').forEach(select => {
      if(select.closest('.sample,[data-pattern-playground]') || select.parentElement.classList.contains('select-wrap'))return;
      const wrap=document.createElement('span');wrap.className='select-wrap';
      select.before(wrap);wrap.append(select);wrap.insertAdjacentHTML('beforeend',svg('chevronDown'));
    });
    root.querySelectorAll('[data-atlas-icon]').forEach(element => {element.innerHTML=svg(element.dataset.atlasIcon);});
    root.querySelectorAll('.atlas-page-menu>summary,.document-group>summary').forEach(summary => {if(!summary.querySelector('.atlas-disclosure'))summary.insertAdjacentHTML('beforeend',disclosure());});
    root.querySelectorAll('button,a[download],a.copy-button').forEach(element => {
      if(element.closest('.sample,[data-pattern-playground]')||element.querySelector('svg,[data-atlas-icon]'))return;
      const text=element.textContent.trim();
      const name=element.hasAttribute('download')?'download':/^复制/.test(text)?'copy':/^返回/.test(text)?'back':/^重播/.test(text)?'replay':/^独立打开/.test(text)?'external':null;
      if(name){element.insertAdjacentHTML('afterbegin',svg(name));element.classList.add('atlas-icon-label');}
    });
  }
  window.AtlasIcons = {svg, disclosure, paint};
  document.addEventListener('DOMContentLoaded', () => paint());
})();
