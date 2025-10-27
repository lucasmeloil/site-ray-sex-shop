import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50">
      <div className="relative flex items-center justify-center">
        <div className="text-8xl animate-pulsar text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]">💖</div>
      </div>
      <p className="mt-4 text-lg text-red-400 tracking-widest">CARREGANDO...</p>
    </div>
  );
};

export default Loader;
