
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
}
  
class Game {
    constructor(ball, board){
      this.ball = ball;
      this.board = board;
    }  

    start(vector){
        this.makeMove();
        
        return ([this.board, this.vector]);
    };  
 
    makeMove(){
      if (this.willColideOnYAxis()) this.ball.vector.y *= -1;
      if (this.willColideOnXAxis()) this.ball.vector.x *= -1;    
      this.ball.move();
    };

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
  
function getBall(board, vector){
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
        };
        console.log("x: " + posX + " y: " + posY);
    };
    //find vector - look left if there is "0" then on the right is a fence - must change vector X (for Y the same)
    let vectorX = vector[0];
    let vectorY = vector[1];
    if (board[posY-1][posX]==="0") vectorY *= -1;
    if (board[posY][posX-1]==="0") vectorX *= -1;

    let newVector = new Vector(vectorX, vectorY);
    let ball = new Ball(posX, posY, newVector);
    return ball;
};
  

export default function GameEngine(board, vector) {
  let game = new Game(getBall(board, vector), board);
  let newBoard = game.start(vector);
  //return ([newBoard.board, newBoard.vector]);
  return (newBoard);
};

