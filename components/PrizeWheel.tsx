import React, { useState, useEffect } from 'react';

interface PrizeWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

const prizes = [
  { text: '10% OFF' },
  { text: 'Tente Amanhã' },
  { text: 'Frete Grátis' },
  { text: 'Brinde Surpresa' },
  { text: '5% OFF' },
  { text: 'Tente Amanhã' },
  { text: 'R$ 10 OFF' },
  { text: 'Tente Amanhã' },
];

const PrizeWheel: React.FC<PrizeWheelProps> = ({ isOpen, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const lastSpinDate = localStorage.getItem('lastSpinDate');
      if (lastSpinDate) {
        const today = new Date().toLocaleDateString();
        if (lastSpinDate === today) {
          setCanSpin(false);
          setResult('Você já girou a roleta hoje. Volte amanhã!');
        } else {
            setCanSpin(true);
            setResult(null);
        }
      }
    }
  }, [isOpen]);

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    const randomSpins = Math.floor(Math.random() * 5) + 5; // 5 to 9 full spins
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const finalAngle = (randomSpins * 360) + (prizeIndex * segmentAngle) + (segmentAngle / 2);

    setRotation(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = prizes[prizes.length - 1 - prizeIndex].text;
      setResult(`Parabéns! Você ganhou: ${prize}`);
      const today = new Date().toLocaleDateString();
      localStorage.setItem('lastSpinDate', today);
      setCanSpin(false);
    }, 5000); // Corresponds to the animation duration
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-900 border-2 border-purple-800 rounded-2xl shadow-2xl shadow-purple-500/30 p-6 md:p-8 max-w-lg w-full text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white">❌</button>
        <h2 className="text-3xl font-bold text-pink-400 mb-4">Gire a Roleta da Sorte!</h2>
        <p className="text-gray-400 mb-6">Tente a sorte uma vez por dia e ganhe prêmios incríveis.</p>

        <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto mb-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-20">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-yellow-400 transform -rotate-180 -translate-y-6"></div>
          </div>
          <div 
            className="w-full h-full rounded-full border-4 border-purple-600 transition-transform duration-[5000ms] ease-out"
            style={{ 
                transform: `rotate(${rotation}deg)`,
                background: `conic-gradient(from 90deg, ${prizes.map((p, i) => `${i % 2 === 0 ? '#4c1d95' : '#7e22ce'} ${i * (100/prizes.length)}%, ${i % 2 === 0 ? '#4c1d95' : '#7e22ce'} ${(i+1) * (100/prizes.length)}%`).join(',')})`
            }}
          >
            {prizes.map((prize, i) => (
              <div 
                key={i} 
                className="absolute w-1/2 h-1/2 top-0 left-1/4 text-white font-bold text-xs md:text-sm flex items-center justify-center transform-origin-bottom-center" 
                style={{ transform: `rotate(${i * (360 / prizes.length)}deg) translateY(-25%)` }}
              >
                 <span style={{ transform: `rotate(${-(360 / prizes.length) / 2}deg) translateY(10px)` }}>
                    {prize.text}
                 </span>
              </div>
            ))}
          </div>
        </div>

        {result && <p className="text-yellow-400 font-bold text-lg mb-4 h-6">{result}</p>}
        
        <button
          onClick={handleSpin}
          disabled={!canSpin || isSpinning}
          className="w-full bg-pink-500 text-white font-bold py-3 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {isSpinning ? 'Girando...' : (canSpin ? 'Girar Agora!' : 'Volte Amanhã')}
        </button>
      </div>
    </div>
  );
};

export default PrizeWheel;