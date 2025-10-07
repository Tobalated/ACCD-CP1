// === Page Setup === //
document.body.style.fontFamily = "Poppins, sans-serif";
document.body.style.textAlign = "center";
document.body.style.background = "#fafafa";
document.body.style.padding = "20px";

// Title
const title = document.createElement("h1");
title.textContent = "🧩 Quiz Puzzle Game (Pure JS)";
document.body.appendChild(title);

// Description
const desc = document.createElement("p");
desc.textContent = "Answer the questions correctly to reveal the hidden image!";
document.body.appendChild(desc);

// Puzzle container
const puzzle = document.createElement("div");
puzzle.style.width = "300px";
puzzle.style.height = "300px";
puzzle.style.margin = "20px auto";
puzzle.style.display = "grid";
puzzle.style.gridTemplateColumns = "repeat(2, 1fr)";
puzzle.style.gridTemplateRows = "repeat(2, 1fr)";
puzzle.style.gap = "5px";
document.body.appendChild(puzzle);

// ✅ Use ONE fixed image
const puzzleImage = "https://picsum.photos/id/1025/300/300"; // Static image
// You can replace with: "images/mypuzzle.jpg"

// Create 4 pieces (hidden initially)
const pieces = [];
for (let i = 0; i < 4; i++) {
  const piece = document.createElement("div");
  piece.style.width = "100%";
  piece.style.height = "100%";
  piece.style.backgroundImage = `url('${puzzleImage}')`;
  piece.style.backgroundSize = "300px 300px";
  piece.style.border = "2px solid #333";
  piece.style.transition = "all 0.3s ease";

  // Position each piece correctly
  piece.style.backgroundPosition =
    i === 0 ? "0 0" :
    i === 1 ? "-150px 0" :
    i === 2 ? "0 -150px" :
    "-150px -150px";

  // Hidden state
  piece.style.backgroundColor = "#d3d3d3";
  piece.style.backgroundBlendMode = "color";

  puzzle.appendChild(piece);
  pieces.push(piece);
}

// Questions container
const questionContainer = document.createElement("div");
questionContainer.style.maxWidth = "500px";
questionContainer.style.margin = "20px auto";
questionContainer.style.textAlign = "left";
document.body.appendChild(questionContainer);

// Reset button
const resetBtn = document.createElement("button");
resetBtn.textContent = "Restart Game";
resetBtn.style.padding = "8px 16px";
resetBtn.style.background = "#333";
resetBtn.style.color = "white";
resetBtn.style.border = "none";
resetBtn.style.borderRadius = "8px";
resetBtn.style.cursor = "pointer";
resetBtn.style.marginTop = "20px";
resetBtn.onmouseenter = () => (resetBtn.style.background = "#555");
resetBtn.onmouseleave = () => (resetBtn.style.background = "#333");
document.body.appendChild(resetBtn);

// === Questions === //
const questions = [
  { text: "1️⃣ What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Hyper Tool Multi Language"], answer: 0 },
  { text: "2️⃣ What does CSS control?", options: ["Styling", "Data", "Servers"], answer: 0 },
  { text: "3️⃣ What tag runs JavaScript?", options: ["<java>", "<script>", "<code>"], answer: 1 },
  { text: "4️⃣ UX means?", options: ["User Experience", "Universal Execution", "Unique Exchange"], answer: 0 }
];

// === Logic === //
function loadQuestions() {
  questionContainer.innerHTML = '';
  questions.forEach((q, index) => {
    const qDiv = document.createElement('div');
    qDiv.style.background = '#fff';
    qDiv.style.padding = '15px';
    qDiv.style.marginBottom = '10px';
    qDiv.style.borderRadius = '10px';
    qDiv.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';

    const qText = document.createElement('p');
    qText.textContent = q.text;
    qDiv.appendChild(qText);

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.style.margin = '5px';
      btn.style.padding = '6px 10px';
      btn.style.border = 'none';
      btn.style.borderRadius = '5px';
      btn.style.cursor = 'pointer';
      btn.style.background = '#eee';
      btn.onclick = () => checkAnswer(index, i, btn);
      qDiv.appendChild(btn);
    });

    questionContainer.appendChild(qDiv);
  });
}

function checkAnswer(qIndex, optionIndex, btn) {
  const correct = questions[qIndex].answer;
  if (optionIndex === correct) {
    btn.style.background = '#4CAF50';
    revealPiece(qIndex);
  } else {
    btn.style.background = '#E74C3C';
  }
}

function revealPiece(index) {
  pieces[index].style.backgroundColor = "transparent";
  pieces[index].style.backgroundBlendMode = "normal";

  const allRevealed = pieces.every(p => p.style.backgroundBlendMode === "normal");
  if (allRevealed) {
    setTimeout(() => alert("🎉 You revealed the image!"), 300);
  }
}

resetBtn.onclick = () => {
  pieces.forEach(p => {
    p.style.backgroundColor = "#d3d3d3";
    p.style.backgroundBlendMode = "color";
  });
  loadQuestions();
};

loadQuestions();