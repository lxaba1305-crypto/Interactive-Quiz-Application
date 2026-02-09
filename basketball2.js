document.addEventListener("DOMContentLoaded", () => {
  /* =====================
     BASKETBALL2 QUIZ
  ===================== */
  const quizSection = document.getElementById("basketball-quiz");
  if (!quizSection) return;

  const buttons = Array.from(quizSection.querySelectorAll(".answer-btn"));
  const finishBtn = quizSection.querySelector("#finish-btn");
  const feedback = quizSection.querySelector("#feedback");
  const scoreText = quizSection.querySelector("#score-text");

  const correctIndex = 1; // Cleveland Cavaliers
  const correctAnswerText = "Cleveland Cavaliers";

  let answered = false;

  // Initialize score display
  const getScore = () => Number(localStorage.getItem("quizScore")) || 0;
  const setScore = val => localStorage.setItem("quizScore", val);
  scoreText.textContent = `Score: ${getScore()}`;

  buttons.forEach((btn, idx) => {
    btn.disabled = false;

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

      scoreText.textContent = `Score: ${getScore()}`;
      finishBtn.disabled = false;
    });
  });

  finishBtn.addEventListener("click", () => {
    location.href = "results.html";
  });
});