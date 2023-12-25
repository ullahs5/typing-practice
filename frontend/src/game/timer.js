import React, { useState, useEffect } from 'react';

/**
 * Timer component that tracks elapsed time in seconds.
 * @param {Function} onTimeUpdate - Callback function triggered on time update.
 * @returns {JSX.Element} Timer component.
 */
const Timer = ({ onTimeUpdate }) => {
  // State to hold the current time in seconds
  const [time, setTime] = useState(0);

  // Increment time every second using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup function to clear the interval when component unmounts or changes
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run only once on mount

  // Trigger onTimeUpdate callback whenever 'time' changes
  useEffect(() => {
    onTimeUpdate(time);
  }, [time]);

  // You can uncomment and use the formatTime function to display time in minutes and seconds
  
  // /**
  //  * Format time from seconds to MM:SS format.
  //  * @param {number} seconds - Time in seconds.
  //  * @returns {string} Formatted time string (MM:SS).
  //  */
  // const formatTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  // };

  // Render the Timer component
  return (
    // Your JSX for Timer component goes here
    // Example: <div>{formatTime(time)}</div>
    // Replace the above line with your desired UI representation of time
    <div>{/* Your time display goes here */}</div>
  );
};

export default Timer;
