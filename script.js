// Game logic

var board = [
  ["","",""],
  ["","",""],
  ["","",""]
];

var player, sqrId, user, computer, row, col;
const ARR_LENGTH = 3;

let TicTacGame = {

  // Class property

  // Matrix for game
  boarder: [],

  // Matrix row length
  row: ARR_LENGTH,

  // Matrix column length 
  col: ARR_LENGTH,



  // Class methods
  // init class depends on user select.
  startGame() {
    // Here must init boarder matrix to 9
    // and if necessary anther variables
  },

  // check if matrix cell empty
  isMatrixCellEmpty() {
    // with argument x and y must check in matrix 
    // empty cell or not
  },

  // Draw in Matrix
  drawCell() {
    // depends on argument must be current
    // div add O or X 
  },

  // Reset Game (Matrix)
  resetGame() {
    // init 9 matrix
    // remove html tag values
  },

  // Method for check if winner exists in game
  checkGameWinner() {
    // foreach matrix and check
    // if have winner
  },

  // Game next step for border event 
  playerNextStep() {
    // js boarder event must call this function
    // and after check do what necessary.
  },

  computerNextStep() {
    // After user play must play computer
  },

  // Getting computer next logic i,j
  getComputerPosition() {
    // Here must be main logic
    // For 
  }
}
$(document).ready(function() {
  //1 check-box event listener
  $(".check-box").click(function() {
    console.log( $(this) );
    if($(this).is(":checked")) {
      user = $(this).val();
      player = user;
      computer = (user == 'X') ? 'O' : 'X';
    }
  });

  $(".square").click(function() {
        sqrId = $(this).attr("id");
        playerMove();


        //Checks Win or Not
          if(checkWinner()) {
            alert(player + " Win the game");
          }

          else
          {
            if(!isDraw()) {
            alert("It's a draw!");
          }
            else {
              computerAI();
              if(checkWinner()) {
                alert(computer + " Win the game");
              }
             }
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
  sqrId = random;
  row = getRow();
  col = getCol();
  board[row][col] = computer;
}



//Checking for draw
function isDraw() {
    for (var  i = 0; i < ARR_LENGTH; i++) {
      for (var j = 0; j< board[i].length; j++) {
        if(board[i][j] == "" ) return true;

      }
    }
    return false;
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
  $(".check-box").prop("checked", false);
  user = "";
  player = "";
  computer = "";
  for(var i = 0; i < ARR_LENGTH; i++) {
    for (var  j = 0; j< board[i].length; j++)
    {
        board[i][j] = "";
    }

  }
}
