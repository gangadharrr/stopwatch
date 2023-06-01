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
    if(lapClicked)
    {
      let prevTime=lapData[lapData.length-1];
      prevTime=prevTime[prevTime.length-1].split(":");
       var a = new Date(2010, 0, 1, parseInt(prevTime[0]), parseInt(prevTime[1]), parseInt(prevTime[2]), parseInt(prevTime[3])); 
       var b = new Date(2010, 0, 1, 0, minuteHand, secondHand, milliSecondHand); 
    }
    else
    {
      let prevTime='00:00:00:00'.split(':');
      var a = new Date(2010, 0, 1, 0, parseInt(prevTime[0]), parseInt(prevTime[1]), parseInt(prevTime[2]), parseInt(prevTime[3])); 
      var b = new Date(2010, 0, 1, 0, minuteHand, secondHand, milliSecondHand); 
    }
     setLapClicked(true);
     setLapCount(lapCount+1);
     let data=lapData;
     data.push([lapCount,`00:${String(parseInt((b-a)/(1000*60))).padStart(2, '0')}:${String(parseInt((b-a)/(1000))).padStart(2, '0')}:${milliSecondHand}`,`00:${minuteHand}:${secondHand}:${milliSecondHand}`])
    setLapData(lapData)
    setTimeout(()=>{document.getElementById("scroller").scrollTop=document.getElementById("scroller").scrollHeight},0);
   }
  function start() {
    setPaused(!paused);
    setStarted(true);
    setTimerInterval(setInterval(function() {
        timer+= 1/60;
        setTimerPublic(timer);
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
        <div className='row' style={{fontWeight:"bolder"}}>
          <p>Lap</p>
          <p>Lap Times</p>
          <p>Overall Time </p>
        </div>
        <hr/>
        <div className='LapData' id="scroller">
          <LapTimeDataComponent data={lapData}/>
        </div>
      </div>
    </div>
  );
}

export default App;
