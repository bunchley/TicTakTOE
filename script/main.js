"use strict";
let boxes = document.querySelectorAll(".box");
let gameWrapper = document.querySelector(".game-wrapper");
let playerButtonWrapper = document.querySelector(".player-wrapper");
let playerVPlayer = document.querySelector(".player-player");
let playerVComp = document.querySelector(".player-computer");
let gameText = document.querySelector(".game-text");

let gameType;
let count = 0;
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
  const insertMove = (playerSymbol, position) => {
    _board[position] = playerSymbol;
    console.log("position ", position);
    count++;
  };
  const winCheck = playerSymbol => {
    if (
      (_board[0] === playerSymbol &&
        _board[1] === playerSymbol &&
        _board[2] === playerSymbol) ||
      (_board[3] === playerSymbol &&
        _board[4] === playerSymbol &&
        _board[5] === playerSymbol) ||
      (_board[6] === playerSymbol &&
        _board[7] === playerSymbol &&
        _board[8] === playerSymbol) || //row wins
      (_board[0] === playerSymbol &&
        _board[3] === playerSymbol &&
        _board[6] === playerSymbol) ||
      (_board[1] === playerSymbol &&
        _board[4] === playerSymbol &&
        _board[7] === playerSymbol) ||
      (_board[2] === playerSymbol &&
        _board[5] === playerSymbol &&
        _board[8] === playerSymbol) || //column wins
      (_board[0] === playerSymbol &&
        _board[4] === playerSymbol &&
        _board[8] === playerSymbol) ||
      (_board[6] === playerSymbol &&
        _board[4] === playerSymbol &&
        _board[2] === playerSymbol) //diagnal wins
    ) {
      console.log(`player ${playerSymbol} wins`);
    }
  };
  return {
    createBoard,
    showBoard,
    insertMove,
    winCheck
  };
})();

let GameStart = (() => {
  let playerSymbol;
  let boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.addEventListener("click", () => {
      console.log("clicked box", ` ${box.getAttribute("id")}`);
      if (box.classList === "selected") {
      } else {
        let position = box.getAttribute("id");
        if (gameType === "players") {
          if (count % 2 === 0 && box.classList.contains("selected") != true) {
            playerSymbol = "X";
            GameBoard.insertMove(playerSymbol, position);
            GameBoard.showBoard();
          } else if (
            count % 2 != 0 &&
            box.classList.contains("selected") != true
          ) {
            playerSymbol = "O";
            GameBoard.insertMove(playerSymbol, position);
            GameBoard.showBoard();
          }
        } else if (gameType === "computer") {
          //computer move stuffs
        }
        GameBoard.winCheck(playerSymbol);
      }
    });
  });
})();

playerVComp.addEventListener("click", () => {
  playerButtonWrapper.classList.add("invisible");
  gameText.textContent = "This functionality is still under construction";
  // gameWrapper.classList.remove("invisible");
  // GameBoard.createBoard();
  // GameBoard.showBoard();
  gameType = "computer";
});

playerVPlayer.addEventListener("click", () => {
  playerButtonWrapper.classList.add("invisible");
  gameWrapper.classList.remove("invisible");
  GameBoard.createBoard();
  GameBoard.showBoard();
  gameType = "players";
});
console.log("hey yo");
