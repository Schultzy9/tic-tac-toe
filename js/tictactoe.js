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

const resetBoard = function() {
  setTimeout(function() {
    $('.grid').removeClass('X O cat1 cat2');
    $('.grid').text('');
    gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    gameOver = false;
    if ($('#a1').hasClass('cpu') && player === 1) {
      computerTurn();
    }
  }, 1000);
};

const setPlayers = function() {
  $player1 = $('#player1').val();
  $player2 = $('#player2').val();
  $('#winner').text('');
}

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
  $(`#${compChoice}`).text('O');
  $(`#${compChoice}`).addClass('O');
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
         $('#winner').css('color', 'blue');
         gameOver = true;
         resetBoard();
       } else {
         player2Score = player2Score + 1;
         gameCounter = 0;
         $('#winner').text(`Congratulations ${$player2}!`);
         $('#winner').css('color', 'red');
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

//Gameplay - Cicking on the board
$('.grid').on('click', function() {
  setPlayers();
  checkCatGame();
  if ($(this).hasClass('X') !== true && $(this).hasClass('O') !== true) {
    if (player === 0) {
      $(this).text('X');
      $(this).addClass('X');
      if ($(this).hasClass('kitty') === true) {
        $('body').addClass('kitty');
        $(this).addClass('cat1');
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

//ATTEMPT AT BILL MURRAY VS CATS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// const resetBoard = function() {
//   $('.grid').removeClass('cat bill-murray');
//   $('.grid').text('');
//   gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
// }
//
// const checkWin = function () {
//  let $player1 = $('#player1').val();
//  let $player2 = $('#player2').val();
//  gameCounter = gameCounter + 1;
//  if (gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2] ||
//     gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5] ||
//     gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8] ||
//     gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6] ||
//     gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7] ||
//     gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8] ||
//     gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8] ||
//     gameBoard[6] === gameBoard[4] && gameBoard[6] === gameBoard[2]
//     ) {
//       if (player === 0) {
//         player1Score = player1Score + 1;
//         alert(`Congratulations ${$player1}! Current score is ${$player1}: ${player1Score} and ${$player2}: ${player2Score}. There have been ${tiedScore} ties.`);
//         gameCounter = 0;
//         resetBoard();
//       } else {
//         player2Score = player2Score + 1;
//         alert(`Congratulations ${$player2}! Current score is ${$player1}: ${player1Score} and ${$player2}: ${player2Score}. There have been ${tiedScore} ties.`);
//         gameCounter = 0;
//         resetBoard();
//       }
//  };
//  if (gameCounter === 9) {
//    tiedScore = tiedScore + 1;
//    gameCounter = 0;
//    alert(`It's a tie! Current score is ${$player1}: ${player1Score} and ${$player2}: ${player2Score}. There have been ${tiedScore} ties.`);
//    resetBoard();
//  }
// };
//
// $('.grid').on('click', function() {
//  if ($(this).hasClass('X') !== true && $(this).hasClass('O') !== true) {
//    if (player === 0) {
//      $(this).addClass('bill-murray');
//      let choice = gameBoard.indexOf($(this).attr('id'));
//      gameBoard[choice] = 'X';
//      checkWin();
//      player = 1;
//    } else {
//      $(this).addClass('cat');
//      let choice = gameBoard.indexOf($(this).attr('id'));
//      gameBoard[choice] = 'O';
//      checkWin();
//      player = 0;
//    }
//  }
// });
//
//
// });
//ATTEMPT AT AI\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// let player = 0;
//
// let gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
//
// let player1Score = 0;
// let player2Score = 0;
// let tiedScore = 0;
// let gameCounter = 0;
//
// let $player1 = '';
// let $player2 = '';
//
// $(document).ready(function() {
//
// const resetBoard = function() {
//   setTimeout(function() {
//     $('.grid').removeClass('X O cat1 cat2');
//     $('.grid').text('');
//     gameBoard = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
//   }, 1000);
// };
//
//
// const setPlayers = function() {
//   $player1 = $('#player1').val();
//   $player2 = $('#player2').val();
//   $('#winner').text('');
// }
//
// const checkCatGame = function () {
//   if ($player1 === 'Meow' && $player2 === 'Meow-Meow') {
//     $('#winner').addClass('cat-game');
//     $('#winner').html('<a href="cat-tic-tac-toe.html">Click here to play Meow-Meow-Meow<a>');
//   }
// }
//
// const checkWin = function () {
//   gameCounter = gameCounter + 1;
//   if (gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2] ||
//      gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5] ||
//      gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8] ||
//      gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6] ||
//      gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7] ||
//      gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8] ||
//      gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8] ||
//      gameBoard[6] === gameBoard[4] && gameBoard[6] === gameBoard[2]
//      ) {
//        if (player === 0) {
//          player1Score = player1Score + 1;
//          gameCounter = 0;
//          resetBoard();
//          $('#winner').text(`Congratulations ${$player1}!`);
//          $('#winner').css('color', 'blue');
//        } else {
//          player2Score = player2Score + 1;
//          gameCounter = 0;
//          resetBoard();
//          $('#winner').text(`Congratulations ${$player2}!`);
//          $('#winner').css('color', 'red');
//        }
//   };
//   if (gameCounter === 9) {
//     tiedScore = tiedScore + 1;
//     gameCounter = 0;
//     $('#winner').text(`Game is tied!`);
//     $('#winner').css('color', 'purple');
//     resetBoard();
//   }
//   $('#firstPlayer').text($player1 + ': ' + player1Score);
//   $('#secondPlayer').text($player2 + ': ' + player2Score)
//   $('#ties').text('Ties: ' + tiedScore);
// };
//
// const computerTurn = function() {
//   let number = Math.floor(Math.random() * 9);
//   let compChoice = gameBoard[number];
//   while (compChoice === 'X'|| compChoice === 'O') {
//     number = Math.floor(Math.random() * 9);
//     compChoice = gameBoard[number];
//   }
//   $(`#${compChoice}`).text('O');
//   $(`#${compChoice}`).addClass('O');
//   if ($(`#${compChoice}`).hasClass('kitty') === true) {
//     $(`#${compChoice}`).addClass('cat2');
//     $(`#${compChoice}`).text('');
//   }
//   gameBoard[number] = 'O';
//   checkWin();
//   player = 0;
// }
//
// //Gameplay - Cicking on the board
// $('.grid').on('click', function() {
//   setPlayers();
//   checkCatGame();
//   if ($(this).hasClass('X') !== true && $(this).hasClass('O') !== true) {
//     $(this).text('X');
//     $(this).addClass('X');
//     if ($(this).hasClass('kitty') === true) {
//       $(this).addClass('cat1');
//       $(this).text('');
//     }
//     let choice = gameBoard.indexOf($(this).attr('id'));
//     gameBoard[choice] = 'X';
//     checkWin();
//     player = 1;
//     computerTurn();
//   }
// });
//
// });
