let gameSequence = [];
let userSequence = [];
let highestScore = 0;
let btnColors = ["red", "orange", "green", "purple"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highestScoreDisplay = document.createElement("p");
highestScoreDisplay.setAttribute("id", "highest-score");
document.body.appendChild(highestScoreDisplay);

// Retrieve highest score from local storage if available
if (localStorage.getItem("highestScore")) {
    highestScore = parseInt(localStorage.getItem("highestScore"));
    displayHighestScore();
}

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btnColors[randomIndex];
    let randomBtn = document.getElementById(randomColor);

    gameSequence.push(randomColor);
    console.log(gameSequence);
    btnFlash(randomBtn);
}

function checkAnswer() {
    let idx = userSequence.length - 1;
    if (userSequence[idx] === gameSequence[idx]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was ${level}<br>Press any key to start again`;
        document.body.style.backgroundColor = "red";
        setTimeout(function() {
            document.body.style.backgroundColor = "white";
        }, 150);
        updateHighestScore();
        resetGame();
    }
}

function btnPress() {
    let btnColor = this.id;
    let btn = this;
    btnFlash(btn);
    userSequence.push(btnColor);
    checkAnswer();
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function resetGame() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}

function updateHighestScore() {
    if (level > highestScore) {
        highestScore = level;
        localStorage.setItem("highestScore", highestScore);
        displayHighestScore();
    }
}

function displayHighestScore() {
    highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
}
