/* =====================
   GLOBAL QUIZ HELPERS
===================== */

function getScore() {
  return Number(localStorage.getItem("quizScore")) || 0;
}

function setScore(val) {
  localStorage.setItem("quizScore", val);
}

function resetScore() {
  localStorage.setItem("quizScore", 0);
}

function setTotal(val) {
  localStorage.setItem("totalQuestions", val);
}

/* =====================
   SOCCER QUIZZES
===================== */
if (document.querySelector(".quiz")) {
  const answers = document.querySelectorAll(".btn");
  const nextBtn = document.getElementById("next-btn");
  let correctIndex;

  if (document.title.includes("Quiz 2")) {
    correctIndex = 2; // Soccer Q2 correct answer
  } else {
    correctIndex = 1; // Soccer Q1 correct answer
  }

  answers.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      answers.forEach(b => b.disabled = true);

      if (idx === correctIndex) {
        btn.classList.add("correct");
        setScore(getScore() + 1);
      } else {
        btn.classList.add("incorrect");
        answers[correctIndex].classList.add("correct");
      }

      nextBtn.style.display = "block";
    });
  });

  nextBtn.addEventListener("click", () => {
    if (document.title.includes("Quiz 2")) {
      // Go to cricket1.html after Soccer Q2
      location.href = "Cricket.html";
    } else {
      // Go to Soccer Q2
      location.href = "index2.html";
    }
  });
}

/* =====================
   BASKETBALL QUIZ
===================== */
if (document.getElementById("basketball-quiz")) {
  setTotal(3); // total questions for final score

  const buttons = Array.from(document.querySelectorAll(".answer-btn"));
  const finishBtn = document.getElementById("finish-btn");
  const feedback = document.getElementById("feedback");
  const scoreText = document.getElementById("score-text");

  let correctIndex = 1; // LeBron James
  let correctAnswerText = "LeBron James";

  let answered = false;

  // Initialize score display
  scoreText.textContent = `Score: ${getScore()}`;

  buttons.forEach((btn, idx) => {
    btn.disabled = false; // ensure buttons are clickable

    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      // Reset previous styles
      buttons.forEach(b => b.classList.remove("correct", "incorrect"));
      feedback.classList.remove("show", "correct", "incorrect");

      if (idx === correctIndex) {
        setScore(getScore() + 1);
        btn.classList.add("correct");
        feedback.textContent = "Correct! 🏀";
        feedback.classList.add("show", "correct");
      } else {
        btn.classList.add("incorrect");
        buttons[correctIndex].classList.add("correct");
        feedback.textContent = `Wrong! Correct answer: ${correctAnswerText}.`;
        feedback.classList.add("show", "incorrect");
      }

      // Update score display and enable finish button
      scoreText.textContent = `Score: ${getScore()}`;
      finishBtn.disabled = false;
    });
  });

  finishBtn.addEventListener("click", () => {
    // Go to second basketball question
    location.href = "basketball2.html";
  });
}

/* =====================
   CRICKET QUIZZES
===================== */
if (document.querySelector(".cricket-quiz")) {
  setTotal(3);

  const buttons = document.querySelectorAll(".answer-btn");
  const nextBtn = document.getElementById("next-btn") || document.getElementById("finish-btn");
  const feedback = document.getElementById("feedback");
  const scoreText = document.getElementById("score-text");

  let correctIndex;
  if (document.getElementById("cricket-q1")) {
    correctIndex = 2; // Cricket Q1 correct answer
  } else {
    correctIndex = 0; // Cricket Q2 correct answer
  }

  let answered = false;
  scoreText.textContent = `Score: ${getScore()}`;

  buttons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      buttons.forEach(b => b.classList.remove("correct", "incorrect"));
      feedback.classList.remove("show");

      if (idx === correctIndex) {
        setScore(getScore() + 1);
        btn.classList.add("correct");
        feedback.textContent = "Correct! 🏏";
      } else {
        btn.classList.add("incorrect");
        buttons[correctIndex].classList.add("correct");
        feedback.textContent = "Wrong!";
      }

      feedback.classList.add("show");
      scoreText.textContent = `Score: ${getScore()}`;
      nextBtn.disabled = false;
    });
  });

  nextBtn.addEventListener("click", () => {
    if (document.getElementById("cricket-q1")) {
      // Go to Cricket2.html
      location.href = "Cricket2.html";
    } else {
      // Go to Basketball.html
      location.href = "Basketball.html";
    }
  });
}

/* =====================
   RESULTS PAGE
===================== */
if (document.querySelector(".results-screen")) {
  const score = Math.min(Number(localStorage.getItem("quizScore")) || 0, 3);
  const total = 3;

  const finalScoreEl = document.getElementById("final-score");
  const percentEl = document.getElementById("percentage");

  const percent = Math.round((score / total) * 100);
  finalScoreEl.textContent = `You scored ${score} out of ${total}!`;
  percentEl.textContent = `${percent}%`;

  if (score === total) {
    const canvas = document.getElementById("confetti-canvas");
    if (canvas) canvas.style.display = "block";
  }

  document.getElementById("retry-btn").onclick = () => {
    resetScore();
    location.href = "index1.html";
  };
  document.getElementById("home-btn").onclick = () => {
    resetScore();
    location.href = "index.html";
  };
}

/* =====================
   HOMEPAGE START BUTTONS
===================== */
document.addEventListener("DOMContentLoaded", () => {
  const home = document.getElementById("home");
  if (home) {
    const startButtons = home.querySelectorAll(".start-btn");
    startButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const link = btn.getAttribute("data-link");
        if (link) window.location.href = link;
      });
    });
  }
});