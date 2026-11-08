/* Moteur du livre illustré de Poupou — partagé par toutes les histoires. */
(function () {
  const SPRITE = '/assets/personnages.svg';
  // hauteur / largeur de chaque dessin de la planche
  const RATIO = {
    poupou: 1, caramel: 180 / 220, marguerite: 240 / 300, coincoin: 1, hamid: 256 / 160,
    chapeau: 0.5, grange: 240 / 260, soleil: 1, nuage: 0.55, arbre: 1.2, fleur: 1.5,
    mare: 126 / 360, barriere: 0.4, graines: 0.5, coeur: 0.9, etoile: 1, lune: 1,
    luciole: 1, lanterne: 1.5, buisson: 0.55,
    citrouille: 0.85, citrouillesourire: 0.85, feuille: 1, feuillerouge: 1, tasfeuilles: 110 / 240,
    arbreautomne: 1.2, brouette: 130 / 240, soupe: 0.8,
    herisson: 0.75, herissondort: 100 / 140, cabane: 0.9, bottefoin: 0.65, pomme: 1,
    escargot: 0.75, parapluie: 140 / 120, salade: 110 / 160, arcenciel: 210 / 400, flaque: 0.25, panier: 110 / 140,
    mouton: 0.85, pelote: 1, touffe: 40 / 60, flocon: 1, betterave: 1.2, bassine: 110 / 200, tricot: 0.75,
    souris: 100 / 120, gateau: 160 / 200, part: 0.8, oeuf: 1.25, seau: 1, sacfarine: 140 / 120, saladier: 110 / 180, four: 170 / 200, guirlande: 70 / 400,
    hibou: 130 / 120, hibouchante: 130 / 120, hiboutriste: 130 / 120, vieilarbre: 420 / 320, branche: 120 / 400, note: 80 / 60,
    ecureuil: 160 / 150, ecureuiltriste: 160 / 150, gland: 100 / 80, tasglands: 90 / 160, carte: 180 / 240, pousse: 140 / 120,
    lapin: 180 / 150, lapintimide: 180 / 150, lapincorps: 180 / 150, lampion: 170 / 120, lampionjaune: 170 / 120, lampionbleu: 170 / 120, lampionbaton: 170 / 120,
    bocal: 140 / 110, lanternefeuilles: 140 / 110,
    rougegorge: 110 / 120, rougegorgefroid: 110 / 120, rougegorgechante: 110 / 120, mesange: 110 / 120, mangeoire: 180 / 140, arbrenu: 300 / 240, planches: 90 / 200,
    chevre: 180 / 170, chevretimide: 180 / 170, chevresaute: 180 / 170, chevrecorps: 180 / 170, chevretete: 180 / 170, cerfvolant: 200 / 120
  };

  /* u(id, x, y, largeur, {flip, rot, op}) — place un dessin de la planche dans la scène 800×560 */
  window.u = function (id, x, y, w, o = {}) {
    const h = w * (RATIO[id] || 1);
    let t = '';
    if (o.rot) t += `rotate(${o.rot} ${x + w / 2} ${y + h / 2}) `;
    if (o.flip) t += `translate(${2 * x + w} 0) scale(-1 1)`;
    return `<use href="${SPRITE}#${id}" x="${x}" y="${y}" width="${w}" height="${h}"` +
      (t ? ` transform="${t.trim()}"` : '') + (o.op ? ` opacity="${o.op}"` : '') + '/>';
  };

  /* decor(moment, derriere) — ciel + collines. moment : 'jour' | 'coucher' | 'nuit' | 'pluie'
     `derriere` est dessiné entre le ciel et les collines (soleil couchant, lune basse…) */
  window.decor = function (m = 'jour', derriere = '') {
    const ciel = { jour: ['#8FD3FF', '#E4F6FF'], coucher: ['#FF8C5A', '#FFD98A'], nuit: ['#1B2554', '#3B4C8A'], pluie: ['#8C9DB0', '#CBD6E0'] }[m] || ['#8FD3FF', '#E4F6FF'];
    const c1 = m === 'nuit' ? '#2E5B3A' : m === 'coucher' ? '#8CC25A' : '#9BD36A';
    const c2 = m === 'nuit' ? '#234A2E' : m === 'coucher' ? '#6FAE45' : '#7CC24F';
    const etoiles = m === 'nuit' ? [[80, 60], [200, 120], [330, 50], [470, 100], [560, 40], [700, 140], [140, 200], [620, 210]]
      .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 2.5 : 3.5}" fill="#FFF6C8"/>`).join('') : '';
    return `<defs><linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ciel[0]}"/><stop offset="1" stop-color="${ciel[1]}"/></linearGradient></defs>` +
      `<rect width="800" height="560" fill="url(#ciel)"/>${etoiles}${derriere}` +
      `<path d="M0 380 C150 330 300 362 420 342 C560 316 680 350 800 330 L800 560 L0 560Z" fill="${c1}"/>` +
      `<path d="M0 432 C200 402 400 442 800 412 L800 560 L0 560Z" fill="${c2}"/>` +
      `<g stroke="${c1}" stroke-width="4" stroke-linecap="round" fill="none"><path d="M60 500 l6 -16 l6 16 M300 470 l6 -16 l6 16 M520 520 l6 -16 l6 16 M720 470 l6 -16 l6 16"/></g>`;
  };

  /* vent(x, y, échelle) — tourbillons de vent blancs */
  window.vent = function (x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".9">` +
      `<path d="M0 30 Q90 0 170 30 q35 12 25 -14 q-8 -18 -28 -2"/><path d="M30 78 Q120 52 220 80"/><path d="M-10 124 Q70 104 140 126 q30 8 22 -12"/></g>`;
  };

  /* confettis(n) — fête ! */
  window.confettis = function (n = 26) {
    const cols = ['#FF5C7A', '#FFD43B', '#3F8EDB', '#4CAF50', '#FF9F1C', '#B36BD9'];
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = (i * 137) % 780 + 10, y = (i * 89) % 300 + 20, r = (i * 47) % 180;
      s += `<rect x="${x}" y="${y}" width="14" height="8" rx="2" fill="${cols[i % cols.length]}" transform="rotate(${r} ${x + 7} ${y + 4})"/>`;
    }
    return s;
  };

  /* bulle(x, y, texte) — petite bulle de parole */
  window.bulle = function (x, y, txt, w = 150) {
    return `<g><rect x="${x}" y="${y}" width="${w}" height="54" rx="27" fill="#fff" stroke="#6B3A1E" stroke-width="3"/>` +
      `<path d="M${x + 30} ${y + 52} l-8 22 l26 -22Z" fill="#fff" stroke="#6B3A1E" stroke-width="3" stroke-linejoin="round"/>` +
      `<rect x="${x + 20}" y="${y + 44}" width="34" height="8" fill="#fff"/>` +
      `<text x="${x + w / 2}" y="${y + 36}" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="24" font-weight="600" fill="#6B3A1E">${txt}</text></g>`;
  };

  window.lancerHistoire = function (h) {
    const app = document.getElementById('app');
    const total = h.pages.length + 2; // couverture + pages + fin
    let i = 0, lectureAuto = false;
    document.title = h.titre + ' — Les aventures de Poupou';

    const sceneFin = () => decor('coucher', u('soleil', 300, 250, 200)) + confettis(18) +
      u('coeur', 100, 90, 80, { rot: -12 }) + u('coeur', 620, 80, 70, { rot: 12 }) + u('poupou', 290, 280, 220);

    function scene(k) {
      if (k === 0) return h.couverture ? h.couverture() : h.pages[0].scene();
      if (k === total - 1) return h.fin ? h.fin() : sceneFin();
      return h.pages[k - 1].scene();
    }
    function texte(k) {
      if (k === 0) return `<h1>${h.titre}</h1><p class="sous">Une aventure de Poupou la poule · n°${h.numero}</p>`;
      if (k === total - 1) return `<h2>Fin</h2><p class="morale">${h.morale || ''}</p>` +
        `<div class="fin-btns"><button id="encore" class="bouton">↺ Relire</button><a class="bouton bleu" href="/">📚 Toutes les histoires</a></div>`;
      return `<p>${h.pages[k - 1].texte}</p>`;
    }

    function parler() {
      if (!('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const el = document.querySelector('.texte');
      const t = el ? el.innerText.replace('↺ Relire', '').replace('📚 Toutes les histoires', '') : '';
      const ut = new SpeechSynthesisUtterance(t);
      ut.lang = 'fr-FR'; ut.rate = 0.88; ut.pitch = 1.1;
      const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.startsWith('fr'));
      if (v) ut.voice = v;
      speechSynthesis.speak(ut);
    }

    function rendre() {
      const dots = Array.from({ length: total }, (_, k) => `<span class="${k === i ? 'on' : ''}"></span>`).join('');
      app.innerHTML =
        `<header class="barre"><a href="/" class="retour">🏠 Mes histoires</a>` +
        `<button id="lire" class="lire ${lectureAuto ? 'actif' : ''}" aria-pressed="${lectureAuto}">${lectureAuto ? '🔊 Lecture en cours' : '🔈 Écouter l’histoire'}</button></header>` +
        `<main class="page ${i === 0 ? 'couv' : ''}"><div class="illu"><svg viewBox="0 0 800 560" role="img" aria-label="Illustration">${scene(i)}</svg></div>` +
        `<div class="texte">${texte(i)}</div></main>` +
        `<nav class="nav"><button id="prev" class="fleche" ${i === 0 ? 'disabled' : ''} aria-label="Page précédente">◀</button>` +
        `<div class="points">${dots}</div>` +
        `<button id="next" class="fleche" ${i === total - 1 ? 'disabled' : ''} aria-label="Page suivante">▶</button></nav>`;
      document.getElementById('prev').onclick = () => aller(i - 1);
      document.getElementById('next').onclick = () => aller(i + 1);
      document.getElementById('lire').onclick = () => { lectureAuto = !lectureAuto; if (lectureAuto) { rendre(); parler(); } else { speechSynthesis && speechSynthesis.cancel(); rendre(); } };
      const enc = document.getElementById('encore'); if (enc) enc.onclick = () => aller(0);
    }
    function aller(k) {
      if (k < 0 || k >= total) return;
      i = k; if ('speechSynthesis' in window) speechSynthesis.cancel();
      rendre(); window.scrollTo({ top: 0, behavior: 'smooth' });
      if (lectureAuto) setTimeout(parler, 250);
    }
    document.addEventListener('keydown', e => { if (e.key === 'ArrowRight') aller(i + 1); if (e.key === 'ArrowLeft') aller(i - 1); });
    let x0 = null;
    document.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 60) aller(i + (dx < 0 ? 1 : -1)); x0 = null; });
    rendre();
  };
})();
