const {board} = require('./ExamInput.js');   //CommonJS

// const board = [
//     ["X", "X", "X", "X", "X", "X", "X"],
//     ["X", "1", "0", "0", "0", "0", "X"],
//     ["X", "0", "0", "0", "0", "0", "X"],
//     ["X", "0", "0", "0", "0", "0", "X"],
//     ["X", "0", "0", "0", "0", "0", "X"],
//     ["X", "0", "0", "0", "0", "0", "X"],
//     ["X", "0", "0", "0", "0", "0", "X"],
//     ["X", "0", "0", "0", "0", "0", "X"],
//     ["X", "0", "0", "0", "0", "0", "X"],
//     ["X", "X", "X", "X", "X", "X", "X"]
//   ];

class Vector{
    constructor(x,y){
      this.x =x; // -1 / 1
      this.y =y; // -1 / 1
    }
}
  
class Ball{
    constructor(x,y,vector){
      this.x =x;
      this.y =y;
      this.vector = vector;
    }  
    move(){
      this.x += this.vector.x;
      this.y += this.vector.y;
    }
}// State: 0-stop, 1 - active, 2 - ended
  
class Game {
    constructor(ball, board){
      this.ball = ball;
      this.board = board;
      this.state = 0;
      this.startingX = ball.x;
      this.startingY = ball.y;
      this.countMoves = 0;
    }  
    start(){
      this.state =1;    
      do{
        this.makeMove();
        console.log("Move nr: " + this.countMoves + "  X: " + this.ball.x + " , Y: " + this.ball.y + "  v(" + this.ball.vector.x + "," + this.ball.vector.y + ")");
      } 
      while(!this.isBallOnStartingPosition()) 
      this.state =2;
    }  
    isBallOnStartingPosition(){
      // check if ball is back on starting possition; if so return true;
      if(this.ball.x === this.startingX && this.ball.y === this.startingY) return true;
      return false;
    }  
    makeMove(){
      if (this.willColideOnYAxis()) this.ball.vector.y *= -1;
      if (this.willColideOnXAxis()) this.ball.vector.x *= -1;    
      this.ball.move();
      this.countMoves++;
    }  
    willColideOnYAxis(){
      // return true if collision in next move on Y axis
      // return false otherwise
        if(this.ball.y===0 || this.ball.y===9) return true;
        return false;
    }  
    willColideOnXAxis(){
      // return true if collision in next move on X axis
      // return false otherwise
      if(this.ball.x===0 || this.ball.x===6) return true;
      return false;
    }
}
  
function getBall(board){
    // creates ball object based on passed board
    // based on board state craete ball
    // return ball with correct possition and vector
    //read initial position from ExamInput - find digit "1" in array of arrays
    let posX = 0;
    let posY = 0;
    for(let i = 0; i  < board.length; i++){
        if(posX < board[i].indexOf("1")) {
            posX = board[i].indexOf("1");
            posY = i;
        }
    }
    //find vector - look left if there is "0" then on the right is a fence - must czange vector X (for Y the same)
    let vectorX = 1;
    let vectorY = 1;
    if (board[posY-1][posX]==="0") vectorY *= -1;
    if (board[posY][posX-1]==="0") vectorX *= -1;

    let vector = new Vector(vectorX, vectorY);
    let ball = new Ball(posX, posY, vector);
    return ball;
}
  
let game = new Game(getBall(board), board);
game.start();