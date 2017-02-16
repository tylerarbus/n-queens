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
  var newBoard = new Board({n : n});
  var coordinates = this._boardIndex(n);
  var rooksOnBoard = 0;

  //put a rook down on the board, iterating through each start point
  for (var i = 0; i < coordinates.length; i++) {
    newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
    rooksOnBoard++;

    //check if rooks = n
    if (rooksOnBoard === n) {
      if (!newBoard.hasAnyRooksConflicts()){
        console.log('Single solution for ' + n + ' rooks:', JSON.stringify(newBoard));
        return newBoard;
      }
    } //if not enough rooks on board, then
    else {
      //call recursion
    }
    //end of iterator
    newBoard.togglePiece(coordinates[i][0], coordinates[i][1]);
  }


    //place another rook on all the next possible spots
        //repeat for n rooks
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

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
