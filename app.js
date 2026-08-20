const keyboard = document.querySelector(".keyboard");
const hintText = document.querySelector(".hint-text");
const wordDisplay = document.querySelector(".word-display");
const wrongCountEl = document.querySelector(".wrong-count");
const maxGuessEl = document.querySelector(".max-guess");
const attemptSegments = document.querySelectorAll(".attempt-segment");
const hangmanImg = document.querySelector(".hangman-card img");
const modal = document.querySelector(".modal-overlay");
const modalTitle = document.querySelector(".modal-box h3");
const modalPara = document.querySelector(".modal-box p");
const closeBtn = document.querySelector(".modal-close");

let currentWord;
let wrongGuessCount = 0;
const maxGuess = 6;
let correctLetter = [];

const updateAttempts = () => {
    attemptSegments.forEach((segment, index) => {
        segment.classList.toggle("used", index < wrongGuessCount);
    });
    wrongCountEl.textContent = wrongGuessCount;
};

const getRandomWord = () => {
    const { word, hint } =
        wordList[Math.floor(Math.random() * wordList.length)];

    currentWord = word;
    wrongGuessCount = 0;
    correctLetter = [];

    hintText.textContent = hint;
    maxGuessEl.textContent = maxGuess;
    updateAttempts();

    hangmanImg.src = "images/hangman-0.svg";

    wordDisplay.innerHTML = word
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");

    keyboard.querySelectorAll("button").forEach((button) => {
        button.disabled = false;
        button.classList.remove("hit", "miss");
    });

    modal.classList.remove("show", "win", "lose");
};

const gameOver = (isVictory) => {
    setTimeout(() => {
        modal.classList.add(isVictory ? "win" : "lose");

        modalTitle.textContent = isVictory ? "nice one" : "too late";

        modalPara.innerHTML = isVictory
            ? `word unlocked <b>${currentWord.toUpperCase()}</b>`
            : `answer was <b>${currentWord.toUpperCase()}</b>`;

        modal.classList.add("show");
    }, 300);
};

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        const letters = wordDisplay.querySelectorAll(".letter");

        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetter.push(letter);
                letters[index].textContent = letter;
                letters[index].classList.add("filled");
            }
        });

        button.classList.add("hit");
    } else {
        wrongGuessCount++;
        hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
        button.classList.add("miss");
        updateAttempts();
    }

    button.disabled = true;

    if (wrongGuessCount === maxGuess) {
        return gameOver(false);
    }

    if (correctLetter.length === currentWord.length) {
        return gameOver(true);
    }
};

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    const letter = String.fromCharCode(i);

    button.textContent = letter;
    keyboard.appendChild(button);

    button.addEventListener("click", (e) => {
        initGame(e.target, letter);
    });
}

closeBtn.addEventListener("click", getRandomWord);

getRandomWord();
