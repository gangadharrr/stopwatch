import logo from './logo.svg';
import './App.css';
import CounterComponent from './components/CounterComponent/CounterComponent';
import './components/CounterComponent/CounterComponent.css'
function App() {
  return (
    <div className="App">
      <div className='Timer'>
        <CounterComponent value="hh"/>:
        <CounterComponent value="mm"/>:
        <CounterComponent value="ss"/>.
        <CounterComponent value="ms"/>
      </div>
    </div>
  );
}

export default App;
