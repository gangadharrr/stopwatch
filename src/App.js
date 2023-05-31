import logo from './logo.svg';
import './App.css';
import CounterComponent from './components/CounterComponent/CounterComponent';
import './components/CounterComponent/CounterComponent.css'
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
import './components/ButtonComponent/ButtonComponent.css'
import { useState } from 'react';
function App() {
  const [minuteHand,setMinuteHand]=useState("00");
  const [secondHand,setSecondHand]=useState("00");
  const [milliSecondHand,setMilliSecondHand]=useState("00");
  const [timerInterval,setTimerInterval]=useState(()=>{});
  const [timerPublic,setTimerPublic]=useState(0);
  var timer=timerPublic;
  function reset() {
    setPaused(!paused);
    setStarted(false);
    setTimerPublic(0);
    setMinuteHand("00");
    setSecondHand("00");
    setMilliSecondHand("00");
    clearInterval(timerInterval);
  }
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);

   function pause(){
    setPaused(!paused);
    clearInterval(timerInterval);
   }  
   function elased()
   {
    alert("elased");
   }
  function start() {
    setPaused(!paused);
    setStarted(true);
    setTimerInterval(setInterval(function() {
        timer+= 1/60;
        setTimerPublic(timer);
        console.log(timerPublic);
        var msVal = Math.floor((timer - Math.floor(timer))*100);
        var secondVal = Math.floor(timer) - Math.floor(timer/60) * 60;
        var minuteVal = Math.floor(timer/60);
        setMilliSecondHand(msVal < 10 ? "0" + msVal.toString() : msVal);
        setSecondHand( secondVal < 10 ? "0" + secondVal.toString() : secondVal);
        setMinuteHand(minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal);
      }, 1000/60)
      );
  }
  return (
    <div className="App">
      <div className='Timer'>
        <CounterComponent value="00"/>:
        <CounterComponent value={minuteHand}/>:
        <CounterComponent value={secondHand}/>.
        <CounterComponent value={milliSecondHand}/>
      </div>
      <div className='Controls'>
        {started?<ButtonComponent onClick={reset} disabled={!started} value="Lap"/>:<ButtonComponent onClick={reset} disabled={!started} value="Reset"/>}
        {paused?<ButtonComponent onClick={pause} disabled={false} value="Pause"/>:<ButtonComponent onClick={start}  value={started?"Resume":"Start"}/>}
        
      </div>
    </div>
  );
}

export default App;
