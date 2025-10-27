import React from 'react';

interface PrizeWheelTriggerProps {
  onClick: () => void;
}

const PrizeWheelTrigger: React.FC<PrizeWheelTriggerProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-gradient-to-br from-red-500 to-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 animate-bounce"
      title="Gire a Roleta!"
    >
      <span className="text-4xl">🎁</span>
    </button>
  );
};

export default PrizeWheelTrigger;
