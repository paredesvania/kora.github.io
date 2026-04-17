document.addEventListener("DOMContentLoaded", () => {

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

    // Fondo negro base visible
    glitch.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 999999;
      pointer-events: none;
      opacity: 1;
      background: #000;
    `;

    // Barras de color TV
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
        opacity: 0.9;
      `;
      glitch.appendChild(bar);
    }

    // Líneas de ruido
    for (let i = 0; i < 28; i++) {
      const line = document.createElement("div");
      const top   = Math.random() * 100;
      const h     = Math.random() * 12 + 1;
      const dx    = (Math.random() - 0.5) * 60;
      const color = TV_COLORS[Math.floor(Math.random() * TV_COLORS.length)];
      const delay = Math.random() * 0.18;
      line.style.cssText = `
        position: absolute;
        left: 0; right: 0;
        top: ${top}%;
        height: ${h}px;
        background: ${color};
        opacity: 0.95;
        transform: translateX(${dx}px);
        animation: glitchBar 0.45s ${delay}s ease forwards;
      `;
      glitch.appendChild(line);
    }

    // Fade out y navegar
    setTimeout(() => {
      glitch.style.transition = "opacity 0.18s ease";
      glitch.style.opacity = "0";
      setTimeout(() => {
        glitch.style.cssText = "position:fixed;inset:0;z-index:999999;pointer-events:none;opacity:0;background:transparent;";
        glitch.innerHTML = "";
        if (callback) callback();
      }, 200);
    }, 650);
  }

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href) return;
    const isInternal =
      !href.startsWith("http") &&
      !href.startsWith("mailto") &&
      !href.startsWith("#") &&
      !href.startsWith("//");
    if (!isInternal) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    fireGlitch(() => {
      window.location.href = href;
    });
  });

});