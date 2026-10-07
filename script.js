/* ============================================
   CYBERSHIELD — script.js
============================================ */

// === MATRIX RAIN ===
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'アカサタナハマヤラワ01アイウエオ10ABCDEF0123456789@#$%&';
const fontSize = 13;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(2,4,8,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff88';
  ctx.font = `${fontSize}px Share Tech Mono, monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillStyle = `rgba(0,255,136,${Math.random() * 0.5 + 0.1})`;
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

// === CUSTOM CURSOR ===
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// === HAMBURGER MENU ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// === TERMINAL TYPEWRITER ===
const lines = [
  '> Initialisiere ZeroTrace37 - Security Audit v2.1...',
  '> Threat detection: AKTIV ✓',
  '> Bereit. Wie können wir helfen?'
];

async function typeText(elementId, text, delay = 40) {
  const el = document.getElementById(elementId);
  if (!el) return;
  for (const char of text) {
    el.textContent += char;
    await new Promise(r => setTimeout(r, delay));
  }
}

async function runTerminal() {
  await new Promise(r => setTimeout(r, 600));
  await typeText('termLine1', lines[0], 45);
  await new Promise(r => setTimeout(r, 200));
  await typeText('termLine2', lines[1], 45);
  await new Promise(r => setTimeout(r, 200));
  await typeText('termLine3', lines[2], 45);
}

runTerminal();

// === COUNTER ANIMATION ===
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .gallery-item, .contact-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Service cards stagger
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// === ABOUT TERMINAL TRIGGER ===
const aboutTermObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      aboutTermObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const aboutTerm = document.querySelector('.about-term');
if (aboutTerm) aboutTermObserver.observe(aboutTerm);

// === GALLERY FILTER ===
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const show = filter === 'all' || category === filter;

      if (show) {
        item.style.display = '';
        setTimeout(() => item.classList.add('showing'), 10);
        item.classList.remove('hiding');
      } else {
        item.classList.add('hiding');
        item.classList.remove('showing');
        setTimeout(() => { item.style.display = 'none'; }, 400);
      }
    });
  });
});

// Initialize gallery items as showing
galleryItems.forEach(item => item.classList.add('showing'));

// === NAV ACTIVE STATE ===
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// === HEX GRID RANDOM ACTIVATION ===
const hexes = document.querySelectorAll('.hex');

function randomHex() {
  hexes.forEach(h => h.classList.remove('active'));
  const count = Math.floor(Math.random() * 4) + 4;
  const shuffled = [...hexes].sort(() => Math.random() - 0.5);
  shuffled.slice(0, count).forEach(h => h.classList.add('active'));
}

setInterval(randomHex, 2000);

// === GLITCH EFFECT RANDOM TRIGGER ===
document.querySelectorAll('.glitch-text').forEach(el => {
  setInterval(() => {
    el.style.animation = 'none';
    setTimeout(() => el.style.animation = '', 50);
  }, Math.random() * 5000 + 3000);
});

// === SMOOTH ANCHOR SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

console.log('%c[CYBERSHIELD] System online. Threats monitored.', 'color: #00ff88; font-family: monospace; font-size: 14px;');
