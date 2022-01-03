import { useState, useEffect } from 'react';
import useSound from 'use-sound'
import beep from './snd/beep.mp3'
import './App.css';


const App = () =>{
  const [study, setStudy] = useState(25)
  const [rest, setRest] = useState(5)
  const [timer,setTimer] = useState(study*60)
  const [pause, togglePause] = useState(true)
  const [status,setStatus] = useState(true) // true: session false: break
  const [autoStart, setAutoStart] = useState(true)
  const [play] = useSound(beep,{ volume: 1 })

  const reset = () =>{
    togglePause(true)
    setTimer(study*60)
    setStatus(true)
  }
  
  const incr = (func) =>{
    func(i=> {
      if (i<60){
        return i+1
      }
      return i
    })
  }
  const decr = (func)=>{
    func(i=> {
      if (i>0){
        return i-1
      }
      return i
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(!pause) {
        if (timer > 0) {
          setTimer(time => time-1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval)
    }
      
  });
  useEffect(() => {
    if (timer === 0) {
      setStatus(cur=> cur === false)
      play()
      if (!autoStart){
        togglePause(true)
      }
    }
    return;
  }, [timer])
  
  useEffect(() => {
      setTimer((status?study:rest)*60)
      return;
  }, [status])


  const timeFormat = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds - (m*60)

    return `${m<10?'0'+m:m}:${s<10?'0'+s:s}`

  }
  return (
    <div className='window'>
        <div className='ctn timer-ctn'>
          <div className='ctn-h'>{status?'Study':'Rest'}</div>
          <div className='ctn-n'>{timeFormat(timer)}</div>
          <div>
            <button className={'btn' +' '+(pause?'start-btn':'stop-btn')} onClick={()=>togglePause(state=>!state)}>{pause?'start':'stop'}</button>
            <button className='btn stop-btn' onClick={reset}>reset</button>
          </div>
        </div>
        <div className='adjust-ctn'>
          <div className='ctn rest-ctn'>
            <div className='ctn-h'>Rest Time</div>
            <div className='ctn-n'>{rest}</div>
            <div>
              <button className='btn start-btn' onClick={()=>incr(setRest)}>/\</button>
              <button className='btn stop-btn' onClick={()=>decr(setRest)}>\/</button>
          </div>
          </div>
          <div className='ctn study-ctn'>
            <div className='ctn-h'>Study Time</div>
            <div className='ctn-n'>{study}</div>
            <div>
              <button className='btn start-btn' onClick={()=>incr(setStudy)}>/\</button>
              <button className='btn stop-btn' onClick={()=>decr(setStudy)}>\/</button>
          </div>
          </div>
        </div>
    </div>
    
  )
}

export default App;
