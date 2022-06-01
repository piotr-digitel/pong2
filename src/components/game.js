import React from 'react';
import '../index.css';
import Square from './square.js';
import backBall from "../malina.ico";
import backY from "../038.gif";
//import GameEngine from './gameengine.js';

import GameEngine from './engineClass.js';

//const {boardFile} = require('./ExamInput2.js');   //CommonJS

import boardFile from './ExamInput2.js';

export default class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      ballPosition: 0,     //getBallPosition(boardFile.board),   //reads start pos. from file
      seconds: props.seconds,
    }
    this.isGameStarted = false;
    this.vector = [1, 1];  //initial vector
   };

  componentDidMount(){
    this.timer = setInterval(this.tick, 200);
  };

  tick(){
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
    } else {
      if(this.isGameStarted){
        clearInterval(this.timer);
        //tu co ma być wykonywane co jakiś czas
        let fromEngine = GameEngine(boardFile.board, this.vector);
        this.setState({ ballPosition: fromEngine });                   //rerender this board
        boardFile.board[fromEngine[0].y][fromEngine[0].x] = '0';
        boardFile.board[fromEngine[1].y][fromEngine[1].x] = '1';
        this.vector = [fromEngine[2].x , fromEngine[2].y];
      }
    }
  };

  //button handlers
  onClickHandler1=()=>{
   // this.setState({ ballPosition: 8 });
    this.isGameStarted=true;
  };
  onClickHandler2=()=>{
   //this.setState({ ballPosition: 12 });
    this.isGameStarted=false;
  };
  onClickHandler3=()=>{
    this.setState({ ballPosition: 57 });
  };
  onClickHandler4=()=>{
    this.setState({ ballPosition: 61 });
  };
  
  onClickHandler=()=>{
    clearInterval();
    let fromEngine = GameEngine(boardFile.board, this.vector);

    //console.table([fromEngine[2].x , fromEngine[2].y]);

    this.setState({ ballPosition: fromEngine });             //rerender this board
    boardFile.board[fromEngine[0].y][fromEngine[0].x] = '0';
    boardFile.board[fromEngine[1].y][fromEngine[1].x] = '1';
    this.vector = [fromEngine[2].x , fromEngine[2].y];
  };

  renderSquare(i, squareShade, typeSquare) {
    let SquareBackground;
    if(typeSquare === '1'){           //ball square
      SquareBackground = backBall;
    }else if(typeSquare === 'Y'){     //Y square
      SquareBackground = backY;
    };

    if(typeSquare === 'X' || typeSquare === '0'){
      return <Square
      key={i}
      keyVal={i}
      shade={squareShade}
     />
    }else{
      return <Square
      key={i}
      keyVal={i}
      shade={squareShade}
      style = {{backgroundImage: `url(${SquareBackground})`, backgroundRepeat: 'no-repeat'}}
      />  
    }

  };

  render() {
    const board = [];

    for (let i = 0; i < boardFile.board.length ; i++) {
      let squareRow = [];
      for (let j = 0; j < boardFile.board[i].length ; j++) {
         if(boardFile.board[i][j] === '0') {
             squareRow.push(this.renderSquare((i*12 + j), "grass-square", boardFile.board[i][j]));
         }else if(boardFile.board[i][j] === '1'){
             squareRow.push(this.renderSquare((i*12 + j), "grass-square", boardFile.board[i][j]));
         }else if(boardFile.board[i][j] === 'Y'){
             squareRow.push(this.renderSquare((i*12 + j), "grass-square", boardFile.board[i][j]));
         }else if(boardFile.board[i][j] === 'X'){
             squareRow.push(this.renderSquare((i*12 + j), "brick-square", boardFile.board[i][j]));
         };
      };
      board.push(<div className="board-row" key={(i+1000)}>{squareRow}</div>);
    };
    
    return (
      <div>
        <div className="game">
          <div className="game-board">
            {board}
          </div>
          <button onClick={this.onClickHandler1}>1</button>
          <button onClick={this.onClickHandler2}>2</button>
          <button onClick={this.onClickHandler3}>3</button>
          <button onClick={this.onClickHandler4}>4</button>
          <button onClick={this.onClickHandler}>Move</button>
        </div>
      </div>
    );
  };
};

// function getBallPosition(board){
//   let ballPosition = 13;
//   return ballPosition;
// };