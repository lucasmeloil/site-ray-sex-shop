import React, { useState, useEffect } from 'react';

interface PrizeWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

const prizes = [
  { text: '10% OFF' },
  { text: 'Tente de Novo' },
  { text: 'Frete Grátis' },
  { text: '5% OFF' },
  { text: 'Brinde Surpresa' },
  { text: 'Tente de Novo' },
  { text: 'R$10 OFF' },
  { text: 'Cupom 15%' },
];
const numPrizes = prizes.length;
const segmentAngle = 360 / numPrizes;

const PrizeWheel: React.FC<PrizeWheelProps> = ({ isOpen, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const lastSpinDate = localStorage.getItem('lastSpinDate');
      const today = new Date().toLocaleDateString();
      if (lastSpinDate === today) {
        setCanSpin(false);
        setResult('Você já girou a roleta hoje. Volte amanhã!');
      } else {
        setCanSpin(true);
        setRotation(0); // Reset visual rotation for a new spin
        setResult(null);
      }
    }
  }, [isOpen]);

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    const prizeIndex = Math.floor(Math.random() * numPrizes);
    
    // Middle of segment `i` is at `i * segmentAngle` because of how the conic-gradient is set up.
    const prizeAngle = prizeIndex * segmentAngle;

    // Add multiple full rotations for effect.
    const randomSpins = Math.floor(Math.random() * 5) + 5; 
    
    // We want the prize to stop at the top pointer (270 deg or -90 deg in CSS rotate).
    // The final angle is calculated to align the prize with the pointer.
    const finalRotation = (randomSpins * 360) - prizeAngle - 90;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = prizes[prizeIndex].text;
      
      if (prize.toLowerCase().includes('tente')) {
        setResult(`Quase! ${prize}.`);
      } else {
        setResult(`Parabéns! Você ganhou: ${prize}!`);
      }

      localStorage.setItem('lastSpinDate', new Date().toLocaleDateString());
      setCanSpin(false);
    }, 6000); // Must match the animation duration
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white border-2 border-red-200 rounded-2xl shadow-2xl shadow-red-500/20 p-6 md:p-8 max-w-lg w-full text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-900 z-20">❌</button>
        <h2 className="text-3xl font-bold text-red-500 mb-4">Gire a Roleta da Sorte!</h2>
        <p className="text-gray-600 mb-6">Tente a sorte uma vez por dia e ganhe prêmios incríveis.</p>

        <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute -top-1 w-0 h-0 
                border-l-[12px] border-l-transparent
                border-r-[12px] border-r-transparent
                border-b-[20px] border-b-red-500 z-20
                drop-shadow-[0_4px_2px_rgba(0,0,0,0.5)]">
            </div>
            
            <div
                className="w-full h-full rounded-full relative transition-transform duration-[6000ms] ease-[cubic-bezier(0.1,0.5,0.2,1)]
                           shadow-[inset_0_0_15px_rgba(0,0,0,0.5),0_0_20px_rgba(239,68,68,0.3)]"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <div 
                    className="w-full h-full rounded-full border-2 border-red-300"
                    style={{
                        background: `conic-gradient(from -${segmentAngle/2}deg, ${prizes.map((p, i) =>
                            `${i % 2 === 0 ? '#dc2626' : '#ef4444'} ${i * (100 / numPrizes)}%, ${i % 2 === 0 ? '#dc2626' : '#ef4444'} ${(i + 1) * (100 / numPrizes)}%`
                        ).join(',')})`
                    }}
                ></div>
                
                {prizes.map((prize, i) => {
                    const angle = segmentAngle * i + (segmentAngle / 2);
                    return (
                        <div
                            key={i}
                            className="absolute top-0 left-0 w-full h-full pointer-events-none"
                            style={{ transform: `rotate(${angle}deg)` }}
                        >
                            <div
                                className="w-full text-center text-white font-bold text-xs md:text-sm"
                                style={{ transform: 'translateY(5rem)' }}
                            >
                                {prize.text.split(' ').map((word, idx) => <div key={idx}>{word}</div>)}
                            </div>
                        </div>
                    );
                })}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-4 border-red-500 z-10
                               flex items-center justify-center text-red-500 font-black text-lg shadow-inner">
                   RAY
                </div>
            </div>
        </div>

        {result && <p className="text-red-600 font-bold text-lg mb-4 h-6 animate-pulse">{result}</p>}
        
        <button
          onClick={handleSpin}
          disabled={!canSpin || isSpinning}
          className="w-full bg-red-500 text-white font-bold py-3 rounded-full text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105 disabled:bg-gray-300 disabled:scale-100 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(239,68,68,0.5)]"
        >
          {isSpinning ? 'Girando...' : (canSpin ? 'Girar Agora!' : 'Volte Amanhã')}
        </button>
      </div>
    </div>
  );
};

export default PrizeWheel;
