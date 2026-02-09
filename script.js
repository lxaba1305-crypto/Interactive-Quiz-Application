// ---------------------- BASKETBALL (existing) ----------------------
if (document.getElementById('basketball-quiz')) {

    class BasketballFinal {
        constructor() {
            this.button = document.querySelectorAll(".answer-btn");
            this.finishBtn = document.getElementById("finish-btn");
            this.feedback = document.getElementById("feedback");
            this.scoreText = document.getElementById("score-text");

            this.correctIndex = 1;
            this.answered = false;

            this.score = Number(localStorage.getItem("quizScore")) || 0;

            this.total = 3;

            // feedback controlled by CSS classes
            this.feedback.classList.remove("show", "correct", "incorrect");

            this.updateScore();
            this.attachEvents();
        }

        updateScore() {
            this.scoreText.textContent = `Score: ${this.score}`;
        }

        attachEvents() {
            this.button.forEach((btn, index) => {
                btn.addEventListener("click", () =>
                    this.selectAnswer(btn, index)
                );
            });

            this.finishBtn.addEventListener("click", () =>
                this.finishQuiz()
            );
        }

        selectAnswer(btn, index) {
            if (this.answered) return;
            this.answered = true;

            this.button.forEach(b =>
                b.classList.remove("correct", "incorrect")
            );

            this.feedback.classList.remove("show", "correct", "incorrect");

            if (index === this.correctIndex) {
                this.score++;
                btn.classList.add("correct");
                this.feedback.textContent = "Correct! 🏀";
                this.feedback.classList.add("show", "correct");
            } else {
                btn.classList.add("incorrect");
                this.button[this.correctIndex].classList.add("correct");
                this.feedback.textContent = "Wrong! The correct answer was LeBron James.";
                this.feedback.classList.add("show", "incorrect");
            }

            localStorage.setItem("quizScore", this.score);
            localStorage.setItem("totalQuestions", 3);

            this.updateScore();
            this.finishBtn.disabled = false;
        }

        finishQuiz() {
            window.location.href = "results.html";
        }
    }

    new BasketballFinal();
}


// ---------------------- CRICKET Q1 (easy) ----------------------
if (document.getElementById("cricket-q1")) {

    class CricketQ1 {
        constructor() {
            this.buttons = document.querySelectorAll(".answer-btn");
            this.nextBtn = document.getElementById("next-btn");
            this.feedback = document.getElementById("feedback");
            this.scoreText = document.getElementById("score-text");

            // Easy question: "How many players are on the field for one team?"
            // Options: 9, 10, 11, 12 -> correct = 11 -> index 2
            this.correctIndex = 2;
            this.answered = false;

            // Reset score when starting cricket so you don't carry over another quiz score
            const activeQuiz = localStorage.getItem("activeQuiz");
            if (activeQuiz !== "cricket") {
                localStorage.setItem("activeQuiz", "cricket");
                localStorage.setItem("quizScore", "0");
            }

            this.score = Number(localStorage.getItem("quizScore")) || 0;

            // total questions in cricket = 2
            localStorage.setItem("totalQuestions", "2");

            this.feedback.classList.remove("show", "correct", "incorrect");

            this.updateScore();
            this.attachEvents();
        }

        updateScore() {
            this.scoreText.textContent = `Score: ${this.score}`;
        }

        attachEvents() {
            this.buttons.forEach((btn, index) => {
                btn.addEventListener("click", () => this.selectAnswer(btn, index));
            });

            this.nextBtn.addEventListener("click", () => {
                window.location.href = "cricket2.html";
            });
        }

        selectAnswer(btn, index) {
            if (this.answered) return;
            this.answered = true;

            this.buttons.forEach(b => b.classList.remove("correct", "incorrect"));
            this.feedback.classList.remove("show", "correct", "incorrect");

            if (index === this.correctIndex) {
                this.score++;
                btn.classList.add("correct");
                this.feedback.textContent = "Correct! 🏏";
                this.feedback.classList.add("show", "correct");
            } else {
                btn.classList.add("incorrect");
                this.buttons[this.correctIndex].classList.add("correct");
                this.feedback.textContent = "Wrong! The correct answer is 11.";
                this.feedback.classList.add("show", "incorrect");
            }

            localStorage.setItem("quizScore", String(this.score));
            localStorage.setItem("totalQuestions", "2");

            this.updateScore();
            this.nextBtn.disabled = false;
        }
    }

    new CricketQ1();
}


// ---------------------- CRICKET FINAL (hard) ----------------------
if (document.getElementById("cricket-q2")) {

    class CricketFinal {
        constructor() {
            this.buttons = document.querySelectorAll(".answer-btn");
            this.finishBtn = document.getElementById("finish-btn");
            this.feedback = document.getElementById("feedback");
            this.scoreText = document.getElementById("score-text");

            // Hard question (correct option is first button) -> index 0
            this.correctIndex = 0;
            this.answered = false;

            this.score = Number(localStorage.getItem("quizScore")) || 0;

            localStorage.setItem("totalQuestions", "2");

            this.feedback.classList.remove("show", "correct", "incorrect");

            this.updateScore();
            this.attachEvents();
        }

        updateScore() {
            this.scoreText.textContent = `Score: ${this.score}`;
        }

        attachEvents() {
            this.buttons.forEach((btn, index) => {
                btn.addEventListener("click", () => this.selectAnswer(btn, index));
            });

            this.finishBtn.addEventListener("click", () => {
                window.location.href = "results.html";
            });
        }

        selectAnswer(btn, index) {
            if (this.answered) return;
            this.answered = true;

            this.buttons.forEach(b => b.classList.remove("correct", "incorrect"));
            this.feedback.classList.remove("show", "correct", "incorrect");

            if (index === this.correctIndex) {
                this.score++;
                btn.classList.add("correct");
                this.feedback.textContent = "Correct! 🏏";
                this.feedback.classList.add("show", "correct");
            } else {
                btn.classList.add("incorrect");
                this.buttons[this.correctIndex].classList.add("correct");
                this.feedback.textContent = "Wrong! Obstructing the field involves deliberate illegal obstruction.";
                this.feedback.classList.add("show", "incorrect");
            }

            localStorage.setItem("quizScore", String(this.score));
            localStorage.setItem("totalQuestions", "2");

            this.updateScore();
            this.finishBtn.disabled = false;
        }
    }

    new CricketFinal();
}


// ---------------------- RESULTS (fixed + safe) ----------------------
if (document.querySelector(".results-screen")) {

    const score = Number(localStorage.getItem("quizScore")) || 0;
    const total = Number(localStorage.getItem("totalQuestions")) || 0;

    const finalScoreEl = document.getElementById("final-score");
    const percentEl = document.getElementById("percentage");

    if (finalScoreEl) finalScoreEl.textContent = `You scored ${score} out of ${total}!`;
    if (percentEl) {
        const percent = total > 0 ? Math.min(100, Math.round((score / total) * 100)) : 0;
        percentEl.textContent = `${percent}%`;
    }

    // Confetti only if perfect score AND canvas exists
    const canvas = document.getElementById("confetti-canvas");
    if (canvas && total > 0 && score === total) {
        canvas.style.display = "block";
        const ctx = canvas.getContext("2d");

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", resize);
        resize();

        const pieces = Array.from({ length: 150 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 6 + 2,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            tilt: Math.random() * 10
        }));

        let angle = 0;

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

        draw();
    }
}
