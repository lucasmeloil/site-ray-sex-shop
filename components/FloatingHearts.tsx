
import React from 'react';

const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 5 + 5}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.5 + 0.2,
        };
        const sizeClass = `text-${Math.floor(Math.random() * 4) + 2}xl`;
        return (
          <div
            key={i}
            className={`absolute bottom-[-40px] text-red-500/40 heart-animation ${sizeClass}`}
            style={style}
          >
            💖
          </div>
        );
      })}
    </div>
  );
};

export default FloatingHearts;
