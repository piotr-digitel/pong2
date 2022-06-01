import logo from './logo.svg';
import './App.css';
import Game from './components/game.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <p>
          Welcome to my Pong Java Script exercise. <br />
          Ract renderer.
          <img src={logo} className="App-logo" alt="logo" />
        </p>
        <Game/>
      </header>
    </div>
  );
}

export default App;
