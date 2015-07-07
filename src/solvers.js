/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var addPiece = function(board, row, col) {
    board.togglePiece(row, col);
    if (! board.hasAnyRooksConflicts()) {
      if (row === n - 1) {
        return board;
      } else {
        return addPiece(board, row + 1, 0);
      }
    }
    board.togglePiece(row, col);
    col ++;
    if (col < n) {
      return addPiece(board, row, col);
    }
  }
  var solution = addPiece(new Board({n: n}), 0, 0);
  var results = [];
  for (var i = 0; i < n; i++) {
    results.push(solution.get(i));
  }
  solution = results;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var addPiece = function(board, row, col) {
    board.togglePiece(row, col);
    if (!board.hasAnyRooksConflicts()) {
      if (row === n - 1 && board !== undefined) {
        solutionCount++;
      } else {
        addPiece(board, row + 1, 0);
      }
    }
    board.togglePiece(row, col);
    col ++;
    if (col < n) {
      addPiece(board, row, col);
    }
  };
  if (n === 0) {
    solutionCount++;
  } else {
    addPiece(new Board({n: n}), 0, 0);
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  var solution = undefined; //fixme
  var addPiece = function(board, row, col) {
    board.togglePiece(row, col);
    var solutionBoard = undefined;
    if (! board.hasAnyQueensConflicts()) {
      if (row === n - 1) {
        solutionBoard = board;
      } else {
        solutionBoard = addPiece(board, row + 1, 0);
      }
    }
    if (solutionBoard !== undefined) {
      return solutionBoard;
    }
    board.togglePiece(row, col);
    col ++;
    if (col < n) {
      return addPiece(board, row, col);
    }
  }
  var solution = addPiece(new Board({n: n}), 0, 0) || new Board({n: n});
  var results = [];
  for (var i = 0; i < n; i++) {
    results.push(solution.get(i));
  }
  solution = results;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var addPiece = function(board, row, col) {
    board.togglePiece(row, col);
    if (!board.hasAnyQueensConflicts()) {
      if (row === n - 1 && board !== undefined) {
        solutionCount++;
      } else {
        addPiece(board, row + 1, 0);
      }
    }
    board.togglePiece(row, col);
    col ++;
    if (n % 2 === 0 && row === 0) {
      if (col < Math.floor(n / 2)) {
        addPiece(board, row, col);
      }
    } else if (col < n) {
      addPiece(board, row, col);
    }
  };
  if (n === 0) {
    solutionCount++;
  } else {
    addPiece(new Board({n: n}), 0, 0);
  }
  var evenAdjustment = (n > 0 && n % 2) === 0 ? 2 : 1;
  solutionCount *= evenAdjustment;
  // debugger;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
