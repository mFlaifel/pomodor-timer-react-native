import React, { useState, useEffect } from "react";
import { Vibration , Button ,Text, TextInput, RecyclerViewBackedScrollView} from "react-native";

const CustomTimer = (count) =>
  `${Math.floor(count / 60)} min : ${count % 60} sec`;

  

const C = () => {
  const [timer, setTimer] = useState(10*60);
  const [workTime, setWorkTime] = useState(10);
  const [breakTime, setBreakTime] = useState(1);
  const [isBreak, setIsBreak] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const handlePause = () => {
    console.log('handle is running',isRunning)
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    isBreak?setTimer(breakTime*60):setTimer(workTime*60)
  };

  const handleChangeWorkTime =(e)=>{
    setWorkTime(e.nativeEvent.text)
  }

  const handleChangeBreak =(e)=>{
    setBreakTime(e.nativeEvent.text)
  }

  const handelChangeMode = () =>{
    setIsBreak(!isBreak);
    setIsWork(!isWork)
    if(isWork){
        setTimer(breakTime*60)
    }else{
        setTimer(workTime*60)
    }
  }


  useEffect(() => {
      // console.log('breakTime',+breakTime,{isRunning})
    const timerInterval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    if (!isRunning) {
      clearInterval(timerInterval);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer,isRunning]);

  useEffect(() => {
      if (timer===0) { 
        setIsBreak(!isBreak);
        setIsWork(!isWork);
        setIsRunning(false)
        Vibration.vibrate([ 0, 1000, 1000, 1000])
        if(isWork){
            setTimer(breakTime*60)
        }else{
            setTimer(workTime*60)
        }
      }()=>{}
  }, [timer])

  return (
    <>
      <Text>{CustomTimer(timer)}</Text>
      <Button title={isRunning?"Pause":'Start / Resume'} onPress={handlePause} />
      <Button title="Reset" onPress={handleReset}/>
      <Button title={isWork ? "Break" : "Start Work"}  onPress={handelChangeMode} />
      <Text>Work time in minutes:</Text>
      <TextInput value={workTime.toString()} onChange={handleChangeWorkTime} label='work time'/>
      <Text> Break time in minutes</Text>
      <TextInput value={breakTime.toString()} onChange={handleChangeBreak}/>
    </>
  );
};
// export default C;
 const Counter = React.memo(C);
 export  default Counter;
