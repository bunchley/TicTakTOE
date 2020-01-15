"use strict";
let gameWrapper = document.querySelector(".game-wrapper");
//game board using module design pattern
let GameBoard = (() => {
  let _board = [];
  const createBoard = () => {
    for (let i = 0; i < 9; i++) {
      _board.push(" ");
    }
  };
  const showBoard = () => {
    let boxes = document.querySelectorAll(".box");
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
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box =>
      box.addEventListener(
        "click",
        console.log("clicked box", ` ${box.getAttribute("data-name")}`)
      )
    );
  };
  return {
    listener
  };
})();

GameBoard.createBoard();
GameBoard.showBoard();
StartGame.listener();

console.log("hey yo");
