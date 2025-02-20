function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

const easy = document.querySelector(".easy");
const normal = document.querySelector(".normal");
const hard = document.querySelector(".hard");
const start = document.querySelector(".start-btn");
easy.addEventListener("click", () => {
  easy.style.transform = "scale(1.1)";
  normal.style.transform = "scale(1)";
  hard.style.transform = "scale(1)";
});
normal.addEventListener("click", () => {
  easy.style.transform = "scale(1)";
  normal.style.transform = "scale(1.1)";
  hard.style.transform = "scale(1)";
});
hard.addEventListener("click", () => {
  easy.style.transform = "scale(1)";
  normal.style.transform = "scale(1)";
  hard.style.transform = "scale(1.1)";
});
start.addEventListener("click", () => {
  if (start.disabled) return;

  if (easy.style.transform === "scale(1.1)") {
    window.location.href = "for atena";
  } else if (normal.style.transform === "scale(1.1)") {
    window.location.href = "for atena";
  } else if (hard.style.transform === "scale(1.1)") {
    window.location.href = "for atena";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const isRegistered = localStorage.getItem("isRegistered");

  if (isRegistered === "true") {
    start.disabled = false;
    start.style.opacity = "1";
    start.textContent = "Start Game";
  } else {
    start.disabled = true;
    start.style.opacity = "0.5";
    start.textContent = "Please Sign Up First";
  }
});

//---------------     fake join   --------------//

// function simulateSignup() {
//     localStorage.setItem("isRegistered", "true");
//     alert("You are welcome to join us");
//     location.reload();
//     }
//     simulateSignup()
