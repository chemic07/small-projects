console.log("tic tac toe");
let music = new Audio("music/music.mp3");
let audioTurn = new Audio("music/ting.mp3");
let audiogameover = new Audio("music/gameover.mp3");
let turn = "x";
let gameover = false;

// Function to change turn
const changeTurn = () => {
  return turn === "x" ? "o" : "x";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let e of wins) {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      gameover = true;
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " won";
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      break; // Break out of the loop once a win is detected
    }
  }
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !gameover) {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!gameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

// Add event listener to reset button
document.getElementById("reset").addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "x"; // Reset the turn to "x"
  gameover = false;
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
});
