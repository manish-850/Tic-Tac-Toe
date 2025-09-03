const boxes = document.querySelectorAll(".box");
const boxtxts = document.querySelectorAll(".box h1");
let score1 = document.querySelector("#score1");
let score2 = document.querySelector("#score2");
let msg = document.querySelector("#message p");
let resetbtn = document.querySelector("#reset");
let resetScore = document.querySelector("#reset-score");
let player1Score = 0;
let player2Score = 0;
let gameOver = false;
let prob = Math.floor(Math.random() * 2);
let moveX = [];
let moveO = [];
let check = prob === 0 ? "X" : "O";

const winCombo = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function checkWin(moves) {
    return winCombo.some(combo => {
        return combo.every(position => moves.includes(position));
    });
}

function move() {
    boxes.forEach(function (elem, index) {
        elem.addEventListener("click", function () {
            if (gameOver) return; // stop clicks after game over
            if (elem.innerHTML.trim() !== "") return;

            if (check === "X") {
                elem.innerHTML = `<h1>🐕</h1>`;
                moveX.push(index);
                check = "O";

                if (checkWin(moveX)) {
                    // Add your win handling code here
                    gameOver = true; // stop game
                    msg.textContent = "Dog wins!";
                    resetbtn.value = "New Game";
                    player1Score++; // increase Player 1 score
                    score1.textContent = player1Score;
                }
            }
            else {
                elem.innerHTML = `<h1>🐈‍⬛</h1>`;
                moveO.push(index);
                check = "X";

                if (checkWin(moveO)) {
                    // Add your win handling code here
                    gameOver = true; // stop game
                    msg.textContent = "Cat wins!";
                    resetbtn.value = "New Game";
                    player2Score++; // increase Player 2 score
                    score2.textContent = player2Score;
                }
            }
            
            // Check for draw if all boxes are filled
            if (moveX.length + moveO.length === 9) {
                gameOver = true; // prevent further clicks
                msg.textContent = "It's a draw!";
            }
        });
    });
}
move();

function reset() {
    resetScore.addEventListener("click", function () {
        player1Score = 0;
        player2Score = 0;
        score1.textContent = player1Score;
        score2.textContent = player2Score;

    });
    resetbtn.addEventListener("click", function () {
        boxes.forEach(function (elem) {
            elem.innerHTML = "";
        });
        moveX = []; // clear old moves
        moveO = []; // clear old moves
        gameOver = false;
        msg.textContent = "";
        resetbtn.value = "Reset Game";
    })
}
reset();

