document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");

  const sequences = [
    "kora_lab();",
    "kora();",
    "print(\"<3\");"
  ];

  let i = 0;
  let j = 0;
  let deleting = false;document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");

  const sequences = [
    "kora_lab();",
    "kora();",
    "print(\"<3\");"
  ];

  let i = 0;
  let j = 0;
  let deleting = false;

  function type() {
    const current = sequences[i];

    if (!deleting) {
      el.textContent = current.substring(0, j + 1);
      j++;

      if (j === current.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }

      setTimeout(type, 70);

    } else {
      el.textContent = current.substring(0, j - 1);
      j--;

      if (j === 0) {
        deleting = false;
        i++;

        if (i >= sequences.length) return;

        setTimeout(type, 300);
        return;
      }

      setTimeout(type, 40);
    }
  }

  type();
});

  function type() {
    const current = sequences[i];

    if (!deleting) {
      el.textContent = current.slice(0, j++);
      
      if (j > current.length) {
        deleting = true;
        setTimeout(type, 1000);
        return;
      }

      setTimeout(type, 80);

    } else {
      el.textContent = current.slice(0, j--);

      if (j < 0) {
        deleting = false;
        i++;

        if (i >= sequences.length) return;

        j = 0;
        setTimeout(type, 300);
        return;
      }

      setTimeout(type, 40);
    }
  }

  type();
});
