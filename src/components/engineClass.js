
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
     // console.log("x: " + this.vector.x + ", y: " + this.vector.y);
    };
};
  
class Game {
    constructor(ball, board){
      this.ball = ball;    
      this.board = board;
    }; 

    start(){
      this.ball.vector = this.willColide(this.ball.vector.x, this.ball.vector.y);

      //console.log("x: " + this.ball.vector.x + ", y: " + this.ball.vector.y + " - cel: " + this.board[this.ball.oldPos.y + this.ball.vector.y][this.ball.oldPos.x + this.ball.vector.x]);

      this.ball.move();
      return ([this.ball.oldPos, this.ball.newPos, this.ball.vector]);
    };  
 
    willColide(vX, vY){
      if(this.board[this.ball.oldPos.y + vY][this.ball.oldPos.x] === 'X') vY *= -1; //top-down
      if(this.board[this.ball.oldPos.y][this.ball.oldPos.x + vX] === 'X') vX *= -1; //left-right
      if(this.board[this.ball.oldPos.y + vY][this.ball.oldPos.x + vX] === 'X') {    //corners
        vX *= -1; 
        vY *= -1;
      };
      if(this.board[this.ball.oldPos.y + vY][this.ball.oldPos.x + vX] === 'Y') {    //detect 'Y', after calculating new vector
        //console.log("YYYYY");
        const randomXY = this.getRandomVector();
        vX = randomXY[0];
        vY = randomXY[1];
      };     

      return {x: vX, y: vY};      //vector is an object
    };

    getRandomVector(){
      let possibleCorners =[];
      if(1)possibleCorners.push([-1, -1]); //upper left
      if(1)possibleCorners.push([1, -1]);  //upper right
      if(1)possibleCorners.push([1, 1]);   //down right
      if(1)possibleCorners.push([-1, 1]);  //down left
      let randomIndex = Math.floor(Math.random() * 4);  //   0-3
      return possibleCorners[randomIndex];
    };

};
  
function getBall(board, vector){
    // creates ball object 
    // initial position from ExamInput - find digit "1" in pased board (array of arrays)
    // return ball with old, new possition and vector
    let posX = 0;
    let posY = 0;
    for(let i = 0; i  < board.length; i++){
        if(posX < board[i].indexOf("1")) {
            posX = board[i].indexOf("1");
            posY = i;
        };
    };

    let newVector = new Vector(vector[0], vector[1]);
    let oldPos = new BallPos(posX, posY);              //initially both pos: new & old are the same
    let newPos = new BallPos(posX, posY);
    let ball = new Ball(oldPos, newPos, newVector);
    //console.table(ball);
    return ball;
};
  
export default function GameEngine(board, vector) {     //board and vector from parent - only parent can change the board!
  let game = new Game(getBall(board, vector), board); 
  let newBoard = game.start();
  return (newBoard);     // {{oldX,oldY},{newX,newY},{vX,vY}}
};

