import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../home.js', import.meta.url), 'utf8');

// Run the actual controller against a controllable browser boundary. Persistent
// content rejects replacement so a handoff cannot discard the live Lab draft.
function fixture({ desktop = true, reduced = false } = {}) {
  let document;
  let now = 0;
  let nextFrame = 0;
  const frames = new Map();
  const scrolls = [];
  const node = (parent = null) => {
    const listeners = new Map();
    const classes = new Set();
    const element = {
      parent, listeners, children: [], attributes: {}, dataset: {}, style: {}, hidden: false, inert: false,
      classList: {
        toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); },
        contains(name) { return classes.has(name); },
      },
      addEventListener(name, listener) {
        const handlers = listeners.get(name) || [];
        handlers.push(listener);
        listeners.set(name, handlers);
      },
      dispatch(name, event = {}) {
        for (const handler of listeners.get(name) || []) handler({ target: element, ...event });
      },
      setAttribute(name, value) { element.attributes[name] = String(value); },
      contains(target) { return target === element || element.children.some(child => child.contains(target)); },
      focus() {
        for (let ancestor = element; ancestor; ancestor = ancestor.parent) {
          if (ancestor.hidden || ancestor.inert) return;
        }
        document.activeElement = element;
      },
      animations: [],
      animate() {
        const animation = { cancelled: false, cancel() { animation.cancelled = true; } };
        element.animations.push(animation);
        return animation;
      },
      getAnimations() { return element.animations.filter(animation => !animation.cancelled); },
      replaceChildren() { throw new Error('Persistent story content must not be replaced'); },
      remove() { throw new Error('Persistent story content must not be removed'); },
      append() { throw new Error('Persistent story content must not be rebuilt'); },
    };
    Object.defineProperty(element, 'innerHTML', { set() { throw new Error('Persistent story content must not be rebuilt'); } });
    parent?.children.push(element);
    return element;
  };
  const outside = node();
  const stage = node();
  stage.dataset.phase = 'intro';
  const rail = node(stage);
  const sticky = node(stage);
  const controls = node(sticky);
  const nextButton = node(controls);
  const introActions = node(sticky);
  const modes = ['cases', 'lab', 'agent'];
  const steps = modes.map(() => node(rail));
  const buttons = modes.map((mode, index) => {
    const button = node(steps[index]);
    button.dataset.homeMode = mode;
    button.closest = selector => selector === '.home-story-step' ? steps[index] : null;
    return button;
  });
  const descriptions = modes.map((_, index) => node(steps[index]));
  const descriptionLinks = descriptions.map(description => node(description));
  const panels = modes.map(() => node(sticky));
  const panelLinks = panels.map(panel => node(panel));
  const introButtons = modes.map(mode => {
    const button = node(introActions);
    button.dataset.homeIntro = mode;
    return button;
  });
  const progress = descriptions.map(description => node(description));
  const iframe = node(panels[1]);
  const childDocument = node();
  iframe.contentDocument = childDocument;
  iframe.contentWindow = {};
  iframe.draft = 'unfinished experiment';
  Object.defineProperty(iframe, 'src', {
    get: () => 'fundamentals.html?embed=home',
    set() { throw new Error('The live Lab iframe must not reload on a story switch'); },
  });
  const input = { closest: selector => selector === 'input,select,textarea,button,a' ? input : null };
  const pathsTitle = node();
  const ids = new Map([
    ['home-story-next', nextButton], ['home-story-status', node(controls)],
    ['home-story-window-title', node(sticky)], ['home-story-position', node(sticky)], ['paths-title', pathsTitle],
    ...modes.flatMap((mode, index) => [[`home-panel-${mode}`, panels[index]], [`home-description-${mode}`, descriptions[index]]]),
  ]);
  stage.querySelector = selector => ({
    '.home-story-rail': rail, '.home-story-sticky': sticky,
    '.home-story-controls': controls, '.home-story-intro-actions': introActions,
  })[selector] || null;
  stage.querySelectorAll = selector => selector === '[data-home-intro]' ? introButtons : selector === '.home-story-progress>span' ? progress : [];
  rail.querySelectorAll = selector => selector === '[data-home-mode]' ? buttons : [];
  const stageTop = 1000;
  const inset = 104;
  const window = node();
  window.scrollY = 0;
  window.requestAnimationFrame = callback => { const id = ++nextFrame; frames.set(id, callback); return id; };
  window.cancelAnimationFrame = id => frames.delete(id);
  window.scrollTo = options => scrolls.push(options);
  const media = { desktop: node(), reduced: node() };
  media.desktop.matches = desktop;
  media.reduced.matches = reduced;
  window.matchMedia = query => {
    if (query === '(min-width:1100px)') return media.desktop;
    if (query === '(prefers-reduced-motion:reduce)') return media.reduced;
    throw new Error(`Unexpected media query: ${query}`);
  };
  stage.getBoundingClientRect = () => ({ top: stageTop - window.scrollY, bottom: stageTop + 2850 - window.scrollY });
  document = {
    activeElement: outside,
    querySelector: selector => selector === '.home-story' ? stage : selector === '.landing-lab-frame' ? iframe : selector === '.atlas-site-header' ? { getBoundingClientRect: () => ({ height: 88 }) } : null,
    querySelectorAll: () => [],
    getElementById: id => ids.get(id) || null,
    createElement() { throw new Error('Story selection must reuse the existing content'); },
  };
  const flush = () => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach(callback => callback());
  };
  const scroll = (delta, immediate = true) => {
    window.scrollY = stageTop - inset + delta;
    window.dispatch('scroll');
    if (immediate) flush();
  };
  const settle = () => { window.scrollY = scrolls.at(-1).top; window.dispatch('scroll'); flush(); };
  const changeMedia = (name, matches) => { media[name].matches = matches; media[name].dispatch('change'); flush(); };
  vm.runInNewContext(source, { document, window, location: new URL('https://atlas.test/'), Date: { now: () => now } }, { timeout: 1000 });
  flush();
  return {
    document, stage, rail, panels, descriptions, descriptionLinks, panelLinks, controls, buttons, introActions, introButtons,
    nextButton, iframe, childDocument, input, pathsTitle, outside, window, scrolls, frames,
    scroll, settle, flush, changeMedia, target: index => stageTop - inset + 550 + index * 500,
    advance: milliseconds => { now += milliseconds; },
    blur: () => { document.activeElement = outside; stage.dispatch('focusout'); flush(); },
  };
}

function assertSelected(page, index) {
  assert.equal(page.stage.dataset.mode, ['cases', 'lab', 'agent'][index]);
  assert.deepEqual(page.panels.map(panel => panel.hidden), [0, 1, 2].map(item => item !== index));
  assert.deepEqual(page.panels.map(panel => panel.inert), [0, 1, 2].map(item => item !== index));
  assert.deepEqual(page.descriptions.map(description => description.hidden), [0, 1, 2].map(item => item !== index));
  assert.deepEqual(page.buttons.map(button => button.attributes['aria-expanded']), [0, 1, 2].map(item => String(item === index)));
}

test('scroll hands off at the boundary and follows the latest position when rapidly reversed', () => {
  const page = fixture();
  for (const [delta, phase, index] of [[0, 'intro', 0], [1, 'handoff', 0], [339, 'handoff', 0], [340, 'story', 0], [999, 'story', 0], [1000, 'story', 1], [1499, 'story', 1], [1500, 'story', 2], [9000, 'story', 2]]) {
    page.scroll(delta);
    assert.equal(page.stage.dataset.phase, phase);
    assert.equal(page.rail.inert, phase !== 'story');
    assert.equal(page.introActions.inert, phase === 'story');
    assertSelected(page, index);
  }
  for (const delta of [510, 1600, 1020, 510]) page.scroll(delta, false);
  assert.equal(page.frames.size, 1, 'scroll events share one pending RAF');
  page.flush();
  assertSelected(page, 0);
  assert.equal(page.panels[2].getAnimations().length, 0, 'the previous scene animation is cancelled');
  page.scroll(-400);
  assert.equal(page.stage.dataset.phase, 'intro');
  assertSelected(page, 0);
});

test('intro choices remain ordinary buttons and the rail becomes focusable before explicit navigation', () => {
  const page = fixture();
  page.introButtons[1].dispatch('click');
  page.flush();
  assertSelected(page, 1);
  assert.equal(page.stage.dataset.phase, 'intro');
  assert.equal(page.scrolls.length, 0);
  assert.deepEqual(page.introButtons.map(button => button.attributes['aria-pressed']), ['false', 'true', 'false']);
  page.nextButton.dispatch('click');
  assert.strictEqual(page.document.activeElement, page.buttons[2]);
  assert.equal(page.rail.inert, false);
  assert.equal(page.introActions.inert, true);
  assert.equal(page.stage.dataset.phase, 'story');
  assertSelected(page, 2);
});

test('rail navigation uses its scroll destination, replaces an unfinished target and expires the guard', () => {
  const page = fixture();
  page.scroll(340);
  page.buttons[2].dispatch('click');
  assert.equal(page.scrolls.at(-1).top, page.target(2));
  assert.equal(page.scrolls.at(-1).behavior, 'smooth');
  page.scroll(510);
  assertSelected(page, 2);
  page.buttons[0].dispatch('click');
  page.scroll(1550);
  assertSelected(page, 0);
  assert.equal(page.scrolls.at(-1).top, page.target(0));
  page.settle();
  assertSelected(page, 0);
  page.buttons[2].dispatch('click');
  page.advance(1401);
  page.scroll(1010);
  assertSelected(page, 1);
});

test('rail keyboard navigation wraps vertically, supports Home and End, and leaves other keys alone', () => {
  const page = fixture();
  page.scroll(340);
  page.buttons[0].focus();
  let prevented = 0;
  const press = key => page.rail.dispatch('keydown', { key, preventDefault() { prevented++; } });
  for (const [key, index] of [['ArrowUp', 2], ['ArrowDown', 0], ['End', 2], ['Home', 0], ['ArrowDown', 1]]) {
    press(key);
    assert.strictEqual(page.document.activeElement, page.buttons[index]);
    assertSelected(page, index);
    assert.equal(page.scrolls.at(-1).top, page.target(index));
  }
  const scrollCount = page.scrolls.length;
  press('Tab');
  press('ArrowLeft');
  page.document.activeElement = page.descriptionLinks[1];
  press('End');
  assert.equal(prevented, 5);
  assert.equal(page.scrolls.length, scrollCount);
});

test('focused Lab editing holds its live iframe until explicit continue restores the story', () => {
  const page = fixture();
  const frame = page.iframe;
  const childDocument = frame.contentDocument;
  page.scroll(1000);
  frame.focus();
  page.childDocument.dispatch('focusin', { target: page.input });
  page.scroll(1600);
  assertSelected(page, 1);
  assert.equal(page.stage.dataset.paused, 'true');
  page.blur();
  page.scroll(9000);
  assertSelected(page, 1);
  page.nextButton.dispatch('click');
  assertSelected(page, 2);
  assert.equal(page.stage.dataset.paused, 'false');
  assert.strictEqual(page.document.activeElement, page.buttons[2]);
  page.settle();
  page.buttons[0].dispatch('click');
  page.settle();
  page.buttons[1].dispatch('click');
  page.settle();
  assert.strictEqual(page.iframe, frame);
  assert.strictEqual(frame.contentDocument, childDocument);
  assert.equal(frame.src, 'fundamentals.html?embed=home');
  assert.equal(frame.draft, 'unfinished experiment');
});

test('Lab pointer and form interactions keep the editor open even after focus leaves it', () => {
  for (const event of ['pointerdown', 'input', 'change', 'focus']) {
    const page = fixture();
    page.scroll(1000);
    (event === 'focus' ? page.iframe : page.childDocument).dispatch(event);
    page.scroll(1600);
    assertSelected(page, 1);
    assert.equal(page.stage.dataset.paused, 'true', event);
    page.buttons[2].dispatch('click');
    assertSelected(page, 2);
    assert.equal(page.stage.dataset.paused, 'false', event);
  }
});

test('hover or a focused content link temporarily pauses scroll selection without stealing focus', () => {
  const page = fixture();
  page.scroll(1000);
  page.iframe.dispatch('pointerenter');
  page.scroll(1600);
  assertSelected(page, 1);
  assert.equal(page.stage.dataset.paused, 'true');
  page.iframe.dispatch('pointerleave');
  page.flush();
  assertSelected(page, 2);
  page.scroll(510);
  page.descriptionLinks[0].focus();
  page.stage.dispatch('focusin');
  page.scroll(1600);
  assertSelected(page, 0);
  assert.strictEqual(page.document.activeElement, page.descriptionLinks[0]);
  page.blur();
  assertSelected(page, 2);
});

test('continue after the final scene focuses the next section and scrolls beyond the story', () => {
  const page = fixture();
  page.scroll(1500);
  page.nextButton.dispatch('click');
  assert.strictEqual(page.document.activeElement, page.pathsTitle);
  assert.equal(page.pathsTitle.tabIndex, -1);
  assert.equal(page.scrolls.at(-1).top, page.stage.getBoundingClientRect().bottom + page.window.scrollY - 104);
});

test('mobile and reduced motion expose every scene without the enhanced pinning state', () => {
  const assertSequential = page => {
    assert.equal(page.stage.classList.contains('home-story--enhanced'), false);
    assert.equal(page.stage.dataset.phase, 'sequential');
    assert.equal(page.rail.inert, true);
    assert.equal(page.controls.hidden, true);
    assert.equal(page.introActions.hidden, true);
    assert.equal(page.introActions.inert, true);
    assert.deepEqual(page.panels.map(panel => panel.hidden || panel.inert), [false, false, false]);
    assert.deepEqual(page.descriptions.map(description => description.hidden), [false, false, false]);
    assert.deepEqual(page.buttons.map(button => button.attributes['aria-expanded']), ['true', 'true', 'true']);
  };
  for (const options of [{ desktop: false }, { reduced: true }]) {
    const page = fixture(options);
    page.scroll(9000);
    assertSequential(page);
    page.panelLinks.forEach(link => { link.focus(); assert.strictEqual(page.document.activeElement, link); });
    const count = page.scrolls.length;
    page.rail.dispatch('keydown', { key: 'End', preventDefault() { assert.fail('Sequential content must not trap navigation keys'); } });
    assert.equal(page.scrolls.length, count);
  }
  const page = fixture();
  page.scroll(1000);
  page.iframe.focus();
  page.changeMedia('desktop', false);
  assertSequential(page);
  assert.strictEqual(page.document.activeElement, page.iframe);
  assert.equal(page.iframe.draft, 'unfinished experiment');
  page.blur();
  page.changeMedia('desktop', true);
  assert.equal(page.stage.classList.contains('home-story--enhanced'), true);
  page.changeMedia('reduced', true);
  assertSequential(page);
});
