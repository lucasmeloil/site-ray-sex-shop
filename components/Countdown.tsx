
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
  theme?: 'light' | 'dark';
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, theme = 'dark' }) => {
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

  const textColor = theme === 'light' ? 'text-gray-900' : 'text-white';
  const labelColor = theme === 'light' ? 'text-gray-400' : 'text-gray-500';
  const separatorColor = theme === 'light' ? 'text-red-200' : 'text-gray-700';

  const timeComponents = Object.entries(timeLeft).map(([interval, value], index, array) => {
    const label = interval === 'days' ? 'Dias' : interval === 'hours' ? 'Hrs' : interval === 'minutes' ? 'Min' : 'Seg';

    return (
      <React.Fragment key={interval}>
          <div className="flex flex-col items-center min-w-[3.5rem]">
            <span className={`text-3xl md:text-4xl font-black ${theme === 'light' ? 'text-red-600' : 'text-white'} tabular-nums font-sans leading-none`}>
                {String(value).padStart(2, '0')}
            </span>
            <span className={`text-[10px] uppercase font-bold tracking-wider mt-1 ${labelColor}`}>{label}</span>
          </div>
          {index < array.length - 1 && (
              <span className={`text-2xl font-light ${separatorColor} self-start mt-1`}>:</span>
          )}
      </React.Fragment>
    );
  });

  return (
    <div className="flex justify-center items-start gap-2 md:gap-3">
      {timeComponents}
    </div>
  );
};

export default Countdown;
