// === PAGE SETUP === //
document.body.style.fontFamily = "Poppins, sans-serif";
document.body.style.background = "#fafafa";
document.body.style.margin = "0";
document.body.style.padding = "20px";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";

// === TITLE AND DESCRIPTION === //
const title = document.createElement("h1");
title.textContent = "Quiz Puzzle Game";
title.style.textAlign = "center";
title.style.marginBottom = "5px"; // moved closer to subtitle
document.body.appendChild(title);

const desc = document.createElement("p");
desc.textContent = "Answer questions correctly to reveal the hidden image!";
desc.style.textAlign = "center";
desc.style.marginTop = "0"; // reduce top gap
desc.style.marginBottom = "20px";
desc.style.fontSize = "17px";
document.body.appendChild(desc);

// === MAIN CONTAINER (3 columns layout) === //
const mainContainer = document.createElement("div");
mainContainer.style.display = "grid";
mainContainer.style.gridTemplateColumns = "1fr auto 1fr";
mainContainer.style.gap = "20px";
mainContainer.style.alignItems = "start";
mainContainer.style.justifyContent = "center";
mainContainer.style.width = "100%";
mainContainer.style.maxWidth = "1200px";
mainContainer.style.marginTop = "20px";
document.body.appendChild(mainContainer);

// === LEFT QUESTIONS CONTAINER === //
const leftQuestions = document.createElement("div");
leftQuestions.style.display = "flex";
leftQuestions.style.flexDirection = "column";
leftQuestions.style.gap = "10px";
leftQuestions.style.maxWidth = "300px";
mainContainer.appendChild(leftQuestions);

// === PUZZLE CONTAINER (center) === //
const puzzleWrapper = document.createElement("div");
puzzleWrapper.style.display = "flex";
puzzleWrapper.style.flexDirection = "column";
puzzleWrapper.style.alignItems = "center";
puzzleWrapper.style.justifyContent = "center";

const puzzle = document.createElement("div");
puzzle.style.width = "450px";
puzzle.style.height = "450px";
puzzle.style.display = "grid";
puzzle.style.gridTemplateColumns = "repeat(3, 1fr)";
puzzle.style.gridTemplateRows = "repeat(3, 1fr)";
puzzle.style.gap = "5px";
puzzle.style.border = "6px solid #3762acff";
puzzle.style.borderRadius = "10px";
puzzle.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
puzzleWrapper.appendChild(puzzle);
mainContainer.appendChild(puzzleWrapper);

// === RIGHT QUESTIONS CONTAINER === //
const rightQuestions = document.createElement("div");
rightQuestions.style.display = "flex";
rightQuestions.style.flexDirection = "column";
rightQuestions.style.gap = "10px";
rightQuestions.style.maxWidth = "300px";
mainContainer.appendChild(rightQuestions);

// === PUZZLE IMAGE === //
const puzzleImage = "https://picsum.photos/id/1025/450/450";

// Create 9 hidden pieces
const pieces = [];
for (let i = 0; i < 9; i++) {
  const piece = document.createElement("div");
  piece.style.width = "100%";
  piece.style.height = "100%";
  piece.style.backgroundImage = `url('${puzzleImage}')`;
  piece.style.backgroundSize = "450px 450px";
  piece.style.border = "2px solid #3762acff";
  piece.style.transition = "all 0.6s ease";
  piece.style.opacity = "0.3";
  piece.style.transform = "translateY(10px)";
  piece.style.filter = "grayscale(100%) blur(1px)";
  piece.style.backgroundBlendMode = "color";
  piece.style.backgroundColor = "#d3d3d3";

  const x = -(i % 3) * 150;
  const y = -Math.floor(i / 3) * 150;
  piece.style.backgroundPosition = `${x}px ${y}px`;

  puzzle.appendChild(piece);
  pieces.push(piece);
}

// === QUESTIONS === //
const questions = [
  { text: "1️⃣ What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyper Tool Multi Language", "High Tech Machine Learning"], answer: 0 },
  { text: "2️⃣ What does CSS do?", options: ["It styles web pages", "It stores data", "It controls servers"], answer: 0 },
  { text: "3️⃣ Which tag runs JavaScript?", options: ["<js>", "<code>", "<script>"], answer: 2 },
  { text: "4️⃣ What does UX stand for?", options: ["User Experience", "Unique Execution", "Universal Exchange"], answer: 0 },
  { text: "5️⃣ Which is not a design principle?", options: ["Balance", "Proximity", "Procrastination"], answer: 2 },
  { text: "6️⃣ Which tool is used for design?", options: ["VS Code", "Figma", "MongoDB"], answer: 1 },
  { text: "7️⃣ What is a wireframe?", options: ["A final design", "A low-fidelity layout", "A database model"], answer: 1 },
  { text: "8️⃣ What is JavaScript mainly used for?", options: ["Styling", "Functionality", "Hosting"], answer: 1 },
  { text: "9️⃣ What does UI stand for?", options: ["User Interaction", "User Interface", "Universal Internet"], answer: 1 }
];

// === FUNCTIONS === //
function createQuestionBlock(q, index, container) {
  const qDiv = document.createElement("div");
  qDiv.style.background = "#fff";
  qDiv.style.padding = "12px";
  qDiv.style.borderRadius = "8px";
  qDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  qDiv.style.transition = "transform 0.2s ease";

  const qText = document.createElement("p");
  qText.textContent = q.text;
  qText.style.fontWeight = "bold";
  qText.style.marginBottom = "8px";
  qDiv.appendChild(qText);

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.style.margin = "3px";
    btn.style.padding = "6px 10px";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.background = "#eee";
    btn.onclick = () => checkAnswer(index, i, btn);
    qDiv.appendChild(btn);
  });

  container.appendChild(qDiv);
}

function loadQuestions() {
  leftQuestions.innerHTML = "";
  rightQuestions.innerHTML = "";
  questions.forEach((q, i) => {
    if (i < 5) createQuestionBlock(q, i, leftQuestions);
    else createQuestionBlock(q, i, rightQuestions);
  });
  rightQuestions.appendChild(resetBtn);
}

// === CHECK ANSWER FUNCTION === //
function checkAnswer(qIndex, optionIndex, btn) {
  const correct = questions[qIndex].answer;
  const qDiv = btn.parentElement; // get the question container

  if (optionIndex === correct) {
    btn.style.background = "#4CAF50";
    revealPiece(qIndex);
  } else {
    btn.style.background = "#E74C3C";

    // 💫 Add shake animation for wrong answers
    qDiv.style.animation = "shake 0.4s";
    setTimeout(() => {
      qDiv.style.animation = ""; // reset after animation
    }, 400);
  }
}

function revealPiece(index) {
  if (pieces[index]) {
    const piece = pieces[index];
    piece.style.backgroundBlendMode = "normal";
    piece.style.backgroundColor = "transparent";
    piece.style.opacity = "1";
    piece.style.filter = "grayscale(0%) blur(0)";
    piece.style.transform = "translateY(0px)";
  }

  const allRevealed = pieces.every(p => p.style.opacity === "1");
  if (allRevealed) {
    showCongratsPopup();
  }
}

// === CONGRATS POP-UP WITH EFFECT === //
function showCongratsPopup() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.6)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "1000";

  // Create confetti effect
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.background = ["#3762acff", "#FFD700", "#FF4081", "#03A9F4"][Math.floor(Math.random() * 4)];
    confetti.style.top = `${Math.random() * 100}%`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.opacity = "0.9";
    confetti.style.borderRadius = "2px";
    confetti.style.animation = `fall ${2 + Math.random() * 3}s linear infinite`;
    overlay.appendChild(confetti);
  }

  const box = document.createElement("div");
  box.style.background = "#fff";
  box.style.padding = "40px";
  box.style.borderRadius = "12px";
  box.style.textAlign = "center";
  box.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
  box.style.position = "relative";
  box.style.zIndex = "2";

  const msg = document.createElement("h2");
  msg.textContent = "🎉 Congratulations!";
  msg.style.color = "#3762acff";
  box.appendChild(msg);

  const subMsg = document.createElement("p");
  subMsg.textContent = "You successfully revealed the entire puzzle!";
  subMsg.style.fontSize = "16px";
  box.appendChild(subMsg);

  const btn = document.createElement("button");
  btn.textContent = "Play Again 🔁";
  btn.style.marginTop = "20px";
  btn.style.padding = "10px 20px";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.background = "#3762acff";
  btn.style.color = "white";
  btn.style.cursor = "pointer";
  btn.onclick = () => {
    document.body.removeChild(overlay);
    resetGame();
  };
  box.appendChild(btn);

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Add keyframe animation dynamically
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// === RESET FUNCTIONS === //
function resetGame() {
  pieces.forEach(p => {
    p.style.backgroundColor = "#d3d3d3";
    p.style.backgroundBlendMode = "color";
    p.style.opacity = "0.3";
    p.style.filter = "grayscale(100%) blur(1px)";
    p.style.transform = "translateY(10px)";
  });
  loadQuestions();
}

// === RESTART BUTTON (UNDER Q9) === //
const resetBtn = document.createElement("button");
resetBtn.textContent = "Restart Game";
resetBtn.style.padding = "10px 20px";
resetBtn.style.marginTop = "10px";
resetBtn.style.background = "#3762acff";
resetBtn.style.color = "white";
resetBtn.style.border = "none";
resetBtn.style.borderRadius = "8px";
resetBtn.style.cursor = "pointer";
resetBtn.onmouseenter = () => (resetBtn.style.background = "#66BB6A");
resetBtn.onmouseleave = () => (resetBtn.style.background = "#4CAF50");
resetBtn.onclick = resetGame;

// === ADD SHAKE ANIMATION STYLE === //
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
  }
`;
document.head.appendChild(shakeStyle);

loadQuestions();