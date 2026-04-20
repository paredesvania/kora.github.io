document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.createElement("canvas");
  const ctx    = canvas.getContext("2d");
  canvas.style.cssText = `
    position: fixed; inset: 0;
    z-index: 999999; pointer-events: none;
    display: none;
  `;
  document.body.appendChild(canvas);

  let W, H, rafId = null, onDone = null;
  let letters = [];
  let bgAlpha  = 0;
  let phase    = "idle";

  const WORD    = "...";
  const GRAVITY = 0.7;
  const DARK    = () => document.body.classList.contains("dark");

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function fontSz() { return Math.min(W * 0.28, 220); }

  // Letras caen desde arriba, pasan por el centro sin parar,
  // rebotan UNA vez contra el "suelo invisible" (un poco más abajo del centro)
  // y luego siguen cayendo fuera de pantalla desvaneciéndose
  function spawnLetters() {
    const fs = fontSz();
    ctx.font = `700 ${fs}px Poppins, sans-serif`;
    const totalW = ctx.measureText(WORD).width;
    let x = (W - totalW) / 2;
    // El "suelo" está justo en el centro visual
    const floorY = H / 2 + fs * 0.35;

    letters = [];
    for (const char of WORD) {
      const cw = ctx.measureText(char).width;
      const stagger = Math.random() * 60; // caen ligeramente desfasadas
      letters.push({
        char, fs,
        x:      x + (Math.random() - 0.5) * 40,
        y:      -fs * 2 - stagger,
        floorY,
        vx:     (Math.random() - 0.5) * 2,
        vy:     Math.random() * 1.5 + 2,
        rot:    (Math.random() - 0.5) * 0.2,
        vrot:   (Math.random() - 0.5) * 0.04,
        alpha:  1,
        bounced: false,  // ¿ya rebotó?
        falling: false,  // ¿ya está en caída final?
      });
      x += cw;
    }
  }

  function drawBg() {
    const c = DARK() ? `rgba(10,10,10,${bgAlpha})` : `rgba(250,250,250,${bgAlpha})`;
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, W, H);
  }

  function drawLetters() {
    const fg = DARK() ? "#f0f0f0" : "#0a0a0a";
    letters.forEach(l => {
      if (l.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = l.alpha;
      ctx.font        = `700 ${l.fs}px Poppins, sans-serif`;
      ctx.fillStyle   = fg;
      ctx.translate(l.x + l.fs * 0.5, l.y);
      ctx.rotate(l.rot);
      ctx.fillText(l.char, -l.fs * 0.25, 0);
      ctx.restore();
    });
  }

  function updateCover() {
    // Fondo aparece rápido al principio
    bgAlpha = Math.min(1, bgAlpha + 0.07);

    letters.forEach(l => {
      // Gravedad siempre activa — nunca paran
      l.vy  += GRAVITY;
      l.y   += l.vy;
      l.x   += l.vx;
      l.rot += l.vrot;
      l.vx  *= 0.97;

      // Un solo rebote al pasar el floorY
      if (!l.bounced && l.y >= l.floorY) {
        l.y       = l.floorY;
        l.vy      = -l.vy * 0.38;  // rebote amortiguado — no sube mucho
        l.vrot    = (Math.random() - 0.5) * 0.06;
        l.bounced = true;
      }

      // Después del rebote, cuando vuelve a bajar: caída final con desvanecimiento
      if (l.bounced && !l.falling && l.vy > 0) {
        l.falling = true;
      }
      if (l.falling) {
        l.alpha = Math.max(0, l.alpha - 0.022);
      }
    });

    ctx.clearRect(0, 0, W, H);
    drawBg();
    drawLetters();

    // Navegar cuando el fondo está lleno Y las letras ya pasaron el floorY
    const lettersGone = letters.every(l => l.bounced && l.vy > 0);
    if (bgAlpha >= 1 && lettersGone) {
      if (onDone) { onDone(); onDone = null; }
    }

    // Terminar loop cuando todo desapareció
    const allDone = letters.every(l => l.alpha <= 0 || l.y > H + 100);
    if (allDone && bgAlpha >= 1) {
      rafId = null;
      phase = "idle";
      return;
    }

    rafId = requestAnimationFrame(updateCover);
  }

  // Entrada en nueva página: solo el fondo que desaparece, limpio
  function updateUncover() {
    bgAlpha = Math.max(0, bgAlpha - 0.06);
    ctx.clearRect(0, 0, W, H);
    if (bgAlpha > 0) drawBg();

    if (bgAlpha <= 0) {
      canvas.style.display = "none";
      phase = "idle";
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(updateUncover);
  }

  function run(p, cb) {
    if (rafId) cancelAnimationFrame(rafId);
    phase  = p;
    onDone = cb || null;
    canvas.style.display = "block";

    if (p === "cover") {
      bgAlpha = 0;
      spawnLetters();
      rafId = requestAnimationFrame(updateCover);
    } else {
      // Entrada: fondo opaco que se desvanece suavemente
      bgAlpha = 1;
      rafId = requestAnimationFrame(updateUncover);
    }
  }

  resize();
  window.addEventListener("resize", resize);

  // Entrada en la página
  run("uncover");

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href) return;
    const internal =
      !href.startsWith("http")   &&
      !href.startsWith("mailto") &&
      !href.startsWith("#")      &&
      !href.startsWith("//");
    if (!internal || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    run("cover", () => { window.location.href = href; });
  });

});
