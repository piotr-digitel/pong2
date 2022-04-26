import React from 'react';
import '../index.css';
import Square from './square.js';
import background from "../malina.ico";
import GameEngine from './gameengine.js';


export default class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      ballPosition: 8,
      seconds: props.seconds,
    }
    this.isGameStarted = false;
   };

  componentDidMount(){
    this.timer = setInterval(this.tick, 400);
  }

  tick(){
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
    } else {
      if(this.isGameStarted){
        clearInterval(this.timer);
        //tu co ma być wykonywane co jakiś czas
        let x = GameEngine(this.state.ballPosition).newPosition;
        this.setState({ ballPosition: x });
      }
    }
  }

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
    let x= 1 + this.state.ballPosition;
    x = GameEngine(this.state.ballPosition).newPosition;

    this.setState({ ballPosition: x });
   // console.log(this.state.ballPosition);
  }

  renderSquare(i, squareShade) {
    return <Square
      key={i}
      keyVal={i}
      shade={squareShade}
      style = {i===this.state.ballPosition?{backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat'}:{}}
    />
  }  

  render() {
    const board = [];
    const squareRowFirst = [];
    const squareRowLast = [];
    const boardX=7;
    const boardY=10;
    //first row
    for (let i = 0; i < boardX; i++) {
      squareRowFirst.push(this.renderSquare((i), "brick-square"));  
    }
    board.push(<div className="board-row" key={0}>{squareRowFirst}</div>)
    //inner rows
    for (let i = 1; i < boardY-1; i++) {
      const squareRows = [];
      squareRows.push(this.renderSquare((i * boardX) , "brick-square"));
      for (let j = 1; j < boardX-1; j++) {
        squareRows.push(this.renderSquare((i * boardX) + j, "grass-square"));
      }
      squareRows.push(this.renderSquare((i * boardX) + boardY-1, "brick-square"));
      board.push(<div className="board-row" key={i}>{squareRows}</div>)
    }
    //last row
    for (let i = (boardX * boardY) - boardX; i < boardX * boardY; i++) {
      squareRowLast.push(this.renderSquare((i), "brick-square"));  
    }
    board.push(<div className="board-row" key={boardY}>{squareRowLast}</div>)  


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
  }
}