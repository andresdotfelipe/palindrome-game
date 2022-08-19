import { useState, useEffect } from "react";
import "./Timer.scss";

const Timer = ({ startGame, handleStopTimer }) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (startGame && timeLeft !== 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      handleStopTimer();
      setTimeLeft(5);
    }
  }, [startGame, timeLeft, handleStopTimer]);

  return (
    <div className="timer">
      <span className="time-left">{timeLeft}</span>
    </div>
  );
};

export default Timer;
