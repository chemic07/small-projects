// Game constants & Variables

let inputDir = { x: 0, y: 0 };
const soundmusic = new Audio("music/music.mp3");
const foodsound = new Audio("music/food.mp3");
const gameover = new Audio("music/gameover.mp3");
const movesound = new Audio("music/move.mp3");
let speed = 15;
let score = 0;
// let scoreBox = document.getElementById("scoreBox");

let lastPainttime = 0;
let snakeArr = [
  {
    x: 13,
    y: 15,
  },
];
let food = { x: 6, y: 7 };

// Game Function
function main(ctime) {
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPainttime) / 1000 < 1 / speed) {
    return;
  }
  lastPainttime = ctime;
  gameEngine();
}

function isCollids(snake) {
  // if you bump into yourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  //Part 1 Udating the snake
  if (isCollids(snakeArr)) {
    gameover.play();
    soundmusic.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    soundmusic.play();
    score = 0;
  }
  // if you have eaten the food increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodsound.play();
    let scoreBox = document.getElementById("scoreBox");
    score += 1;
    scoreBox.innerHTML = "Score:" + score;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "Hiscore: " + hiscoreval;
    }
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // Moving the sanke
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // part 2 display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    sankeElement = document.createElement("div");
    sankeElement.style.gridRowStart = e.y;
    sankeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      sankeElement.classList.add("head");
    } else {
      sankeElement.classList.add("snake");
    }

    board.appendChild(sankeElement);
  });
  // display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logics start here

// hiscore saving to local stoarge
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "Hiscore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start the Game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
