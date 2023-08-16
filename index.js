const gameBord = document.querySelector(".game-bord");
const Score = document.querySelector(".score");
const highScore = document.querySelector(".high-score");
const Control = document.querySelectorAll(".control i");

let gameOver = false;
let foodX, foodY;
let snackX= 5, snackY = 10;
let snackBody=[];
let velocityX=0, velocityY=0;
let setIntervalId;
let score = 0;
let HighScore;


let changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30)+1
    foodY = Math.floor(Math.random() * 30)+1
}

let handleGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game is over...")
    location.reload()
}

let changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityX != 1){
        velocityX= -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowDown" && velocityX != -1){
        velocityX= 1;
        velocityY = 0;
    }
    else if(e.key === "ArrowLeft" && velocityY != 1){
        velocityX= 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowRight" && velocityY != -1){
        velocityX= 0;
        velocityY = 1;
    }
    initGame()
}

Control.forEach(key => {
    key.addEventListener("click",() => changeDirection({key: key.dataset.key}) )
})



let initGame = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style = "grid-area:${foodX} / ${foodY}"></div>`


    if(snackX === foodX && snackY === foodY){
        changeFoodPosition()
        snackBody.push([foodX,foodY])
        score++; 

        HighScore = score >= HighScore? score : HighScore;
        localStorage.setItem("high-score",HighScore)

        Score.textContent = `Score: ${score}`;
            
    }
    HighScore = localStorage.getItem("high-score") || 0;
    highScore.innerText = `High Score: ${HighScore}`;

    for (let i = snackBody.length -1; i > 0; i--) {
        snackBody[i] = snackBody[i - 1];
        
    }

    snackBody[0] = [snackX, snackY]

    snackX += velocityX
    snackY += velocityY

    if(snackX <= 0 || snackX >=31 || snackY <= 0 || snackY >= 31){
        gameOver = true;
    }


    for (let i = 0; i < snackBody.length; i++) {
        htmlMarkup += `<div class="head" style = "grid-area:${snackBody[i][0]} / ${snackBody[i][1]}"></div>`
        if(i !==0 && snackBody[0][1] === snackBody[i][1] && snackBody[0][0] === snackBody[i][0]){
            gameOver = true;
        }
    }
    gameBord.innerHTML = htmlMarkup
}

changeFoodPosition()

setIntervalId = setInterval(initGame,250)

document.addEventListener("keydown", changeDirection)

