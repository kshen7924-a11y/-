const boardWidth = 720;
const boardHeight = 660;
const initialUnlocks = 3;
const minPieceSize = 60;
const maxPieceSize = 200;

const checkinPrompts = [
  '记录一件今天想留住的小事。',
  '找一个想再去一次的地方。',
  '记下一段今天走过的路。',
  '收集一种能代表今天的颜色。',
  '想起一段舍不得忘掉的旅程。'
];

const movement = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1]
};

const carriers = {
  fridge: { name: '冰箱', position: [372, 312] },
  phone: { name: '手机', position: [362, 332] },
  socks: { name: '袜子', position: [381, 354] },
  board: { name: '软木板', position: [360, 319] }
};

function drawBoard(context, image) {
  const gradient = context.createLinearGradient(0, 0, boardWidth, boardHeight);
  gradient.addColorStop(0, '#f4effe');
  gradient.addColorStop(.5, '#eee5fb');
  gradient.addColorStop(1, '#f9efe8');
  context.fillStyle = gradient;
  context.fillRect(0, 0, boardWidth, boardHeight);
  context.fillStyle = '#9480bb44';
  for (let y = 22; y < boardHeight; y += 22) {
    for (let x = 20; x < boardWidth; x += 22) context.fillRect(x, y, 2, 2);
  }
  if (!image) return;
  const scale = Math.min(528 / image.naturalWidth, 550 / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  context.drawImage(image, (boardWidth - width) / 2, (boardHeight - height) / 2, width, height);
}

function placePiece(piece, x, y) {
  const angle = piece.angle * Math.PI / 180;
  const margin = piece.size / 2 * (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)));
  piece.x = Math.max(margin, Math.min(boardWidth - margin, x));
  piece.y = Math.max(margin, Math.min(boardHeight - margin, y));
  piece.node.style.left = `${piece.x / boardWidth * 100}%`;
  piece.node.style.top = `${piece.y / boardHeight * 100}%`;
  piece.node.style.width = `${piece.size / boardWidth * 100}%`;
  piece.node.style.height = `${piece.size / boardHeight * 100}%`;
  piece.node.style.setProperty('--piece-rotation', `${piece.angle}deg`);
}

function drawPiece(context, piece, image) {
  const scale = piece.size / Math.max(image.naturalWidth, image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  context.save();
  context.translate(piece.x, piece.y);
  context.rotate(piece.angle * Math.PI / 180);
  context.drawImage(image, -width / 2, -height / 2, width, height);
  context.restore();
}

function downloadCanvas(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('PNG encoding failed'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '我的足迹卡.png';
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 30000);
      resolve();
    }, 'image/png');
  });
}

export function initFootprintPlayground(scope) {
  const selector = '[data-footprint-playground]';
  const root = scope.matches(selector) ? scope : scope.querySelector(selector);
  if (!root) return;

  const board = root.querySelector('[data-footprint-board]');
  const placed = root.querySelector('[data-footprint-placed]');
  const canvas = board.querySelector('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  context.setTransform(canvas.width / boardWidth, 0, 0, canvas.height / boardHeight, 0, 0);

  const remove = root.querySelector('[data-footprint-remove]');
  const checkin = root.querySelector('[data-footprint-checkin]');
  const prompt = root.querySelector('[data-footprint-prompt]');
  const count = root.querySelector('[data-footprint-count]');
  const unlock = root.querySelector('[data-footprint-unlock]');
  const status = root.querySelector('[data-footprint-status]');
  const save = root.querySelector('[data-footprint-save]');
  const adjustments = root.querySelectorAll('[data-footprint-adjust]');
  const carrierButtons = root.querySelectorAll('[data-footprint-carrier]');
  const library = Array.from(root.querySelectorAll('[data-footprint-sticker]'), button => ({
    button,
    image: button.querySelector('img'),
    label: button.querySelector('span').textContent
  }));

  const controller = new AbortController();
  const options = { signal: controller.signal };
  const drafts = Object.fromEntries(Object.keys(carriers).map(name => [name, []]));
  const carrierImages = new Map();
  const loadingCarriers = new Map();
  let carrier = 'fridge';
  let unlocked = initialUnlocks;
  let selected = null;
  let newest = null;
  let drag = null;
  let isSaving = false;

  function syncSave() {
    save.disabled = isSaving || !carrierImages.has(carrier);
  }

  function loadCarrier(name) {
    if (loadingCarriers.has(name)) return loadingCarriers.get(name);
    const image = new Image();
    image.src = `/assets/footprint-stickers/carrier-${name}.webp`;
    const pending = image.decode().then(() => {
      carrierImages.set(name, image);
      return image;
    }).finally(() => loadingCarriers.delete(name));
    loadingCarriers.set(name, pending);
    return pending;
  }

  async function showCarrier(name) {
    const existing = carrierImages.get(name);
    if (existing) {
      drawBoard(context, existing);
      board.removeAttribute('aria-busy');
      syncSave();
      return;
    }

    board.setAttribute('aria-busy', 'true');
    save.disabled = true;
    drawBoard(context);
    try {
      const image = await loadCarrier(name);
      if (carrier !== name || controller.signal.aborted) return;
      drawBoard(context, image);
    } catch {
      if (carrier === name && !controller.signal.aborted) {
        status.textContent = '载具加载失败，请切换载具后重试。';
      }
    } finally {
      if (carrier === name && !controller.signal.aborted) {
        board.removeAttribute('aria-busy');
        syncSave();
      }
    }
  }

  function select(piece) {
    selected?.node.setAttribute('aria-pressed', 'false');
    selected = piece;
    selected?.node.setAttribute('aria-pressed', 'true');
    remove.disabled = !selected;
    for (const button of adjustments) button.disabled = !selected;
  }

  function removeSelected() {
    if (!selected) return;
    const { node, index } = selected;
    const draft = drafts[carrier];
    const position = draft.indexOf(selected);
    draft.splice(position, 1);
    node.remove();
    const next = draft[position] ?? draft.at(-1) ?? null;
    select(next);
    (next?.node ?? library[index].button).focus({ preventScroll: true });
    status.textContent = `已删除「${library[index].label}」。`;
  }

  function addPiece(index, x, y, size = 112, angle = 0) {
    const { image, label } = library[index];
    const node = document.createElement('button');
    node.type = 'button';
    node.className = 'footprint-playground-piece';
    node.setAttribute('aria-label', `${label}贴纸`);
    node.setAttribute('aria-pressed', 'false');
    node.setAttribute('aria-describedby', 'footprint-playground-move-help');
    node.append(image.cloneNode());
    const piece = { node, index, size, angle };
    placePiece(piece, x, y);
    drafts[carrier].push(piece);
    placed.append(node);

    node.addEventListener('focus', () => select(piece), options);
    node.addEventListener('pointerdown', event => {
      if (event.button !== 0 || drag) return;
      select(piece);
      node.setPointerCapture(event.pointerId);
      const frame = placed.getBoundingClientRect();
      drag = {
        piece,
        id: event.pointerId,
        offsetX: (event.clientX - frame.left) * boardWidth / frame.width - piece.x,
        offsetY: (event.clientY - frame.top) * boardHeight / frame.height - piece.y
      };
    }, options);
    node.addEventListener('keydown', event => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        removeSelected();
        return;
      }
      const delta = movement[event.key];
      if (!delta) return;
      event.preventDefault();
      const step = event.shiftKey ? 24 : 8;
      placePiece(piece, piece.x + delta[0] * step, piece.y + delta[1] * step);
    }, options);
    return piece;
  }

  function switchCarrier(next) {
    if (next === carrier) return;
    carrier = next;
    drag = null;
    select(null);
    for (const button of carrierButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.footprintCarrier === next));
    }
    board.setAttribute('aria-label', `${carriers[carrier].name}拼贴画布`);
    placed.replaceChildren(...drafts[carrier].map(piece => piece.node));
    status.textContent = `已切换到${carriers[carrier].name}。`;
    showCarrier(carrier);
  }

  function adjustSelected(action) {
    if (!selected) return;
    const sizes = { shrink: -16, grow: 16 };
    const turns = { left: -15, right: 15 };
    if (action in sizes) {
      selected.size = Math.max(minPieceSize, Math.min(maxPieceSize, selected.size + sizes[action]));
    } else {
      selected.angle = (selected.angle + turns[action]) % 360;
    }
    placePiece(selected, selected.x, selected.y);
  }

  function unlockSticker() {
    if (unlocked >= library.length) return;
    const { button, label } = library[unlocked];
    unlocked += 1;
    button.disabled = false;
    button.setAttribute('aria-label', `添加${label}`);
    newest?.removeAttribute('data-footprint-new');
    newest = button;
    newest.setAttribute('data-footprint-new', '');
    count.textContent = `${unlocked} / ${library.length} 已解锁`;
    unlock.textContent = `已解锁「${label}」。点击贴纸就能贴上去。`;
    if (unlocked === library.length) {
      prompt.textContent = '贴纸已全部解锁。';
      checkin.disabled = true;
      checkin.textContent = '全部解锁';
      button.focus({ preventScroll: true });
    } else {
      prompt.textContent = checkinPrompts[unlocked - initialUnlocks];
    }
  }

  board.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const frame = placed.getBoundingClientRect();
    const x = (event.clientX - frame.left) * boardWidth / frame.width - drag.offsetX;
    const y = (event.clientY - frame.top) * boardHeight / frame.height - drag.offsetY;
    placePiece(drag.piece, x, y);
  }, options);
  board.addEventListener('pointerdown', event => {
    if (!event.target.closest('.footprint-playground-piece')) select(null);
  }, options);
  for (const eventType of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    board.addEventListener(eventType, event => {
      if (drag?.id === event.pointerId) drag = null;
    }, options);
  }

  root.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target || target.disabled) return;
    if (target.hasAttribute('data-footprint-carrier')) {
      switchCarrier(target.dataset.footprintCarrier);
      return;
    }
    if (target.hasAttribute('data-footprint-sticker')) {
      const index = Number(target.dataset.footprintSticker);
      target.removeAttribute('data-footprint-new');
      const offset = drafts[carrier].length % 5 * 16 - 32;
      const [x, y] = carriers[carrier].position;
      const piece = addPiece(index, x + offset, y + offset);
      select(piece);
      if (event.detail === 0) piece.node.focus({ preventScroll: true });
      status.textContent = `已加入「${library[index].label}」。`;
    }
    if (target.hasAttribute('data-footprint-adjust')) {
      adjustSelected(target.dataset.footprintAdjust);
    }
  }, options);
  remove.addEventListener('click', removeSelected, options);
  checkin.addEventListener('click', unlockSticker, options);
  save.addEventListener('click', async () => {
    const image = carrierImages.get(carrier);
    const pieces = drafts[carrier].map(piece => ({ ...piece }));
    isSaving = true;
    syncSave();
    try {
      await Promise.all(pieces.map(({ index }) => library[index].image.decode()));
      if (controller.signal.aborted) return;
      const output = document.createElement('canvas');
      output.width = boardWidth * 2;
      output.height = boardHeight * 2;
      const outputContext = output.getContext('2d');
      outputContext.scale(2, 2);
      drawBoard(outputContext, image);
      pieces.forEach(piece => drawPiece(outputContext, piece, library[piece.index].image));
      await downloadCanvas(output);
      status.textContent = '已生成 PNG，请在浏览器下载中查看。';
    } catch {
      status.textContent = '足迹卡保存失败，请重试。';
    } finally {
      isSaving = false;
      syncSave();
    }
  }, options);

  showCarrier(carrier);
  addPiece(0, 355, 171, 125, -8);
  addPiece(1, 354, 339, 105, -10);
  addPiece(2, 413, 437, 126, 7);
  return () => controller.abort();
}
