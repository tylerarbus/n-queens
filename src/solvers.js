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

window._boardIndex = function(n) {
  var output = [];
  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      output.push([r, c]);
    }
  }
  return output;
};

window.findNRooksSolution = function(n) {
  var newBoard = new Board({n: n});
  var coordinates = this._boardIndex(n);
  var solution = {};
  var foundSolution = false;
  var columnsOccupied = [];
  var rowsOccupied = [];

  var toggle = function(coordinate) {
    var row = coordinates[coordinate][0];
    var column = coordinates[coordinate][1];
    newBoard.togglePiece(row, column);
    if (newBoard.get(row)[column] === 1) {
      columnsOccupied.push(column);
      rowsOccupied.push(row);
    } else {
      columnsOccupied.splice(columnsOccupied.indexOf(column), 1);
      rowsOccupied.splice(rowsOccupied.indexOf(row), 1);
    }
  };
  
  var placeRooks = function(startCoordinate, columnsOccupied, rowsOccupied) {
    if (foundSolution) {
      return;
    }
    for (var i = startCoordinate; i < coordinates.length; i++) {
      if (foundSolution) {
        return;
      }
      //
      if (rowsOccupied.indexOf(coordinates[i][0]) === -1 || columnsOccupied.indexOf(coordinates[i][1]) === -1) {
        toggle(i);
      } else {
        break;
      }
      if (newBoard._numPieces() === n) {
        if (!newBoard.hasAnyRooksConflicts()) {
          $.extend(true, solution, newBoard);
          foundSolution = true;
          return;
        } else {
          toggle(i);
        }  
      } else {
        placeRooks(i + 1, columnsOccupied, rowsOccupied);
        toggle(i);
      }
    }
  };
  placeRooks(0, columnsOccupied, rowsOccupied);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var newBoard = new Board({n: n});
  var coordinates = this._boardIndex(n);
  var solutionCount = 0;
  
  var placeRooks = function(startCoordinate) {
    for (var i = startCoordinate; i < coordinates.length; i++) {
      newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
      if (newBoard._numPieces() === n) {
        if (!newBoard.hasAnyRooksConflicts()) {
          solutionCount++;
          newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
        } else {
          newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
        }  
      } else {
        placeRooks(i + 1);
        newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
      }
    }
  };
  placeRooks(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var newBoard = new Board({n: n});
  var coordinates = this._boardIndex(n);
  var solution = {};
  var foundSolution = false;
  
  var placeQueens = function(startCoordinate) {
    if (foundSolution) {
      return;
    }
    for (var i = startCoordinate; i < coordinates.length; i++) {
      if (foundSolution) {
        return;
      }
      newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
      if (newBoard._numPieces() === n) {
        if (!newBoard.hasAnyQueensConflicts()) {
          $.extend(true, solution, newBoard);
          foundSolution = true;
          return;
        } else {
          newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
        }  
      } else {
        placeQueens(i + 1);
        newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
      }
    }
  };
  placeQueens(0);
  if (!foundSolution) {
    solution = new Board({n: n});
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var newBoard = new Board({n: n});
  var coordinates = this._boardIndex(n);
  var solutionCount = 0;
  
  var placeQueens = function(startCoordinate) {
    for (var i = startCoordinate; i < coordinates.length; i++) {
      newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
      if (newBoard._numPieces() === n) {
        if (!newBoard.hasAnyQueensConflicts()) {
          solutionCount++;
          newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
        } else {
          newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
        }  
      } else {
        placeQueens(i + 1);
        newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
      }
    }
  };
  placeQueens(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
