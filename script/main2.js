"use strict";

const GameBoard = (() => {
  let boxes = document.querySelectorAll(".box");
  let _board = [];
  const createBoard = (gameOver) => {
    if (gameOver === false) {
      for (let i = 0; i < 9; i++) {
        //create gameboard
        _board.push(" ");
        boxes[i].addEventListener("click", (e) => {
          console.log("addeventlistenter", i);
          GameController.playGame(e.target.id);
        });
      }
    }
    if (gameOver === true) {
      _board.forEach(function (position, index) {
        if (position === "X" || "O") {
          _board[index] = " ";
        }
      });
      console.log({ _board });
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
  const winCheck = (playerSymbol) => {
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
  let positionFreeCheck = (position) => {
    const spotPlayed = document.getElementById(position);
    const text = spotPlayed.textContent || spotPlayed.innerText;
    console.log("text", text);
    if (text === "X" || text === "O") {
      console.log("made it here");
      return false;
    } else {
      return true;
    }
  };

  return {
    createBoard,
    showBoard,
    update,
    winCheck,
    positionFreeCheck,
  };
})();

const Player = function (name, symbol) {
  this.name = name;
  this.symbol = symbol;
  const playerMove = (position) => {
    if (position >= 0 && position < 9) {
      console.log("determining update");
      GameBoard.update(position, symbol);
    }
  };

  return {
    name,
    symbol,
    playerMove,
  };
};

const GameController = (() => {
  let modeWrapper = document.querySelector(".mode-wrapper");
  let gameBoard = document.querySelector(".game-wrapper");
  let formWrapper = document.getElementById("form");
  let startButtonWrapper = document.querySelector(".start-button");
  const restartButtonWrapper = document.querySelector(".restart-button");
  let gameModeSelected;
  let gameOver;
  let firstPlayer1 = true;
  let player1, player2;
  let beginning = true;
  let player1nam, player2nam;

  let setPlayers = (name1, name2) => {
    player1 = new Player(name1, "X");
    player2 = new Player(name2, "O");
  };
  let gameStart = () => {
    formWrapper.addEventListener("submit", (e) => {
      console.log("submitted");
      player1nam = document.getElementById("player1").value;
      player2nam = document.getElementById("player2").value;
      if (player2nam === "") {
        gameModeSelected = "playerVComp";
        player2nam = "Computer";
      } else {
        gameModeSelected = "playerVPlayer";
      }

      console.log(beginning);
      beginning = false;
      console.log(player1nam, player2nam, gameModeSelected);
      e.preventDefault();
      formWrapper.classList.add("invisible");
      startButtonWrapper.classList.remove("invisible");

      gameMode();
    });
  };

  let gameMode = () => {
    if (beginning === true) {
      return gameStart();
    }
    startButtonWrapper.addEventListener("click", (e) => {
      console.log("inside");
      startButtonWrapper.classList.add("invisible");
      gameBoard.classList.remove("invisible");
      setPlayers(player1nam, player2nam);

      setup(false);
      e.preventDefault();
    });
  };
  let setup = (gameOver) => {
    GameBoard.createBoard(gameOver);
    GameBoard.showBoard();
  };
  let playGame = (position) => {
    console.log("playerMove", position);
    // if (gameOver) {
    //   setup(gameOver);
    //   return;
    // }
    if (GameBoard.positionFreeCheck(position) === false) {
      return;
    }
    if (firstPlayer1) {
      player1.playerMove(position);
      if (GameBoard.winCheck(player1.symbol)) {
        finish();
      }
      firstPlayer1 = false;
    } else {
      player2.playerMove(position);
      if (GameBoard.winCheck(player2.symbol)) {
        finish();
      }
      firstPlayer1 = true;
    }
  };
  const finish = () => {
    restartButtonWrapper.classList.remove("invisible");
    gameOver = true;

    setup(gameOver);
    restartButtonWrapper.addEventListener("click", (e) => {
      console.log("in the restart");
      gameOver = false;
      beginning = true;
      formWrapper.classList.remove("invisible");
      restartButtonWrapper.classList.add("invisible");
      gameBoard.classList.add("invisible");
      gameMode();
    });
  };
  return {
    setPlayers,
    gameMode,
    setup,
    playGame,
    finish,
  };
})();

GameController.gameMode();
