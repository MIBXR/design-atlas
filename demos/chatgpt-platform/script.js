/* Public DOM geometry is in motion-data.js. This controller is original local code. */
const modes = ['chat', 'work', 'code'];
const features = {
  chat: ['chat.webp', 'ChatGPT 日常对话官方界面'],
  work: ['work.webp', 'ChatGPT Work 演示文稿官方界面'],
  code: ['code.webp', 'ChatGPT Codex 代码评审官方界面']
};
const stage = document.querySelector('.mode-experience');
const artwork = document.querySelector('.artwork');
const rail = document.querySelector('.mode-rail');
const productWindow = document.querySelector('.mode-window');
const images = document.querySelector('.window-images');
const reducedMedia = matchMedia('(prefers-reduced-motion: reduce)');
const desktopMedia = matchMedia('(min-width: 1024px)');
const pointerMedia = matchMedia('(hover: hover) and (pointer: fine)');
let active = 'chat', introMode = 'chat', scrollMode = null, frame = 0;
let manualSelection = false, pointerInside = false, paused = false;
let transitionSerial = 0;
const easing = 'cubic-bezier(0.22,1,0.36,1)';
const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => 1 - Math.pow(1 - clamp(value), 3);
const motionEnabled = () => !reducedMedia.matches && !paused;
const scrollStageEnabled = () => desktopMedia.matches && !reducedMedia.matches;

function makeArtwork(mode, animate) {
  const group = document.createElement('div');
  group.className = 'artwork-mode' + (animate ? ' entering' : '');
  group.dataset.mode = mode;
  for (const [index, layer] of window.CHATGPT_MOTION_LAYERS[mode].entries()) {
    const anchor = document.createElement('div');
    anchor.className = 'motion-layer';
    anchor.dataset.layer = layer.name;
    anchor.dataset.parallax = layer.parallax;
    anchor.style.left = layer.x + '%';
    anchor.style.top = layer.y + '%';
    anchor.style.width = layer.width + '%';
    anchor.style.zIndex = layer.z;
    anchor.style.setProperty('--angle', layer.rotation + 'deg');
    anchor.style.setProperty('--delay', index * 22 + 'ms');
    anchor.style.setProperty('--from-x', layer.x < 35 ? '-32vw' : layer.x > 65 ? '32vw' : '0px');
    anchor.style.setProperty('--from-y', layer.y < 15 ? '-32vh' : layer.y > 85 ? '32vh' : layer.y < 45 ? '-8vh' : '8vh');
    const parallax = document.createElement('div');
    parallax.className = 'layer-parallax';
    const image = new Image();
    image.src = layer.file;
    image.alt = '';
    image.draggable = false;
    parallax.append(image);
    anchor.append(parallax);
    group.append(anchor);
  }
  return group;
}
function setMode(mode, source = 'interaction') {
  if (!features[mode]) return;
  if (source !== 'scroll') introMode = mode;
  if (source === 'interaction') manualSelection = true;
  document.querySelectorAll('.action-word').forEach(button => {
    const selected = button.dataset.select === mode;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', selected);
  });
  document.querySelectorAll('[data-rail-mode]').forEach(button => {
    const selected = button.dataset.railMode === mode;
    button.setAttribute('aria-expanded', selected);
    button.closest('article').classList.toggle('active', selected);
    document.getElementById(button.getAttribute('aria-controls')).hidden = !selected;
  });
  stage.dataset.mode = mode;
  productWindow.dataset.mode = mode;
  if (active === mode && artwork.children.length) return;
  active = mode;
  const animate = motionEnabled();
  const serial = ++transitionSerial;
  // At most one outgoing group survives interrupted hover transitions.
  artwork.querySelectorAll('.leaving').forEach(group => group.remove());
  const previous = artwork.querySelector('.artwork-mode');
  if (previous && animate) {
    previous.classList.remove('entering');
    previous.classList.add('leaving');
    setTimeout(() => previous.remove(), 550);
  } else previous?.remove();
  artwork.append(makeArtwork(mode, animate));

  images.querySelectorAll('.outgoing').forEach(image => image.remove());
  const previousImage = images.querySelector('.current');
  if (previousImage && animate) {
    previousImage.id = '';
    previousImage.setAttribute('aria-hidden', 'true');
    previousImage.className = 'mode-image outgoing';
    setTimeout(() => previousImage.remove(), 500);
  } else previousImage?.remove();
  const image = new Image();
  image.src = 'assets/' + features[mode][0];
  image.alt = features[mode][1];
  image.width = 1920; image.height = 1230;
  image.id = 'showcase-image';
  image.className = 'mode-image current' + (animate ? ' incoming' : '');
  images.append(image);
  if (animate) setTimeout(() => {
    if (serial === transitionSerial) {
      image.classList.remove('incoming');
      artwork.querySelector('.entering')?.classList.remove('entering');
    }
  }, 950);
  requestScroll();
}
function requestScroll() {
  if (!frame) frame = requestAnimationFrame(updateScroll);
}
function updateScroll() {
  frame = 0;
  const bounds = stage.getBoundingClientRect();
  const delta = -bounds.top;
  if (!scrollStageEnabled()) {
    stage.dataset.phase = 'static';
    stage.style.setProperty('--intro-opacity', '1');
    stage.style.setProperty('--handoff', '1');
    stage.style.setProperty('--window-entry', '1');
    rail.inert = false;
    stage.style.setProperty('--rail-opacity', '1');
    scrollMode = null;
    return;
  }
  // Two distinct steps: let the collage leave, then move the same window to the rail.
  const fade = ease((delta + 10) / 340);
  const handoff = ease((delta - 300) / 240);
  const entry = ease((innerHeight - bounds.top) / (innerHeight * .75));
  stage.style.setProperty('--intro-opacity', 1 - fade);
  stage.style.setProperty('--intro-scale', 1 - .04 * fade);
  stage.style.setProperty('--handoff', handoff);
  stage.style.setProperty('--window-entry', entry);
  stage.style.setProperty('--rail-opacity', handoff);
  stage.dataset.phase = delta < 60 ? 'intro' : delta < 540 ? 'handoff' : 'accordion';
  rail.inert = handoff < .96;
  if (delta >= 340) {
    const next = modes[Math.min(2, Math.max(0, Math.floor((delta - 500) / 500)))];
    if (scrollMode !== next) {
      scrollMode = next;
      setMode(next, 'scroll');
    }
  } else if (scrollMode !== null) {
    scrollMode = null;
    setMode(introMode, 'restore');
  }
  const parallax = Math.max(-1.3, Math.min(1.3, (innerHeight * .65 - bounds.top) / innerHeight));
  artwork.querySelectorAll('.motion-layer').forEach(layer => {
    layer.querySelector('.layer-parallax').style.transform = motionEnabled()
      ? 'translate3d(0,' + (parallax * Number(layer.dataset.parallax)).toFixed(2) + 'px,0)'
      : 'none';
  });
  document.querySelectorAll('.mode-progress').forEach((line, index) => {
    line.style.transform = 'scaleX(' + clamp((delta - 500 - index * 500) / 500) + ')';
  });
}
document.querySelectorAll('[data-select]').forEach(button => {
  button.addEventListener('pointerenter', () => {
    if (pointerMedia.matches) { pointerInside = true; setMode(button.dataset.select); }
  });
  button.addEventListener('pointerleave', () => { pointerInside = false; });
  button.addEventListener('focus', () => setMode(button.dataset.select));
  button.addEventListener('click', () => setMode(button.dataset.select));
});
document.querySelectorAll('[data-rail-mode]').forEach(button => {
  button.addEventListener('click', () => {
    const mode = button.dataset.railMode;
    if (scrollStageEnabled()) {
      const top = stage.getBoundingClientRect().top + scrollY + 520 + modes.indexOf(mode) * 500;
      window.scrollTo({top, behavior: motionEnabled() ? 'smooth' : 'instant'});
    } else setMode(mode);
  });
});
rail.addEventListener('keydown', event => {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const buttons = [...rail.querySelectorAll('button')];
  const position = buttons.indexOf(document.activeElement);
  const index = event.key === 'Home' ? 0 : event.key === 'End' ? 2
    : (position + (event.key === 'ArrowDown' ? 1 : -1) + 3) % 3;
  buttons[index].focus();
  buttons[index].click();
});
window.addEventListener('scroll', requestScroll, {passive:true});
window.addEventListener('resize', requestScroll);
function adaptMotion() {
  document.body.classList.toggle('reduce-motion', reducedMedia.matches);
  if (!motionEnabled()) {
    artwork.querySelectorAll('.leaving').forEach(group => group.remove());
    images.querySelectorAll('.outgoing').forEach(image => image.remove());
    artwork.querySelectorAll('.entering').forEach(group => group.classList.remove('entering'));
    images.querySelectorAll('.incoming').forEach(image => image.classList.remove('incoming'));
  }
  requestScroll();
}
reducedMedia.addEventListener('change', adaptMotion);
desktopMedia.addEventListener('change', adaptMotion);
document.querySelector('#motion-toggle').onclick = event => {
  paused = !paused;
  document.body.classList.toggle('motion-paused', paused);
  event.currentTarget.setAttribute('aria-pressed', paused);
  event.currentTarget.textContent = paused ? '继续演出' : '暂停演出';
  adaptMotion();
};
const cycle = setInterval(() => {
  if (!motionEnabled() || manualSelection || pointerInside || document.hidden) return;
  if (stage.getBoundingClientRect().top < 0) return;
  setMode(modes[(modes.indexOf(active) + 1) % 3], 'auto');
}, 6500);
window.addEventListener('pagehide', () => clearInterval(cycle), {once:true});
setMode('chat', 'initial');
adaptMotion();
document.fonts.ready.then(requestScroll);

// Secondary features keep the observed horizontal card shelf and native touch scrolling.
const cards = document.querySelector('.feature-cards');
const previousCard = document.querySelector('#card-prev');
const nextCard = document.querySelector('#card-next');
function cardControls() {
  previousCard.disabled = cards.scrollLeft < 4;
  nextCard.disabled = cards.scrollLeft + cards.clientWidth >= cards.scrollWidth - 4;
}
function moveCards(direction) {
  const first = cards.querySelector('article');
  cards.scrollBy({left:direction * (first.getBoundingClientRect().width + 20),
    behavior:motionEnabled() ? 'smooth' : 'instant'});
}
previousCard.onclick = () => moveCards(-1);
nextCard.onclick = () => moveCards(1);
cards.addEventListener('scroll', cardControls, {passive:true});
window.addEventListener('resize', cardControls);
cardControls();

const menu = document.querySelector('.menu');
const hamburger = document.querySelector('.hamburger');
function closeMenu() {
  menu.hidden = true;
  document.querySelectorAll('[data-menu],.hamburger').forEach(button => button.setAttribute('aria-expanded','false'));
}
function openMenu(button, items) {
  const alreadyOpen = !menu.hidden && menu.dataset.key === button.textContent;
  closeMenu();
  if (alreadyOpen) return;
  menu.dataset.key = button.textContent;
  menu.replaceChildren(...items.map(text => {
    const link = document.createElement('a');
    link.href = '#showcase'; link.textContent = text; link.onclick = closeMenu;
    return link;
  }));
  menu.hidden = false;
  button.setAttribute('aria-expanded', 'true');
}
document.querySelectorAll('[data-menu]').forEach(button => button.onclick = () =>
  openMenu(button, button.dataset.menu === '功能'
    ? ['ChatGPT Work','深度研究','图像','插件','站点','学习模式','语音','视频']
    : ['学生','教师','研究人员','创作灵感','旅行','日常生活']));
hamburger.onclick = () => openMenu(hamburger, ['简介','功能','学习','Codex','Business','定价','下载']);
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const account = document.querySelector('#account');
document.querySelectorAll('[data-open]').forEach(button => button.onclick = () => {
  account.querySelector('h2').textContent = button.dataset.open; account.showModal();
});
document.querySelectorAll('dialog .close').forEach(button => button.onclick = () => button.closest('dialog').close());
const imageDialog = document.querySelector('#image-dialog');
document.querySelector('#image-expand').onclick = () => {
  imageDialog.querySelector('img').src = document.querySelector('#showcase-image').src;
  imageDialog.showModal();
};
