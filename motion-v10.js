/**
 * Portfolio motion. Dependencies: window.gsap + window.ScrollTrigger (3.15).
 * CSS contract: main[data-motion="off"] is the static, fully readable state.
 * No router, menu, transition, media-player or drag-and-drop behavior lives here.
 */
export function initMotion(root = document.querySelector('main')) {
  if (!root?.querySelectorAll) return { destroy() {}, refresh() {} };

  const doc = root.ownerDocument;
  const win = doc.defaultView || window;
  const reducedQuery = win.matchMedia('(prefers-reduced-motion: reduce)');
  const fineQuery = win.matchMedia('(hover: hover) and (pointer: fine)');
  const desktopQuery = win.matchMedia('(min-width: 992px)');
  const originalMotion = root.getAttribute('data-motion');
  const outerDisposers = [];
  let destroyed = false;
  let mounted = null;
  let signature = '';
  let refreshTimer = 0;

  const clamp = (min, max, value) => Math.max(min, Math.min(max, value));
  const all = (selector, scope = root) => [...scope.querySelectorAll(selector)];
  const interactive = target => target instanceof win.Element
    && Boolean(target.closest('a,button,input,select,textarea,[role="button"],[contenteditable="true"]'));

  function state() {
    let manuallyOff = false;
    try { manuallyOff = win.localStorage.getItem('sk-motion') === 'off'; } catch { /* optional storage */ }
    const g = win.gsap;
    const st = win.ScrollTrigger;
    return {
      g, st,
      enabled: Boolean(g?.context) && !reducedQuery.matches && !manuallyOff,
      fine: fineQuery.matches,
      desktop: desktopQuery.matches,
    };
  }

  function mount(settings) {
    const { g, st, enabled, fine, desktop } = settings;
    const disposers = [];
    const measures = [];
    const timers = new Set();
    const generated = new Map();
    const trailOrder = [];
    const context = g?.context ? g.context(() => {}, root) : null;
    let live = true;
    let cleaned = false;

    root.setAttribute('data-motion', enabled ? 'on' : 'off');
    if (enabled && st) g.registerPlugin(st);

    // Events and delayed callbacks also enter this Context, so their tweens revert.
    const scoped = fn => {
      if (!live || destroyed) return undefined;
      let result;
      if (context) context.add(() => { result = fn(); });
      else result = fn();
      return result;
    };

    const listen = (target, type, handler, options) => {
      const callback = event => scoped(() => handler(event));
      target.addEventListener(type, callback, options);
      disposers.push(() => target.removeEventListener(type, callback, options));
      return callback;
    };

    const later = (fn, delay) => {
      const id = win.setTimeout(() => { timers.delete(id); scoped(fn); }, delay);
      timers.add(id);
      return id;
    };

    const staticStyle = (element, values) => {
      if (!element) return;
      const previous = Object.keys(values).map(name => [
        name, element.style.getPropertyValue(name), element.style.getPropertyPriority(name),
      ]);
      Object.entries(values).forEach(([name, value]) => element.style.setProperty(name, value));
      disposers.push(() => previous.forEach(([name, value, priority]) => {
        if (value) element.style.setProperty(name, value, priority);
        else element.style.removeProperty(name);
      }));
    };

    function removeTrail(image) {
      const tween = generated.get(image);
      generated.delete(image);
      const index = trailOrder.indexOf(image);
      if (index !== -1) trailOrder.splice(index, 1);
      tween?.kill();
      image.remove();
    }

    function staticStack(section) {
      staticStyle(section.querySelector('.stack-pin'), {
        height: 'auto', 'min-height': '0', position: 'relative',
      });
      staticStyle(section.querySelector('.stack-stage'), {
        height: 'auto', 'min-height': '0', position: 'relative', display: 'grid',
        'grid-template-columns': 'minmax(0, 1fr)', gap: '24px', transform: 'none',
      });
      all('.stack-card', section).forEach(card => staticStyle(card, {
        position: 'relative', inset: 'auto', width: '100%', opacity: '1',
        visibility: 'visible', transform: 'none', 'pointer-events': 'auto',
      }));
      staticStyle(section.querySelector('.scroll-badge'), { display: 'none' });
    }

    function staticOrbit(orbit) {
      staticStyle(orbit, {
        height: 'auto', 'min-height': '80svh', padding: '140px 20px 70px', display: 'flex', 'flex-wrap': 'wrap',
        'justify-content': 'center', 'align-items': 'center', gap: '18px',
      });
      const centers = new Set();
      all('[data-orbit-center],.orbit-title,h1,h2', orbit).forEach(title => {
        let child = title;
        while (child.parentElement && child.parentElement !== orbit) child = child.parentElement;
        if (!child.matches('.orbit-item')) centers.add(child);
      });
      centers.forEach(center => staticStyle(center, {
        position: 'relative', inset: 'auto', width: '100%', 'flex-basis': '100%', transform: 'none', padding: '0', order: '0',
      }));
      staticStyle(orbit.querySelector('.orbit-items'), { position: 'relative', inset: 'auto', width: '100%', height: 'auto', 'flex-basis': '100%', display: 'flex', 'flex-wrap': 'wrap', 'justify-content': 'center', gap: '18px', order: '1' });
      all('.orbit-item', orbit).forEach(item => staticStyle(item, {
        position: 'relative', inset: 'auto', transform: 'none', opacity: '1', visibility: 'visible',
      }));
    }

    function setupCursorCards() {
      all('[data-cursor-cards]').forEach(hero => {
        const card = hero.querySelector('[data-cursor-card]');
        if (!card) return;
        if (!enabled || !fine || !desktop) {
          staticStyle(card, desktop ? { display: 'none' } : { display: 'block', opacity: '1', visibility: 'visible' });
          return;
        }
        const media = all('[data-cursor-media]', card);
        const originalActive = media.map(item => item.classList.contains('active'));
        let index = Math.max(0, originalActive.findIndex(Boolean));
        const setActive = () => media.forEach((item, i) => item.classList.toggle('active', i === index));
        setActive();
        disposers.push(() => media.forEach((item, i) => item.classList.toggle('active', originalActive[i])));

        g.set(card, { autoAlpha: 0, scale: 0.9, pointerEvents: 'none', x: 0, y: 0, rotation: 0 });
        const xTo = g.quickTo(card, 'x', { duration: 0.65, ease: 'power3.out' });
        const yTo = g.quickTo(card, 'y', { duration: 0.65, ease: 'power3.out' });
        const rTo = g.quickTo(card, 'rotation', { duration: 0.6, ease: 'power3.out' });
        let shown = false;
        let previous = null;
        let distance = 0;
        let settleTimer = 0;
        const hide = () => {
          if (shown) g.to(card, { autoAlpha: 0, scale: 0.9, duration: 0.18, overwrite: 'auto' });
          shown = false;
          previous = null;
          distance = 0;
          rTo(0);
        };
        listen(hero, 'pointermove', event => {
          if (event.pointerType === 'touch' || interactive(event.target)) { hide(); return; }
          const bounds = hero.getBoundingClientRect();
          const x = event.clientX - bounds.left + hero.scrollLeft + 16;
          const y = event.clientY - bounds.top + hero.scrollTop + 16;
          if (!shown) {
            xTo(x, x);
            yTo(y, y);
            g.to(card, { autoAlpha: 1, scale: 1, duration: 0.22, overwrite: 'auto' });
            shown = true;
          } else { xTo(x); yTo(y); }
          if (previous) {
            const dx = event.clientX - previous.x;
            const dy = event.clientY - previous.y;
            distance += Math.hypot(dx, dy);
            rTo(clamp(-10, 10, dx * 0.12));
            if (distance >= 280 && media.length > 1) {
              index = (index + 1) % media.length;
              distance %= 280;
              setActive();
            }
          }
          previous = { x: event.clientX, y: event.clientY };
          if (settleTimer) { win.clearTimeout(settleTimer); timers.delete(settleTimer); }
          settleTimer = later(() => rTo(0), 150);
        }, { passive: true });
        listen(hero, 'pointerleave', hide);
        listen(hero, 'focusin', hide);
      });
    }

    function setupWeights() {
      if (!enabled || !fine) return;
      all('h1[data-weight]').forEach(heading => {
        const originalLabel = heading.getAttribute('aria-label');
        if (!originalLabel) heading.setAttribute('aria-label', heading.textContent.replace(/\s+/g, ' ').trim());
        disposers.push(() => {
          if (originalLabel === null) heading.removeAttribute('aria-label');
          else heading.setAttribute('aria-label', originalLabel);
        });

        const walker = doc.createTreeWalker(heading, win.NodeFilter.SHOW_TEXT);
        const textNodes = [];
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (!node.parentElement?.closest('.char,[data-motion-word],script,style')
            && /\S/.test(node.data) && !/[\u2e80-\u9fff\uac00-\ud7af]/u.test(node.data)) textNodes.push(node);
        }

        const chars = [];
        textNodes.forEach(textNode => {
          const parent = textNode.parentNode;
          const fragment = doc.createDocumentFragment();
          const inserted = [];
          textNode.data.split(/(\s+)/u).filter(Boolean).forEach(token => {
            if (/^\s+$/u.test(token)) {
              const space = doc.createTextNode(token);
              inserted.push(space);
              fragment.append(space);
              return;
            }
            const word = doc.createElement('span');
            word.dataset.motionWord = '';
            word.style.display = 'inline-block';
            word.style.whiteSpace = 'nowrap';
            word.setAttribute('aria-hidden', 'true');
            const emphasis = Boolean(parent.closest?.('em'));
            const rest = emphasis ? 400 : 750;
            const near = emphasis ? 800 : 250;
            for (const character of token) {
              const span = doc.createElement('span');
              span.className = 'char';
              span.textContent = character;
              span.style.display = 'inline-block';
              span.style.setProperty('--wght', String(rest));
              span.style.fontVariationSettings = '"wght" var(--wght)';
              word.append(span);
              chars.push({ element: span, rest, near, x: 0, y: 0, to: null });
            }
            inserted.push(word);
            fragment.append(word);
          });
          parent.replaceChild(fragment, textNode);
          disposers.push(() => {
            const first = inserted.find(node => node.parentNode === parent);
            if (first) parent.insertBefore(textNode, first);
            inserted.forEach(node => { if (node.parentNode === parent) parent.removeChild(node); });
          });
        });
        chars.forEach(item => {
          item.to = g.quickTo(item.element, '--wght', { duration: 0.4, ease: 'power2.out' });
        });
        const measure = () => chars.forEach(item => {
          const bounds = item.element.getBoundingClientRect();
          item.x = bounds.left + win.scrollX + bounds.width / 2;
          item.y = bounds.top + win.scrollY + bounds.height / 2;
        });
        measures.push(measure);
        measure();
        listen(win, 'pointermove', event => {
          if (event.pointerType === 'touch') return;
          const x = event.clientX + win.scrollX;
          const y = event.clientY + win.scrollY;
          chars.forEach(item => {
            const influence = 1 - clamp(0, 1, Math.hypot(item.x - x, item.y - y) / 400);
            item.to(item.rest + (item.near - item.rest) * influence);
          });
        }, { passive: true });
        listen(doc.documentElement, 'pointerleave', () => chars.forEach(item => item.to(item.rest)));
      });
    }

    function setupStacks() {
      all('[data-stack]').forEach(section => {
        const pin = section.querySelector('.stack-pin');
        const stage = section.querySelector('.stack-stage');
        const cards = all('.stack-card', section).sort((a, b) =>
          Number(a.dataset.rank ?? a.dataset.ranks ?? 0) - Number(b.dataset.rank ?? b.dataset.ranks ?? 0));
        if (!enabled || !desktop || !st || !pin || !stage || cards.length < 2) {
          staticStack(section);
          return;
        }
        cards.forEach((card, index) => g.set(card, {
          y: index * -36, scale: Math.max(0.84, 1 - index * 0.08),
          autoAlpha: 1, zIndex: cards.length - index, transformOrigin: '50% 50%',
        }));
        const steps = cards.length - 1;
        const timeline = g.timeline({
          defaults: { duration: 1, ease: 'none' },
          scrollTrigger: {
            trigger: section, pin, start: 'top top',
            end: () => `+=${win.innerHeight * 2.4}`,
            scrub: 0.35, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
          },
        });
        for (let index = 0; index < steps; index += 1) {
          timeline.to(cards[index], { y: () => win.innerHeight * 0.95, opacity: 0 }, index);
          for (let next = index + 1; next < cards.length; next += 1) {
            const depth = next - index - 1;
            timeline.to(cards[next], { y: depth * -36, scale: Math.max(0.84, 1 - depth * 0.08) }, index);
          }
        }
        const badge = section.querySelector('.scroll-badge');
        if (badge) timeline.to(badge, { rotation: 180, duration: steps }, 0);

        if (fine) {
          g.set(stage, { transformPerspective: 1100, transformStyle: 'preserve-3d' });
          const xTo = g.quickTo(stage, 'rotationX', { duration: 0.6, ease: 'power3.out' });
          const yTo = g.quickTo(stage, 'rotationY', { duration: 0.6, ease: 'power3.out' });
          listen(pin, 'pointermove', event => {
            const bounds = pin.getBoundingClientRect();
            xTo(-clamp(-1, 1, (event.clientY - bounds.top) / bounds.height * 2 - 1) * 6);
            yTo(clamp(-1, 1, (event.clientX - bounds.left) / bounds.width * 2 - 1) * 10);
          }, { passive: true });
          listen(pin, 'pointerleave', () => { xTo(0); yTo(0); });
        }
      });
    }

    function setupCollages() {
      if (!enabled || !fine) return;
      all('[data-collage]').forEach(collage => {
        const items = all('.collage-item', collage);
        const rotations = items.map(item => Number(item.dataset.rotation) || 0);
        const zIndices = items.map((item, index) => Number(g.getProperty(item, 'zIndex')) || index + 1);
        items.forEach((item, index) => g.set(item, { rotation: rotations[index] }));
        let active = -1;
        const focus = index => {
          if (index === active) return;
          active = index;
          const targetBounds = items[index]?.getBoundingClientRect();
          items.forEach((item, itemIndex) => {
            const bounds = item.getBoundingClientRect();
            const direction = targetBounds
              ? Math.sign(bounds.left + bounds.width / 2 - targetBounds.left - targetBounds.width / 2) || Math.sign(itemIndex - index)
              : 0;
            g.to(item, {
              scale: index < 0 ? 1 : itemIndex === index ? 1.075 : 0.9,
              x: index < 0 || itemIndex === index ? 0 : direction * 22,
              y: index < 0 ? 0 : itemIndex === index ? -4 : 6,
              rotation: rotations[itemIndex] + (index < 0 || itemIndex === index ? 0 : itemIndex % 2 ? 3 : -3),
              zIndex: itemIndex === index ? items.length + 5 : zIndices[itemIndex],
              duration: 0.8, ease: 'power3.out', overwrite: 'auto',
            });
          });
        };
        items.forEach((item, index) => listen(item, 'pointerenter', () => focus(index)));
        listen(collage, 'pointerleave', () => focus(-1));
      });
    }

    function setupTrails() {
      if (!enabled || !fine) return;
      all('[data-trail]').forEach(container => {
        const sources = (container.dataset.trailImages || '').split(',').map(value => value.trim()).filter(Boolean);
        if (!sources.length) return;
        if (win.getComputedStyle(container).position === 'static') staticStyle(container, { position: 'relative' });
        let previous = null;
        let distance = 0;
        let imageIndex = 0;
        listen(container, 'pointermove', event => {
          if (event.pointerType === 'touch') return;
          const point = { x: event.clientX, y: event.clientY };
          if (!previous) { previous = point; return; }
          const dx = point.x - previous.x;
          const dy = point.y - previous.y;
          const segment = Math.hypot(dx, dy);
          distance += segment;
          previous = point;
          const threshold = Math.max(48, win.innerWidth / 8);
          if (distance < threshold || interactive(event.target)) return;
          distance %= threshold;
          const bounds = container.getBoundingClientRect();
          const x = point.x - bounds.left + container.scrollLeft;
          const y = point.y - bounds.top + container.scrollTop;
          const image = doc.createElement('img');
          image.className = 'trail-sticker';
          image.alt = '';
          image.draggable = false;
          image.setAttribute('aria-hidden', 'true');
          image.src = sources[imageIndex % sources.length];
          imageIndex += 1;
          Object.assign(image.style, { position: 'absolute', left: '0', top: '0', pointerEvents: 'none' });
          container.append(image);
          trailOrder.push(image);
          while (trailOrder.length > 10) removeTrail(trailOrder[0]);
          const driftX = segment ? dx / segment * 75 : 0;
          const driftY = segment ? dy / segment * 75 : -30;
          g.set(image, { x, y, xPercent: -50, yPercent: -50, scale: 1.3, rotation: g.utils.random(-24, 24), autoAlpha: 1 });
          const timeline = g.timeline({ onComplete: () => removeTrail(image) });
          generated.set(image, timeline);
          timeline.to(image, { scale: 1, duration: 0.6, ease: 'elastic.out(1,0.4)' }, 0)
            .to(image, { x: x + driftX, y: y + driftY, duration: 1.5, ease: 'power3.out' }, 0)
            .to(image, { scale: 0.5, opacity: 0, duration: 0.3, ease: 'power2.in' }, 1.2);
        }, { passive: true });
        listen(container, 'pointerleave', () => { previous = null; distance = 0; });
      });
    }

    function setupMomentum() {
      if (!enabled || !fine) return;
      let previous = null;
      let velocity = { x: 0, y: 0, time: 0 };
      listen(win, 'pointermove', event => {
        if (event.pointerType === 'touch') return;
        if (previous) {
          const delta = Math.max(16, event.timeStamp - previous.time);
          velocity = {
            x: clamp(-3, 3, (event.clientX - previous.x) / delta),
            y: clamp(-3, 3, (event.clientY - previous.y) / delta), time: event.timeStamp,
          };
        }
        previous = { x: event.clientX, y: event.clientY, time: event.timeStamp };
      }, { passive: true });
      all('[data-momentum-item]').forEach(item => {
        const media = item.querySelector('.momentum-media');
        if (!media) return;
        const base = { x: Number(g.getProperty(media, 'x')) || 0, y: Number(g.getProperty(media, 'y')) || 0, rotation: Number(g.getProperty(media, 'rotation')) || 0 };
        listen(item, 'pointerenter', event => {
          const fresh = Math.abs(event.timeStamp - velocity.time) < 140;
          const vx = fresh ? velocity.x : 0;
          const vy = fresh ? velocity.y : 0;
          g.fromTo(media, {
            x: base.x + clamp(-28, 28, vx * 16),
            y: base.y + clamp(-24, 24, vy * 14),
            rotation: base.rotation + clamp(-15, 15, vx * 5),
          }, { ...base, duration: 1.25, ease: 'elastic.out(1,0.45)', overwrite: 'auto' });
        });
      });
    }

    function setupOrbits() {
      all('[data-orbit]').forEach(orbit => {
        const items = all('.orbit-item', orbit);
        if (!enabled || !desktop) { staticOrbit(orbit); return; }
        if (!items.length) return;
        let centerX = 0;
        let centerY = 0;
        let radiusX = 0;
        let radiusY = 0;
        let angle = -Math.PI / 2;
        let speedBoost = 0;
        let radiusBoost = 0;
        let visible = false;
        const setters = items.map(item => {
          g.set(item, { position: 'absolute', xPercent: -50, yPercent: -50 });
          return { x: g.quickSetter(item, 'x', 'px'), y: g.quickSetter(item, 'y', 'px'), rotation: g.quickSetter(item, 'rotation', 'deg') };
        });
        const rotations = items.map((item, index) => Number(item.dataset.rotation) || (index % 2 ? 8 : -8));
        const measure = () => {
          const bounds = orbit.getBoundingClientRect();
          const title = orbit.querySelector('[data-orbit-center],.orbit-title,h1,h2');
          const titleBounds = title?.getBoundingClientRect();
          centerX = titleBounds ? titleBounds.left - bounds.left + titleBounds.width / 2 : bounds.width / 2;
          centerY = titleBounds ? titleBounds.top - bounds.top + titleBounds.height / 2 : bounds.height / 2;
          radiusX = Math.max(60, bounds.width * 0.34);
          radiusY = Math.max(60, Math.min(bounds.height * 0.34, bounds.width * 0.3));
          g.set(items, { left: centerX, top: centerY });
        };
        const render = delta => {
          angle += (0.12 + speedBoost) * delta;
          speedBoost *= Math.exp(-5 * delta);
          radiusBoost *= Math.exp(-4 * delta);
          setters.forEach((setter, index) => {
            const phase = angle + index / items.length * Math.PI * 2;
            setter.x(Math.cos(phase) * radiusX * (1 + radiusBoost));
            setter.y(Math.sin(phase) * radiusY * (1 + radiusBoost));
            setter.rotation(rotations[index] + Math.sin(phase) * 6);
          });
        };
        measures.push(() => { measure(); render(0); });
        measure();
        render(0);
        const ticker = (_time, deltaMs) => {
          if (visible && !doc.hidden && live) render(Math.min(0.064, deltaMs / 1000 || 1 / 60));
        };
        g.ticker.add(ticker);
        disposers.push(() => g.ticker.remove(ticker));
        if (win.IntersectionObserver) {
          const observer = new win.IntersectionObserver(entries => {
            if (!live) return;
            visible = entries[0]?.isIntersecting || false;
          }, { threshold: 0.02 });
          observer.observe(orbit);
          disposers.push(() => observer.disconnect());
        } else visible = true;
        listen(win, 'wheel', event => {
          if (!visible) return;
          const impulse = clamp(-1, 1, event.deltaY / (event.deltaMode === 1 ? 8 : 120));
          speedBoost = clamp(-4.5, 4.5, speedBoost + impulse * 1.4);
          radiusBoost = clamp(0, 0.18, radiusBoost + Math.abs(impulse) * 0.07);
        }, { passive: true });
      });
    }

    function setupReveals() {
      all('[data-reveal]').forEach(element => {
        if (!enabled || !st) {
          staticStyle(element, { opacity: '1', visibility: 'visible', transform: 'none' });
          return;
        }
        g.from(element, {
          autoAlpha: 0, y: 24, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
      });
    }

    function setupWorkParallax() {
      if (!enabled || !desktop || !st) return;
      all('[data-work-grid]').forEach(grid => {
        let items = [...grid.children];
        if (items.length === 1 && items[0].children.length > 2) items = [...items[0].children];
        items.filter(item => !item.hidden).filter((_item, index) => index % 3 === 1).forEach(item => g.fromTo(item, { y: -26 }, {
          y: 26, ease: 'none',
          scrollTrigger: { trigger: grid, start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
        }));
      });
    }

    function setupCursorLabels() {
      let label = doc.querySelector('.cursor-label');
      if (!enabled || !fine || !desktop) {
        if (label) staticStyle(label, { opacity: '0', visibility: 'hidden', 'pointer-events': 'none' });
        return;
      }
      let created = false;
      if (!label) {
        label = doc.createElement('div');
        label.className = 'cursor-label';
        label.setAttribute('aria-hidden', 'true');
        doc.body.append(label);
        created = true;
        disposers.push(() => label.remove());
      }
      const originalText = label.textContent;
      if (!created) disposers.push(() => { label.textContent = originalText; });
      g.set(label, { position: 'fixed', left: 0, top: 0, xPercent: 0, yPercent: -50, autoAlpha: 0, scale: 0.9, pointerEvents: 'none' });
      const xTo = g.quickTo(label, 'x', { duration: 0.35, ease: 'power3.out' });
      const yTo = g.quickTo(label, 'y', { duration: 0.35, ease: 'power3.out' });
      let active = null;
      const hide = () => {
        active = null;
        g.to(label, { autoAlpha: 0, scale: 0.9, duration: 0.16, overwrite: 'auto' });
      };
      all('[data-cursor-label]').forEach(link => {
        listen(link, 'pointerenter', event => {
          if (event.pointerType === 'touch') return;
          active = link;
          label.textContent = link.dataset.cursorLabel || link.getAttribute('aria-label') || link.textContent.trim();
          xTo(event.clientX + 18, event.clientX + 18);
          yTo(event.clientY, event.clientY);
          g.to(label, { autoAlpha: 1, scale: 1, duration: 0.18, overwrite: 'auto' });
        });
        listen(link, 'pointerleave', hide);
        listen(link, 'click', hide);
      });
      listen(win, 'pointermove', event => {
        if (!active) return;
        xTo(event.clientX + 18);
        yTo(event.clientY);
      }, { passive: true });
      listen(root, 'pointerleave', hide);
    }

    function setupMarquees() {
      const tracks = all('.marquee-track');
      tracks.forEach(track => staticStyle(track, enabled
        ? { 'animation-direction': 'normal' }
        : { 'animation-play-state': 'paused' }));
      if (!enabled || !tracks.length) return;
      let previousY = win.scrollY;
      listen(win, 'scroll', () => {
        const y = win.scrollY;
        if (Math.abs(y - previousY) < 1) return;
        tracks.forEach(track => { track.style.animationDirection = y >= previousY ? 'normal' : 'reverse'; });
        previousY = y;
      }, { passive: true });
    }

    function cleanupCustom() {
      if (cleaned) return;
      cleaned = true;
      live = false;
      timers.forEach(id => win.clearTimeout(id));
      timers.clear();
      [...generated.keys()].forEach(removeTrail);
      disposers.reverse().forEach(dispose => { try { dispose(); } catch { /* detached route content */ } });
      measures.length = 0;
    }

    scoped(() => {
      setupCursorCards();
      setupWeights();
      setupStacks();
      setupCollages();
      setupTrails();
      setupMomentum();
      setupOrbits();
      setupReveals();
      setupWorkParallax();
      setupCursorLabels();
      setupMarquees();
    });
    // Context owns the non-GSAP resources as well as its own animations/triggers.
    context?.add(() => cleanupCustom);

    return {
      cleanup() { context?.revert(); cleanupCustom(); },
      measure() { if (live) scoped(() => measures.forEach(measure => measure())); },
    };
  }

  function refresh() {
    if (destroyed) return;
    const current = state();
    const next = [current.enabled, current.fine, current.desktop, Boolean(current.st), root.querySelector('[data-work-grid]')?.dataset.motionFilter || ''].join(':');
    if (!mounted || next !== signature) {
      mounted?.cleanup();
      signature = next;
      mounted = mount(current);
    }
    mounted.measure();
    current.st?.refresh();
  }

  function scheduleRefresh() {
    if (destroyed) return;
    win.clearTimeout(refreshTimer);
    refreshTimer = win.setTimeout(refresh, 120);
  }

  function observeQuery(query) {
    if (query.addEventListener) {
      query.addEventListener('change', scheduleRefresh);
      outerDisposers.push(() => query.removeEventListener('change', scheduleRefresh));
    } else {
      query.addListener(scheduleRefresh);
      outerDisposers.push(() => query.removeListener(scheduleRefresh));
    }
  }

  [reducedQuery, fineQuery, desktopQuery].forEach(observeQuery);
  win.addEventListener('resize', scheduleRefresh, { passive: true });
  outerDisposers.push(() => win.removeEventListener('resize', scheduleRefresh));
  const storageChanged = event => { if (!event.key || event.key === 'sk-motion') scheduleRefresh(); };
  win.addEventListener('storage', storageChanged);
  outerDisposers.push(() => win.removeEventListener('storage', storageChanged));
  win.addEventListener('sk:motion-change', scheduleRefresh);
  outerDisposers.push(() => win.removeEventListener('sk:motion-change', scheduleRefresh));
  root.addEventListener('load', scheduleRefresh, true);
  outerDisposers.push(() => root.removeEventListener('load', scheduleRefresh, true));

  refresh();
  doc.fonts?.ready.then(() => { if (!destroyed) refresh(); });

  return {
    refresh,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      win.clearTimeout(refreshTimer);
      outerDisposers.splice(0).forEach(dispose => dispose());
      mounted?.cleanup();
      mounted = null;
      if (originalMotion === null) root.removeAttribute('data-motion');
      else root.setAttribute('data-motion', originalMotion);
    },
  };
}

export default initMotion;
