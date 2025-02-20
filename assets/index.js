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
  if (start.disabled) {
    return alert("Please Sign Up First");
  }

  if (easy.style.transform === "scale(1.1)") {
    window.location.href = `./page/game.html?level=${encodeURIComponent(
      "Easy (6 colors)"
    )}`;
  } else if (normal.style.transform === "scale(1.1)") {
    window.location.href = `./page/game.html?level=${encodeURIComponent(
      "Medium (8 colors)"
    )}`;
  } else if (hard.style.transform === "scale(1.1)") {
    window.location.href = `./page/game.html?level=${encodeURIComponent(
      "Hard (10 colors)"
    )}`;
  } else {
    alert("Please select a level 🥱");
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

function simulateSignup() {
  localStorage.setItem("isRegistered", "true");
  alert("i know its fake😉 but welcome to join us😅");
  location.reload();
}
const joinBtn = document.querySelector(".fakejoin");
joinBtn.addEventListener("click", simulateSignup);

// -----------------------------------about-----------------------------------
const container = document.querySelector(".container");
const aboutUs = document.querySelector(".aboutus");
const featuresSection = document.querySelector(".features-section");
const newcontaner = document.createElement("div");
newcontaner.classList.add("container");

aboutUs.addEventListener("click", () => {
  container.style.display = "none";
  featuresSection.style.display = "none";
  document.body.appendChild(newcontaner);
});
const aboutStyles = {
  maxWidth: "800px",
  margin: "2rem auto",
  padding: "2rem",
  backgroundColor: "#E8DFCA",
  borderRadius: "15px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  lineHeight: "1.6",
  color: "#333",
  textAlign: "justify",
  position: "relative",
};
const backButton = document.createElement("button");
backButton.innerHTML = "&times;";
backButton.style.cssText = `
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
`;

const aboutContent = `
  <h2 style="color: #2c3e50; margin-bottom: 1rem; text-align: center">Memory Master</h2>
  <p>Challenge your brain with our memory-enhancing color game! Perfect for all ages, this interactive experience offers:</p>
  <ul style="margin: 1rem 0; padding-left: 1.5rem">
      <li>🎮 3 Difficulty levels (Easy/Medium/Hard)</li>
      <li>📱 Mobile-friendly design</li>
      <li>🧠 Cognitive skill development</li>
      <li>⏱ Progressive difficulty system</li>
  </ul>
  <p style="font-weight: bold; color: #7895B2">How to play: Memorize color patterns and replicate them correctly. Each successful round unlocks more complex combinations!</p>
  <div style="text-align: center; margin-top: 1.5rem">
  </div>
`;

Object.assign(newcontaner.style, aboutStyles);
newcontaner.innerHTML = aboutContent;
newcontaner.appendChild(backButton);

newcontaner.style.animation = "fadeIn 0.5s ease-out";
document.body.style.overflow = "hidden";

backButton.addEventListener("click", () => {
  newcontaner.style.animation = "fadeOut 0.3s ease-in";
  setTimeout(() => {
    document.body.removeChild(newcontaner);
    container.style.display = "block";
    featuresSection.style.display = "block";
    document.body.style.overflow = "auto";
  }, 250);
});

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.9); }
  }
`;
document.head.appendChild(styleSheet);
