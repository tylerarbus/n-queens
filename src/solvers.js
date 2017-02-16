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
  //create a new chess board with n rows
  var newBoard = new Board({n: n});
  var coordinates = this._boardIndex(n);
  var rooksOnBoard = 0;
  var solution = {};
  var foundSolution = false;
  
  var placeRooks = function(startCoordinate) {
    //put a rook down on the board, iterating through each start point
    if (foundSolution) {
      return;
    }
    for (var i = startCoordinate; i < coordinates.length; i++) {
      newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
      rooksOnBoard++;
      //check if rooks = n
      if (newBoard._numPieces() === n) {
        if (!newBoard.hasAnyRooksConflicts()) {
          $.extend(true, solution, newBoard);
          foundSolution = true;
          return;
        } else {
          newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
          rooksOnBoard--; 
        }  
      } else {
        //call recursion
        placeRooks(i + 1);
        newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
        rooksOnBoard--; 
      }
    }
  };
  placeRooks(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //create a new chess board with n rows
  var newBoard = new Board({n: n});
  var coordinates = this._boardIndex(n);
  var solutionCount = 0;
  
  var placeRooks = function(startCoordinate) {
    //put a rook down on the board, iterating through each start point
    for (var i = startCoordinate; i < coordinates.length; i++) {
      newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
      //check if rooks = n
      if (newBoard._numPieces() === n) {
        if (!newBoard.hasAnyRooksConflicts()) {
          solutionCount++;
          newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
        } else {
          newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
        }  
      } else {
        //call recursion
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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
