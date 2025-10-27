import React from 'react';

interface AgeGateProps {
  onVerify: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-red-200 rounded-lg shadow-2xl shadow-red-500/20 text-center p-8 max-w-md w-full">
        <div className="text-6xl animate-pulse mb-4">💖</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo(a) à Ray Sexshop</h2>
        <p className="text-gray-600 mb-6">Este site contém conteúdo adulto. Você tem 18 anos ou mais?</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.location.href = 'https://www.google.com'}
            className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Não
          </button>
          <button 
            onClick={onVerify}
            className="bg-red-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          >
            Sim, tenho +18
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
