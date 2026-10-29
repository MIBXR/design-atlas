const $ = selector => document.querySelector(selector);
const canvas = $('#scene-canvas');
const pageSource = $('#page-source');
const stage = $('#scene');
const preview = $('#scene-preview');
const status = $('#render-status');
const errorNotice = $('#scene-error');
const demo = new URLSearchParams(location.search).get('demo') === 'plane' ? 'plane' : 'lamp';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const COLOR_PRESETS = ['#ffb36b', '#ffd9a3', '#8fdcff', '#c79cff', '#ff5f7f'];
const INITIAL_LIGHT = {enabled:true, angle:34, brightness:1450, color:COLOR_PRESETS[0]};
const CONCEPTS = {
  Space:'A sandbox universe where runtime state evolves with clear boundaries.',
  Meta:'A basic game unit that owns fields and receives rules.',
  Field:'Explicit data that keeps layout derivable and tightly packed.',
  Rule:'Rules declare what they need, and runtime derives the layout.',
  Latent:'Long-lived space-level systems for global capability and reusable scratch.'
};
let lighting = {...INITIAL_LIGHT};
const lightingRef = {current:lighting};
const wakeRef = {current:null};
const resetMotionRef = {current:null};
let refresh = () => {};
let cleanup = () => {};
const loadingPage = pageSource.cloneNode(true);
loadingPage.removeAttribute('id');
loadingPage.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
loadingPage.querySelectorAll('button,input').forEach(element => element.tabIndex = -1);
preview.appendChild(loadingPage);
canvas.appendChild(pageSource);

function syncControls() {
  pageSource.style.setProperty('--lamp-color', lighting.color);
  pageSource.style.setProperty('--beam-size', `${lighting.angle * 2}%`);
  pageSource.style.setProperty('--lamp-strength', `${lighting.enabled ? lighting.brightness / 2600 * 45 : 0}%`);
  $('#angle').value = lighting.angle;
  $('#angle-value').value = `${lighting.angle}°`;
  $('#brightness').value = lighting.brightness;
  $('#brightness-value').value = `${lighting.brightness} lm`;
  $('#custom-color').value = lighting.color;
  $('#color-value').value = lighting.color.toUpperCase();
  const toggle = $('#light-toggle');
  toggle.classList.toggle('is-on', lighting.enabled);
  toggle.setAttribute('aria-pressed', String(lighting.enabled));
  toggle.setAttribute('aria-label', lighting.enabled ? 'Turn spotlight off' : 'Turn spotlight on');
  toggle.lastChild.textContent = lighting.enabled ? 'ON' : 'OFF';
  pageSource.querySelectorAll('[data-color]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.color === lighting.color);
    button.setAttribute('aria-pressed', String(button.dataset.color === lighting.color));
  });
}
function setLighting(change) {
  lighting = typeof change === 'function' ? change(lighting) : change;
  lightingRef.current = lighting;
  syncControls();
  refresh();
}
function resetLight() {setLighting({...INITIAL_LIGHT}); resetMotionRef.current?.();}
pageSource.querySelectorAll('[data-concept]').forEach(button => button.addEventListener('click', () => {
  const concept = button.dataset.concept;
  pageSource.querySelectorAll('[data-concept]').forEach(item => {
    item.classList.toggle('is-active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  $('#concept-name').textContent = concept;
  $('#concept-description').lastChild.textContent = CONCEPTS[concept];
  canvas.requestPaint?.();
  wakeRef.current?.(false);
}));
for (const name of ['angle','brightness']) $(`#${name}`).addEventListener('input', event => setLighting({...lighting,[name]:Number(event.target.value)}));
pageSource.querySelectorAll('[data-color]').forEach(button => button.addEventListener('click', () => setLighting({...lighting,color:button.dataset.color})));
$('#custom-color').addEventListener('input', event => setLighting({...lighting,color:event.target.value}));
$('#light-toggle').addEventListener('click', () => setLighting({...lighting,enabled:!lighting.enabled}));
$('#reset').addEventListener('click', resetLight);

function fallback(error) {
  cleanup();
  window.__HIC_UNINSTALL__?.();
  canvas.removeAttribute('layoutsubtree');
  pageSource.removeAttribute('style');
  stage.appendChild(pageSource);
  document.body.dataset.mode = 'fallback';
  preview.classList.add('is-hidden');
  status.classList.add('is-hidden');
  errorNotice.hidden = false;
  errorNotice.textContent = '当前环境无法运行 WebGL 光照，显示的是静态示意。';
  stage.setAttribute('aria-busy', 'false');
  refresh = () => {};
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
  // SVG 快照的源页面可以高于视口，body 的裁切不能截断窄版控制面板。
  installHtmlInCanvasPolyfill({pageStyles:'html,body{overflow:visible!important}'});
  installThreeHtmlTextureCompatibility();
  status.lastChild.textContent = ' PREPARING HTML SURFACE';
  const DOWN = new THREE.Vector3(0, -1, 0);
  const UP = new THREE.Vector3(0, 1, 0);
  const BASE_LIGHT_DIRECTION = DOWN.clone();
    let disposed = false;
    let painted = false;
    let hasFit = false;
    let fittedSourceHeight = 0;
    let frame = 0;
    let animationFrame = 0;
    let resizeFrame = 0;
    let lastTime = performance.now();
    let accumulator = 0;
    let stableFrames = 0;
    let pulling = false;
    let pullPointerId = -1;
    let lastPointerTime = 0;
    let pullStrength = 0;
    let beamPointerId = -1;
    let beamStartX = 0;
    let beamStartY = 0;
    let beamStartAngle = INITIAL_LIGHT.angle;
    let beamDragged = false;

    const fixedStep = 1 / 120;
    const ropeLength = 1.22;
    const pageTopToAnchor = 1.18;
    const gravity = new THREE.Vector3(0, -9.81, 0);
    const anchor = new THREE.Vector3(0, 4.72, 1.18);
    const position = new THREE.Vector3(0.16, anchor.y - ropeLength, anchor.z + 0.08);
    const previous = position.clone().add(new THREE.Vector3(0.018, 0, -0.012));
    const aimTarget = new THREE.Vector3(0, 0.3, 0.08);
    const pointerVelocity = new THREE.Vector3();
    const lastPointerTarget = aimTarget.clone();

    const temp = new THREE.Vector3();
    const tempB = new THREE.Vector3();
    const tempC = new THREE.Vector3();
    const velocity = new THREE.Vector3();
    const ropeDirection = new THREE.Vector3();
    const lightDirection = new THREE.Vector3();
    const currentLightDirection = BASE_LIGHT_DIRECTION.clone();
    const midpoint = new THREE.Vector3();
    const swingQuaternion = new THREE.Quaternion();
    const lampQuaternion = new THREE.Quaternion();
    const cableQuaternion = new THREE.Quaternion();
    const pointer = new THREE.Vector2();
    const lampNdc = new THREE.Vector3();
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.08);
    const raycaster = new THREE.Raycaster();

    const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:"high-performance"});

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x010204, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010204);

    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 80);
    camera.position.set(0, 0.2, 13.6);

    const pageGroup = new THREE.Group();
    pageGroup.position.set(0, -0.35, 0);
    scene.add(pageGroup);

    const pageTexture = new THREE.HTMLTexture(pageSource);
    pageTexture.colorSpace = THREE.SRGBColorSpace;
    pageTexture.minFilter = THREE.LinearFilter;
    pageTexture.magFilter = THREE.LinearFilter;
    pageTexture.generateMipmaps = false;

    const pageGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const pageMaterial = new THREE.MeshStandardMaterial({
      map: pageTexture,
      color: 0xc5cad4,
      roughness: 0.96,
      metalness: 0,
      transparent: true,
      alphaTest: 0.005,
      side: THREE.FrontSide,
    });
    const pageMesh = new THREE.Mesh(pageGeometry, pageMaterial);
    pageGroup.add(pageMesh);

    const backingMaterial = new THREE.MeshStandardMaterial({
      color: 0x080a10,
      roughness: 0.9,
      metalness: 0.03,
    });
    const backing = new THREE.Mesh(new THREE.PlaneGeometry(1.018, 1.028), backingMaterial);
    backing.position.z = -0.035;
    pageGroup.add(backing);

    const ambient = new THREE.HemisphereLight(0x71809b, 0x151118, 0.58);
    scene.add(ambient);

    const fillLight = new THREE.DirectionalLight(0x91a6c8, 0.24);
    fillLight.position.set(-4.8, 5.6, 7.4);
    scene.add(fillLight);

    const lampRoot = new THREE.Group();
    scene.add(lampRoot);

    const ceilingCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.3, 0.11, 24),
      new THREE.MeshStandardMaterial({ color: 0x101218, roughness: 0.64, metalness: 0.7 }),
    );
    ceilingCap.position.copy(anchor).add(new THREE.Vector3(0, 0.08, 0));
    scene.add(ceilingCap);

    const cable = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 1, 10),
      new THREE.MeshStandardMaterial({ color: 0x121318, roughness: 0.5, metalness: 0.55 }),
    );
    scene.add(cable);

    const shadeGroup = new THREE.Group();
    lampRoot.add(shadeGroup);

    const shadeProfile = [
      new THREE.Vector2(0.08, 0.08),
      new THREE.Vector2(0.18, 0.02),
      new THREE.Vector2(0.43, -0.1),
      new THREE.Vector2(0.82, -0.25),
      new THREE.Vector2(1.08, -0.36),
      new THREE.Vector2(1.1, -0.41),
    ];
    const shadeMaterial = new THREE.MeshStandardMaterial({
      color: 0x101116,
      roughness: 0.36,
      metalness: 0.74,
      side: THREE.DoubleSide,
    });
    const shade = new THREE.Mesh(new THREE.LatheGeometry(shadeProfile, 48), shadeMaterial);
    shadeGroup.add(shade);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1.095, 0.027, 8, 48),
      new THREE.MeshStandardMaterial({ color: 0x17191f, roughness: 0.28, metalness: 0.82 }),
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -0.397;
    shadeGroup.add(rim);

    const undersideMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(INITIAL_LIGHT.color).multiplyScalar(0.18),
      emissive: INITIAL_LIGHT.color,
      emissiveIntensity: 0.42,
      roughness: 0.92,
      side: THREE.DoubleSide,
    });
    const underside = new THREE.Mesh(new THREE.CircleGeometry(1.055, 48), undersideMaterial);
    underside.rotation.x = Math.PI / 2;
    underside.position.y = -0.385;
    shadeGroup.add(underside);

    const connector = new THREE.Mesh(
      new THREE.CylinderGeometry(0.095, 0.12, 0.2, 20),
      new THREE.MeshStandardMaterial({ color: 0x9c6744, roughness: 0.44, metalness: 0.66 }),
    );
    connector.position.y = 0.08;
    shadeGroup.add(connector);

    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd7ad,
      emissive: INITIAL_LIGHT.color,
      emissiveIntensity: 3.2,
      roughness: 0.2,
    });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 12), bulbMaterial);
    bulb.scale.y = 1.2;
    bulb.position.y = -0.33;
    shadeGroup.add(bulb);

    const glowTexture = createGlowTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: INITIAL_LIGHT.color,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMaterial);
    glow.position.y = -0.36;
    glow.scale.set(0.96, 0.96, 0.96);
    shadeGroup.add(glow);

    const spot = new THREE.SpotLight(
      INITIAL_LIGHT.color,
      1,
      18,
      THREE.MathUtils.degToRad(INITIAL_LIGHT.angle),
      0.88,
      2,
    );
    spot.power = INITIAL_LIGHT.brightness;
    spot.position.set(0, -0.35, 0);
    spot.target.position.set(0, -7, 0);
    shadeGroup.add(spot, spot.target);

    const bulbLight = new THREE.PointLight(INITIAL_LIGHT.color, 1, 3.2, 2);
    bulbLight.power = 36;
    bulbLight.position.set(0, -0.35, 0);
    shadeGroup.add(bulbLight);

    const interactions = new InteractionManager();
    interactions.connect(renderer, camera);
    interactions.add(pageMesh);

    function createGlowTexture() {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 64;
      textureCanvas.height = 64;
      const context = textureCanvas.getContext("2d");
      if (context) {
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.16, "rgba(255,222,172,.8)");
        gradient.addColorStop(0.46, "rgba(255,170,94,.22)");
        gradient.addColorStop(1, "rgba(255,140,70,0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    function resize() {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, width < 760 ? 1.25 : 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const sourceWidth = pageSource.offsetWidth || 1440;
      const sourceHeight = pageSource.offsetHeight || 810;
      fittedSourceHeight = sourceHeight;
      const portrait = height > width * 1.16;
      const pageWidth = portrait ? 7.2 : 12.8;
      const pageHeight = pageWidth * (sourceHeight / sourceWidth);
      pageMesh.scale.set(pageWidth, pageHeight, 1);
      backing.scale.set(pageWidth, pageHeight, 1);

      pageGroup.position.y = portrait ? -0.62 : -0.38;
      tempB.copy(anchor);
      anchor.set(0, pageGroup.position.y + pageHeight / 2 + pageTopToAnchor, portrait ? 1.1 : 1.18);
      if (hasFit) position.add(tempC.copy(anchor).sub(tempB));
      hasFit = true;
      ceilingCap.position.copy(anchor);
      ceilingCap.position.y += 0.08;

      if (!pulling) {
        const constrained = temp.copy(position).sub(anchor);
        if (constrained.lengthSq() < 0.001) constrained.copy(DOWN);
        constrained.normalize().multiplyScalar(ropeLength);
        position.copy(anchor).add(constrained);
        previous.copy(position);
      }

      const fitHeight = pageHeight + 3.1;
      const fitWidth = pageWidth + 1.25;
      const halfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);
      const distanceForHeight = fitHeight / (2 * Math.tan(halfFov));
      const distanceForWidth = fitWidth / (2 * Math.tan(halfFov) * camera.aspect);
      const cameraDistance = Math.max(distanceForHeight, distanceForWidth);
      const cameraDrop = portrait ? 0.78 : 0.62;
      const upwardTarget = portrait ? -0.04 : 0.06;
      camera.position.set(0, pageGroup.position.y - cameraDrop, cameraDistance);
      camera.lookAt(0, pageGroup.position.y + upwardTarget, 0);
      camera.updateMatrixWorld();
      alignInteractions();
      canvas.requestPaint?.();
      wake();
    }

    function updateRig() {
      ropeDirection.copy(position).sub(anchor).normalize();
      midpoint.copy(anchor).add(position).multiplyScalar(0.5);
      cable.position.copy(midpoint);
      cable.scale.set(1, ropeLength, 1);
      cableQuaternion.setFromUnitVectors(UP, ropeDirection);
      cable.quaternion.copy(cableQuaternion);

      if (pulling) {
        lightDirection.copy(aimTarget).sub(position).normalize();
        currentLightDirection.lerp(lightDirection, 0.32).normalize();
      } else {
        swingQuaternion.setFromUnitVectors(DOWN, ropeDirection);
        lightDirection.copy(BASE_LIGHT_DIRECTION).applyQuaternion(swingQuaternion).normalize();
        if (reducedMotion.matches) currentLightDirection.copy(lightDirection);
        else currentLightDirection.lerp(lightDirection, 0.14).normalize();
      }
      lampQuaternion.setFromUnitVectors(DOWN, currentLightDirection);
      lampRoot.position.copy(position);
      lampRoot.quaternion.copy(lampQuaternion);

    }

    function stepPhysics() {
      velocity.copy(position).sub(previous).multiplyScalar(pulling ? 0.985 : 0.9948);
      previous.copy(position);
      position.add(velocity).addScaledVector(gravity, fixedStep * fixedStep);

      if (pulling) {
          tempB.copy(aimTarget).sub(anchor).normalize();
        tempB.lerp(DOWN, 1 - pullStrength * 0.82).normalize();
        tempC.copy(tempB).multiplyScalar(ropeLength).add(anchor).sub(position);
        temp.copy(position).sub(anchor).normalize();
        tempC.addScaledVector(temp, -tempC.dot(temp));
        position.addScaledVector(tempC, 52 * fixedStep * fixedStep);
      }

      temp.copy(position).sub(anchor);
      if (temp.lengthSq() < 1e-8) temp.copy(DOWN);
      temp.normalize().multiplyScalar(ropeLength);
      position.copy(anchor).add(temp);

      velocity.copy(position).sub(previous);
      if (pulling) {
        stableFrames = 0;
      } else if (velocity.lengthSq() < 0.000000014) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
      }
    }

    function animate(time) {
      animationFrame = 0;
      if (disposed || !painted || document.hidden) return;

      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      accumulator = Math.min(accumulator + delta, fixedStep * 5);
      while (demo === "lamp" && !reducedMotion.matches && accumulator >= fixedStep) {
        stepPhysics();
        accumulator -= fixedStep;
      }

      updateRig();
      try { renderer.render(scene, camera); } catch (error) { fallback(error); return; }
      frame += 1;

      if (demo === "lamp" && !reducedMotion.matches && (pulling || stableFrames < 80 || frame < 4)) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function wake(resetPhysics = true) {
      if (resetPhysics) stableFrames = 0;
      if (!animationFrame && !disposed && !document.hidden) {
        lastTime = performance.now();
        animationFrame = requestAnimationFrame(animate);
      }
    }

    wakeRef.current = wake;

    function pointerNdc(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
    }

    function updatePointerTarget(event) {
      pointerNdc(event);
      if (!raycaster.ray.intersectPlane(interactionPlane, aimTarget)) return false;

      lampNdc.copy(position).project(camera);
      const distanceX = (pointer.x - lampNdc.x) * camera.aspect;
      const distanceY = pointer.y - lampNdc.y;
      const pointerDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      pullStrength = THREE.MathUtils.smoothstep(pointerDistance, 0.08, 1.15);
      return true;
    }

    function onPointerDown(event) {
      if (event.button === 2) {
        beamPointerId = event.pointerId;
        beamStartX = event.clientX;
        beamStartY = event.clientY;
        beamStartAngle = lightingRef.current.angle;
        beamDragged = false;
        pageSource.classList.add("is-adjusting-beam");
        return;
      }
      if (event.button !== 0 || beamPointerId !== -1) return;
      if (!updatePointerTarget(event)) return;

      pulling = true;
      pullPointerId = event.pointerId;
      lastPointerTime = performance.now();
      lastPointerTarget.copy(aimTarget);
      pointerVelocity.set(0, 0, 0);
      canvas.classList.add("is-pulling-light");
      wake();
    }

    function onPointerMove(event) {
      if (demo === "plane") { tiltPage(event); return; }
      if (event.pointerId === beamPointerId) {
        const movementX = event.clientX - beamStartX;
        const movementY = event.clientY - beamStartY;
        if (!beamDragged && Math.hypot(movementX, movementY) >= 4) beamDragged = true;
        if (beamDragged) {
          const nextAngle = THREE.MathUtils.clamp(Math.round(beamStartAngle + movementX * 0.14), 16, 58);
          setLighting((current) => current.angle === nextAngle ? current : { ...current, angle: nextAngle });
          wake();
        }
        return;
      }
      if (!pulling || event.pointerId !== pullPointerId) return;
      if (!updatePointerTarget(event)) return;
      const now = performance.now();
      const elapsed = Math.max(0.008, Math.min(0.05, (now - lastPointerTime) / 1000));
      temp.copy(aimTarget).sub(lastPointerTarget).multiplyScalar(1 / elapsed);
      pointerVelocity.lerp(temp, 0.34);
      lastPointerTarget.copy(aimTarget);
      lastPointerTime = now;
      wake();
    }

    function onPointerUp(event) {
      if (event.pointerId === beamPointerId) {
        const shouldCycleColor = !beamDragged && event.type !== "pointercancel";
        beamPointerId = -1;
        beamDragged = false;
        pageSource.classList.remove("is-adjusting-beam");
        if (shouldCycleColor) {
          setLighting((current) => {
            const currentIndex = COLOR_PRESETS.findIndex((color) => color === current.color.toLowerCase());
            const nextColor = COLOR_PRESETS[(currentIndex + 1) % COLOR_PRESETS.length];
            return { ...current, color: nextColor };
          });
        }
        wake();
        return;
      }
      if (!pulling || event.pointerId !== pullPointerId) return;

      velocity.copy(position).sub(previous).multiplyScalar(1 / fixedStep);
      temp.copy(position).sub(anchor).normalize();
      pointerVelocity.addScaledVector(temp, -pointerVelocity.dot(temp)).clampLength(0, 6);
      const pointerTransfer = THREE.MathUtils.lerp(0.055, 0.12, pullStrength);
      velocity.addScaledVector(pointerVelocity, pointerTransfer);

      tempB.copy(anchor).addScaledVector(DOWN, ropeLength).sub(position);
      tempB.addScaledVector(temp, -tempB.dot(temp));
      if (tempB.lengthSq() > 0.0001) {
        tempB.normalize();
        const returnImpulse = THREE.MathUtils.lerp(0.32, 1.6, pullStrength);
        velocity.addScaledVector(tempB, returnImpulse);
      }
      velocity.clampLength(0, 4.25);
      previous.copy(position).addScaledVector(velocity, -fixedStep);

      pulling = false;
      pullPointerId = -1;
      pullStrength = 0;
      canvas.classList.remove("is-pulling-light");
      wake();
    }

    function resetMotion() {
      pulling = false;
      pullPointerId = -1;
      pullStrength = 0;
      position.copy(anchor).addScaledVector(DOWN, ropeLength);
      previous.copy(position);
      pointerVelocity.set(0, 0, 0);
      currentLightDirection.copy(BASE_LIGHT_DIRECTION);
      canvas.classList.remove("is-pulling-light");
      beamPointerId = -1;
      beamDragged = false;
      pageSource.classList.remove("is-adjusting-beam");
      wake();
    }

    resetMotionRef.current = resetMotion;

    function onResize() {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    }

    function onPaint() {
      painted = true;
      if (!hasFit) return;
      document.body.dataset.mode = 'webgl';
      stage.classList.add('is-ready');
      stage.setAttribute('aria-busy', 'false');
      preview.classList.add('is-hidden');
      status.classList.add('is-hidden');
      canvas.dataset.renderPath = window.__HTML_IN_CANVAS_POLYFILL__ ? 'svg-foreign-object-polyfill' : 'native';
      wake(false);
    }

    function onContextMenu(contextEvent) {
      contextEvent.preventDefault();
    }

    document.addEventListener("pointerdown", onSurfaceDown);
    document.addEventListener("dblclick", onDoubleClick);
    document.addEventListener("contextmenu", onSurfaceContext);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("resize", onResize, { passive: true });
    canvas.addEventListener("paint", onPaint);


    function alignInteractions() {
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld();
      interactions.update();
    }
    function inSurface(target) {return target === canvas || pageSource.contains(target);}
    function onSurfaceDown(event) {
      if (demo !== 'lamp' || !inSurface(event.target) || event.target.closest('[data-interactive]')) return;
      if (event.button !== 2 && reducedMotion.matches) return;
      if (event.pointerType === 'touch') event.preventDefault();
      onPointerDown(event);
    }
    function onDoubleClick(event) {if (demo === 'lamp' && inSurface(event.target) && !event.target.closest('[data-interactive]')) resetMotion();}
    function onSurfaceContext(event) {if (demo === 'lamp' && inSurface(event.target)) onContextMenu(event);}
    function tiltPage(event) {
      if (reducedMotion.matches) return;
      const rect = canvas.getBoundingClientRect();
      const tilt = new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1).clampLength(0, 1);
      pageMesh.rotation.set(tilt.y * THREE.MathUtils.degToRad(8), tilt.x * THREE.MathUtils.degToRad(8), 0);
      backing.rotation.copy(pageMesh.rotation);
      alignInteractions();
      wake(false);
    }
    function onVisibility() {
      if (document.hidden) {cancelAnimationFrame(animationFrame); animationFrame = 0;}
      else wake(false);
    }
    function onMotion() {
      resetMotion();
      pageMesh.rotation.set(0, 0, 0);
      backing.rotation.set(0, 0, 0);
      alignInteractions();
      canvas.requestPaint();
    }
    if (demo === 'plane') {
      for (const mesh of [ceilingCap, cable, shade, rim, underside, connector, bulb, glow]) mesh.visible = false;
    }
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener('change', onMotion);
    const sourceObserver = new ResizeObserver(() => {
      if (hasFit && pageSource.offsetHeight !== fittedSourceHeight) onResize();
    });
    sourceObserver.observe(pageSource);
    const readyTimer = setTimeout(() => {if (!painted) fallback(new Error('HTML snapshot was not available'));}, 10000);
    refresh = () => {
      const color = new THREE.Color(lighting.color);
      const effectiveBrightness = lighting.enabled ? lighting.brightness : 0;
      spot.color.copy(color);
      spot.power = effectiveBrightness;
      spot.angle = THREE.MathUtils.degToRad(lighting.angle);
      bulbLight.color.copy(color);
      bulbLight.power = lighting.enabled ? Math.max(18, lighting.brightness * 0.026) : 0;
      bulbMaterial.emissive.copy(color);
      bulbMaterial.emissiveIntensity = lighting.enabled ? 2.4 + lighting.brightness / 850 : 0.04;
      glowMaterial.color.copy(color);
      glowMaterial.opacity = lighting.enabled ? 0.52 + lighting.brightness / 4200 : 0;
      undersideMaterial.color.copy(color).multiplyScalar(0.18);
      undersideMaterial.emissive.copy(color);
      undersideMaterial.emissiveIntensity = lighting.enabled ? 0.22 + lighting.brightness / 7250 : 0.03;
      canvas.requestPaint();
      wake();
    };
    cleanup = () => {
      disposed = true;
      clearTimeout(readyTimer);
      sourceObserver.disconnect();
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
      document.removeEventListener('pointerdown', onSurfaceDown);
      document.removeEventListener('dblclick', onDoubleClick);
      document.removeEventListener('contextmenu', onSurfaceContext);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('paint', onPaint);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', onMotion);
      interactions.disconnect();
      wakeRef.current = resetMotionRef.current = null;
      pageTexture.dispose();
      scene.traverse(object => {object.geometry?.dispose(); object.material?.dispose();});
      glowTexture.dispose();
      renderer.dispose();
    };
    await document.fonts.ready;
    await Promise.all([...pageSource.querySelectorAll('img')].map(image => image.decode()));
    resize();
    if (reducedMotion.matches) resetMotion();
    updateRig();
    canvas.requestPaint();
    wake();
}
window.addEventListener('pagehide', () => cleanup(), {once:true});
initialize().catch(fallback);
