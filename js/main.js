const nav = document.getElementById('nav');
const scrollProgress = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');

window.addEventListener('scroll', () => {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 40);
  backTop.classList.toggle('vis', y > 600);
  const docH = document.documentElement.scrollHeight - innerHeight;
  if (scrollProgress && docH > 0) {
    scrollProgress.style.width = `${(y / docH) * 100}%`;
  }
  updateActiveNav();
});

function sc(id) {
  const el = document.querySelector(typeof id === 'string' && id.startsWith('#') ? id : `#${id}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeNav();
}

function closeNav() {
  navToggle?.classList.remove('open');
  navDrawer?.classList.remove('open');
  nav?.classList.remove('nav-open');
  document.body.style.overflow = document.getElementById('mo')?.classList.contains('open') ? 'hidden' : '';
}

navToggle?.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navDrawer?.classList.toggle('open', open);
  nav?.classList.toggle('nav-open', open);
  if (!document.getElementById('mo')?.classList.contains('open')) {
    document.body.style.overflow = open ? 'hidden' : '';
  }
});

document.querySelectorAll('[data-nav], .nav-drawer a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href') || `#${link.dataset.nav}`;
    sc(id);
  });
});

const navSections = ['paradigm', 'process', 'kiscam', 'certifications', 'usages'];

function updateActiveNav() {
  const offset = (nav?.offsetHeight ?? 66) + 24;
  const scrollPos = window.scrollY + offset;
  let current = navSections[0];

  for (const id of navSections) {
    const section = document.getElementById(id);
    if (section && scrollPos >= section.offsetTop) {
      current = id;
    }
  }

  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === current);
  });
}

window.addEventListener('resize', updateActiveNav);

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document
  .querySelectorAll(
    '.sec-inner > .sec-tag, .sec-inner > .sec-h, .sec-inner > p, .paradigm-layout, .vision-top, .vision-cards, .vc, .wi, .qcard, .uf, .cert, .tblock, .nstat, .pvis, .kiscam-device, .kiscam-specs, .trust-highlight, .trust-layout > div, .proof-band, .proof-ref, .digital-inner > div, .ctafinal > *'
  )
  .forEach((el, i) => {
    el.classList.add('reveal');
    el.classList.add(`reveal-d${(i % 4) + 1}`);
    revealObs.observe(el);
  });

const pobs = new IntersectionObserver(
  (es) => {
    es.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('vis'), i * 130);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.pstep').forEach((s) => pobs.observe(s));

function formatCount(val, format, decimals) {
  if (format === 'compact') {
    if (val >= 1e6) return `${Math.round(val / 1e6)}M`;
    if (val >= 1e3) return `${Math.round(val / 1e3)}K`;
  }
  if (decimals) return val.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return Math.round(val).toLocaleString('fr-FR');
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  if (isNaN(target)) return;
  const suffix = el.dataset.suffix || '';
  const format = el.dataset.format;
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - t) ** 3;
    const current = target * eased;
    const formatted = formatCount(current, format, decimals);
    el.innerHTML = `${formatted}<sup>${suffix}</sup>`;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('[data-count]').forEach((el) => counterObs.observe(el));

function switchTab(i) {
  document.querySelectorAll('.utab').forEach((t, j) => t.classList.toggle('active', j === i));
  document.querySelectorAll('.upanel').forEach((p, j) => p.classList.toggle('active', j === i));
}

const mc = {
  demo: {
    t: 'Demander une démonstration',
    d: 'Notre équipe institutionnelle vous contactera sous 48h pour organiser une présentation adaptée à votre contexte.',
    b: 'Envoyer la demande',
    msg: true,
  },
  pilot: {
    t: 'Lancer un projet pilote',
    d: 'Nous accompagnons les institutions dans la mise en œuvre de projets pilotes — de la définition du périmètre au bilan opérationnel.',
    b: 'Soumettre le projet',
    msg: true,
  },
  contact: {
    t: 'Contacter nos experts',
    d: 'Nos experts institutionnels et biométriques sont disponibles pour échanger sur vos besoins spécifiques.',
    b: 'Demander un rappel',
    msg: true,
  },
  docs: {
    t: 'Accéder à la documentation technique',
    d: 'Téléchargez nos fiches techniques, rapports de conformité et résultats APCER. Accès réservé aux acteurs institutionnels.',
    b: "Demander l'accès",
    msg: false,
  },
};

function om(k) {
  const c = mc[k];
  document.getElementById('mt').textContent = c.t;
  document.getElementById('md').textContent = c.d;
  document.getElementById('msub').textContent = c.b;
  document.getElementById('mmg').style.display = c.msg ? '' : 'none';
  document.getElementById('mo').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cm() {
  document.getElementById('mo').classList.remove('open');
  document.body.style.overflow = navDrawer?.classList.contains('open') ? 'hidden' : '';
}

function cmout(e) {
  if (e.target === document.getElementById('mo')) cm();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cm();
    closeNav();
  }
});

updateActiveNav();
