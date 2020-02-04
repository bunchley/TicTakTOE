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

  const removeListener = gameType => {
    console.log("removing event listener");
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
      box.removeEventListener("click", function() {
        gameType = "end";
        boardListener(box, gameType);
      });
    });
  };

  const addListener = gameType => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
      box.addEventListener("click", function() {
        boardListener(box, gameType);
      });
    });
  };

  const boardListener = (boxPosition, gameType) => {
    let playerSymbol = "none";
    console.log("gameType", gameType);
    console.log("clicked box", ` ${boxPosition.getAttribute("id")}`);
    if (boxPosition.classList === "selected") {
    } else {
      let positionId = boxPosition.getAttribute("id");
      if (gameType === "players") {
        if (
          count % 2 === 0 &&
          boxPosition.classList.contains("selected") != true
        ) {
          playerSymbol = "X";
          boxPosition.classList.add("selected");
          GameBoard.insertMove(playerSymbol, positionId);
          GameBoard.showBoard();
        } else if (
          count % 2 != 0 &&
          boxPosition.classList.contains("selected") != true
        ) {
          playerSymbol = "O";
          boxPosition.classList.add("selected");
          GameBoard.insertMove(playerSymbol, positionId);
          GameBoard.showBoard();
        }
      } else if (gameType === "computer") {
        //computer move stuffs
      }
      GameBoard.winCheck(playerSymbol, gameType);
    }
  };
  const insertMove = (playerSymbol, position) => {
    _board[position] = playerSymbol;
    console.log("position ", position);
    count++;
  };
  const winCheck = (playerSymbol, gameType) => {
    console.log("wincheck-ing");
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
      gameOver(playerSymbol, gameType);
    } else if (
      _board[0] != " " &&
      _board[1] != " " &&
      _board[2] != " " &&
      _board[3] != " " &&
      _board[4] != " " &&
      _board[5] != " " &&
      _board[6] != " " &&
      _board[7] != " " &&
      _board[8] != " "
    ) {
      playerSymbol = "end";
      console.log(`no more moves the game is over`);
      gameOver(playerSymbol);
    }
  };

  const gameOver = (winner, gameType) => {
    if (winner === "X" || winner === "O") {
      gameText.textContent = `Player ${winner} wins!`;
    } else {
      gameText.textContent = `It's a tie`;
    }
    gameType = "gameover";
    removeListener(gameType);
    console.log("game result", winner);
  };
  return {
    createBoard,
    showBoard,
    removeListener,
    addListener,
    boardListener,
    insertMove,
    winCheck,
    gameOver
  };
})();

const gameController = gameType => {
  console.log("inside game controler__", gameType);
  let playing;
};

playerVComp.addEventListener("click", () => {
  playerButtonWrapper.classList.add("invisible");
  gameText.textContent = "This functionality is still under construction";
  // gameWrapper.classList.remove("invisible");
  // GameBoard.createBoard();
  // GameBoard.showBoard();
  gameType = "computer";
  gameController(gameType);
});

playerVPlayer.addEventListener("click", () => {
  playerButtonWrapper.classList.add("invisible");
  gameWrapper.classList.remove("invisible");
  gameType = "players";
  gameController(gameType);
  GameBoard.createBoard();
  GameBoard.showBoard();

  if (gameType === "players") {
    GameBoard.addListener(gameType);
  } else {
    GameBoard.removeListener(gameType);
  }
});
console.log("hey yo");
