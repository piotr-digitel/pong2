//engine for react component
class BallPos{
  constructor(x, y){
    this.x = x;          //   0 - 11 (board width) for ExampleInput2
    this.y = y;          //   0 - 15 (board hight)
  };
};

class Vector extends BallPos{
    constructor(x, y, r){
      super(x, y);
      this.r = r;        //   false/true
    };
};

class Ball{
    constructor(oldPos, newPos, vector){
      this.oldPos = oldPos;   //   x, y
      this.newPos = newPos;   //   x, y
      this.vector = vector;   //   x, y, bool
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
    }; 

    start(){
      this.ball.vector = this.willColide(this.ball.vector.x, this.ball.vector.y, this.ball.vector.r);
      this.ball.move();
      return ([this.ball.oldPos, this.ball.newPos, this.ball.vector]);
    };  
 
    willColide(vX, vY, randomMove){        
      if(this.board[this.ball.oldPos.y + vY][this.ball.oldPos.x] === 'X') vY *= -1;   //top-down
      if(this.board[this.ball.oldPos.y][this.ball.oldPos.x + vX] === 'X') vX *= -1;   //left-right
      if(this.board[this.ball.oldPos.y + vY][this.ball.oldPos.x + vX] === 'X') {      //corners
        vX *= -1; 
        vY *= -1;
      };

      if(randomMove){
        const randomXY = this.getRandomVector(this.ball.oldPos.x , this.ball.oldPos.y);
        vX = randomXY[0];
        vY = randomXY[1];
        randomMove = false;
      };

      if(this.board[this.ball.oldPos.y + vY][this.ball.oldPos.x + vX] === 'Y') {    //detect 'Y', in the next move chose random vector
        randomMove = true;
      }; 
      
      return {x: vX, y: vY, r: randomMove};      //vector is an object
    };

    getRandomVector(x, y){
      let possibleCorners =[];
      if(this.board[y-1][x-1] === '0') possibleCorners.push([-1, -1]);    //can we go to upper left
      if(this.board[y-1][x+1] === '0') possibleCorners.push([1, -1]);     //             upper right
      if(this.board[y+1][x-1] === '0') possibleCorners.push([1, 1]);      //             down right
      if(this.board[y+1][x+1] === '0') possibleCorners.push([-1, 1]);     //             down left
      const randomIndex = Math.floor(Math.random() * possibleCorners.length);  //  from 0 to max possible corners
      return possibleCorners[randomIndex];
    };
};
  
function getBall(board, vector){
    // creates ball object 
    // initial position from ExamInput2 - find digit "1" in pased board (array of arrays)
    // return ball with old, new possition and vector
    let posX = 0;
    let posY = 0;
    for(let i = 0; i  < board.length; i++){
        if(posX < board[i].indexOf("1")) {
            posX = board[i].indexOf("1");
            posY = i;
        };
    };

    const newVector = new Vector(...vector);
    const oldPos = new BallPos(posX, posY);               //initially both pos: new & old are the same
    const newPos = new BallPos(posX, posY);
    const ball = new Ball(oldPos, newPos, newVector);
    return ball;
};
  
export default function GameEngine(board, vector) {      //board and vector from parent - only parent can change the board!
  const game = new Game(getBall(board, vector), board); 
  const newBoard = game.start();
  //console.table(newBoard);
  return (newBoard);     // {{oldX, oldY}, {newX, newY}, {vX, vY, r}}
};