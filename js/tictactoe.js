let player = 0;

let gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];

let player1Score = 0;
let player2Score = 0;
let player1ScoreCPU = 0;
let player2ScoreCPU = 0;
let tiedScore = 0;
let tiedScoreCPU = 0;
let gameCounter = 0;

let $player1 = '';
let $player2 = '';
let $player1CPU = '';
let $player2CPU = 'The Machine';

let gameOver = false;

const ping1 = new Audio('audio/player1.wav');
const ping2 = new Audio('audio/player2.wav')
const machine = new Audio('audio/machinewins.wav');

$(document).ready(function() {

//Store scores in local storage
const saveScores = function () {
  if ($('#a1').hasClass('cpu')) {
    localStorage.setItem('player1ScoreCPU', player1ScoreCPU);
    localStorage.setItem('player2ScoreCPU', player2ScoreCPU);
    localStorage.setItem('tiedScoreCPU', tiedScoreCPU);
  } else {
    localStorage.setItem('player1Score', player1Score);
    localStorage.setItem('player2Score', player2Score);
    localStorage.setItem('tiedScore', tiedScore);
  }
}

//Displays scores on screen from local storage
const getScores = function () {
  //Computer Game
  if ($('#a1').hasClass('cpu')) {
    player1ScoreCPU = parseInt(localStorage.getItem('player1ScoreCPU', player1ScoreCPU));
    if ( isNaN(player1ScoreCPU) === true) {
      player1ScoreCPU = 0;
    }
    player2ScoreCPU = parseInt(localStorage.getItem('player2ScoreCPU', player1ScoreCPU));
    if ( isNaN(player2ScoreCPU) === true) {
      player2ScoreCPU = 0;
    }
    tiedScoreCPU = parseInt(localStorage.getItem('tiedScoreCPU', tiedScoreCPU));
    if ( isNaN(tiedScoreCPU) === true) {
      tiedScoreCPU = 0;
    }
    $('#firstPlayerCPU').text($player1CPU + ': ' + player1ScoreCPU);
    $('#secondPlayerCPU').text($player2CPU + ': ' + player2ScoreCPU)
    $('#tiesCPU').text('Ties: ' + tiedScoreCPU);
    //Player Game
  } else {
    player1Score = parseInt(localStorage.getItem('player1Score', player1Score));
    if ( isNaN(player1Score) === true) {
      player1Score = 0;
    }
    player2Score = parseInt(localStorage.getItem('player2Score', player1Score));
    if ( isNaN(player2Score) === true) {
      player2Score = 0;
    }
    tiedScore = parseInt(localStorage.getItem('tiedScore', tiedScore));
    if ( isNaN(tiedScore) === true) {
      tiedScore = 0;
    }
    $('#firstPlayer').text($player1 + ': ' + player1Score);
    $('#secondPlayer').text($player2 + ': ' + player2Score)
    $('#ties').text('Ties: ' + tiedScore);
  }
}

//Saves players to local storage
const savePlayers = function() {
  //computer game
  if ($('#a1').hasClass('cpu')) {
    $player1CPU = $('#player1CPU').val();
    localStorage.setItem('player 1CPU', $player1CPU);
  //player game
  } else {
    $player1 = $('#player1').val();
    $player2 = $('#player2').val();
    localStorage.setItem('player 1', $player1);
    localStorage.setItem('player 2', $player2);
  }
}

//Displays players and scores on the screen
const setPlayers = function() {
  //computer game
  if ($('#a1').hasClass('cpu')) {
    $player1CPU = localStorage.getItem('player 1CPU');
    if ($player1CPU === null) {
      $player1CPU = 'Player 1';
    }
    $('#firstPlayerCPU').text($player1CPU + ': ' + player1ScoreCPU);
    $('#secondPlayerCPU').text($player2CPU + ': ' + player2ScoreCPU)
    $('#tiesCPU').text('Ties: ' + tiedScoreCPU);
  } else {
  //player game
    $player1 = localStorage.getItem('player 1');
    if ($player1 === null) {
      $player1 = 'Player 1';
    }
    $player2 = localStorage.getItem('player 2');
    if ($player2 === null) {
      $player2 = 'Player 2';
    }
    $('#firstPlayer').text($player1 + ': ' + player1Score);
    $('#secondPlayer').text($player2 + ': ' + player2Score)
    $('#ties').text('Ties: ' + tiedScore);
  }
}

//Resets the Game Board so that a new game can be played and displays winner of previous game
const resetBoard = function() {
  saveScores();
  setTimeout(function() {
    $('.grid').removeClass('X O cat1 cat2 bender ape');
    $('.grid').text('');
    gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    gameOver = false;
    if ($('#a1').hasClass('cpu') && player === 1) {
      computerTurn();
    }
  }, 1000);
  setTimeout(function() {
    $('#winner').text('');
  }, 2000);
};

//Checks for Meow-Meow-Meow Easter Egg
const checkCatGame = function () {
  if ($player1 === 'Meow' && $player2 === 'Meow-Meow') {
    $('#winner').addClass('cat-game-link');
    $('#winner').html('<a href="meow-meow-meow.html">Click here to play Meow-Meow-Meow! Not safe for those with photosensitive epilepsy<a>');
  }
}

//Computer chooses random available square on the board
const computerTurn = function() {
  let number = Math.floor(Math.random() * 9);
  let compChoice = gameBoard[number];
  while (compChoice === 'X'|| compChoice === 'O') {
    number = Math.floor(Math.random() * 9);
    compChoice = gameBoard[number];
  }
  $(`#${compChoice}`).text('');
  $(`#${compChoice}`).addClass('bender');
  $(`#${compChoice}`).addClass('O');
  if ($(`#${compChoice}`).hasClass('kitty') === true) {
    $(`#${compChoice}`).addClass('cat2');
    $(`#${compChoice}`).addClass('O');
    $(`#${compChoice}`).text('');
  }
  gameBoard[number] = 'O';
  checkWin();
  player = 0;
}

//Check if the move made by the computer or the player wins the game
const checkWin = function () {
  gameCounter = gameCounter + 1;
  if (gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2] ||
     gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5] ||
     gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8] ||
     gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6] ||
     gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7] ||
     gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8] ||
     gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8] ||
     gameBoard[6] === gameBoard[4] && gameBoard[6] === gameBoard[2]
     ) {
       if (player === 0) {
         if ($('#a1').hasClass('cpu')) {
           player1ScoreCPU = player1ScoreCPU + 1;
           $('#winner').text(`Congratulations ${$player1CPU}!`);
         } else {
           player1Score = player1Score + 1;
           $('#winner').text(`Congratulations ${$player1}!`);
         }
         gameCounter = 0;
         $('#winner').css('color', 'red');
         gameOver = true;
         gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
         resetBoard();
       } else {
         if ($('#a1').hasClass('cpu')) {
           player2ScoreCPU = player2ScoreCPU + 1;
           $('#winner').text(`The Machine Wins!`);
           machine.play();
         } else {
           player2Score = player2Score + 1;
           $('#winner').text(`Congratulations ${$player2}!`);
         }
         gameCounter = 0;
         $('#winner').css('color', 'green');
         gameOver = true;
         gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
         resetBoard();
       }
  };
  if (gameCounter === 9) {
    if ($('#a1').hasClass('cpu')) {
      tiedScoreCPU = tiedScoreCPU + 1;
    } else {
      tiedScore = tiedScore + 1
    }
    gameCounter = 0;
    $('#winner').text(`Game is tied!`);
    $('#winner').css('color', 'purple');
    gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    gameOver = true;
    resetBoard();
  }
  getScores();
};

//Click the Save Names button
$('#save').on('click', function () {
  savePlayers();
  setPlayers();
  checkCatGame();
});

//Click the Clear Scores button
$('#clear').on('click', function() {
  localStorage.removeItem('player1Score');
  localStorage.removeItem('player2Score');
  localStorage.removeItem('tiedScore');
  localStorage.removeItem('player1ScoreCPU');
  localStorage.removeItem('player2ScoreCPU');
  localStorage.removeItem('tiedScoreCPU');
  getScores();
})

//Gameplay - Cicking on the board
$('.grid').on('click', function() {
  if ($(this).hasClass('X') !== true && $(this).hasClass('O') !== true) {
    if (player === 0) {
      ping1.play();
      $(this).text('X');
      $(this).addClass('X');
      if ($(this).hasClass('kitty') === true) {
        $(this).addClass('cat1');
        $(this).text('');
      }
      if ($(this).hasClass('cpu') === true) {
        $(this).addClass('ape');
        $(this).text('');
      }
      let choice = gameBoard.indexOf($(this).attr('id'));
      gameBoard[choice] = 'X';
      checkWin();
      player = 1;
      if ($(this).hasClass('cpu') && gameOver === false) {
        computerTurn();
      }
    } else {
      ping2.play();
      $(this).text('O');
      $(this).addClass('O');
      if ($(this).hasClass('kitty') === true) {
        $(this).addClass('cat2');
        $(this).text('');
      }
      let choice = gameBoard.indexOf($(this).attr('id'));
      gameBoard[choice] = 'O';
      checkWin();
      player = 0;
    }
  }
});

//Load screen with previous player names and scores.
getScores();
setPlayers();

});
