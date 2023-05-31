import logo from './logo.svg';
import './App.css';
import CounterComponent from './components/CounterComponent/CounterComponent';
import './components/CounterComponent/CounterComponent.css'
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
import LapTimeDataComponent from './components/LapTimeDataComponent/LapTimeDataComponent';
import './components/ButtonComponent/ButtonComponent.css'
import { useState } from 'react';
function App() {
  const [minuteHand,setMinuteHand]=useState("00");
  const [secondHand,setSecondHand]=useState("00");
  const [milliSecondHand,setMilliSecondHand]=useState("00");
  const [timerInterval,setTimerInterval]=useState(()=>{});
  const [timerPublic,setTimerPublic]=useState(0);
  const [lapData,setLapData]=useState([]);
  const [lapCount,setLapCount]=useState(1);
  var timer=timerPublic;
  function reset() {
    setLapData([]);
    setLapCount(1);
    setLapClicked(false);
    setPaused(false);
    setStarted(false);
    setTimerPublic(0);
    setMinuteHand("00");
    setSecondHand("00");
    setMilliSecondHand("00");
    clearInterval(timerInterval);
  }
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [lapClicked, setLapClicked] = useState(false);
   function pause(){
    setPaused(!paused);
    clearInterval(timerInterval);
   }  
   function elapsed()
   {
    setLapClicked(true);
    setLapCount(lapCount+1);
    let data=lapData;
    data.push([lapCount,`00:${minuteHand}:${secondHand}.${milliSecondHand}`,`00:${minuteHand}:${secondHand}.${milliSecondHand}`])
    setLapData(lapData)
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
      <div className='container'>
      <div className='Timer'>
        <CounterComponent value="00"/>:
        <CounterComponent value={minuteHand}/>:
        <CounterComponent value={secondHand}/>.
        <CounterComponent value={milliSecondHand}/>
      </div>
      <div className='Controls'>
        {started?<ButtonComponent onClick={paused?elapsed:reset} disabled={!started} value={paused?"Lap":"Reset"}/>:<ButtonComponent onClick={reset} disabled={!started} value="Reset"/>}
        {paused?<ButtonComponent onClick={pause} disabled={false} value="Pause"/>:<ButtonComponent onClick={start}  value={started?"Resume":"Start"}/>}
      </div>
      </div>
      <div style={{display:lapClicked?"flex":"none"}} className='LapDetails'>
        <div className='row'>
          <p>Lap</p>
          <p>Lap Times</p>
          <p>Overall Time </p>
        </div>
        <hr/>
        <div className='LapData'>
      <LapTimeDataComponent data={lapData}/>
      </div>
      </div>
    </div>
  );
}

export default App;
