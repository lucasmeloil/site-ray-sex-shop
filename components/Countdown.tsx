import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeComponents = Object.entries(timeLeft).map(([interval, value]) => {
    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-3xl md:text-5xl font-bold text-white tracking-wider">{String(value).padStart(2, '0')}</span>
        <span className="text-xs md:text-sm uppercase text-gray-400">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex justify-center gap-4 md:gap-8 mt-6">
      {timeComponents}
    </div>
  );
};

export default Countdown;