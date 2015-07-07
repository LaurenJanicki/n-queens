var Board = function () {

};

Board.prototype.hasVerticalConflict = function (rowToCheck) {
  for (var i = 0; i < rowToCheck; i++) {
    if (this[i] === this[rowToCheck]) return true;
  }
  return false;
};

Board.prototype.togglePiece = function (row, col) {
  this[row] = this[row] ? 0 : Math.pow(2, col);
};

Board.prototype.toMatrix = function (n) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix[i] = [];
    index = Math.log(this[i]) / Math.log(2);
    index = n - index - 1;
    for (var j = 0; j < n; j++) {
      if (j === index) matrix[i].push(1);
      else matrix[i].push(0);
    }
  }
  return matrix;
};

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var addPiece = function(board, row, col) {
    board.togglePiece(row, n - col - 1);
    if (!board.hasVerticalConflict(row)) {
      if (row === n - 1) {
        return board;
      } else {
        return addPiece(board, row + 1, 0);
      }
    }
    board.togglePiece(row, n - col - 1);
    col ++;
    if (col < n) {
      return addPiece(board, row, col);
    }
  };
  solution = addPiece(new Board(), 0, 0);
  return solution.toMatrix(n);
};

window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var addPiece = function(board, row, col) {
    board.togglePiece(row, n - col - 1);
    if (!board.hasVerticalConflict(row)) {
      if (row === n - 1 && board !== undefined) {
        solutionCount++;
      } else {
        addPiece(board, row + 1, 0);
      }
    }
    board.togglePiece(row, n - col - 1);
    col ++;
    if (col < n) {
      addPiece(board, row, col);
    }
  };
  if (n === 0) {
    solutionCount++;
  } else {
    addPiece(new Board(), 0, 0);
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};