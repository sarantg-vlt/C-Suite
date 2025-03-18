// import React, { useState, useEffect } from "react";

// const CountdownTimer = ({ initialTime, onTimerEnd }) => {
//   const [timeLeft, setTimeLeft] = useState(initialTime);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       onTimerEnd();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, onTimerEnd]);

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   return (
//     <div>
//       {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//     </div>
//   );
// };

// const Timer = ({ timeFromAPI, setTimeOver }) => {
//   const parsedTime = parseInt(timeFromAPI, 10) * 60;

//   const handleTimerEnd = () => {
//     setTimeOver(true);
//   };

//   return (
//     <div>
//       <CountdownTimer initialTime={parsedTime} onTimerEnd={handleTimerEnd} />
//     </div>
//   );
// };

// export default Timer;

// import React, { useState, useEffect } from "react";
// import "./TestPage.css";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

// const CountdownTimer = ({ initialTime, onTimerEnd }) => {
//   const [timeLeft, setTimeLeft] = useState(initialTime);
//   const [timerSize, setTimerSize] = useState(
//     window.innerWidth > 1125 ? 105 : 65
//   );
//   const [strokeWidth, setStrokeWidth] = useState(
//     window.innerWidth > 1125 ? 8 : 5
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 1125) {
//         setTimerSize(105);
//         setStrokeWidth(8);
//       } else {
//         setTimerSize(65);
//         setStrokeWidth(5);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const totalSeconds = initialTime;
//   const medianSeconds = totalSeconds / 2;

//   useEffect(() => {
//     if (timeLeft === 0) {
//       onTimerEnd();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, onTimerEnd]);

//   return (
//     <div>
//       <CountdownCircleTimer
//         isPlaying
//         size={timerSize}
//         strokeWidth={strokeWidth}
//         duration={totalSeconds}
//         colors={["#00ff08", "#ffbb00", "#ff0000"]}
//         colorsTime={[totalSeconds, medianSeconds, 0]}
//         onComplete={() => {
//           onTimerEnd();
//           return { shouldRepeat: false, delay: 1 };
//         }}
//       >
//         {({ remainingTime }) => {
//           const minutes = Math.floor(remainingTime / 60);
//           const seconds = remainingTime % 60;

//           return (
//             <div className="timer-countdown">
//               {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//             </div>
//           );
//         }}
//       </CountdownCircleTimer>
//     </div>
//   );
// };

// const Timer = ({ timeFromAPI, setTimeOver }) => {
//   const parsedTime = parseInt(timeFromAPI, 10) * 60;

//   const handleTimerEnd = () => {
//     setTimeOver(true);
//   };

//   return (
//     <div>
//       <CountdownTimer initialTime={parsedTime} onTimerEnd={handleTimerEnd} />
//     </div>
//   );
// };

// export default Timer;

import React, { useState, useEffect } from "react";
import "./TestPage.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CountdownTimer = ({ initialTime, onTimerEnd, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [timerSize, setTimerSize] = useState(
    window.innerWidth > 1125 ? 105 : 65
  );
  const [strokeWidth, setStrokeWidth] = useState(
    window.innerWidth > 1125 ? 8 : 5
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1125) {
        setTimerSize(105);
        setStrokeWidth(8);
      } else {
        setTimerSize(65);
        setStrokeWidth(5);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      // Stop the timer if isRunning is false
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div>
      <CountdownCircleTimer
        isPlaying={isRunning}
        size={timerSize}
        strokeWidth={strokeWidth}
        duration={initialTime}
        colors={["#00ff08", "#ffbb00", "#ff0000"]}
        colorsTime={[initialTime, initialTime / 2, 0]}
        onComplete={() => {
          onTimerEnd();
          return { shouldRepeat: false, delay: 1 };
        }}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;

          return (
            <div className="timer-countdown">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
};

const Timer = ({ timeFromAPI, setTimeOver, isRunning }) => {
  const parsedTime = parseInt(timeFromAPI, 10) * 60;

  const handleTimerEnd = () => {
    setTimeOver(true);
  };

  return (
    <div>
      <CountdownTimer
        initialTime={parsedTime}
        onTimerEnd={handleTimerEnd}
        isRunning={isRunning}
      />
    </div>
  );
};

export default Timer;
