if (document.getElementById('basketball-quiz')) {

    class BasketballFinal {
        constructor() {
            this.button = document.querySelectorAll(".answer-btn")
            this.finishBtn = document.getElementById("finish-btn")
            this.feedback = document.getElementById("feedback")
            this.scoreText = document.getElementById("score-text")

            this.correctIndex = 1

            this.answered = false

            this.score =
            Number(localStorage.getItem("quizScore")) || 0;

            this.total = 3;

            // Remove direct style manipulation; feedback will be controlled by CSS classes
            this.feedback.classList.remove("show", "correct", "incorrect");

            this.updateScore();
            this.attachEvents()
        }

        updateScore() {
            this.scoreText.textContent = `Score: ${this.score}`
        }

        attachEvents() {
            this.button.forEach((btn, index) => {
                btn.addEventListener("click", () => 
                    this.selectAnswer(btn, index)
                )
            });
            this.finishBtn.addEventListener("click", () =>
                this.finishQuiz()
            );
        };

        selectAnswer(btn, index) {
            if (this.answered) return;

            this.answered = true;

            // Clear previous state
            this.button.forEach(b =>
                b.classList.remove("correct", "incorrect")
            );

            // Remove any previous feedback classes
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

if (document.querySelector(".results-screen")) {

    const score = Number(localStorage.getItem("quizScore")) || 0;

    let total = Number(localStorage.getItem("totalQuestions")) || 3;

    if (document.getElementById('basketball-quiz')) {
        total = 3;
    }

    const finalScoreEl = document.getElementById("final-score");

    const percentEl = document.getElementById("percentage");

    if (total > 0) {
        const percent = Math.min(100, Math.round((score / total) * 100));
        finalScoreEl.textContent = `You scored ${score} out of ${total}!`;

        percentEl.textContent = `${percent}%`;

        // Trigger confetti only if perfect score
        if (score === total) {
            const canvas = document.getElementById("confetti-canvas");
            if (canvas) {
                canvas.style.display = "block";
            }
        }
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

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
    }

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

    (function animate() {
        draw();
        requestAnimationFrame(animate);
    })();
} else {
    // If no canvas element, do nothing
}