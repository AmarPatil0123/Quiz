import React, {useEffect, useState} from 'react'

const Timer = ({minutes, setMinutes, seconds, setSeconds,submit}) => {

   

    useEffect(() => {
        const timer = setInterval(() => {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 0) {
              if (minutes === 0) {
                clearInterval(timer);
                submit();
                return 0;
              }
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            }
            return prevSeconds - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer);
      }, [minutes, seconds]); 

  return (
    <div>
        <span>Duration - {minutes} : {seconds}</span>
    </div>
  )
}

export default Timer