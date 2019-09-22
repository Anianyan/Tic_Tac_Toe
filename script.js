// Game logic
// Used pure javascript
"use strict";

var player, sqrId, user, computer, row, col;
const ARR_LENGTH = 3;

const TicTacGame = {

  // Class properties

  // Matrix for game
  border: [],

  // Matrix row length
  borderRow: 0,

  // Matrix column length
  borderCol: 0,

  // Computer sign(x|o).
  computer: '',

  // User selected sign(x|o).
  player: '',

  // Class methods

  // init class depends on user select.
  startGame (player) {
    this.borderRow = 3;
    this.borderCol = 3;
    this.player = player;
    this.computer = this.player === 'x' ? 'y' : 'x';
    // Init empty border for start game.
    for (let i = 0; i < this.borderRow; i++) {
      this.border[i] = [];
      for (let j = 0; j < this.borderCol; j++) {
        this.border[i][j] = '';
      }
    }
    return this;
  },

  // check if matrix cell empty
  isMatrixCellEmpty (row, col) {
    // with argument x and y must check in matrix
    // empty cell or not
  },

  // Draw in Matrix
  drawCell () {
    // depends on argument must be current
    // div add O or X
  },

  // Reset Game (Matrix)
  resetGame () {
    // init 9 matrix
    // remove html tag values
  },

  // Method for check if winner exists in game
  checkGameWinner () {
    // foreach matrix and check
    // if have winner
  },

  // Game next step for border event
  playerNextStep (event) {
    // js boarder event must call this function
    // and after check do what necessary.
    const playerSelectedId = event.target.id;
    // Get matrix position from tag id.
    const parts = playerSelectedId.split('-');
    const row = parseInt(parts[0]);
    const col = parseInt(parts[1]);
    // Here was problem with object this  
    if (this.isMatrixCellEmpty(row, col)) {

    }
  },

  computerNextStep () {
    // After user play must play computer
  },

  // Getting computer next logic i,j
  getComputerPosition () {
    // Here must be main logic
    // For
  }

}

// Add event listeners

// for user selected X or Y.
document.getElementsByClassName('select-player')[0].addEventListener('click', handleSelectedXorY)

function handleSelectedXorY () {
  const radioXInput = document.getElementById('select-x');
  const radioYInput = document.getElementById('select-y');
  let isChecked = false;
  let player = '';

  if (radioXInput.checked) {
    player = 'x';
    isChecked = true;
  }

  if (radioYInput.checked) {
    player = 'y';
    isChecked = true;
  }

  if (isChecked) {
    radioXInput.disabled = true;
    radioYInput.disabled = true;
    // Start game.
    const game = TicTacGame.startGame(player);

    // Handle when user selected next play.
    const squares = document.getElementsByClassName('square');
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', game.playerNextStep.call(game, event));
    }
  }
}
