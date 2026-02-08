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

            this.total =
            Number(localStorage.getItem("totalQuestions")) || 1;


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

            if (index === this.correctIndex) {
                this.score++;
                btn.classList.add("correct");
                this.feedback.textContent = "Correct! 🏀";
            } else {
                btn.classList.add("incorrect");
                this.button[this.correctIndex].classList.add("correct");

                this.feedback.textContent =
                    "Wrong! The correct answer was LeBron James.";
            }

            this.total++;
            localStorage.setItem("quizScore", this.score);
            localStorage.setItem("totalQuestions", this.total);

            this.updateScore();
            this.finishBtn.disabled = false;
        }

        finishQuiz() {
            window.location.href = "results.html";
        }
    }

    new BasketballFinal();
            
}