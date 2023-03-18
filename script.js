import Ball from "./ball.js"
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

let lastTime;

function update(time) {

    if(lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);

        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
        document.documentElement.style.setProperty("--hue", hue + delta * 0.005);
    }


    if(isLose()) {
        handleLose();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect();

    return rect.left <= 0 || rect.right >= window.innerWidth;
}

function handleLose() {
    const rect = ball.rect();

    if(rect.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    }
    else {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }

    if(parseInt(playerScore.textContent) >= 11) {
        playerScore.textContent = 0;
        computerScore.textContent = 0;
        window.alert("Player has won the game");
    }
    else if(parseInt(computerScore.textContent) >= 11) {
        playerScore.textContent = 0;
        computerScore.textContent = 0;
        window.alert("Computer has won the game");
    }

    ball.reset();
    playerPaddle.reset();
    computerPaddle.reset();
}

document.addEventListener('mousemove', e => {
    playerPaddle.position = ((e.y / window.innerHeight) * 100);
})

window.requestAnimationFrame(update);