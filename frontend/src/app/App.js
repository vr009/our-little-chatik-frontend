import logo from '../assets/Subject.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Привет, <code>Слаик!</code> Че грустный?.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Инфа тут!
        </a>
      </header>
    </div>
  );
}

export default App;
