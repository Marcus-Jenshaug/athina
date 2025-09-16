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

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', (event) => {
      prefersReducedMotion = event.matches;
    });
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener((event) => {
      prefersReducedMotion = event.matches;
    });
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
