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
    if (text === "X" || text === "O") {
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
  const gameTextWrapper = document.querySelector(".game-text");
  let gameBoard = document.querySelector(".game-wrapper");
  let formWrapper = document.getElementById("form");
  let startButtonWrapper = document.querySelector(".start-button");
  const restartButtonWrapper = document.querySelector(".restart-button");
  let gameModeSelected;
  let gameOver;
  let firstPlayer1 = true;
  let player1, player2;
  let beginning = true;

  let setPlayers = (name1, name2) => {
    player1 = new Player(name1, "X");
    player2 = new Player(name2, "O");
  };
  let gameStart = () => {
    formWrapper.addEventListener("submit", (e) => {
      console.log("submitted");
      let player1nam = document.getElementById("player1").value;
      let player2nam = document.getElementById("player2").value;
      if (player2nam === "") {
        gameModeSelected = "playerVComp";
        player2nam = "Computer";
      } else {
        gameModeSelected = "playerVPlayer";
      }

      setPlayers(player1nam, player2nam);
      console.log(player1.name, player2.name);

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
      startButtonWrapper.classList.add("invisible");
      gameBoard.classList.remove("invisible");

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
    if (gameOver) {
      console.log("game over is true");
      setup(gameOver);
      restartButtonWrapper.classList.remove("invisible");
      restartButtonWrapper.addEventListener("click", (e) => {
        gameOver = false;
        beginning = true;
        formWrapper.classList.remove("invisible");
        restartButtonWrapper.classList.add("invisible");
        gameBoard.classList.add("invisible");
        gameTextWrapper.innerHTML = "Welcome Back";
        setup(true);
        gameMode();
      });
    }
    if (GameBoard.positionFreeCheck(position) === false) {
      return;
    }
    if (firstPlayer1) {
      player1.playerMove(position);
      gameTextWrapper.innerHTML = `${player2.name}'s turn!`;
      if (GameBoard.winCheck(player1.symbol)) {
        console.log("win check player 1", player1.name);
        gameTextWrapper.innerHTML = `${player1.name} Wins!`;
        gameOver = true;
      }
      firstPlayer1 = false;
    } else {
      player2.playerMove(position);
      gameTextWrapper.innerHTML = `${player1.name}'s turn!`;
      if (GameBoard.winCheck(player2.symbol)) {
        console.log("win check player 2", player2.name);
        gameTextWrapper.innerHTML = `${player2.name} Wins!`;
        gameOver = true;
      }
      firstPlayer1 = true;
    }
  };

  return {
    setPlayers,
    gameMode,
    setup,
    playGame,
  };
})();

GameController.gameMode();
