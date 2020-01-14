"use strict";

//game board using module design pattern
let gameBoard = (() => {
  let _board = [];
  const createBoard = () => {
    for (let i = 0; i < 3; i++) {
      _board.push([" ", " ", " "]);
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

gameBoard.showBoard();

console.log("hey yo");
