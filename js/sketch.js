// sketch.js — Playground de física (letras que caen y rebotan)
// NOTA: el typing del hero lo maneja index.html directamente.
// Este archivo solo activa el playground interactivo cuando existe en la página.

// ─────────────────────────────
// NORMALIZAR TEXTO
// ─────────────────────────────
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// ─────────────────────────────
// PALABRAS BLOQUEADAS
// ─────────────────────────────
const bannedWords = [
  "pico","pene","dick","pija","verga","tranca","chuchin",
  "tula","chupalo","chupame","chupar","forro","concha",
  "puta","weon","heon","hueon","culiao","culiado","ctm",
  "conchetumadre","conchadesumadre","mierda","cagado",
  "marica","maricon","aweonao","aweonado","weona",
  "flaite","poto","raja","cagar","cagaste",
  "fuck","shit","ass","bitch","cunt","nigga","faggot",
  "peo","sexo","mierda","caca","blowjob","culiar","culear",
  "coger","cojer","joder","jodete","jodeme","polla","conchetumare",
  "zorra","pendejo","pendeja","boludo","boluda","gilipollas","hijo de puta",
  "hija de puta","hijueputa","hijueputo","malparido","malparida",
  "imbecil","idiota","estupido","estupida","tarado",
  "tarada","subnormal","mongol","mongolo","retardado","retardada",
  "lameculos","lamebotas","zopenco","zopenca","cabrón","cabrona","capullo",
  "capulla","gilipollas","gilipoyas","dumb","culo","pussy"
];

function containsBannedWord(text) {
  const clean = normalizeText(text);
  return bannedWords.some(word => {
    const nw = normalizeText(word);
    const pattern = nw
      .replace(/i/g, "[i1!|]").replace(/o/g, "[o0]").replace(/a/g, "[a4@]")
      .replace(/e/g, "[e3]").replace(/u/g, "[uv]").replace(/s/g, "[s5$]");
    return new RegExp(pattern, "i").test(clean);
  });
}

// ─────────────────────────────
// INIT — solo si existe playground en esta página
// ─────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const input      = document.getElementById("command-input");
  const playground = document.getElementById("playground");
  const controls   = document.querySelector(".color-controls");

  if (!input || !playground) return; // no estamos en index o la sección no existe

  // ── Inicializar colores de los botones desde data-bg ──
  // Sin esto los botones aparecen sin color (gris por defecto)
  if (controls) {
    controls.querySelectorAll("button").forEach(btn => {
      const bg = btn.dataset.bg;
      if (bg) btn.style.background = bg;
    });
  }

  let letters          = [];
  let animationId      = null;
  let currentTextColor = "#ffffff";

  // ── Tamaño dinámico ──
  function getLetterSize(charCount) {
    const w = window.innerWidth;
    const pw = playground.getBoundingClientRect().width || w * 0.9;
    let base;
    if (w < 480)      base = 48;
    else if (w < 768) base = 64;
    else              base = Math.min(120, Math.max(60, w * 0.08));
    const maxByWidth = Math.floor((pw * 0.9) / charCount);
    return Math.min(base, Math.max(28, maxByWidth));
  }

  // ── Input ──
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const value = input.value.trim();
    if (!value) return;
    if (containsBannedWord(value)) {
      input.value = "";
      input.placeholder = "esa no... intenta otra cosa ;)";
      setTimeout(() => { input.placeholder = 'type here'; }, 2000);
      return;
    }
    startPlayground(value);
    input.value = "";
  });

  // ── Crear playground ──
  function startPlayground(text) {
    if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    playground.innerHTML = "";
    letters = [];
    if (controls) controls.classList.add("active");

    const chars   = text.split("");
    const size    = getLetterSize(chars.length);
    const bounds  = playground.getBoundingClientRect();
    const pw      = bounds.width;
    const centerX = pw / 2;
    const spacing = Math.min(size * 0.75, (pw * 0.9) / chars.length);
    const startX  = centerX - (spacing * (chars.length - 1)) / 2;

    chars.forEach((char, idx) => {
      const el = document.createElement("span");
      el.innerText = char === " " ? "\u00A0" : char;
      el.className = "play-letter";
      el.style.fontSize = size + "px";
      el.style.color = currentTextColor;
      playground.appendChild(el);
      letters.push({
        el,
        x:  startX + idx * spacing + (Math.random() - 0.5) * 10,
        y:  -size - idx * (size * 0.6),
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 1.5,
        size
      });
    });
    animate();
  }

  // ── Física ──
  const GRAVITY = 0.55, FRICTION_X = 0.92, BOUNCE_FLOOR = 0.25;
  const BOUNCE_WALL = 0.35, BOUNCE_CEIL = 0.25;
  const SLEEP_VY = 1.0, SLEEP_VX = 0.4, DAMP_COLLIDE = 0.12;

  function animate() {
    function loop() {
      const bounds = playground.getBoundingClientRect();
      letters.forEach((a, i) => {
        a.vy += GRAVITY; a.x += a.vx; a.y += a.vy; a.vx *= FRICTION_X;
        const sz = a.size;
        if (a.y >= bounds.height - sz) {
          a.y = bounds.height - sz; a.vy *= -BOUNCE_FLOOR; a.vx *= 0.8;
          if (Math.abs(a.vy) < SLEEP_VY) a.vy = 0;
          if (Math.abs(a.vx) < SLEEP_VX) a.vx = 0;
        }
        if (a.y < 0) { a.y = 0; a.vy *= -BOUNCE_CEIL; if (Math.abs(a.vy) < SLEEP_VY) a.vy = 0; }
        if (a.x < 0) { a.x = 0; a.vx *= -BOUNCE_WALL; if (Math.abs(a.vx) < SLEEP_VX) a.vx = 0; }
        if (a.x > bounds.width - sz) { a.x = bounds.width - sz; a.vx *= -BOUNCE_WALL; if (Math.abs(a.vx) < SLEEP_VX) a.vx = 0; }
        letters.forEach((b, j) => {
          if (i >= j) return;
          const dx = a.x - b.x, dy = a.y - b.y;
          const ox = sz - Math.abs(dx), oy = sz - Math.abs(dy);
          if (ox <= 0 || oy <= 0) return;
          if (ox < oy) {
            const sign = dx >= 0 ? 1 : -1;
            a.x += sign * ox * 0.5; b.x -= sign * ox * 0.5;
            const avg = (a.vx + b.vx) * 0.5;
            a.vx = avg * DAMP_COLLIDE; b.vx = avg * DAMP_COLLIDE;
          } else {
            const sign = dy >= 0 ? 1 : -1;
            if (sign > 0) { a.y = b.y - sz; a.vy = 0; b.vy += 0.2; }
            else          { b.y = a.y - sz; b.vy = 0; a.vy += 0.2; }
            if (Math.abs(a.vy) < SLEEP_VY) a.vy = 0;
            if (Math.abs(b.vy) < SLEEP_VY) b.vy = 0;
          }
        });
        a.el.style.transform = `translate(${Math.round(a.x)}px, ${Math.round(a.y)}px)`;
      });
      animationId = requestAnimationFrame(loop);
    }
    animationId = requestAnimationFrame(loop);
  }

  // ── Repulsión mouse/touch ──
  playground.addEventListener("mousemove", (e) => {
    const rect = playground.getBoundingClientRect();
    repel(e.clientX - rect.left, e.clientY - rect.top, 130, 0.045);
  });
  playground.addEventListener("touchmove", (e) => {
    const rect = playground.getBoundingClientRect();
    const t = e.touches[0];
    repel(t.clientX - rect.left, t.clientY - rect.top, 100, 0.04);
  }, { passive: true });

  function repel(mx, my, radius, strength) {
    letters.forEach(l => {
      const dx = l.x + l.size/2 - mx, dy = l.y + l.size/2 - my;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < radius && dist > 0) {
        const force = ((radius - dist) / radius) * strength;
        l.vx += (dx/dist)*force*radius;
        l.vy += (dy/dist)*force*radius;
      }
    });
  }

  // ── Colores ──
  if (controls) {
    controls.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const bg   = e.currentTarget.dataset.bg;
        const text = e.currentTarget.dataset.text;
        playground.style.backgroundColor = bg;
        currentTextColor = text;
        letters.forEach(l => { l.el.style.color = text; });
      });
    });
  }
});