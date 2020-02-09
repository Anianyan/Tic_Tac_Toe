// Tic Tac Toe Game
// Used pure javascript
"use strict";

/**
 * TicTacGame object
 */
const TicTacGame = {

  /** Object properties. */

  /** Matrix for store steps. */
  border: [],

  /** Matrix row length. */
  borderRow: 0,

  /** Matrix column length. */
  borderCol: 0,

  /** Computer sign (x|o). */
  computer: '',

  /** User selected sign (x|o). */
  player: '',

  /** Draw value. */
  tie_val: '',

  /** Player current step row. */
  playerCurrentRow: 0,

  /** Player current step col. */
  playerCurrentCol: 0,

  /** Object methods. */

  /**
   * Init Object
   *
   * @param {string} player player selected sign (x|o). 
   */
  startGame (player) {
    this.borderRow = 3;
    this.borderCol = 3;
    this.tie_val = 0;
    this.player = player;
    this.computer = this.player === 'x' ? 'o' : 'x';
    /** Init empty matrix. */
    for (let i = 0; i < this.borderRow; i++) {
      this.border[i] = [];
      for (let j = 0; j < this.borderCol; j++) {
        this.border[i][j] = '';
      }
    }
    return this;
  },

  /**
   * Game progress.
   * @param {string} playerPosition user selected position.
   */
  gameNextStep (playerPosition) {
    this.playerNextStep(playerPosition);
    let winner = this.checkGameWinner();
    if (winner === this.player) {
      // Salute!!!
      alert('You win the game');
    }

    this.computerNextStep();
    if (this.checkGameWinner() === this.computer) {
      // Salute!!!
      alert('The computer win the game');
    }

    /** Check game draw case */
    if (this.isTieGame()) {
      alert('The game is draw.');
    }
  },

  /**
   * Check if matrix cell is empty.
   *
   * @param {int} row 
   * @param {int} col 
   */
  isMatrixCellEmpty (row, col) {
    return this.border[row][col] === '' ? true: false;
  },

  /**
   * Draw sign in matrix.
   *
   * @param {int} row 
   * @param {int} col 
   * @param {string} sign 
   */
  drawCell (row, col, sign) {
    this.border[row][col] = sign;
    let positionId = row + '-' +col;
    document.getElementById(positionId).innerText = sign;
  },

  /**
   * Reset Game (Matrix).
   */
  resetGame () {
    // init 9 matrix
    // remove html tag values
  },

  /**
   * Method for check if winner exists in game.
   *
   * @param {array} border  
   */
  checkGameWinner (border = []) {
    /** Check if is clone of object matrix. */
    if (border.length === 0) {
      border = this.border;
    }
    let winner = '';
    /** Loop through the rows and the columns. */
    for (let i = 0; i < this.borderRow; i++) {

      /** Row */
      if (this.isVariablesEqual(border[i][0], border[i][1], border[i][2] )) {
        winner = border[i][0];
      }

      /** Columns */
      if (this.isVariablesEqual(border[0][i], border[1][i], border[2][i])) {
        winner = border[0][i];
      }
    }

    /** Check diagonals. */
    if (this.isVariablesEqual(border[0][0], border[1][1], border[2][2])) {
      winner = border[0][0];
    }

    if (this.isVariablesEqual(border[0][2], border[1][1], border[2][0])) {
      winner = border[0][2];
    }

    return winner;
  },

  /**
   * Check if 3 variables are equal.
   *
   * @param {string} a 
   * @param {string} b 
   * @param {string} c 
   */
  isVariablesEqual( a, b, c ) {
    return a !== '' && a === b && b === c;
  },

  /**
   * Player step.
   *
   * @param {string} playerSelectedId Tag id
   */
  playerNextStep (playerSelectedId) {
    /** Get matrix position from tag id. */
    const parts = playerSelectedId.split('-');
    this.playerCurrentRow = parseInt(parts[0]);
    this.playerCurrentCol = parseInt(parts[1]);

    if (this.isMatrixCellEmpty(this.playerCurrentRow, this.playerCurrentCol)) {
      this.drawCell(this.playerCurrentRow, this.playerCurrentCol, this.player);
    }
  },

  /**
   * Check if game is draw
   *
   * @param {array} border
   */
  isTieGame (border = []) {
    if ( border.length === 0 ) {
      border = this.border;
    }
    let emptyCellsCount = 0;
    for (let i = 0; i < this.borderCol; i++) {
      for (let j = 0; j < this.borderRow; j++) {
        if (border[i][j] === '') {
          emptyCellsCount++;
        }
      }
    }
    if (emptyCellsCount === 0) {
      return 'tie';
    }
  },

  /**
   * Computer step.
   */
  computerNextStep () {
    let cloneBorder = JSON.parse(JSON.stringify(this.border));

    /** Get AI best move. */
    let bestMove = this.getBestMove(this.computer, cloneBorder);
    console.log(bestMove);
    this.drawCell(bestMove.row, bestMove.col, this.computer);
  },

  /**
   * Returns the best move the maximizer can make
   *
   * @param {string} player The player sign. 
   * @param {array} border Clone of real boarder. 
   */
  getBestMove (player, border) {

    let bestMove = {};
    let bestScore = -Infinity;
    let score = -Infinity;

    for (let i = 0; i < this.borderRow; i++) {
      for (let j = 0; j < this.borderCol; j++) {
        if (this.isMatrixCellEmpty(i, j)) {

          border[i][j] = player;
          score = this.minimax(border, false);
          border[i][j] = '';

          if (score > bestScore) {
            bestScore = score;
            bestMove = {
              'row': i,
              'col': j,
            }
          }

        }
      }
    }
    return bestMove;
  },

  /**
   * Get each computer step score.
   *
   * @param {array} border 
   * @param {bool} maximizer 
   */
  minimax(border, maximizer) {
    /** Base case for recursive. */
    let winner = this.checkGameWinner(border);
    if ( winner === this.computer ) {
      return 10;
    } else if (winner === this.player) {
      return -10;
    } else if (this.isTieGame(border)) {
      return 0;
    }

    /** Maximizer(computer) move. */
    if (maximizer) {
      let bestScore = -Infinity;
      for (let i = 0; i < this.borderRow; i++) {
        for (let j = 0; j < this.borderCol; j++) {
          if (border[i][j] === '') {
            
            border[i][j] = this.computer;

            bestScore = Math.max(bestScore, this.minimax(border, false));

            border[i][j] = '';
          }
        }
      }
      /** End maximizer loop. */
      return bestScore;

    } else {
      /** Minimizer move. */
      let bestScore = Infinity;
      for (let i = 0; i < this.borderRow; i++) {
        for (let j = 0; j < this.borderCol; j++) {
          if (border[i][j] === '') {
            
            border[i][j] = this.player;

            bestScore = Math.min(bestScore, this.minimax(border, true));

            border[i][j] = '';
          }
        }
      }

      /** End minimizer loop. */
      return bestScore;
    }

  }

}

/**
 * Add event listeners
 * for user selected X or Y.
 */
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
    /** Start game. */
    const game = TicTacGame.startGame(player);

    /** Handle when user selected correct position. */
    const squares = document.getElementsByClassName('square');
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', function() {
        const position = event.target.id;
        /** Handle player & computer steps */
        game.gameNextStep(position);
      });
    }
  }
}
