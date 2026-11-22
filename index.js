const DEFAULT_PIC_1 =
  'https://media.discordapp.net/attachments/1572227440267362434/1573643033415651379/Screenshot_2026-11-21_181440.png?ex=6b02c0c8&is=6b016f48&hm=7c90aca4864cd503b6013004f7550f62e8605aa3c11d970f0a0373d4f2042b56&format=webp&quality=lossless';
const DEFAULT_PIC_2 =
  'https://media.discordapp.net/attachments/1572227440267362434/1573645760166240296/image.png?ex=6b02c352&is=6b0171d2&hm=985a47d0fec9730885e33e6571c55e52a074692b93114297dc7ea9aed17f8a5b&format=webp&quality=lossless';

const KEEPSAKE_DATA = {
  titleLine1: 'lavi',
  titleLine2: 'nd com',
  photos: [
    {
      id: 'pic-1',
      src: DEFAULT_PIC_1,
      label: 'lavi',
      title: 'i love u baby com',
      caption: 'i love you baby lavi mwa',
      alt: 'Lavi',
    },
    {
      id: 'pic-2',
      src: DEFAULT_PIC_2,
      label: 'com',
      title: 'i love u baby lavi mwa',
      caption: 'lavi baby',
      alt: 'Com portrait memory',
    },
  ],
  loveLetter: {
    envelopeLabel: 'For lavi & com',
    envelopeHint: 'Click to open my note',
    salutation: 'My sweetest love,',
    paragraphs: [
      'Every little moment with you feels like my favorite page in a story I never want to end. Even on the quietest days, just knowing you are mine makes everything softer, warmer, and infinitely brighter.',
      'Thank you for being my safe place, my favorite laugh, and the person my heart reaches for first. No matter where time carries us, I am endlessly grateful that it is you and me.',
    ],
    signOff: 'Always & forever yours,',
    signature: 'with all my love',
  },
};

function createSatinBowSvg(className, color) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 120 72');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('class', `satin-bow ${className}`);
  svg.setAttribute('aria-hidden', 'true');

  svg.innerHTML = `
    <path d="M57 32C45 14 21 8 13 21C6 32 19 46 39 39C48 36 54 34 57 32Z" fill="${color}" fill-opacity="0.22" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M53 31C42 22 25 21 20 27" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
    <path d="M63 32C75 14 99 8 107 21C114 32 101 46 81 39C72 36 66 34 63 32Z" fill="${color}" fill-opacity="0.22" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M67 31C78 22 95 21 100 27" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.7" />
    <path d="M56 36C49 48 42 58 32 66C36 60 40 53 42 46C46 43 52 39 56 36Z" fill="${color}" fill-opacity="0.16" stroke="${color}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M64 36C71 48 78 58 88 66C84 60 80 53 78 46C74 43 68 39 64 36Z" fill="${color}" fill-opacity="0.16" stroke="${color}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="53" y="25" width="14" height="13" rx="5" fill="#FDF9F9" stroke="${color}" stroke-width="2.2" />
  `;
  return svg;
}

function createHeartSvg(className) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML =
    '<path d="M8 14.2s-5.6-3.5-6.9-7.1C.3 4.8 1.9 2.5 4.3 2.5c1.5 0 2.8.8 3.7 2 .9-1.2 2.2-2 3.7-2 2.4 0 4 2.3 3.2 4.6-1.3 3.6-6.9 7.1-6.9 7.1z" />';
  return svg;
}

function createCornerPearl(positionClass) {
  const pearl = document.createElement('span');
  pearl.setAttribute('aria-hidden', 'true');
  pearl.className = `corner-pearl ${positionClass}`;
  return pearl;
}

/* ---------------- Title & Framed Photos ---------------- */
function initHeroTitle() {
  const line1 = document.getElementById('title-line-1');
  const line2 = document.getElementById('title-line-2');
  if (line1) line1.textContent = KEEPSAKE_DATA.titleLine1;
  if (line2) line2.textContent = KEEPSAKE_DATA.titleLine2;
}

function renderPhotoCards(onOpenPhoto) {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;
  grid.innerHTML = '';

  KEEPSAKE_DATA.photos.forEach((photo) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'photo-card';
    card.addEventListener('click', () => onOpenPhoto(photo.id));

    const bowCrest = document.createElement('div');
    bowCrest.className = 'card-bow-crest';
    bowCrest.appendChild(createSatinBowSvg('card-bow', '#C85D7C'));
    card.appendChild(bowCrest);

    card.appendChild(createCornerPearl('pearl-tl'));
    card.appendChild(createCornerPearl('pearl-tr'));
    card.appendChild(createCornerPearl('pearl-bl'));
    card.appendChild(createCornerPearl('pearl-br'));

    const cardInner = document.createElement('div');
    cardInner.className = 'photo-card-inner';

    const stitched = document.createElement('div');
    stitched.className = 'stitched-frame';

    const surface = document.createElement('div');
    surface.className = 'photo-surface';

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.referrerPolicy = 'no-referrer';
    img.className = 'photo-img';

    const fallback = document.createElement('div');
    fallback.className = 'photo-fallback';
    fallback.hidden = true;
    fallback.appendChild(createSatinBowSvg('photo-fallback-bow', '#C45473'));
    const fallbackLabel = document.createElement('span');
    fallbackLabel.className = 'photo-fallback-label';
    fallbackLabel.textContent = photo.label;
    fallback.appendChild(fallbackLabel);

    img.addEventListener('error', () => {
      surface.hidden = true;
      fallback.hidden = false;
    });

    surface.appendChild(img);
    stitched.appendChild(surface);
    stitched.appendChild(fallback);
    cardInner.appendChild(stitched);
    card.appendChild(cardInner);

    const labelRow = document.createElement('div');
    labelRow.className = 'photo-label-row';

    const leftLine = document.createElement('span');
    leftLine.className = 'label-hairline';
    leftLine.setAttribute('aria-hidden', 'true');

    const labelText = document.createElement('span');
    labelText.className = 'photo-label-text';
    labelText.textContent = photo.label;

    const rightLine = document.createElement('span');
    rightLine.className = 'label-hairline';
    rightLine.setAttribute('aria-hidden', 'true');

    labelRow.appendChild(leftLine);
    labelRow.appendChild(labelText);
    labelRow.appendChild(rightLine);
    card.appendChild(labelRow);

    grid.appendChild(card);
  });
}

/* ---------------- Lightbox Modal ---------------- */
function initLightbox() {
  const backdrop = document.getElementById('lightbox-backdrop');
  const dialog = document.getElementById('lightbox-dialog');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const imgEl = document.getElementById('lightbox-image');
  const fallbackEl = document.getElementById('lightbox-fallback');
  const fallbackLabelEl = document.getElementById('lightbox-fallback-label');
  const labelEl = document.getElementById('lightbox-label');
  const titleEl = document.getElementById('lightbox-title');
  const captionEl = document.getElementById('lightbox-caption');
  const counterEl = document.getElementById('lightbox-counter');

  let activePhotoId = null;

  function renderActivePhoto() {
    if (!backdrop || !activePhotoId) return;
    const photo =
      KEEPSAKE_DATA.photos.find((p) => p.id === activePhotoId) ||
      KEEPSAKE_DATA.photos[0];

    backdrop.setAttribute('aria-label', photo.title);

    if (imgEl && fallbackEl && fallbackLabelEl) {
      imgEl.hidden = false;
      fallbackEl.hidden = true;
      fallbackLabelEl.textContent = photo.label;
      imgEl.src = photo.src;
      imgEl.alt = photo.alt;
    }

    if (labelEl) labelEl.textContent = photo.label;
    if (titleEl) titleEl.textContent = photo.title;
    if (captionEl) captionEl.textContent = photo.caption;
    if (counterEl) {
      counterEl.textContent = photo.id === 'pic-1' ? '01 / 02' : '02 / 02';
    }
  }

  function openPhoto(photoId) {
    activePhotoId = photoId;
    renderActivePhoto();
    if (backdrop) backdrop.hidden = false;
  }

  function closeLightbox() {
    activePhotoId = null;
    if (backdrop) backdrop.hidden = true;
  }

  function togglePhoto() {
    if (!activePhotoId) return;
    activePhotoId = activePhotoId === 'pic-1' ? 'pic-2' : 'pic-1';
    renderActivePhoto();
  }

  if (imgEl && fallbackEl) {
    imgEl.addEventListener('error', () => {
      imgEl.hidden = true;
      fallbackEl.hidden = false;
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeLightbox);
  }
  if (dialog) {
    dialog.addEventListener('click', (event) => event.stopPropagation());
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', togglePhoto);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', togglePhoto);
  }

  window.addEventListener('keydown', (event) => {
    if (!activePhotoId) return;
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      togglePhoto();
    }
  });

  return { openPhoto };
}

/* ---------------- Interactive Love Letter Envelope ---------------- */
function initLoveLetter() {
  const container = document.getElementById('love-letter-section');
  if (!container) return;

  const letter = KEEPSAKE_DATA.loveLetter;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isOpen = false;
  let isAnimating = false;

  function buildClosedEnvelope() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'envelope-btn is-entering';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', `${letter.envelopeLabel}. ${letter.envelopeHint}`);

    const bowCrest = document.createElement('div');
    bowCrest.className = 'envelope-bow-crest';
    bowCrest.appendChild(createSatinBowSvg('envelope-bow', '#C85D7C'));
    btn.appendChild(bowCrest);

    const frame = document.createElement('div');
    frame.className = 'envelope-pocket-frame';

    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 360 200');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('class', 'envelope-geometry-svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `
      <path d="M0 200 L145 104 L215 104 L360 200" fill="#FDF2F6" fill-opacity="0.65" stroke="#E8C7D2" stroke-width="1.2" />
      <path d="M0 0 L150 105 M360 0 L210 105" stroke="#EBD1DA" stroke-width="1.1" />
      <path d="M0 0 L180 118 L360 0 Z" fill="#FAF0F4" stroke="#DFB3C1" stroke-width="1.5" />
      <path d="M14 4 L180 110 L346 4" fill="none" stroke="#F2DCE4" stroke-width="1" />
    `;
    frame.appendChild(svg);

    const seal = document.createElement('span');
    seal.className = 'wax-seal';
    seal.setAttribute('aria-hidden', 'true');
    seal.appendChild(createHeartSvg('wax-seal-heart'));
    frame.appendChild(seal);

    const label = document.createElement('p');
    label.className = 'envelope-label';
    label.textContent = letter.envelopeLabel;
    frame.appendChild(label);

    const hint = document.createElement('span');
    hint.className = 'envelope-hint';
    hint.textContent = letter.envelopeHint;
    frame.appendChild(hint);

    btn.appendChild(frame);
    btn.addEventListener('click', openEnvelope);

    return btn;
  }

  function buildOpenedLetter() {
    const wrap = document.createElement('div');
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Love letter message');
    wrap.className = 'opened-letter-wrap is-entering';

    const pocket = document.createElement('div');
    pocket.className = 'opened-envelope-pocket';
    pocket.setAttribute('aria-hidden', 'true');
    wrap.appendChild(pocket);

    const sheet = document.createElement('div');
    sheet.className = 'letter-sheet';

    const bowCrest = document.createElement('div');
    bowCrest.className = 'letter-bow-crest';
    bowCrest.appendChild(createSatinBowSvg('letter-bow', '#C85D7C'));
    sheet.appendChild(bowCrest);

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Fold love letter');
    closeBtn.className = 'icon-close-btn letter-close-btn';
    closeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg" aria-hidden="true">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    `;
    closeBtn.addEventListener('click', foldLetter);
    sheet.appendChild(closeBtn);

    sheet.appendChild(createCornerPearl('pearl-tl'));
    sheet.appendChild(createCornerPearl('pearl-bl'));
    sheet.appendChild(createCornerPearl('pearl-br'));

    const stitchedBody = document.createElement('div');
    stitchedBody.className = 'letter-stitched-body';

    const content = document.createElement('div');
    content.className = 'letter-content-fade';

    const salutation = document.createElement('p');
    salutation.className = 'letter-salutation';
    salutation.textContent = letter.salutation;
    content.appendChild(salutation);

    const paragraphsWrap = document.createElement('div');
    paragraphsWrap.className = 'letter-paragraphs';
    letter.paragraphs.forEach((text) => {
      const p = document.createElement('p');
      p.className = 'letter-paragraph';
      p.textContent = text;
      paragraphsWrap.appendChild(p);
    });
    content.appendChild(paragraphsWrap);

    const footer = document.createElement('div');
    footer.className = 'letter-footer';

    const signBlock = document.createElement('div');
    const signOff = document.createElement('p');
    signOff.className = 'letter-signoff';
    signOff.textContent = letter.signOff;

    const signature = document.createElement('p');
    signature.className = 'letter-signature';
    const sigSpan = document.createElement('span');
    sigSpan.textContent = letter.signature;
    signature.appendChild(sigSpan);
    signature.appendChild(createHeartSvg('signature-heart'));

    signBlock.appendChild(signOff);
    signBlock.appendChild(signature);
    footer.appendChild(signBlock);

    const foldBtn = document.createElement('button');
    foldBtn.type = 'button';
    foldBtn.className = 'fold-letter-btn';
    foldBtn.textContent = 'Fold letter';
    foldBtn.addEventListener('click', foldLetter);
    footer.appendChild(foldBtn);

    content.appendChild(footer);
    stitchedBody.appendChild(content);
    sheet.appendChild(stitchedBody);
    wrap.appendChild(sheet);

    return wrap;
  }

  function renderImmediate(open) {
    isOpen = open;
    container.innerHTML = '';
    container.appendChild(open ? buildOpenedLetter() : buildClosedEnvelope());
  }

  function openEnvelope() {
    if (isOpen || isAnimating) return;
    const current = container.firstElementChild;
    if (!current || reducedMotionQuery.matches) {
      renderImmediate(true);
      return;
    }
    isAnimating = true;
    current.classList.remove('is-entering');
    current.classList.add('is-exiting');
    window.setTimeout(() => {
      isAnimating = false;
      renderImmediate(true);
    }, 200);
  }

  function foldLetter() {
    if (!isOpen || isAnimating) return;
    const current = container.firstElementChild;
    if (!current || reducedMotionQuery.matches) {
      renderImmediate(false);
      return;
    }
    isAnimating = true;
    current.classList.remove('is-entering');
    current.classList.add('is-exiting');
    window.setTimeout(() => {
      isAnimating = false;
      renderImmediate(false);
    }, 240);
  }

  window.addEventListener('keydown', (event) => {
    if (isOpen && event.key === 'Escape') {
      foldLetter();
    }
  });

  renderImmediate(false);
}

/* ---------------- Cat & Mouse Cursor Chase ---------------- */
function initCatCursorChase() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (prefersReducedMotion || !hasFinePointer) return;

  const layer = document.getElementById('cat-chase-layer');
  const mouseEl = document.getElementById('chase-mouse');
  const mouseSvg = document.getElementById('chase-mouse-svg');
  const catEl = document.getElementById('chase-cat');
  const catFlip = document.getElementById('chase-cat-flip');
  const catHeart = document.getElementById('chase-cat-heart');
  const legsRunning = document.getElementById('cat-legs-running');
  const legsSitting = document.getElementById('cat-legs-sitting');

  if (!layer || !mouseEl || !catEl) return;

  const state = {
    targetX: -200,
    targetY: -200,
    catX: -200,
    catY: -200,
    mouseX: -200,
    mouseY: -200,
    initialized: false,
    chasing: false,
    facingLeft: false,
    mouseFacingLeft: false,
  };

  function setChasingUI(chasing) {
    if (legsRunning) legsRunning.toggleAttribute('hidden', !chasing);
    if (legsSitting) legsSitting.toggleAttribute('hidden', chasing);
    if (catHeart) catHeart.toggleAttribute('hidden', chasing);
  }

  setChasingUI(false);

  window.addEventListener(
    'mousemove',
    (event) => {
      const prevTargetX = state.targetX;
      state.targetX = event.clientX;
      state.targetY = event.clientY;

      if (!state.initialized) {
        state.initialized = true;
        state.mouseX = event.clientX;
        state.mouseY = event.clientY;
        state.catX = Math.max(24, event.clientX - 96);
        state.catY = event.clientY;
        layer.hidden = false;
      }

      if (Math.abs(event.clientX - prevTargetX) > 1.5) {
        const nextMouseLeft = event.clientX < prevTargetX;
        if (nextMouseLeft !== state.mouseFacingLeft) {
          state.mouseFacingLeft = nextMouseLeft;
          if (mouseSvg) {
            mouseSvg.classList.toggle('is-flipped', nextMouseLeft);
          }
        }
      }
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', () => {
    state.initialized = false;
    layer.hidden = true;
  });

  function tick() {
    if (state.initialized) {
      state.mouseX += (state.targetX - state.mouseX) * 0.42;
      state.mouseY += (state.targetY - state.mouseY) * 0.42;

      const dx = state.mouseX - state.catX;
      const dy = state.mouseY - state.catY;
      const distance = Math.hypot(dx, dy);

      if (distance > 38) {
        const speed = Math.min(0.085, 0.045 + distance * 0.00012);
        state.catX += dx * speed;
        state.catY += dy * speed;

        if (Math.abs(dx) > 2) {
          const nextLeft = dx < 0;
          if (nextLeft !== state.facingLeft) {
            state.facingLeft = nextLeft;
            if (catFlip) {
              catFlip.classList.toggle('is-flipped', nextLeft);
            }
          }
        }

        if (!state.chasing) {
          state.chasing = true;
          setChasingUI(true);
        }
      } else if (state.chasing) {
        state.chasing = false;
        setChasingUI(false);
      }

      mouseEl.style.transform = `translate3d(${state.mouseX + 12}px, ${state.mouseY + 10}px, 0)`;

      const hop = state.chasing ? Math.abs(Math.sin(performance.now() * 0.014)) * -6 : 0;
      catEl.style.transform = `translate3d(${state.catX - 28}px, ${state.catY - 26 + hop}px, 0)`;
    }

    window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
}

/* ---------------- Background Music ---------------- */
function initBackgroundMusic() {
  const audio = document.getElementById('bg-audio');
  const toggleBtn = document.getElementById('music-toggle');
  const iconOn = document.getElementById('icon-volume-on');
  const iconOff = document.getElementById('icon-volume-off');

  if (!(audio instanceof HTMLAudioElement) || !toggleBtn) return;

  const LOW_VOLUME = 0.14;
  let userMuted = false;
  let unlocked = false;

  audio.volume = LOW_VOLUME;
  audio.loop = true;

  function setPlayingUI(playing) {
    if (iconOn) iconOn.hidden = !playing;
    if (iconOff) iconOff.hidden = playing;
    const label = playing ? 'Mute background music' : 'Play background music';
    toggleBtn.setAttribute('aria-label', label);
    toggleBtn.setAttribute('title', label);
  }

  function removeUnlockListeners() {
    window.removeEventListener('pointerdown', handleFirstInteraction);
    window.removeEventListener('keydown', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
  }

  async function tryPlay() {
    if (userMuted) return;
    try {
      audio.volume = LOW_VOLUME;
      await audio.play();
      unlocked = true;
      setPlayingUI(true);
      removeUnlockListeners();
    } catch {
      setPlayingUI(false);
    }
  }

  function handleFirstInteraction(event) {
    const target = event.target;
    if (target instanceof Node && toggleBtn.contains(target)) {
      return;
    }
    if (!unlocked && !userMuted) {
      void tryPlay();
    }
  }

  window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
  window.addEventListener('keydown', handleFirstInteraction, { passive: true });
  window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

  toggleBtn.addEventListener('click', async () => {
    if (!audio.paused) {
      userMuted = true;
      audio.pause();
      setPlayingUI(false);
    } else {
      userMuted = false;
      audio.volume = LOW_VOLUME;
      try {
        await audio.play();
        setPlayingUI(true);
      } catch {
        setPlayingUI(false);
      }
    }
  });

  void tryPlay();
}

/* ---------------- Bootstrap ---------------- */
function initApp() {
  initHeroTitle();
  const lightbox = initLightbox();
  renderPhotoCards(lightbox.openPhoto);
  initLoveLetter();
  initCatCursorChase();
  initBackgroundMusic();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
