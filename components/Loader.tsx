import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative flex items-center justify-center">
        <div className="text-7xl animate-ping absolute opacity-75">💖</div>
        <div className="text-6xl relative">💖</div>
      </div>
      <p className="mt-4 text-lg text-purple-300 tracking-widest">CARREGANDO...</p>
    </div>
  );
};

export default Loader;