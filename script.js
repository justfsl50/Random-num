document.addEventListener("DOMContentLoaded", function() {
    const minNumber = 1;
    const maxNumber = 100;
    const maxAttempts = 10;
    let secretNumber = generateRandomNumber(minNumber, maxNumber);
    let attemptsLeft = maxAttempts;
    const guessedNumbers = [];

    const guessInput = document.getElementById("guess");
    const submitButton = document.getElementById("submit");
    const attemptsLeftSpan = document.getElementById("attempts-left");
    const guessedNumbersSpan = document.getElementById("guessed-numbers");
    const feedbackContainer = document.getElementById("feedback");
    const resetButton = document.getElementById("reset");

    submitButton.addEventListener("click", makeGuess);
    guessInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            makeGuess();
        }
    });
    resetButton.addEventListener("click", resetGame);

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function makeGuess() {
        if (attemptsLeft > 0) {
            const guess = parseInt(guessInput.value);
            if (!isNaN(guess) && guess >= minNumber && guess <= maxNumber) {
                guessedNumbers.push(guess);
                guessedNumbersSpan.textContent = guessedNumbers.join(", ");
                attemptsLeft--;
                attemptsLeftSpan.textContent = attemptsLeft;
                if (guess === secretNumber) {
                    endGame(true, "Congratulations! You guessed the correct number.");
                } else if (guess < secretNumber) {
                    updateFeedback("Try a higher number!");
                } else {
                    updateFeedback("Try a lower number!");
                }
                guessInput.value = ""; // Clear input
            } else {
                updateFeedback("Please enter a valid number between 1 and 100.");
            }
        }
        if (attemptsLeft === 0) {
            endGame(false, `Out of attempts. The secret number was ${secretNumber}.`);
        }
    }

    function updateFeedback(message) {
        feedbackContainer.textContent = message;
    }

    function endGame(isWinner, message) {
        updateFeedback(message);
        guessInput.disabled = true;
        submitButton.disabled = true;
    }

    function resetGame() {
        secretNumber = generateRandomNumber(minNumber, maxNumber);
        attemptsLeft = maxAttempts;
        guessedNumbers.length = 0;
        guessedNumbersSpan.textContent = "";
        attemptsLeftSpan.textContent = attemptsLeft;
        guessInput.value = "";
        feedbackContainer.textContent = "";
        guessInput.disabled = false;
        submitButton.disabled = false;
    }
});
