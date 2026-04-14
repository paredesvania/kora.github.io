function openProject(id) {
  const windowEl = document.getElementById('project-window');
  const content = document.getElementById('window-content');
  const title = document.getElementById('window-title');

  windowEl.classList.remove('hidden');

  if (id === 'albura') {
    title.innerText = 'Albura';
    content.innerHTML = `
      <img src="assets/albura/imagen1.jpg" style="width:100%">
      <p>Exploración en madera basada en ensamblaje modular.</p>
    `;
  }

  if (id === 'feria') {
    title.innerText = 'Feria móvil';
    content.innerHTML = `
      <img src="assets/feria-movil/imagen1.jpg" style="width:100%">
      <p>Sistema urbano adaptable para comercio.</p>
    `;
  }

  if (id === 'lemontech') {
    title.innerText = 'Lemontech';
    content.innerHTML = `
      <img src="assets/lemontech/imagen1.jpg" style="width:100%">
      <p>Identidad visual tecnológica.</p>
    `;
  }
}

function closeProject() {
  document.getElementById('project-window').classList.add('hidden');
}
