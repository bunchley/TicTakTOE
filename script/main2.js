"use strict";

const GameBoard = (() => {
  let boxes = document.querySelectorAll(".box");
  let _board = [];
  const createBoard = gameOver => {
    for (let i = 0; i < 9; i++) {
      //create gameboard
      _board.push(" ");
      if (gameOver != true) {
        boxes[i].addEventListener("click", e => {
          console.log("addeventlistenter", i);
          GameController.playGame(e.target.id);
        });
      }
    }
  };
  const showBoard = () => {
    for (let i = 0; i < 9; i++) {
      boxes[i].innerText = `${_board[i]}`;
    }
  };
  const update = (position, symbol) => {
    _board[position] = symbol;
    showBoard();
    console.log("updating the game board", _board[position]);
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
      return true;
    }
  };

  return {
    createBoard,
    showBoard,
    update,
    winCheck
  };
})();

const Player = function(name, symbol) {
  this.name = name;
  this.symbol = symbol;
  const playerMove = position => {
    if (position >= 0 && position < 9) {
      // where you left off
      console.log("determining update");
      GameBoard.update(position, symbol);
    }
  };

  return {
    name,
    symbol,
    playerMove
  };
};

const GameController = (() => {
  let modeWrapper = document.querySelector(".mode-wrapper");
  let gameBoard = document.querySelector(".game-wrapper");
  let gameModeSelected;
  let gameOver;
  let firstPlayer1 = true;
  let player1, player2;

  let setPlayers = gameModeSelected => {
    if (gameModeSelected === "playerVPlayer") {
      player1 = new Player("Player 1", "X");
      player2 = new Player("Player 2", "O");
      console.log(player1, player2);
    }
  };
  let gameMode = () => {
    modeWrapper.addEventListener("click", e => {
      if (e.target.className === "mode-pvp") {
        gameModeSelected = "playerVPlayer";
      }
      modeWrapper.classList.add("invisible");
      gameBoard.classList.remove("invisible");
      setPlayers(gameModeSelected);
      setup(false);
    });
  };
  let setup = gameOver => {
    GameBoard.createBoard(gameBoard);
    GameBoard.showBoard();
  };
  let playGame = position => {
    console.log("playerMove", position);
    if (gameOver) {
      setup(gameOver);
      return;
    }
    if (firstPlayer1) {
      player1.playerMove(position);
      if (GameBoard.winCheck(player1.symbol)) {
        gameOver = true;
      }
      firstPlayer1 = false;
    } else {
      player2.playerMove(position);
      if (GameBoard.winCheck(player2.symbol)) {
        gameOver = true;
      }
      firstPlayer1 = true;
    }
  };
  return {
    setPlayers,
    gameMode,
    setup,
    playGame
  };
})();

GameController.gameMode();
