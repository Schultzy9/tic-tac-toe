let player = 0;

let gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];

let player1Score = 0;
let player2Score = 0;
let tiedScore = 0;
let gameCounter = 0;

let $player1 = '';
let $player2 = '';

let gameOver = false;

$(document).ready(function() {

const saveLocalStorage = function() {
  localStorage.setItem('player 1', $player1);
  localStorage.setItem('player 2', $player2);
};

const saveScores = function () {
  localStorage.setItem('player1Score', player1Score);
  localStorage.setItem('player2Score', player2Score);
  localStorage.setItem('tiedScore', tiedScore);
}

const getScores = function () {
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
}

const setPlayers = function() {
  if ($('#player1').val() === '') {
    $player1 = localStorage.getItem('player 1');
  } else {
    $player1 = $('#player1').val();
  }
  if ($('#player2').val() === '') {
    $player2 = localStorage.getItem('player 2');
  } else {
    $player2 = $('#player2').val();
  }
  $('#winner').text('');
}

const resetBoard = function() {
  saveScores();
  setTimeout(function() {
    $('.grid').removeClass('X O cat1 cat2 terminator ape');
    $('.grid').text('');
    gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    gameOver = false;
    if ($('#a1').hasClass('cpu') && player === 1) {
      computerTurn();
    }
  }, 1000);
};

const checkCatGame = function () {
  if ($player1 === 'Meow' && $player2 === 'Meow-Meow') {
    $('#winner').addClass('cat-game');
    $('#winner').html('<a href="cat-tic-tac-toe.html">Click here to play Meow-Meow-Meow<a>');
  }
}

const computerTurn = function() {
  let number = Math.floor(Math.random() * 9);
  let compChoice = gameBoard[number];
  while (compChoice === 'X'|| compChoice === 'O') {
    number = Math.floor(Math.random() * 9);
    compChoice = gameBoard[number];
  }
  $(`#${compChoice}`).text('');
  $(`#${compChoice}`).addClass('terminator');
  if ($(`#${compChoice}`).hasClass('kitty') === true) {
    $(`#${compChoice}`).addClass('cat2');
    $(`#${compChoice}`).text('');
  }
  gameBoard[number] = 'O';
  checkWin();
  player = 0;
}

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
         player1Score = player1Score + 1;
         gameCounter = 0;
         $('#winner').text(`Congratulations ${$player1}!`);
         $('#winner').css('color', 'red');
         gameOver = true;
         resetBoard();
       } else {
         player2Score = player2Score + 1;
         gameCounter = 0;
         $('#winner').text(`Congratulations ${$player2}!`);
         $('#winner').css('color', 'green');
         gameOver = true;
         resetBoard();
       }
  };
  if (gameCounter === 9) {
    tiedScore = tiedScore + 1;
    gameCounter = 0;
    $('#winner').text(`Game is tied!`);
    $('#winner').css('color', 'purple');
    gameOver = true;
    resetBoard();
  }
  $('#firstPlayer').text($player1 + ': ' + player1Score);
  $('#secondPlayer').text($player2 + ': ' + player2Score)
  $('#ties').text('Ties: ' + tiedScore);
};

$('#save').on('click', function () {
  setPlayers();
  saveLocalStorage();
});

$('#clear').on('click', function() {
  localStorage.removeItem('player1Score');
  localStorage.removeItem('player2Score');
  localStorage.removeItem('tiedScore');
})

//Gameplay - Cicking on the board
$('.grid').on('click', function() {
  setPlayers();
  getScores();
  checkCatGame();
  if ($(this).hasClass('X') !== true && $(this).hasClass('O') !== true) {
    if (player === 0) {
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

});

//Make X and O buttons look better
//Hover effects for navbar and buttons
//Add sounds
//README file
//Local Storage
//Smart AI
