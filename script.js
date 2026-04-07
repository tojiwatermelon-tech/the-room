document.addEventListener("DOMContentLoaded", () => {

  const messages = [
    "you found your way here…",
    "this place remembers you…",
    "it has been waiting…"
  ];

  let index = 0;

  const gateText = document.getElementById("gateText");
  const passwordContainer = document.getElementById("passwordContainer");
  const passwordInput = document.getElementById("passwordInput");
  const errorText = document.getElementById("errorText");

  function typeText(text) {
    gateText.innerText = "";
    let i = 0;

    const typing = setInterval(() => {
      gateText.innerText += text[i];
      i++;
      if (i >= text.length) clearInterval(typing);
    }, 35);
  }

  function showMessage() {
    gateText.classList.add("show");
    typeText(messages[index]);
  }

  function createParticles() {
    const container = document.getElementById("particles");

    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "particle";

      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDuration = (8 + Math.random() * 5) + "s";

      container.appendChild(p);
    }
  }

  function createRipple(e) {
    const ripple = document.createElement("div");
    ripple.className = "ripple";

    ripple.style.left = e.clientX - 10 + "px";
    ripple.style.top = e.clientY - 10 + "px";

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  function showPassword() {
    gateText.classList.remove("show");

    setTimeout(() => {
      gateText.style.display = "none";
      passwordContainer.classList.remove("hidden");

      setTimeout(() => {
        passwordContainer.classList.add("show");
      }, 50);
    }, 500);
  }

  function error() {
    errorText.innerText = "that doesn’t feel right…";
    errorText.style.opacity = 1;

    passwordInput.classList.add("shake");

    setTimeout(() => {
      errorText.style.opacity = 0;
      passwordInput.classList.remove("shake");
    }, 2000);
  }

  function success() {
    document.body.style.transition = "all 1.2s ease";
    document.body.style.opacity = 0;
    document.body.style.transform = "scale(1.05)";

    setTimeout(() => {
      document.body.innerHTML =
        "<h2 style='font-family:Quicksand;color:#6A4E42'>Entering The Room… 💗</h2>";
    }, 1200);
  }

  document.body.addEventListener("click", (e) => {

    createRipple(e);

    if (index < messages.length - 1) {
      index++;
      gateText.classList.remove("show");

      setTimeout(() => {
        showMessage();
      }, 500);

    } else {
      showPassword();
    }
  });

  passwordInput.addEventListener("change", () => {
    if (passwordInput.value === "2025-09-04") {
      success();
    } else {
      error();
    }
  });

  showMessage();
  createParticles();

});