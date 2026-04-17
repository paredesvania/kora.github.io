// transitions.js — glitch TV antigua al cambiar de página
(function () {
  // Colores de barras de TV: blanco, amarillo, cyan, verde, magenta, rojo, azul
  const TV_COLORS = [
    "#ffffff", "#ffff00", "#00ffff", "#00ff00",
    "#ff00ff", "#ff0000", "#0000ff", "#ff2aa3",
    "#000000", "#888888"
  ];

  const glitch = document.createElement("div");
  glitch.classList.add("page-glitch");
  document.body.appendChild(glitch);

  function fireGlitch(callback) {
    glitch.innerHTML = "";
    glitch.style.opacity = "1";

    // Fondo negro base
    glitch.style.background = "#000";

    // Barras verticales tipo test card TV
    const numBars = 7;
    const barW = 100 / numBars;
    for (let b = 0; b < numBars; b++) {
      const bar = document.createElement("div");
      bar.style.cssText = `
        position: absolute;
        top: 0; bottom: 0;
        left: ${b * barW}%;
        width: ${barW}%;
        background: ${TV_COLORS[b]};
        opacity: 0.85;
      `;
      glitch.appendChild(bar);
    }

    // Ruido horizontal encima (glitch lines)
    for (let i = 0; i < 28; i++) {
      const line = document.createElement("div");
      const top    = Math.random() * 100;
      const h      = Math.random() * 12 + 1;
      const dx     = (Math.random() - 0.5) * 60;
      const color  = TV_COLORS[Math.floor(Math.random() * TV_COLORS.length)];
      const delay  = Math.random() * 0.18;
      line.style.cssText = `
        position: absolute;
        left: 0; right: 0;
        top: ${top}%;
        height: ${h}px;
        background: ${color};
        opacity: 0.9;
        transform: translateX(${dx}px);
        animation: glitchBar 0.5s ${delay}s ease forwards;
      `;
      glitch.appendChild(line);
    }

    // Fade out
    setTimeout(() => {
      glitch.style.transition = "opacity 0.15s ease";
      glitch.style.opacity = "0";
      setTimeout(() => {
        glitch.style.transition = "";
        glitch.style.background = "";
        glitch.innerHTML = "";
        if (callback) callback();
      }, 160);
    }, 420);
  }

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href) return;
    const isInternal = !href.startsWith("http") && !href.startsWith("mailto") && !href.startsWith("#") && !href.startsWith("//");
    if (!isInternal) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    fireGlitch(() => { window.location.href = href; });
  });
})();