document.addEventListener('DOMContentLoaded', () => {
  const PARTICLE_COUNT = 30;
  const BG_ELEMENT_COUNT = 10;
  const body = document.body;

  const elements = {
    giftBox: document.getElementById('giftBox'),
    body: document.body
  };

  const particleColors = [
    'var(--matte-gold)',
    'var(--rust-red)',
    'var(--light-beige)',
    'var(--dusty-blue)',
  ];

  const particleShapes = {
    circle: 'circle(50%)',
    triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  };

  const bgElementSVGs = {
    leaf: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100"><path d="M25 0 C-10 20, -10 80, 25 100 C60 80, 60 20, 25 0Z" fill="rgba(255,255,255,0.06)"/></svg>')`,
    note: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 80"><circle cx="20" cy="70" r="10" fill="rgba(255,255,255,0.06)"/><rect x="28" y="10" width="5" height="65" fill="rgba(255,255,255,0.06)"/></svg>')`,
    flower: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 76.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z" fill="rgba(255,255,255,0.05)"/></svg>')`
  };

  function createParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement('div');
      // ... (rest of the function is the same as before)
      particle.className = 'particle';

      const size = Math.random() * 15 + 5;
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      const shapeKeys = Object.keys(particleShapes);
      const shape = particleShapes[shapeKeys[Math.floor(Math.random() * shapeKeys.length)]];

      const xStart = Math.random() * window.innerWidth;
      const yStart = Math.random() * window.innerHeight;
      const xEnd = Math.random() * window.innerWidth;
      const yEnd = Math.random() * window.innerHeight;

      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 10;
      const maxOpacity = Math.random() * 0.4 + 0.1;

      particle.style.setProperty('--size', `${size}px`);
      particle.style.setProperty('--color', color);
      particle.style.setProperty('--radius', shape === 'circle(50%)' ? '50%' : '0');
      particle.style.setProperty('--shape', shape);
      particle.style.setProperty('--x-start', `${xStart}px`);
      particle.style.setProperty('--y-start', `${yStart}px`);
      particle.style.setProperty('--x-end', `${xEnd}px`);
      particle.style.setProperty('--y-end', `${yEnd}px`);
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--delay', `${delay}s`);
      particle.style.setProperty('--opacity-max', maxOpacity);

      body.appendChild(particle);
    }
  }

  function createBackgroundElements() {
    const svgs = Object.values(bgElementSVGs);
    for (let i = 0; i < BG_ELEMENT_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'bg-element';

      const size = Math.random() * 80 + 40;
      const svg = svgs[Math.floor(Math.random() * svgs.length)];

      const edge = Math.floor(Math.random() * 4);
      let x, y;
      const margin = size; // Ensure it starts off-screen
      if (edge === 0) { y = -margin; x = Math.random() * window.innerWidth; }
      else if (edge === 1) { x = window.innerWidth; y = Math.random() * window.innerHeight; }
      else if (edge === 2) { y = window.innerHeight; x = Math.random() * window.innerWidth; }
      else { x = -margin; y = Math.random() * window.innerHeight; }

      el.style.setProperty('--size', `${size}px`);
      el.style.setProperty('--svg', svg);
      el.style.top = `${y}px`;
      el.style.left = `${x}px`;
      el.style.setProperty('--duration', `${Math.random() * 20 + 15}s`);
      el.style.setProperty('--delay', `${Math.random() * 15}s`);
      el.style.setProperty('--r-start', `${Math.random() * 40 - 20}deg`);
      el.style.setProperty('--r-end', `${Math.random() * 40 - 20}deg`);

      body.appendChild(el);
    }
  }

  function openGift() {
    // ... (same as before)
    if (elements.body.classList.contains('is-opened')) return;

    elements.body.classList.add('is-opened');

    const particles = document.querySelectorAll('.particle');
    const giftBoxRect = elements.giftBox.getBoundingClientRect();
    const giftBoxCenterX = giftBoxRect.left + giftBoxRect.width / 2;
    const giftBoxCenterY = giftBoxRect.top + giftBoxRect.height / 2;

    particles.forEach(particle => {
      const angle = Math.random() * 360;
      const distance = (Math.random() * 0.5 + 0.5) * (window.innerWidth / 4);
      const xVector = Math.cos(angle * Math.PI / 180) * distance;
      const yVector = Math.sin(angle * Math.PI / 180) * distance;

      particle.style.setProperty('--x-start-burst', `${giftBoxCenterX}px`);
      particle.style.setProperty('--y-start-burst', `${giftBoxCenterY}px`);
      particle.style.setProperty('--x-vector-burst', `${xVector}px`);
      particle.style.setProperty('--y-vector-burst', `${yVector}px`);

      particle.style.animation = 'none';
      void particle.offsetWidth;
      particle.style.animation = `particle-burst 1.2s ease-out forwards`;
    });
  }

  if (elements.giftBox) {
    elements.giftBox.addEventListener('click', openGift, { once: true });
    elements.giftBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openGift();
        }
      }, { once: true });
  }

  createParticles();
  createBackgroundElements();
});
