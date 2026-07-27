const hungkeyword = document.querySelector(".keyword");
const hint_text = document.querySelector(".hint_text");
const word_display = document.querySelector(".hung_display");
const guessText = document.querySelector(".guess-text");
const hungmanImag = document.querySelector(".hungman_box img");
const modal = document.querySelector(".modal-overlay");
const modalImage = document.querySelector(".modal-box img");
const modalTitle = document.querySelector(".modal-box h3");
const modalPara = document.querySelector(".modal-box p");
const closeBtn = document.querySelector(".modal-close");

let currentWord;
let wrongGuessCount = 0;
const maxGuess = 6;
let correctLetter = [];

const getRandomword = () => {
    const { word, hint } =
        wordList[Math.floor(Math.random() * wordList.length)];

    currentWord = word;
    
    wrongGuessCount = 0;
    correctLetter = [];

    hint_text.innerHTML = `Hint: ${hint}`;

    guessText.innerHTML = `
        incorrect guess :
        <b><span>0</span> / <span>${maxGuess}</span></b>
    `;

    hungmanImag.src = "images/hangman-0.svg";

    word_display.innerHTML = word
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");

    document.querySelectorAll(".keyword button").forEach(button => {
        button.disabled = false;
    });

    modal.classList.remove("show");
};

const gameOver = (isVictory) => {
    setTimeout(() => {

        modalImage.src = `images/${isVictory ? "victory" : "lost"}.gif`;

        modalTitle.innerText = isVictory
            ? "Congratulations!"
            : "Game Over!";

        modalPara.innerHTML = `
            ${isVictory ? "You found the word:" : "The correct word was:"}
            <br>
            <b>${currentWord.toUpperCase()}</b>
        `;

        modal.classList.add("show");

    }, 300);
};

const initGame = (button, clickedletter) => {

    if (currentWord.includes(clickedletter)) {

        const letters = word_display.querySelectorAll("li");

        [...currentWord].forEach((letter, index) => {

            if (letter === clickedletter) {
                correctLetter.push(letter);
                letters[index].textContent = letter;
            }

        });

    } else {

        wrongGuessCount++;
        hungmanImag.src = `images/hangman-${wrongGuessCount}.svg`;

    }

    guessText.innerHTML = `
        incorrect guess :
        <b><span>${wrongGuessCount}</span> / <span>${maxGuess}</span></b>
    `;

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

    button.innerText = String.fromCharCode(i);

    hungkeyword.appendChild(button);

    button.addEventListener("click", (e) => {
        initGame(e.target, String.fromCharCode(i));
    });
}

closeBtn.addEventListener("click", () => {
    getRandomword();
});

getRandomword();