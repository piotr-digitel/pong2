import React from 'react';
import '../index.css';
import Square from './square.js';
import backBall from "../rpi.gif";
import backY from "../logowin.gif";
import GameEngine from './gameEngine.js';
import boardFile from './ExamInput2.js';
import { Button } from "@mui/material";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      boardChanged: false,        
      seconds: props.seconds,
    }
    this.isGameStarted = false; 
    this.vector = [1, 1, false];  //initial vector
   };

  componentDidMount(){
    this.timer = setInterval(this.tick, 200);   //last param. = speed of the game
  };

  calculateBoard(){
    let fromEngine = GameEngine(boardFile.board, this.vector);
    this.setState({ boardChanged: !this.state.boardChanged });   //rerender this board (every time)
    boardFile.board[fromEngine[0].y][fromEngine[0].x] = '0';     //erase ball from old position
    boardFile.board[fromEngine[1].y][fromEngine[1].x] = '1';     //draw ball in new position
    this.vector = [fromEngine[2].x, fromEngine[2].y, fromEngine[2].r];  //remember vector for next animation step
  };
  
  //timer function
  tick(){
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
    } else {
      if(this.isGameStarted){
        clearInterval(this.timer);
        this.calculateBoard();  //here goes part to run in time
      }
    }
  };

  //button handlers
  onClickHandlerStart=()=>{
    this.isGameStarted=true;
  };
  onClickHandlerStop=()=>{
    this.isGameStarted=false;
  };
  onClickHandlerStepBy=()=>{
    clearInterval();
    this.calculateBoard();
  };

  renderSquare(i, squareShade, typeSquare) {
    let SquareBackground;
    if(typeSquare === '1'){           // ball square img
      SquareBackground = backBall;
    }else if(typeSquare === 'Y'){     // 'Y' square img
      SquareBackground = backY;
    };

    let commonProps = {key: i, keyVal: i, shade: squareShade};
    if(typeSquare !== 'X' && typeSquare !== '0'){
      commonProps.style = {backgroundImage: `url(${SquareBackground})`, backgroundRepeat: 'no-repeat'};
    };

    return <Square
      {...commonProps}
    /> 
  };

  render() {
    let board = [];
    let squareShade = "";
    for (let i = 0; i < boardFile.board.length ; i++) {
      let squareRow = [];
      for (let j = 0; j < boardFile.board[i].length ; j++) {
         if(boardFile.board[i][j] === 'X') {
            squareShade = "brick-square";
         }else{
            squareShade = "grass-square";   //for 'Y', '1', '0'
         };
         squareRow.push(this.renderSquare((i*12 + j), squareShade, boardFile.board[i][j]));
      };
      board.push(<div className="board-row" key={(i+1000)}>{squareRow}</div>);
    };
    
    return (
      <div>
        <div className="game">
          <div className="game-board">
            {board}
          </div>
          <Button id="btn" variant="contained" onClick={this.onClickHandlerStart}>Start</Button>
          <Button id="btn" variant="contained" color="secondary" onClick={this.onClickHandlerStop}>Stop</Button>
          <Button id="btn" variant="contained" color="success" onClick={this.onClickHandlerStepBy}>Step by</Button>
        </div>
      </div>
    );
  };
};