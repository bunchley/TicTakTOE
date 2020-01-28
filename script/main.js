"use strict";
let boxes = document.querySelectorAll(".box");
let gameWrapper = document.querySelector(".game-wrapper");
let playerButtonWrapper = document.querySelector(".player-wrapper");
let playerVPlayer = document.querySelector(".player-player");
let playerVComp = document.querySelector(".player-computer");
//game board using module design pattern
let GameBoard = (() => {
  let _board = [];
  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      _board.push(" ");
    }
  };
  const showBoard = () => {
    for (let i = 0; i < 9; i++) {
      boxes[i].innerText = `${_board[i]}`;
    }
  };
  return {
    createBoard,
    showBoard
  };
})();

const StartGame = (() => {
  const listener = () => {
    console.log("listening");
    boxes.forEach(box =>
      box.addEventListener(
        "click",
        console.log("clicked box", `${box.getAttribute("data-name")}`)
      )
    );
  };
  return {
    listener
  };
})();

playerVComp.addEventListener("click", () => {
  playerButtonWrapper.classList.add("invisible");
  gameWrapper.classList.remove("invisible");
  GameBoard.createBoard();
  GameBoard.showBoard();
  StartGame.listener();
});

playerVPlayer.addEventListener("click", () => {
  playerButtonWrapper.classList.add("invisible");
  gameWrapper.classList.remove("invisible");
  GameBoard.createBoard();
  GameBoard.showBoard();
  StartGame.listener();
});
console.log("hey yo");
