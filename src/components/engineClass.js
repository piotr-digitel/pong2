
class Vector{
    constructor(x, y){
      this.x = x; //   -1 / 1
      this.y = y; //   -1 / 1
    };
};

class BallPos{
  constructor(x, y){
    this.x = x; //   0 - 11 (board width)
    this.y = y; //   0 - 15 (board hight)
  };
};
  
class Ball{
    constructor(oldPos, newPos, vector){
      this.oldPos = oldPos;   //   x, y
      this.newPos = newPos;   //   x, y
      this.vector = vector;   //   x, y
    };  
    move(){
      this.newPos.x += this.vector.x;
      this.newPos.y += this.vector.y;
    };
};
  
class Game {
    constructor(ball, board){
      this.ball = ball;    
      this.board = board;
    }  

    start(){
        this.makeMove();
        
        //return ([this.board, this.vector]);

        //console.table(this.ball.vector);

        return ([this.ball.oldPos, this.ball.newPos, this.ball.vector]);
    };  
 
    makeMove(){
      if (this.willColideOnYAxis()) this.ball.vector.y *= -1;
      if (this.willColideOnXAxis()) this.ball.vector.x *= -1;    
      console.log("x: " + this.ball.vector.x + ", y: " + this.ball.vector.x);
      this.ball.move();
    };

    willColideOnYAxis(){
      // return true if collision in next move on Y axis
      // return false otherwise
      //if(this.ball.oldPos.y===0 || this.ball.oldPos.y===9) return true;
      
      console.log("tył: " + this.board[this.ball.oldPos.y-1][this.ball.oldPos.x-1]);
      console.log("przód: " + this.board[this.ball.oldPos.y+1][this.ball.oldPos.x+1]);

      //if(this.board[this.ball.oldPos.y-1][this.ball.oldPos.x-1] === 'X' || this.board[this.ball.oldPos.y+1][this.ball.oldPos.x+1] === 'X') return true;

      if(this.board[this.ball.oldPos.y-1][this.ball.oldPos.x-1] === 'X' ) return true;

      return false;
    } 

    willColideOnXAxis(){
      // return true if collision in next move on X axis
      // return false otherwise
      if(this.board[this.ball.oldPos.y-1][this.ball.oldPos.x-1] === 'X' || this.board[this.ball.oldPos.y+1][this.ball.oldPos.x+1] === 'X') return true;


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
    };
    //console.log("x: " + posX + " y: " + posY);
    //find vector - look left if there is "0" then on the right is a fence - must change vector X (for Y the same)
    let vectorX = vector[0];
    let vectorY = vector[1];
    //if (board[posY-1][posX]==="0") vectorY *= -1;
    //if (board[posY][posX-1]==="0") vectorX *= -1;

    let newVector = new Vector(vectorX, vectorY);
    let oldPos = new BallPos(posX, posY);         //initial - both pos are the same
    let newPos = new BallPos(posX, posY);

    let ball = new Ball(oldPos, newPos, newVector);
    //console.table(ball);
    return ball;
};
  

export default function GameEngine(board, vector) {                  //board and vector from parent - parent changes board
  let game = new Game(getBall(board, vector), board); 
  let newBoard = game.start();
  //console.table(newBoard);
  //return ([newBoard.oldPos, newBoard.newPos, newBoard.newVector]);   // [[oldX,oldY],[newX,newY],[vX,vY]]
  return (newBoard);
};

