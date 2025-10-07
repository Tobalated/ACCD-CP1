const questions = [
  {
    text: "1️⃣ What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Transfer Markup Language"],
    answer: 0
  },
  {
    text: "2️⃣ What is CSS used for?",
    options: ["Structuring data", "Styling web pages", "Connecting to databases"],
    answer: 1
  },
  {
    text: "3️⃣ Which tag is used for JavaScript?",
    options: ["<js>", "<script>", "<java>"],
    answer: 1
  },
  {
    text: "4️⃣ What does UX stand for?",
    options: ["User Experience", "Universal Exchange", "Unique Execution"],
    answer: 0
  }
];

const puzzlePieces = document.querySelectorAll('.piece');
const questionContainer = document.getElementById('questions');
const resetBtn = document.getElementById('resetBtn');

function loadQuestions() {
  questionContainer.innerHTML = '';
  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const qText = document.createElement('p');
    qText.textContent = q.text;
    questionDiv.appendChild(qText);

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.addEventListener('click', () => checkAnswer(index, i, btn));
      questionDiv.appendChild(btn);
    });

    questionContainer.appendChild(questionDiv);
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
  puzzlePieces[index].classList.remove('hidden');

  const allRevealed = [...puzzlePieces].every(piece => !piece.classList.contains('hidden'));
  if (allRevealed) {
    setTimeout(() => alert('🎉 Congratulations! You revealed the full image!'), 300);
  }
}

resetBtn.addEventListener('click', () => {
  puzzlePieces.forEach(piece => piece.classList.add('hidden'));
  loadQuestions();
});

loadQuestions();