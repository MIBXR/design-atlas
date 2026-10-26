const $ = selector => document.querySelector(selector);
const source = $('#page-source');
const canvas = $('#scene-canvas');
const stage = $('#scene');
const status = $('#render-status');
const demo = new URLSearchParams(location.search).get('demo') === 'plane' ? 'plane' : 'lamp';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const palette = ['#ffb36b', '#ffd9a3', '#8fdcff', '#c79cff', '#ff5f7f'];
const initial = {angle:34, brightness:1450, color:palette[0], enabled:true};
let settings = {...initial};
let refresh = () => {};
let resetMotion = () => {};
let cleanup = () => {};
const topics = {
  散文:'从一段日常出发，读那些微小却值得停留的瞬间。今晚不赶进度，只读到心里安静下来。',
  旅行:'沿着书页走向一座陌生的城市。在街巷、车站和远方的风里，为下一次出发积攒想象。',
  自然:'翻开关于山川、草木与星空的记录。在缓慢生长的故事里，重新听见四季的声音。'
};
document.querySelector(`[data-demo="${demo}"]`).setAttribute('aria-current', 'page');
if (demo === 'plane') $('#interaction-hint').textContent = '移动指针，平面最多倾斜 8°。直接点击主题按钮，或用 Tab 查看贴图里的焦点；灯光也可用面板调整。';

function syncControls() {
  source.style.setProperty('--lamp-color', settings.color);
  source.style.setProperty('--beam-size', `${settings.angle * 2}%`);
  source.style.setProperty('--lamp-strength', `${settings.enabled ? settings.brightness / 2600 * 45 : 0}%`);
  $('#angle').value = settings.angle;
  $('#angle-value').value = `${settings.angle}°`;
  $('#brightness').value = settings.brightness;
  $('#brightness-value').value = `${settings.brightness} lm`;
  $('#light-state').textContent = settings.enabled ? '灯光已开启' : '灯光已关闭';
  $('#light-toggle').setAttribute('aria-pressed', String(settings.enabled));
  $('#light-toggle span').textContent = settings.enabled ? '关闭灯光' : '开启灯光';
  document.querySelectorAll('[data-color]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.color === settings.color)));
  refresh();
}
document.querySelectorAll('[data-topic]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-topic]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  $('#topic-description').textContent = topics[button.dataset.topic];
  refresh();
}));
$('#light-panel').addEventListener('submit', event => event.preventDefault());
for (const name of ['angle', 'brightness']) $(`#${name}`).addEventListener('input', event => {
  settings[name] = Number(event.target.value);
  syncControls();
});
document.querySelectorAll('[data-color]').forEach(button => button.addEventListener('click', () => {
  settings.color = button.dataset.color;
  syncControls();
}));
$('#light-toggle').addEventListener('click', () => { settings.enabled = !settings.enabled; syncControls(); });
$('#reset').addEventListener('click', reset);
function reset() { settings = {...initial}; resetMotion(); syncControls(); }

function fallback(error) {
  cleanup();
  window.__HIC_UNINSTALL__?.();
  canvas.removeAttribute('layoutsubtree');
  source.removeAttribute('style');
  stage.appendChild(source);
  stage.style.height = '';
  document.body.dataset.mode = 'fallback';
  status.textContent = '当前环境无法运行 WebGL 光照，显示的是静态示意。';
  refresh = () => {};
  resetMotion = () => {};
  syncControls();
  console.warn('HTML-in-Canvas sample fallback:', error);
}

// 0.1.x polyfill 的函数形参长度为 3，Three 会将其识别成原生短重载。
// 六参包装保留 polyfill 的上传调用，桥接重载判断；只处理 polyfill，不改原生实现。
function installThreeHtmlTextureCompatibility() {
  if (!window.__HTML_IN_CANVAS_POLYFILL__) return;
  for (const contextConstructor of [globalThis.WebGLRenderingContext, globalThis.WebGL2RenderingContext]) {
    if (!contextConstructor) continue;
    const prototype = contextConstructor.prototype;
    const uploadElement = prototype.texElementImage2D;
    if (!uploadElement || uploadElement.length !== 3) continue;
    Object.defineProperty(prototype, 'texElementImage2D', {
      configurable:true, writable:true,
      value:function texElementImage2D(target, level, internalFormat, format, type, element) {
        uploadElement.call(this, target, level, internalFormat, format, type, element);
      }
    });
  }
}

async function initialize() {
  const [THREE, {InteractionManager}, {installHtmlInCanvasPolyfill}] = await Promise.all([
    import('three'), import('three/addons/interaction/InteractionManager.js'), import('three-html-render/polyfill')
  ]);
  canvas.setAttribute('layoutsubtree', '');
  canvas.appendChild(source);
  installHtmlInCanvasPolyfill();
  installThreeHtmlTextureCompatibility();
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  document.body.dataset.mode = 'loading';
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.setClearColor(0x0a0e12, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 80);
  camera.position.set(0, 0, 18);
  const pageTexture = new THREE.HTMLTexture(source);
  pageTexture.colorSpace = THREE.SRGBColorSpace;
  pageTexture.minFilter = pageTexture.magFilter = THREE.LinearFilter;
  pageTexture.generateMipmaps = false;
  const page = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({
    map:pageTexture, color:0xc5cad4, roughness:.96, metalness:0, transparent:true, alphaTest:.005
  }));
  scene.add(page);
  scene.add(new THREE.HemisphereLight(0xa3b6c6, 0x34302a, 1.15));
  scene.add(new THREE.AmbientLight(0xffffff, 1.8));
  const fill = new THREE.DirectionalLight(0x91a6c8, .24);
  fill.position.set(-4.8, 5.6, 7.4);
  scene.add(fill);
  const interactions = new InteractionManager();
  interactions.connect(renderer, camera);
  interactions.add(page);
  const down = new THREE.Vector3(0, -1, 0);
  const up = new THREE.Vector3(0, 1, 0);
  const anchor = new THREE.Vector3();
  const position = new THREE.Vector3();
  const previous = new THREE.Vector3();
  const aimTarget = new THREE.Vector3(0, 0, .08);
  const lastTarget = aimTarget.clone();
  const pointerVelocity = new THREE.Vector3();
  const temp = new THREE.Vector3();
  const tempB = new THREE.Vector3();
  const tempC = new THREE.Vector3();
  const velocity = new THREE.Vector3();
  const direction = down.clone();
  const ropeDirection = down.clone();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const lampNdc = new THREE.Vector3();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -.08);
  const lamp = new THREE.Group();
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, 1, 8), new THREE.MeshStandardMaterial({color:0x8d989b, metalness:.7, roughness:.4}));
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(.22, .54, .26, 40, 1, true), new THREE.MeshStandardMaterial({color:0x74908e, metalness:.65, roughness:.36, side:THREE.DoubleSide}));
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(.12, 20, 12), new THREE.MeshStandardMaterial({color:0xffe4bf, emissive:initial.color, emissiveIntensity:3.2}));
  bulb.position.y = -.12;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(.54, .025, 8, 40), new THREE.MeshStandardMaterial({color:0xc6ad7b, metalness:.7, roughness:.3}));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -.13;
  const spot = new THREE.SpotLight(initial.color, 1, 18, THREE.MathUtils.degToRad(initial.angle), .88, 2);
  spot.position.y = -.17;
  spot.target.position.set(0, -7, 0);
  const bulbLight = new THREE.PointLight(initial.color, 1, 3.2, 2);
  bulbLight.position.y = -.17;
  lamp.add(shade, rim, bulb, spot, spot.target, bulbLight);
  scene.add(lamp);
  if (demo === 'lamp') scene.add(cable);
  else { shade.visible = rim.visible = bulb.visible = false; }

  let frame = 0, lastTime = 0, accumulator = 0, stableFrames = 0;
  let pulling = false, pullId = -1, pullStrength = 0, lastPointerTime = 0;
  let beamId = -1, beamX = 0, beamY = 0, beamAngle = 34, beamDragged = false;
  let painted = false, disposed = false, pageWidth = 1, pageHeight = 1;
  const fixedStep = 1 / 120, ropeLength = 1.22;
  function requestFrame() {
    if (!frame && !disposed && !document.hidden) {lastTime = performance.now(); frame = requestAnimationFrame(animate);}
  }
  function alignPage() {
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld();
    interactions.update();
  }
  function resize() {
    const width = stage.clientWidth;
    source.style.width = `${width - (width < 600 ? 20 : 40)}px`;
    pageWidth = source.offsetWidth / 100;
    pageHeight = source.offsetHeight / 100;
    const height = source.offsetHeight + 146;
    stage.style.height = `${height + 2}px`;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    camera.left = -width / 200; camera.right = width / 200;
    camera.top = height / 200; camera.bottom = -height / 200;
    camera.updateProjectionMatrix();
    page.scale.set(pageWidth, pageHeight, 1);
    page.position.y = -.58;
    anchor.set(0, page.position.y + pageHeight / 2 + 1.27, 1.18);
    resetMotion();
    alignPage();
    canvas.requestPaint();
  }
  resetMotion = () => {
    pulling = false; pullId = beamId = -1; pullStrength = 0;
    position.copy(anchor).add(new THREE.Vector3(.16, -ropeLength, .08));
    position.sub(anchor).normalize().multiplyScalar(ropeLength).add(anchor);
    previous.copy(position);
    pointerVelocity.set(0, 0, 0);
    direction.copy(down);
    page.rotation.set(0, 0, 0);
    stableFrames = reducedMotion.matches ? 80 : 0;
    if (demo === 'plane') {lamp.position.set(0, 3, 4); lamp.quaternion.setFromUnitVectors(down, new THREE.Vector3(0, -3, -4).normalize());}
    alignPage(); requestFrame();
  };
  function updateRig() {
    if (demo === 'plane') return;
    ropeDirection.copy(position).sub(anchor).normalize();
    cable.position.copy(anchor).add(position).multiplyScalar(.5);
    cable.scale.y = ropeLength;
    cable.quaternion.setFromUnitVectors(up, ropeDirection);
    if (reducedMotion.matches) direction.copy(down).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(down, ropeDirection));
    else if (pulling) direction.lerp(temp.copy(aimTarget).sub(position).normalize(), .32).normalize();
    else direction.lerp(temp.copy(down).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(down, ropeDirection)), .14).normalize();
    lamp.position.copy(position);
    lamp.quaternion.setFromUnitVectors(down, direction);
  }
  function stepPhysics() {
    velocity.copy(position).sub(previous).multiplyScalar(pulling ? .985 : .9948);
    previous.copy(position);
    position.add(velocity); position.y -= 9.81 * fixedStep * fixedStep;
    if (pulling) {
      tempB.copy(aimTarget).sub(anchor).normalize().lerp(down, 1 - pullStrength * .82).normalize();
      tempC.copy(tempB).multiplyScalar(ropeLength).add(anchor).sub(position);
      temp.copy(position).sub(anchor).normalize();
      tempC.addScaledVector(temp, -tempC.dot(temp));
      position.addScaledVector(tempC, 52 * fixedStep * fixedStep);
    }
    temp.copy(position).sub(anchor).normalize().multiplyScalar(ropeLength);
    position.copy(anchor).add(temp);
    velocity.copy(position).sub(previous);
    stableFrames = !pulling && velocity.lengthSq() < .000000014 ? stableFrames + 1 : 0;
  }
  function animate(time) {
    frame = 0;
    if (disposed || !painted || document.hidden) return;
    if (demo === 'lamp' && !reducedMotion.matches && stableFrames < 80) {
      accumulator = Math.min(accumulator + Math.min((time - lastTime) / 1000, .05), fixedStep * 5);
      while (accumulator >= fixedStep) {stepPhysics(); accumulator -= fixedStep;}
    }
    lastTime = time;
    updateRig();
    try {renderer.render(scene, camera);} catch (error) {fallback(error); return;}
    if (demo === 'lamp' && !reducedMotion.matches && (pulling || stableFrames < 80)) frame = requestAnimationFrame(animate);
  }
  refresh = () => {
    spot.color.set(settings.color);
    spot.power = settings.enabled ? settings.brightness : 0;
    spot.angle = THREE.MathUtils.degToRad(settings.angle);
    bulbLight.color.set(settings.color);
    bulbLight.power = settings.enabled ? Math.max(18, settings.brightness * .026) : 0;
    bulb.material.emissive.set(settings.color);
    bulb.material.emissiveIntensity = settings.enabled ? 2.4 + settings.brightness / 850 : .04;
    canvas.requestPaint(); requestFrame();
  };
  function pointerTarget(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    if (!raycaster.ray.intersectPlane(plane, aimTarget)) return false;
    lampNdc.copy(position).project(camera);
    pullStrength = THREE.MathUtils.smoothstep(Math.hypot((pointer.x - lampNdc.x) * rect.width / rect.height, pointer.y - lampNdc.y), .08, 1.15);
    return true;
  }
  function onDown(event) {
    if (demo !== 'lamp' || !inSurface(event.target) || event.target.closest('button,input,a,form')) return;
    if (event.button === 2) {
      beamId = event.pointerId; beamX = event.clientX; beamY = event.clientY;
      beamAngle = settings.angle; beamDragged = false; return;
    }
    if (event.button !== 0 || reducedMotion.matches || !pointerTarget(event)) return;
    pulling = true; pullId = event.pointerId; stableFrames = 0;
    lastPointerTime = performance.now(); lastTarget.copy(aimTarget); pointerVelocity.set(0, 0, 0);
    event.preventDefault(); requestFrame();
  }
  function onMove(event) {
    if (demo === 'plane' && !reducedMotion.matches) {
      const rect = canvas.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      const tilt = new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1).clampLength(0, 1);
      page.rotation.y = tilt.x * THREE.MathUtils.degToRad(8);
      page.rotation.x = tilt.y * THREE.MathUtils.degToRad(8);
      alignPage(); requestFrame(); return;
    }
    if (event.pointerId === beamId) {
      const x = event.clientX - beamX, y = event.clientY - beamY;
      if (Math.hypot(x, y) >= 4) beamDragged = true;
      if (beamDragged) { settings.angle = THREE.MathUtils.clamp(Math.round(beamAngle + x * .14), 16, 58); syncControls(); }
      return;
    }
    if (!pulling || event.pointerId !== pullId || !pointerTarget(event)) return;
    const now = performance.now(), elapsed = THREE.MathUtils.clamp((now - lastPointerTime) / 1000, .008, .05);
    pointerVelocity.lerp(temp.copy(aimTarget).sub(lastTarget).multiplyScalar(1 / elapsed), .34);
    lastTarget.copy(aimTarget); lastPointerTime = now; stableFrames = 0; requestFrame();
  }
  function onUp(event) {
    if (event.pointerId === beamId) {
      if (!beamDragged && event.type !== 'pointercancel') {settings.color = palette[(palette.indexOf(settings.color) + 1) % palette.length]; syncControls();}
      beamId = -1; return;
    }
    if (!pulling || event.pointerId !== pullId) return;
    velocity.copy(position).sub(previous).multiplyScalar(1 / fixedStep);
    temp.copy(position).sub(anchor).normalize();
    pointerVelocity.addScaledVector(temp, -pointerVelocity.dot(temp)).clampLength(0, 6);
    velocity.addScaledVector(pointerVelocity, THREE.MathUtils.lerp(.055, .12, pullStrength));
    tempB.copy(anchor).addScaledVector(down, ropeLength).sub(position);
    tempB.addScaledVector(temp, -tempB.dot(temp));
    if (tempB.lengthSq() > .0001) velocity.addScaledVector(tempB.normalize(), THREE.MathUtils.lerp(.32, 1.6, pullStrength));
    velocity.clampLength(0, 4.25);
    previous.copy(position).addScaledVector(velocity, -fixedStep);
    pulling = false; pullId = -1; pullStrength = 0; stableFrames = 0; requestFrame();
  }
  function onPaint() {
    painted = true; pageTexture.needsUpdate = true;
    document.body.dataset.mode = 'webgl';
    status.textContent = `${window.__HTML_IN_CANVAS_POLYFILL__ ? 'SVG foreignObject polyfill' : '原生 HTML-in-Canvas'} · WebGL 实时光照${reducedMotion.matches ? ' · 已减少动态' : ''}`;
    requestFrame();
  }
  function onVisibility() {if (document.hidden) {cancelAnimationFrame(frame); frame = 0;} else requestFrame();}
  function onMotion() {resetMotion(); canvas.requestPaint();}
  function inSurface(target) {return target === canvas || source.contains(target);}
  function onDoubleClick(event) {if (demo === 'lamp' && inSurface(event.target) && !event.target.closest('button,input,a')) reset();}
  function onContext(event) {if (demo === 'lamp' && inSurface(event.target) && !event.target.closest('input')) event.preventDefault();}
  canvas.addEventListener('paint', onPaint);
  // polyfill 会把 canvas 后代移到透明 DOM host；委托在 document 以接收同一批真实控件事件。
  document.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, {passive:true});
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
  document.addEventListener('dblclick', onDoubleClick);
  document.addEventListener('contextmenu', onContext);
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);
  reducedMotion.addEventListener('change', onMotion);
  const sizeObserver = new ResizeObserver(() => {if (source.offsetHeight / 100 !== pageHeight) resize();});
  sizeObserver.observe(source);
  cleanup = () => {
    disposed = true; cancelAnimationFrame(frame); clearTimeout(readyTimer); sizeObserver.disconnect();
    canvas.removeEventListener('paint', onPaint);
    document.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    document.removeEventListener('dblclick', onDoubleClick);
    document.removeEventListener('contextmenu', onContext);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    reducedMotion.removeEventListener('change', onMotion);
    interactions.disconnect(); pageTexture.dispose();
    scene.traverse(object => {object.geometry?.dispose(); object.material?.dispose();});
    renderer.dispose();
  };
  const readyTimer = setTimeout(() => {if (!painted) fallback(new Error('HTML texture snapshot was not available'));}, 10000);
  await document.fonts.ready;
  resize(); syncControls();
}
window.addEventListener('pagehide', () => cleanup(), {once:true});
initialize().catch(fallback);
