document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const giftBox = document.getElementById('giftBox');
  const giftReveal = document.getElementById('giftReveal');
  const confettiHost = document.querySelector('.confetti-host');
  const focusTarget = document.getElementById('festivalTitle');
  const giftMessage = document.getElementById('giftMessage');
  const giftHint = document.getElementById('giftHint');

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = motionQuery.matches;

  const PARTICLE_COUNT = 32;
  const BACKGROUND_ELEMENT_COUNT = 9;
  const particles = [];
  const backgroundElements = [];

  const encodeSvg = (svg) =>
    encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');

  const particleColors = [
    'var(--acc-gold)',
    'var(--acc-plum)',
    'var(--acc-blue)',
    'rgba(255, 255, 255, 0.6)',
  ];

  const particleShapes = [
    'circle(50%)',
    'polygon(50% 0%, 0% 100%, 100% 100%)',
    'polygon(16% 6%, 100% 18%, 84% 100%, 0 82%)',
  ];

  const backgroundSvgs = [
    `url('data:image/svg+xml;utf8,${encodeSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><path d="M80 6c26 18 42 44 42 74s-16 56-42 74c-26-18-42-44-42-74S54 24 80 6Z" fill="rgba(255,255,255,0.08)"/></svg>')}')`,
    `url('data:image/svg+xml;utf8,${encodeSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><path d="M22 118c34-14 54-46 58-90 16 34 42 60 76 70-30 10-54 32-66 60-12-24-34-38-68-40Z" fill="rgba(174,198,207,0.12)"/></svg>')}')`,
    `url('data:image/svg+xml;utf8,${encodeSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><path d="M80 18 95 63h48l-39 28 15 45-39-27-39 27 15-45-39-28h48Z" fill="rgba(201,166,107,0.12)"/></svg>')}')`,
  ];

  const randomFrom = (array) => array[Math.floor(Math.random() * array.length)];

  const configureParticleMotion = (particle) => {
    const xStart = Math.random() * window.innerWidth;
    const yStart = Math.random() * window.innerHeight;
    const xEnd = xStart + (Math.random() * 220 - 110);
    const yEnd = yStart + (Math.random() * 220 - 110);
    const duration = 18 + Math.random() * 16;
    const delay = Math.random() * 12;
    const opacity = 0.18 + Math.random() * 0.28;
    const rotation = Math.random() * 360;

    particle.style.setProperty('--x-start', `${xStart}px`);
    particle.style.setProperty('--y-start', `${yStart}px`);
    particle.style.setProperty('--x-end', `${xEnd}px`);
    particle.style.setProperty('--y-end', `${yEnd}px`);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);
    particle.style.setProperty('--opacity-max', opacity.toFixed(3));
    particle.style.setProperty('--rotation', `${rotation}deg`);
  };

  const createParticles = () => {
    if (prefersReducedMotion) return;
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      const size = Math.random() * 14 + 8;
      particle.style.setProperty('--size', `${size}px`);
      particle.style.setProperty('--color', randomFrom(particleColors));
      particle.style.setProperty('--shape', randomFrom(particleShapes));
      configureParticleMotion(particle);
      body.append(particle);
      particles.push(particle);
    }
  };

  const createBackgroundElements = () => {
    if (prefersReducedMotion) return;
    for (let i = 0; i < BACKGROUND_ELEMENT_COUNT; i += 1) {
      const element = document.createElement('span');
      element.className = 'bg-element';
      const size = Math.random() * 120 + 80;
      const top = Math.random() * window.innerHeight - size * 0.5;
      const left = Math.random() * window.innerWidth - size * 0.5;
      const duration = 26 + Math.random() * 18;
      const delay = Math.random() * 14;
      const driftX = (Math.random() - 0.5) * 160;
      const driftY = (Math.random() - 0.5) * 160;
      const rotationStart = Math.random() * 40 - 20;
      const rotationEnd = rotationStart + (Math.random() * 40 - 20);
      const opacity = 0.04 + Math.random() * 0.08;

      element.style.setProperty('--size', `${size}px`);
      element.style.setProperty('--svg', randomFrom(backgroundSvgs));
      element.style.setProperty('--top', `${top}px`);
      element.style.setProperty('--left', `${left}px`);
      element.style.setProperty('--duration', `${duration}s`);
      element.style.setProperty('--delay', `${delay}s`);
      element.style.setProperty('--drift-x', `${driftX}px`);
      element.style.setProperty('--drift-y', `${driftY}px`);
      element.style.setProperty('--r-start', `${rotationStart}deg`);
      element.style.setProperty('--r-end', `${rotationEnd}deg`);
      element.style.setProperty('--opacity-max', opacity.toFixed(3));

      body.append(element);
      backgroundElements.push(element);
    }
  };

  const clearMotionDecorations = () => {
    particles.splice(0).forEach((node) => node.remove());
    backgroundElements.splice(0).forEach((node) => node.remove());
  };

  const burstParticles = () => {
    if (!particles.length || !giftBox) return;
    const rect = giftBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    particles.forEach((particle) => {
      const angle = Math.random() * 360;
      const distance = Math.random() * (window.innerWidth * 0.25) + 80;
      const offsetX = Math.cos((angle * Math.PI) / 180) * distance;
      const offsetY = Math.sin((angle * Math.PI) / 180) * distance;

      particle.style.setProperty('--burst-origin-x', `${centerX}px`);
      particle.style.setProperty('--burst-origin-y', `${centerY}px`);
      particle.style.setProperty('--burst-offset-x', `${offsetX}px`);
      particle.style.setProperty('--burst-offset-y', `${offsetY}px`);
      particle.classList.add('burst');
      particle.addEventListener(
        'animationend',
        () => {
          particle.classList.remove('burst');
          configureParticleMotion(particle);
        },
        { once: true },
      );
    });
  };

  const handleMotionPreferenceChange = (event) => {
    prefersReducedMotion = event.matches;
    clearMotionDecorations();
    if (!prefersReducedMotion) {
      createParticles();
      createBackgroundElements();
    }
  };

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', handleMotionPreferenceChange);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(handleMotionPreferenceChange);
  }

  if (!prefersReducedMotion) {
    createParticles();
    createBackgroundElements();
  }

  const launchConfetti = () => {
    if (!confettiHost) return;

    confettiHost.innerHTML = '';
    const colors = ['var(--acc-blue)', 'var(--acc-red)', 'var(--acc-gold)', 'var(--acc-plum)', 'var(--acc-sky)'];
    const shapes = ['0', '50%'];
    const pieceCount = 70;

    for (let i = 0; i < pieceCount; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';

      const size = Math.random() * 8 + 6;
      const color = colors[i % colors.length];
      const left = Math.random() * 100;
      const delay = Math.random() * 0.6;
      const duration = 2.2 + Math.random() * 1.6;
      const drift = Math.random() * 90 - 45;
      const rotation = Math.random() * 600 + 360;
      const radiusShape = shapes[Math.floor(Math.random() * shapes.length)];

      piece.style.setProperty('--size', `${size}px`);
      piece.style.setProperty('--color', color);
      piece.style.setProperty('--delay', `${delay}s`);
      piece.style.setProperty('--duration', `${duration}s`);
      piece.style.setProperty('--drift', `${drift}px`);
      piece.style.setProperty('--rotation', `${rotation}deg`);
      piece.style.setProperty('--radius-shape', radiusShape);
      piece.style.left = `${left}%`;

      confettiHost.append(piece);
      piece.addEventListener('animationend', () => {
        piece.remove();
      });
    }

    window.setTimeout(() => {
      confettiHost.innerHTML = '';
    }, 4200);
  };

  const openGift = () => {
    if (!giftBox || body.classList.contains('gift-open')) {
      return;
    }

    body.classList.add('gift-open');
    giftBox.setAttribute('aria-pressed', 'true');
    giftBox.setAttribute('aria-expanded', 'true');
    giftBox.setAttribute('aria-disabled', 'true');
    giftBox.setAttribute('tabindex', '-1');
    giftBox.setAttribute('aria-label', 'Gaven er åpnet');
    giftBox.removeAttribute('aria-describedby');
    giftBox.removeEventListener('click', openGift);
    giftBox.removeEventListener('keydown', handleKeydown);
    if (giftMessage) {
      giftMessage.setAttribute('aria-hidden', 'true');
    }
    if (giftHint) {
      giftHint.setAttribute('hidden', '');
    }
    if (giftReveal) {
      giftReveal.setAttribute('aria-hidden', 'false');
    }

    const focusFestivalTitle = () => {
      if (focusTarget) {
        focusTarget.focus({ preventScroll: false });
      }
    };

    if (!prefersReducedMotion) {
      launchConfetti();
      burstParticles();
      window.setTimeout(focusFestivalTitle, 450);
    } else {
      focusFestivalTitle();
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openGift();
    }
  };

  if (giftBox) {
    giftBox.addEventListener('click', openGift);
    giftBox.addEventListener('keydown', handleKeydown);
  }
});
