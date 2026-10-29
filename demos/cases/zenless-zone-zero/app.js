const mobile = document.body.dataset.mobile === 'true';
const small = matchMedia('(max-width: 800px)');
const routeLayout = () => { if (small.matches !== mobile) location.replace(small.matches ? 'mobile.html' : 'index.html'); };
routeLayout();
small.addEventListener('change', routeLayout);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const prefix = mobile ? 'm-home-' : 'home-';
const component = name => $(`.${prefix}${name}`);
const control = (element, label, action) => {
  if (!element) return;
  element.setAttribute('role', 'button');
  element.tabIndex = 0;
  element.setAttribute('aria-label', label);
  element.addEventListener('click', action);
  element.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); element.click(); }
  });
};
function animate(element, frames, duration = 300, delay = 0) {
  element.getAnimations().forEach(animation => animation.cancel());
  if (!reduced.matches) element.animate(frames, { duration, delay, easing: 'cubic-bezier(.215,.61,.355,1)' });
}
function swipe(element, change) {
  let start;
  element.style.touchAction = 'pan-y';
  element.addEventListener('pointerdown', e => { start = [e.clientX, e.clientY]; });
  element.addEventListener('pointerup', e => {
    if (start && Math.abs(e.clientX - start[0]) > 40 && Math.abs(e.clientX - start[0]) > Math.abs(e.clientY - start[1])) {
      change(e.clientX < start[0] ? 1 : -1);
      element.addEventListener('click', event => event.preventDefault(), { once: true, capture: true });
    }
    start = null;
  });
}
function slides(container, { fade = false, loop = true, onChange = () => {} } = {}) {
  const track = $('.swiper-wrapper', container);
  const items = [...track.children];
  let index = 0;
  container.classList.add(fade ? 'study-fade' : 'study-slide');
  const select = next => {
    index = loop ? (next + items.length) % items.length : Math.max(0, Math.min(next, items.length - 1));
    items.forEach((item, i) => {
      item.classList.toggle('swiper-slide-active', i === index);
      item.inert = i !== index;
      item.setAttribute('aria-hidden', String(i !== index));
    });
    if (!fade) track.style.transform = `translateX(${-100 * index}%)`;
    onChange(index);
  };
  const step = by => select(index + by);
  swipe(container, step);
  container.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1); }
  });
  return { select, step, items, get index() { return index; } };
}
const characters = component('character');
const thumbs = $$(`.${prefix}character__nav-item`);
const nameBand = $('.en-name-container', characters) || $('.m-home-character__anim span', characters);
let characterIndex = 0;
let thumbPage = 0;
const thumbTrack = $(`.${prefix}character__nav .swiper-wrapper`);
const thumbViewport = $(`.${prefix}character__nav`);
function showThumbs() {
  const step = thumbs[1].offsetLeft - thumbs[0].offsetLeft;
  thumbTrack.style.transform = `translateX(${-step * thumbPage}px)`;
  $$(`.${prefix}character__main-nav .swiper-button-prev`).forEach(el => el.setAttribute('aria-disabled', String(thumbPage === 0)));
  $$(`.${prefix}character__main-nav .swiper-button-next`).forEach(el => el.setAttribute('aria-disabled', String(thumbPage >= thumbs.length - 3)));
}
const characterSlides = slides($(`.${prefix}character__list`), { fade: true, loop: false, onChange: index => {
  characterIndex = index;
  thumbs.forEach((item, i) => { item.classList.toggle('swiper-slide-thumb-active', i === index); item.setAttribute('aria-pressed', String(i === index)); });
  if (nameBand) {
    const name = atlasData.characters[index].english.split(' ')[0];
    nameBand.textContent = mobile ? atlasData.characters[index].english : `${name} ${name}`;
    animate(nameBand, [{ transform: 'translateX(30%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], 500);
  }
} });
thumbs.forEach((item, i) => control(item, atlasData.characters[i].name, () => characterSlides.select(i)));
const characterNav = $(`.${prefix}character__main-nav`) || thumbViewport.parentElement;
control($('.swiper-button-prev', characterNav), '上一组角色', () => { thumbPage = Math.max(0, thumbPage - 3); showThumbs(); });
control($('.swiper-button-next', characterNav), '下一组角色', () => { thumbPage = Math.min(thumbs.length - 3, thumbPage + 3); showThumbs(); });
swipe(thumbViewport, dir => { thumbPage = Math.max(0, Math.min(thumbs.length - 3, thumbPage + dir * 3)); showThumbs(); });
characterNav.addEventListener('keydown', e => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault();
  const next = e.key === 'Home' ? 0 : e.key === 'End' ? thumbs.length - 1 : Math.max(0, Math.min(thumbs.length - 1, characterIndex + (e.key === 'ArrowRight' ? 1 : -1)));
  thumbPage = Math.min(thumbs.length - 3, Math.floor(next / 3) * 3);
  showThumbs(); characterSlides.select(next); thumbs[next].focus({ preventScroll: true });
});
characterSlides.select(0);
control($('.more-btn,.m-more-btn', characters), '在官网查看角色详情', () => window.open(`https://zzz.mihoyo.com/${mobile ? 'm/' : ''}character?id=${atlasData.characters[characterIndex].id}`, '_blank', 'noopener'));

const dialog = $('#study-dialog');
const dialogContent = $('.dialog-content', dialog);
const bgm = new Audio();
bgm.loop = true;
bgm.volume = mobile ? 1 : .8;
bgm.id = 'background-music';
bgm.preload = 'none';
document.body.append(bgm);
let bgmEnabled = false;
let opener;
function closeDialog() { dialog.close(); }
function openDialog(html, label) {
  opener = document.activeElement;
  dialog.setAttribute('aria-label', label);
  dialogContent.innerHTML = html;
  dialog.showModal();
}
$('.dialog-close', dialog).addEventListener('click', closeDialog);
dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });
dialog.addEventListener('close', () => {
  const video = $('video', dialog); if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
  dialogContent.replaceChildren();
  bgm.muted = false;
  if (bgmEnabled && !document.hidden) bgm.play().catch(() => setBgm(false));
  opener?.focus({ preventScroll: true });
});
function setBgm(enabled) {
  bgmEnabled = enabled;
  $$('.m-audio-player').forEach(el => { el.classList.toggle('m-audio-player--active', enabled); el.setAttribute('aria-pressed', String(enabled)); el.setAttribute('aria-label', enabled ? '关闭背景音乐' : '播放背景音乐'); });
  if (!enabled) bgm.pause();
}
bgm.addEventListener('error', () => setBgm(false));
$$('.m-audio-player').forEach(el => control(el, '播放背景音乐', async () => {
  if (bgmEnabled) return setBgm(false);
  if (!bgm.src) bgm.src = 'assets/bgm.mp3';
  try { await bgm.play(); setBgm(true); } catch { setBgm(false); }
}));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { bgm.pause(); $('video', dialog)?.pause(); }
  else if (bgmEnabled && !dialog.open) bgm.play().catch(() => setBgm(false));
});
const videoSection = component('video');
let videoIndex = 0;
const videoThumbs = $$('.home-video__nav-item');
const videoSlides = slides($(`.${prefix}video__${mobile ? 'banner-list' : 'main'}`), { fade: !mobile, loop: false, onChange: i => {
  videoIndex = i;
  const item = atlasData.videos[i];
  $(`.${prefix}video__summary-title`).textContent = item.title;
  const date = $(`.${prefix}video__summary-date`); if (date) date.textContent = item.date.slice(0, 10).split('-').reverse().join('/');
  videoThumbs.forEach((el, j) => { el.classList.toggle('is-active', i === j); el.setAttribute('aria-pressed', String(i === j)); });
  if (videoThumbs.length) {
    const track = $('.home-video__nav-track');
    const offset = videoThumbs[i].offsetLeft;
    track.style.transform = `translateX(-${Math.min(offset, Math.max(0, track.scrollWidth - $('.home-video__nav').clientWidth))}px)`;
  }
  $('.swiper-button-prev', videoSection)?.setAttribute('aria-disabled', String(i === 0));
  $('.swiper-button-next', videoSection)?.setAttribute('aria-disabled', String(i === atlasData.videos.length - 1));
} });
videoThumbs.forEach((el, i) => control(el, atlasData.videos[i].title, () => videoSlides.select(i)));
control($('.swiper-button-prev', videoSection), '上一部影像', () => videoSlides.step(-1));
control($('.swiper-button-next', videoSection), '下一部影像', () => videoSlides.step(1));
function playVideo() {
  const item = atlasData.videos[videoIndex];
  bgm.muted = true;
  openDialog('<video controls playsinline preload="metadata"></video><p class="media-message">正在载入官方视频，需要网络连接。</p><a href="https://zzz.mihoyo.com/video" target="_blank" rel="noreferrer">在官网查看影像</a>', item.title);
  const video = $('video', dialog);
  const message = $('.media-message', dialog);
  video.src = item.url;
  video.addEventListener('playing', () => { message.textContent = ''; });
  video.addEventListener('error', () => { message.textContent = '官方视频暂时无法载入，可使用下方官网入口。'; });
  video.play().catch(() => { if (dialog.open) message.textContent = '点击播放器开始观看'; });
}
videoSlides.items.forEach(el => control(el, '播放当前影像', playVideo));
control($(`.${prefix}video__action-icon`), '播放当前影像', playVideo);
videoSlides.select(0);

for (const name of ['news', 'world', 'feature']) {
  const section = component(name);
  const container = $(`.${prefix}${name}__${name === 'feature' ? 'list' : 'banner-list'}`);
  const bullets = $$('.swiper-pagination-bullet', section);
  const slider = slides(container, { fade: name === 'feature', onChange: i => {
    bullets.forEach((el, j) => { el.classList.toggle('swiper-pagination-bullet-active', i === j); el.setAttribute('aria-pressed', String(i === j)); });
    if (name === 'news') {
      const item = atlasData.news[i];
      const summary = $(`.${prefix}news__summary-scroll`, section) || $(`.${prefix}news__summary`, section);
      summary.textContent = item.summary;
      const info = $('.home-news__info a', section);
      if (info) { info.href = `https://zzz.mihoyo.com/news/${item.id}`; $('.date', info).textContent = item.date.slice(0, 10); $('.title', info).textContent = item.title; }
      animate(summary, [{ opacity: 0 }, { opacity: 1 }]);
    }
    if (name === 'feature') {
      $(`.${prefix}feature__info-title`).textContent = atlasData.features[i].title;
      $(`.${prefix}feature__info-summary`).textContent = atlasData.features[i].summary;
      animate($(`.${prefix}feature__info-title`), [{ transform: 'translateX(120%)' }, { transform: 'translateX(0)' }]);
    }
  } });
  bullets.forEach((el, i) => control(el, `新闻 ${i + 1}`, () => slider.select(i)));
  control($('.swiper-button-prev', section), `上一项${name === 'world' ? '设定' : '特色'}`, () => slider.step(-1));
  control($('.swiper-button-next', section), `下一项${name === 'world' ? '设定' : '特色'}`, () => slider.step(1));
  slider.select(0);
}
const sections = $$('section[id]');
let currentSection = 0;
let scrollAnimation;
function goSection(i) {
  i = Math.max(0, Math.min(i, sections.length - 1));
  const start = scrollY, end = i ? sections[i].getBoundingClientRect().top + scrollY : 0;
  cancelAnimationFrame(scrollAnimation);
  if (reduced.matches) return scrollTo(0, end);
  const begin = performance.now();
  const frame = time => {
    const progress = Math.min(1, (time - begin) / 650);
    scrollTo(0, start + (end - start) * (1 - (1 - progress) ** 3));
    if (progress < 1) scrollAnimation = requestAnimationFrame(frame);
  };
  scrollAnimation = requestAnimationFrame(frame);
}
$$('.sidebar__pagers-num').forEach((el, i) => control(el, `跳到${['首页','角色介绍','影像资料','新闻资讯','设定档案','游戏特色'][i]}`, () => goSection(i)));
control($('.sidebar__nav-prev'), '上一章节', () => goSection(currentSection - 1));
control($('.sidebar__nav-next'), '下一章节', () => goSection(currentSection + 1));
$$('.backTop').forEach(el => control(el, '回到顶部', () => goSection(0)));
const enterObserver = new IntersectionObserver(records => records.forEach(record => {
  if (!record.isIntersecting) return;
  const section = record.target;
  if (!section.classList.contains('entered')) {
    section.classList.add('entered');
    $$('.section-nav-label,.section-nav-en,.section-nav-num', section).forEach((el, i) => animate(el, [{ transform: `translateX(${section.id === 'video' || section.id === 'world' ? 140 : -140}%)` }, { transform: 'translateX(0)' }], 600, i * 90));
    $$('.home-news__banner,.home-world__banner,.home-video__content', section).forEach(el => animate(el, [{ transform: 'translateY(40%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], 650, 200));
  }
}), { rootMargin: '0px 0px -120px 0px' });
sections.forEach(el => enterObserver.observe(el));
function updateScroll() {
  currentSection = Math.max(0, sections.findLastIndex(el => el.getBoundingClientRect().top <= innerHeight * .4));
  $$('.sidebar__pagers-num').forEach((el, i) => { el.classList.toggle('sidebar__pagers-num--active', currentSection === i); el.setAttribute('aria-current', i === currentSection ? 'location' : 'false'); });
  const pager = $('.sidebar__pagers'); if (pager) pager.style.transform = `translateY(${-2.11556 * currentSection}rem)`;
  document.body.classList.toggle('scrolled', scrollY > 0);
  document.body.classList.toggle('show-mobile-menu', scrollY > innerHeight / 3);
  $('.m-header .logo-icon')?.classList.toggle('logo-icon__light', scrollY > 0);
  if (!mobile && !reduced.matches) {
    const progress = Math.min(1, scrollY / sections[0].offsetHeight * 1.3);
    for (const [selector, x, y] of [['.fill-bg', 0, -4], ['.fill-text', 0, -14], ['.section-character', 0, -4], ['.fill-black-right-character', 5, -5]]) {
      $(selector).style.transform = `translate(${x * progress}%, ${y * progress}%)`;
    }
    const feature = sections[5].getBoundingClientRect();
    const featureProgress = Math.max(0, Math.min(1, (innerHeight - 120 - feature.top) / (innerHeight + feature.height - 160) * 1.3));
    $('.fill-black-bar-feature').style.transform = `translate(${4 * featureProgress}%, ${-4 * featureProgress}%)`;
  }
}
addEventListener('scroll', updateScroll, { passive: true });
addEventListener('resize', showThumbs);
updateScroll(); showThumbs();
const sourceRoutes = { 首页: 'main', 角色介绍: 'character', 影像资料: 'video', 新闻资讯: 'news', 设定档案: 'world', 游戏特色: 'feature' };
$$('.header__navbar-link > .nav-content,.m-header__menu-link > .nav-content').forEach(el => {
  const label = el.textContent.trim();
  if (sourceRoutes[label]) control(el, label === '首页' ? '回到首页' : `${label}（官网）`, () => label === '首页' ? goSection(0) : window.open(`https://zzz.mihoyo.com/${mobile ? 'm/' : ''}${sourceRoutes[label]}`, '_blank', 'noopener'));
  else if (label === '成长关爱系统') control(el, '成长关爱系统（官网）', () => window.open(atlasData.links.menu_care_link, '_blank', 'noopener'));
});
$$('.header__logo,.m-header__logo').forEach(el => control(el, '回到首页', () => goSection(0)));
const menu = $('.m-header__menu');
const menuButton = $('.m-header__menu-btn');
function setMenu(open) {
  if (!menu) return;
  menu.classList.toggle('study-open', open); menu.inert = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
  (open ? $('.m-header__menu-close') : menuButton).focus();
}
if (menu) {
  menu.inert = true;
  control(menuButton, '打开菜单', () => setMenu(true));
  control($('.m-header__menu-close'), '关闭菜单', () => setMenu(false));
  menu.addEventListener('click', e => { if (e.target === menu || e.target.closest('a,.nav-content:not(.nav-content-more)')) setMenu(false); });
  menu.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
    if (e.key === 'Tab') { const focusable = $$('[tabindex="0"],a[href]', menu); const first = focusable[0], last = focusable.at(-1); if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  });
}
$$('.nav-content-more').forEach(el => control(el, el.textContent.trim(), () => { const panel = el.nextElementSibling; if (panel) { panel.classList.toggle('study-open'); el.setAttribute('aria-expanded', String(panel.classList.contains('study-open'))); } }));
$$('.share__icon').forEach(el => control(el, '关注官方账号', () => { $('.share__panel')?.classList.toggle('study-open'); }));
$$('.footer__socialbar-share').forEach(el => control(el, '复制官网分享链接', async () => {
  try {
    await navigator.clipboard.writeText(atlasData.shareText);
    $('#study-status').textContent = '官网分享链接已复制';
  } catch {
    openDialog('<p>复制下方官方分享链接：</p><input readonly aria-label="官方分享链接" value="https://zzz.mihoyo.com/main">', '分享官网');
    $('input', dialog).select();
  }
}));
$$('.social__qrcode').forEach(el => { const parent = el.parentElement; parent.tabIndex = 0; parent.addEventListener('click', () => el.classList.toggle('study-open')); });
const external = (selector, label, url) => $$(selector).forEach(el => control(el, label, () => window.open(url, '_blank', 'noopener')));
external('.header__login,.header-login-btn', '前往官网登录', 'https://zzz.mihoyo.com/main');
$$('.nav-content-sub-item-link').filter(el => !el.parentElement.previousElementSibling.classList.contains('nav-content-download')).forEach(el => control(el, el.textContent.trim() + '（官网）', () => window.open(el.textContent.includes('充值') ? atlasData.links.menu_top_up_link : atlasData.links.menu_community_link, '_blank', 'noopener')));
const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
if (mobile) $('.m-download-panel-btn img').src = atlasData.downloadImages[ios ? 'ios' : 'android'];
const downloads = [atlasData.downloads.win, atlasData.links.ios_download_link, atlasData.downloads.android, atlasData.links.tap_download_link];
const downloadLabels = ['PC 下载', 'App Store 下载', '安卓下载', 'TapTap 下载'];
const openSource = url => window.open(url, '_blank', 'noopener');
external('.kv-download-cloud,.m-header__download-cloud', '云·绝区零（官网）', mobile ? atlasData.links[ios ? 'cloud_download_link_ios' : 'cloud_download_link_android'] : atlasData.links.cloud_download_link);
$$('.kv-download-btn').forEach((el, i) => control(el, downloadLabels[i], () => openSource(downloads[i])));
$$('.nav-content-download').forEach(el => $$('.nav-content-sub-item', el.nextElementSibling).forEach((button, i) => control(button, downloadLabels[i], () => openSource(downloads[i]))));
external('.home-kv__download,.m-header__download', '游戏下载（官网）', mobile ? (ios ? downloads[1] : downloads[2]) : downloads[0]);
$$('.m-download-panel-btn').forEach((el, i) => control(el, i ? 'TapTap 下载' : '游戏下载（官网）', () => openSource(i ? atlasData.links.tap_m_download_link : ios ? downloads[1] : downloads[2])));
let downloadScroll = scrollY;
function setDownloads(open) {
  const panel = $('.m-download-panel-container');
  if (!panel) return;
  panel.classList.toggle('expand', open);
  $('.m-download-panel-content').inert = !open;
  $('.download-panel-arrow').setAttribute('aria-expanded', String(open));
  if (open) downloadScroll = scrollY;
}
control($('.download-panel-arrow'), '展开或收起下载栏', () => setDownloads(!$('.m-download-panel-container').classList.contains('expand')));
if (mobile) { setDownloads(true); addEventListener('scroll', () => { if (Math.abs(scrollY - downloadScroll) >= 100) setDownloads(false); }, { passive: true }); }

$$('.home-kv__age,.m-home-kv__age').forEach(el => control(el, '适龄提示', () => openDialog(`<h2>适龄提示</h2>${atlasData.age}`, '适龄提示')));

Promise.all([...$$('#index img').map(img => img.decode().catch(() => {})), document.fonts.ready]).then(() => $('.study-loader').remove());
