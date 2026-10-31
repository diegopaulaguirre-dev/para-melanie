
// CAMBIAR ENTRE PANTALLAS
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// COMENZAR LA EXPERIENCIA
function startPage() {
  showScreen("letter");
}

// ABRIR EL SOBRE
function openLetter() {
  const letter = document.getElementById("letterText");

  letter.style.display = "block";

  letter.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

// COMPLETAR PRIMERA ACTIVIDAD
function completeLetter() {
  showScreen("next");
}

// CREAR CORAZONES ANIMADOS
function createHearts() {
  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";
  container.style.zIndex = "-1";

  document.body.appendChild(container);

  setInterval(() => {
    const heart = document.createElement("span");

    heart.innerHTML = "❤️";

    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (12 + Math.random() * 18) + "px";
    heart.style.opacity = "0.6";
    heart.style.transition = "transform 7s linear, opacity 7s";

    container.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = "translateY(-110vh)";
      heart.style.opacity = "0";
    });

    setTimeout(() => {
      heart.remove();
    }, 7500);

  }, 1200);
}

// INICIAR ANIMACIONES
createHearts();
