const projects = {
  albura: {
    title: "Albura",
    content: `
      <img src="assets/albura/imagen1.jpg" style="width:100%">
      <p>Exploración en madera basada en ensamblaje modular.</p>
    `
  },

  feria: {
    title: "Feria móvil",
    content: `
      <img src="assets/feria-movil/imagen1.jpg" style="width:100%">
      <p>Sistema urbano adaptable para comercio.</p>
    `
  },

  lemontech: {
    title: "Lemontech",
    content: `
      <img src="assets/lemontech/imagen1.jpg" style="width:100%">
      <p>Identidad visual tecnológica.</p>
    `
  }
};

function openProject(id) {
  const windowEl = document.getElementById('project-window');
  const content = document.getElementById('window-content');
  const title = document.getElementById('window-title');

  const project = projects[id];

  title.innerText = project.title;
  content.innerHTML = project.content;

  windowEl.classList.remove('hidden');
}

function closeProject() {
  document.getElementById('project-window').classList.add('hidden');
}
