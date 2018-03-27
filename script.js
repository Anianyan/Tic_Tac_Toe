var board = [
  ["","",""],
  ["","",""],
  ["","",""]
];

var player, sqrId, user, computer, row, col;
const ARR_LENGTH = 3;

$(document).ready(function() {
  //1 checkbox event listener
  $(".checkBox").click(function() {
    if($(this).is(":checked")) {
      user = $(this).val();
      player = user;
      computer = (user == 'X') ? 'O' : 'X';

    }
  });

  $(".square").click(function() {
        sqrId = $(this).attr("id");
        playerMove();
        computerAI();

        //Checks Win or Not
          if(checkWinner()) {
            alert(player + " Win the game");
          }

          if(isDraw()) {
            alert("It's a draw!");
          }
        });

    $(".reset").click(function() {
    resetBoard();
    });


});

//player move
function playerMove() {

      if($("#" + sqrId).text() == "") {
            $('#'+sqrId).text(player);
            row = getRow();
            col = getCol();
            board[row][col] = player;

            console.log(board);
      }
      else {
        alert("Wrong move");
      }
}

// computer play: random number between 0 -- 8
function computerAI() {
  var random;
  var min = 0, max = 8;
  do {
    random  = Math.floor(Math.random() * (max + min));
  } while ($("#" + random).text() != "");
  $("#" + random).text(computer);
  row = getRow();
  col = getCol();
  board[row][col] = computer;
}



//Checjing for draw
function isDraw() {
    for (var  i = 0; i < ARR_LENGTH; i++) {
      for (var j = 0; j< board[i].length; j++) {
        if(board[i][j] == "" ) return false;

      }
    }
    return true;
}


function getCol(){
  return sqrId % ARR_LENGTH;
}

function getRow(){
  return Math.floor(sqrId / ARR_LENGTH);
}

function checkWinner() {
  //checked rows
  for (var i = 0; i<ARR_LENGTH; i++){
    if(board[i][0] != "" && board[i][0] == board[i][1] && board[i][1] == board[i][2])
    return true;
  }
  //checked Columns
  for( var i = 0; i<ARR_LENGTH; i++)
  {
    if (board[0][i] != "" && board[0][i] == board[1][i] && board[1][i] == board[2][i])
    return true;
  }
  //checked diagonals
  if(board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] ==board[2][2]) return true;

  if(board[0][2] != "" && board[0][2] == board[1][1] && board[1][1] ==board[2][0]) return true;

  //Nobady Win
  return false;

}
//
//Reset board
function resetBoard() {
  $(".square").text("");
  $(".checkBox").prop("checked", false);
  user = "";
  player = "";
  computer = "";
  for(var i = 0; i < ARR_LENGTH; i++) {
    for (var  j = 0; j< ARR_LENGTH; j++)
    {
        board[i][j] = "";
    }

  }
}
