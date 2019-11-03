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

  // Player current step row.
  playerCurrentRow: 0,

  // Player current step col.
  playerCurrentCol: 0,

  // Class methods

  // init class depends on user select.
  startGame (player) {
    this.borderRow = 3;
    this.borderCol = 3;
    this.player = player;
    this.computer = this.player === 'x' ? 'o' : 'x';
    // Init empty border.
    for (let i = 0; i < this.borderRow; i++) {
      this.border[i] = [];
      for (let j = 0; j < this.borderCol; j++) {
        this.border[i][j] = '';
      }
    }
    return this;
  },

  gameNextStep (playerPosition) {
    this.playerNextStep(playerPosition);
    if (this.checkGameWinner()) {
      // Salute!!!
      alert('You win the game');
    }

    this.computerNextStep();
    if (this.checkGameWinner()) {
      // Salute!!!
      alert('Computer win the game');
    }
  },

  // check if matrix cell empty
  isMatrixCellEmpty (row, col) {
    if(this.border[row][col] === '') {
      return true;
    }
    return false;
  },

  // Draw in Matrix
  drawCell (row, col, sign) {
    // depends on argument must be current
    // div add O or X
    this.border[row][col] = sign;
    let positionId = row + '-' +col;
    document.getElementById(positionId).innerText = sign;
  },

  // Reset Game (Matrix)
  resetGame () {
    // init 9 matrix
    // remove html tag values
  },

  // Method for check if winner exists in game
  checkGameWinner () {
    // Loop through the rows and the columns.
    for (let i = 0; i < this.borderRow; i++) {

      // Row
      if (this.border[i][0] !== '' && this.border[i][0] === this.border[i][1] && this.border[i][1] === this.border[i][2]) {
        return true;
      }

      // Columns
      if (this.border[0][i] !== '' && this.border[0][i] === this.border[1][i] && this.border[1][i] === this.border[2][i]) {
        return true;
      }
    }

    // Check diagonals
    if (this.border[0][0] !== '' && this.border[1][1] === this.border[0][0] && this.border[0][0] === this.border[2][2]) {
      return true;
    }

    if (this.border[0][2] !== '' && this.border[0][2] === this.border[1][1] && this.border[0][2] === this.border[2][0]) {
      return true;
    }

    return false;
  },

  // Game next step for border event
  playerNextStep (playerSelectedId) {
    // Get matrix position from tag id.
    const parts = playerSelectedId.split('-');
    this.playerCurrentRow = parseInt(parts[0]);
    this.playerCurrentCol = parseInt(parts[1]);

    if (this.isMatrixCellEmpty(this.playerCurrentRow, this.playerCurrentCol)) {
      this.drawCell(this.playerCurrentRow, this.playerCurrentCol, this.player);
    }
  },

  computerNextStep () {
    // After user play must play computer
    let positions = this.getComputerNextPosition();
  },

  // Getting computer next logic i,j
  getComputerNextPosition () {
    // Here must be main logic

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
    player = 'o';
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
      squares[i].addEventListener('click', function() {
        const position = event.target.id;
        // Handle player step and computer step
        game.gameNextStep(position);
      });
    }
  }
}
