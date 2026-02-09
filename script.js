/* =====================
   GLOBAL HELPERS
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
   SOCCER FLOW
===================== */

if (document.querySelector(".quiz")) {

  const answers = document.querySelectorAll(".btn");
  const nextBtn = document.getElementById("next-btn");

  let correctIndex = 1;

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
    if (location.pathname.includes("index1")) {
      location.href = "index2.html";
    } else {
      location.href = "Basketball.html";
    }
  });

}

/* =====================
   BASKETBALL
===================== */

if (document.getElementById("basketball-quiz")) {

  setTotal(3);

  const buttons = document.querySelectorAll(".answer-btn");
  const finishBtn = document.getElementById("finish-btn");
  const feedback = document.getElementById("feedback");
  const scoreText = document.getElementById("score-text");

  const correctIndex = 1;
  let answered = false;

  scoreText.textContent = `Score: ${getScore()}`;

  buttons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {

      if (answered) return;
      answered = true;

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
        feedback.textContent = "Wrong! Correct answer: LeBron James.";
        feedback.classList.add("show", "incorrect");
      }

      scoreText.textContent = `Score: ${getScore()}`;
      finishBtn.disabled = false;

    });
  });

  finishBtn.addEventListener("click", () => {
    location.href = "Cricket.html";
  });

}

/* =====================
   CRICKET
===================== */

if (document.getElementById("cricket-q1")) {

  setTotal(3);

  const buttons = document.querySelectorAll(".answer-btn");
  const nextBtn = document.getElementById("next-btn");
  const feedback = document.getElementById("feedback");
  const scoreText = document.getElementById("score-text");

  const correctIndex = 2;
  let answered = false;

  scoreText.textContent = `Score: ${getScore()}`;

  buttons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {

      if (answered) return;
      answered = true;

      if (idx === correctIndex) {
        setScore(getScore() + 1);
        btn.classList.add("correct");
        feedback.textContent = "Correct! 🏏";
      } else {
        btn.classList.add("incorrect");
        buttons[correctIndex].classList.add("correct");
        feedback.textContent = "Wrong! Answer was 11.";
      }

      feedback.classList.add("show");
      scoreText.textContent = `Score: ${getScore()}`;
      nextBtn.disabled = false;

    });
  });

  nextBtn.addEventListener("click", () => {
    location.href = "results.html";
  });

}

/* =====================
   RESULTS
===================== */

if (document.querySelector(".results-screen")) {

  const score = getScore();
  const total = Number(localStorage.getItem("totalQuestions")) || 3;

  const finalScoreEl = document.getElementById("final-score");
  const percentEl = document.getElementById("percentage");

  const percent = Math.min(100, Math.round((score / total) * 100));

  finalScoreEl.textContent = `You scored ${score} out of ${total}!`;
  percentEl.textContent = `${percent}%`;

  if (score === total) {
    startConfetti();
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
   CONFETTI
===================== */

function startConfetti() {

  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 5 + 2,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    tilt: Math.random() * 10
  }));

  let angle = 0;

  function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt, p.y);
      ctx.lineTo(p.x, p.y + p.tilt + p.r);
      ctx.stroke();
    });

    update();
    requestAnimationFrame(draw);
  }

  function update() {

    angle += 0.01;

    pieces.forEach(p => {
      p.y += Math.cos(angle) + p.d;
      p.x += Math.sin(angle);

      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  draw();
}