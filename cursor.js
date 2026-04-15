const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const links = document.querySelectorAll("a");

links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
  });

  link.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    if (link.hostname === window.location.hostname) {
      e.preventDefault();
      const target = link.href;
      document.querySelector('.page-transition').classList.add('active');
      setTimeout(() => {
        window.location.href = target;
      }, 600);
    }
  });
});
