
// ===================================
// CONFIGURACIÓN GENERAL
// ===================================

let completedActivities = 0;
let discoveredReasons = new Set();
let foundPieces = new Set();
let quizCorrect = false;

const reasons = [
  "Me encanta tu sonrisa, tiene una manera especial de alegrarme.",
  "Me gusta tu forma de ser, incluso esos pequeños detalles de tu carácter.",
  "Me encanta cómo puedes convertir un momento sencillo en un recuerdo bonito.",
  "Tus ojitos tienen algo que siempre consigue llamar mi atención.",
  "Me gusta que seas tú, con tus virtudes, ocurrencias y esa esencia tan tuya."
];

const activityScreens = [
  "welcome",
  "activity1",
  "activity2",
  "activity3",
  "activity4",
  "activity5",
  "activity6",
  "activity7"
];

// ===================================
// CAMBIAR DE PANTALLA
// ===================================

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

// ===================================
// ACTUALIZAR PROGRESO
// ===================================

function updateProgress() {
  document.getElementById("progress").textContent =
    completedActivities + " / 7 actividades";
}

// ===================================
// COMENZAR
// ===================================

function startPage() {
  showScreen("activity1");
}

// ===================================
// ACTIVIDAD 1: CARTA
// ===================================

function openLetter() {
  const letter = document.getElementById("letterText");

  letter.style.display = "block";

  letter.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

// ===================================
// COMPLETAR ACTIVIDADES
// ===================================

function finishActivity(number) {
  if (number === 2 && !quizCorrect) {
    return;
  }

  if (number === 3 && discoveredReasons.size < 5) {
    alert("Descubre los cinco corazones primero ❤️");
    return;
  }

  if (number === 4 && foundPieces.size < 3) {
    alert("Todavía faltan piezas del corazón ❤️");
    return;
  }

  if (number > completedActivities) {
    completedActivities = number;
  }

  updateProgress();

  showScreen(activityScreens[number + 1]);
}

// ===================================
// ACTIVIDAD 2: PREGUNTAS
// ===================================

function answerQuiz(button, correct) {
  if (quizCorrect) return;

  const result = document.getElementById("quizResult");
  const buttons = document.querySelectorAll(".answer");

  buttons.forEach(answer => {
    answer.disabled = true;
  });

  if (correct) {
    button.classList.add("correct");

    result.textContent =
      "¡Correcto! Fue en junio, el mes en que comenzó nuestra historia. ❤️";

    quizCorrect = true;

    document.getElementById("quizContinue")
      .classList.remove("hidden");

  } else {
    button.classList.add("wrong");

    result.textContent =
      "No era esa respuesta. Puedes intentarlo nuevamente. ❤️";

    setTimeout(() => {
      buttons.forEach(answer => {
        answer.disabled = false;
        answer.classList.remove("wrong");
      });
    }, 1000);
  }
}

// ===================================
// ACTIVIDAD 3: CINCO RAZONES
// ===================================

function revealReason(index) {
  const buttons = document.querySelectorAll(".reasons button");

  document.getElementById("reasonText").textContent =
    reasons[index];

  discoveredReasons.add(index);

  buttons[index].style.background = "#68182c";
  buttons[index].style.borderColor = "#ff9aaa";

  if (discoveredReasons.size === 5) {
    document.getElementById("reasonText").textContent =
      "¡Descubriste las cinco razones! Y todavía hay muchas más. ❤️";
  }
}

// ===================================
// ACTIVIDAD 4: ROMPECABEZAS
// ===================================

function findPiece(button) {
  if (button.classList.contains("found")) return;

  button.classList.add("found");
  button.textContent = "❤️";

  foundPieces.add(button);

  document.getElementById("puzzleResult").textContent =
    "Piezas encontradas: " + foundPieces.size + " / 3";

  if (foundPieces.size === 3) {
    document.getElementById("puzzleMessage").textContent =
      "Un corazón puede guardar muchísimos recuerdos bonitos. ❤️";

    document.getElementById("puzzleContinue")
      .classList.remove("hidden");
  }
}

// ===================================
// CORAZONES FLOTANTES
// ===================================

function createFloatingHeart() {
  const container = document.getElementById("floating-hearts");

  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "❤️" : "♡";

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 20) + "px";

  const duration = 5 + Math.random() * 5;

  heart.style.animationDuration = duration + "s";

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// ===================================
// INICIAR LA PÁGINA
// ===================================

updateProgress();

setInterval(createFloatingHeart, 900);
function toggleMusic() {
    const song = document.getElementById("ourSong");
    const button = document.getElementById("musicButton");
    const message = document.getElementById("musicMessage");
    const heart = document.getElementById("musicHeart");

    if (song.paused) {
        song.play().then(() => {
            button.innerHTML = "♡ Pausar canción ♡";
            message.textContent = "Esta canción es para ti, Melanie ❤️";
            heart.classList.add("playing");
        }).catch(() => {
            message.textContent = "No se pudo reproducir la canción.";
        });
    } else {
        song.pause();
        button.innerHTML = "♡ Reproducir nuestra canción ♡";
        message.textContent = "Cuando quieras, seguimos escuchando juntos.";
        heart.classList.remove("playing");
    }
}

const songPlayer = document.getElementById("ourSong");

if (songPlayer) {
    songPlayer.addEventListener("timeupdate", () => {
        const progress = document.getElementById("musicProgress");
        const time = document.getElementById("musicTime");

        const current = songPlayer.currentTime;
        const duration = songPlayer.duration || 0;

        const percentage = duration ? (current / duration) * 100 : 0;

        progress.style.width = percentage + "%";

        const formatTime = seconds => {
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return String(min).padStart(2, "0") + ":" +
                   String(sec).padStart(2, "0");
        };

        time.textContent =
            formatTime(current) + " / " + formatTime(duration);
    });

    songPlayer.addEventListener("ended", () => {
        document.getElementById("musicButton").innerHTML =
            "♡ Reproducir nuestra canción ♡";
        document.getElementById("musicHeart").classList.remove("playing");
        document.getElementById("musicMessage").textContent =
            "Una canción que siempre me recordará a ti. ❤️";
    });
}
