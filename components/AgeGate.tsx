
import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

interface AgeGateProps {
  onVerify: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Background Overlay with Heavy Blur */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl transition-opacity duration-1000"></div>

      {/* Pulsing Aura Effect behind the card */}
      <div className="absolute w-[500px] h-[500px] bg-red-500/30 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>

      {/* The Glass Card */}
      <div className="relative bg-white/90 backdrop-blur-2xl border border-white/50 p-10 md:p-12 rounded-3xl shadow-2xl shadow-red-900/20 max-w-md w-[90%] text-center transform transition-all duration-500 animate-fade-in-up">
        
        {/* Icon Section */}
        <div className="relative mx-auto w-24 h-24 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-gradient-to-br from-red-50 to-white p-5 rounded-full shadow-lg border border-red-100">
                <Heart 
                    size={48} 
                    className="text-red-600 fill-red-500 animate-[pulse_1.5s_ease-in-out_infinite] drop-shadow-md" 
                    strokeWidth={1.5}
                />
            </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-3">
          Acesso <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Restrito</span>
        </h2>
        
        <p className="text-gray-600 text-lg font-light leading-relaxed mb-10">
          Este ambiente contém produtos destinados a adultos. <br/>
          <span className="font-semibold text-gray-800">Você possui 18 anos ou mais?</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={onVerify}
            className="group relative w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-red-500/40 hover:shadow-red-600/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
               <ShieldCheck size={18} />
               Sim, Entrar no Site
            </span>
            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"></div>
          </button>
          
          <button 
            onClick={() => window.location.href = 'https://www.google.com'}
            className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors py-2"
          >
            Não, sou menor de idade
          </button>
        </div>

        <div className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-semibold opacity-60">
            Ray Sexshop & Moda Íntima
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
