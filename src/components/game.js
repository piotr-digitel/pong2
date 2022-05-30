import React from 'react';
import '../index.css';
import Square from './square.js';
import backBall from "../malina.ico";
import backY from "../038.gif";
import GameEngine from './gameengine.js';

//const {boardFile} = require('./ExamInput2.js');   //CommonJS

import boardFile from './ExamInput2.js';





export default class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      ballPosition: getBallPosition(boardFile.board),   //reads start pos. from file
      seconds: props.seconds,
    }
    this.isGameStarted = false;
   };

  componentDidMount(){
    this.timer = setInterval(this.tick, 400);
  };

  tick(){
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
    } else {
      if(this.isGameStarted){
        clearInterval(this.timer);
        //tu co ma być wykonywane co jakiś czas
        let x = GameEngine(this.state.ballPosition, boardFile).newPosition;
        this.setState({ ballPosition: x });
        //boardFile[1][13] = 0;
      }
    }
  };

  //button handlers
  onClickHandler1=()=>{
    this.setState({ ballPosition: 8 });
    this.isGameStarted=true;
  };
  onClickHandler2=()=>{
    this.setState({ ballPosition: 12 });
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
    let x = 1 + this.state.ballPosition;
    x = GameEngine(this.state.ballPosition).newPosition;

    console.log("     pos: " + x);

    this.setState({ ballPosition: x });
    boardFile.board[1][1] = '0';
    boardFile.board[1][2] = '1';
   // console.log(this.state.ballPosition);
  };

  renderSquare(i, squareShade, typeSquare) {
    //testowo dla piłki i dla Y
  //  if(i === this.state.ballPosition) typeSquare = '1';
   // if(i === 18) typeSquare = 'Y';
    let SquareBackground;

    if(typeSquare === '1'){           //ball square
      SquareBackground = backBall;
      console.log("ball: " + i);
    }else if(typeSquare === 'Y'){     //Y square
      SquareBackground = backY;
      console.log("Y: " + i);
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
    // const squareRowFirst = [];
    // const squareRowLast = [];
    // const boardX=7;
    // const boardY=10;
    //let typeSquare = 0;


    //console.log(boardFile.board.length);

    for (let i = 0; i < boardFile.board.length ; i++) {
      let squareRow = [];
      //console.log("row: " + i + " " + boardFile.board[i].length);
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
    




    // //first row
    // for (let i = 0; i < boardX; i++) {
    //   squareRowFirst.push(this.renderSquare((i), "brick-square", typeSquare));  
    // }
    // board.push(<div className="board-row" key={0}>{squareRowFirst}</div>)
    // //inner rows
    // for (let i = 1; i < boardY-1; i++) {
    //   const squareRows = [];
    //   squareRows.push(this.renderSquare((i * boardX) , "brick-square", typeSquare));
    //   for (let j = 1; j < boardX-1; j++) {
    //     squareRows.push(this.renderSquare((i * boardX) + j, "grass-square", typeSquare));
    //   }
    //   squareRows.push(this.renderSquare((i * boardX) + boardY-1, "brick-square", typeSquare));
    //   board.push(<div className="board-row" key={i}>{squareRows}</div>)
    // }
    // //last row
    // for (let i = (boardX * boardY) - boardX; i < boardX * boardY; i++) {
    //   squareRowLast.push(this.renderSquare((i), "brick-square", typeSquare));  
    // }
    // board.push(<div className="board-row" key={boardY}>{squareRowLast}</div>)  


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

function getBallPosition(board){
  let ballPosition = 13;
  return ballPosition;
};