window.addEventListener('scroll', () =>
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 40)
);

function sc(id) {
  document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const pobs = new IntersectionObserver(
  (es) => {
    es.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('vis'), i * 130);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.pstep').forEach((s) => pobs.observe(s));

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
  document.body.style.overflow = '';
}

function cmout(e) {
  if (e.target === document.getElementById('mo')) cm();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cm();
});
