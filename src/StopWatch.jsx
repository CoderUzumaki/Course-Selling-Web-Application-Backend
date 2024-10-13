import React, { useState, useEffect } from 'react';
import './StopWatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(10); // Total duration for progress bar in seconds (default 10 seconds)
  const [progress, setProgress] = useState(0); // Progress percentage

  useEffect(() => {
    let timer;
    if (isRunning && time < duration) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (time >= duration) {
      setIsRunning(false); // Stop the timer if time exceeds duration
    }

    // Cleanup interval on unmount or stop
    return () => clearInterval(timer);
  }, [isRunning, time, duration]);

  // Update progress whenever time or duration changes
  useEffect(() => {
    setProgress((time / duration) * 100);
  }, [time, duration]);

  // Start/Stop the stopwatch
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setProgress(0);
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      
      <div className="time-display">{time}s</div>
      
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="controls">
        <button onClick={handleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="duration-control">
        <label>Set Duration: </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          min="1"
        />
        <span> seconds</span>
      </div>
    </div>
  );
};

export default Stopwatch;
