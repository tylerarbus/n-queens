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
  var newBoard = new Board({n: n});
  var solution = {};
  var foundSolution = false;
  
  var placeRooks = function(startCoordinate) {
    if (foundSolution) { return; }
    for (var i = startCoordinate; i < newBoard.coordinates().length; i++) {
      if (foundSolution) { return; }
      if (newBoard.rowsOccupied.indexOf(newBoard.coordinates()[i][0]) === -1 || newBoard.columnsOccupied.indexOf(newBoard.coordinates()[i][1]) === -1) {
        newBoard.toggle(i);
      } else { break; }
      if (newBoard.occupied === n) {
        if (!newBoard.hasAnyRooksConflicts()) {
          $.extend(true, solution, newBoard);
          foundSolution = true;
          return;
        } else { newBoard.toggle(i); }  
      } else {
        placeRooks(i + 1);
        newBoard.toggle(i);
      }
    }
  };
  placeRooks(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var newBoard = new Board({n: n});
  var solutionCount = 0;
  
  var placeRooks = function(startCoordinate) {
    for (var i = startCoordinate; i < newBoard.coordinates().length; i++) {
      if (newBoard.rowsOccupied.indexOf(newBoard.coordinates()[i][0]) === -1 || newBoard.columnsOccupied.indexOf(newBoard.coordinates()[i][1]) === -1) {
        newBoard.toggle(i);
      } else { continue; }
      if (newBoard.occupied === n) {
        if (!newBoard.hasAnyRooksConflicts()) {
          solutionCount++;
          newBoard.toggle(i);
        } else {
          newBoard.toggle(i);
        }  
      } else {
        placeRooks(i + 1);
        newBoard.toggle(i);
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
  var solution = {};
  var foundSolution = false;
  
  var placeQueens = function(startCoordinate) {
    if (foundSolution) { return; }
    for (var i = startCoordinate; i < newBoard.coordinates().length; i++) {
      if (foundSolution) { return; }
      if (newBoard.rowsOccupied.indexOf(newBoard.coordinates()[i][0]) === -1 || newBoard.columnsOccupied.indexOf(newBoard.coordinates()[i][1]) === -1) {
        newBoard.toggle(i);
      } else { continue; }
      if (newBoard.occupied === n) {
        if (!newBoard.hasAnyQueensConflicts()) {
          $.extend(true, solution, newBoard);
          foundSolution = true;
          return;
        } else { newBoard.toggle(i); }  
      } else {
        placeQueens(i + 1);
        newBoard.toggle(i);
      }
    }
  };
  placeQueens(0);
  if (!foundSolution) { solution = new Board({n: n}); }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var newBoard = new Board({n: n});
  var solutionCount = 0;
  
  var placeQueens = function(startCoordinate) {
    for (var i = startCoordinate; i < newBoard.coordinates().length; i++) {
      if (newBoard.rowsOccupied.indexOf(newBoard.coordinates()[i][0]) === -1 || newBoard.columnsOccupied.indexOf(newBoard.coordinates()[i][1]) === -1) {
        newBoard.toggle(i);
      } else { continue; }
      if (newBoard.occupied === n) {
        if (!newBoard.hasAnyQueensConflicts()) {
          solutionCount++;
          newBoard.toggle(i);
        } else {
          newBoard.toggle(i);
        }  
      } else {
        placeQueens(i + 1);
        newBoard.toggle(i);
      }
    }
  };
  placeQueens(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
