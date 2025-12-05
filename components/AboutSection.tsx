
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight mb-8">
            Quem <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Somos</span>
        </h2>
        
        <div className="glass-card bg-white p-8 md:p-14 rounded-3xl shadow-xl shadow-gray-200 border border-gray-100">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            Na <span className="font-bold text-red-600">Ray Sexshop</span>, acreditamos que o prazer é natural e essencial. Nascemos para oferecer um ambiente seguro e elegante para sua exploração.
            </p>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            Nossa missão é trazer inovação, conforto e autoconhecimento. Curadoria exclusiva, discrição absoluta e uma estética que celebra a beleza.
            </p>
            
            <div className="mt-12 grid grid-cols-3 gap-8 md:gap-12 border-t border-gray-100 pt-10">
                <div className="flex flex-col items-center">
                    <span className="block text-4xl font-extrabold text-gray-900 mb-1">+500</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Produtos</span>
                </div>
                <div className="flex flex-col items-center border-l border-gray-100 border-r">
                    <span className="block text-4xl font-extrabold text-gray-900 mb-1">100%</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Sigilo</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="block text-4xl font-extrabold text-gray-900 mb-1">24h</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Suporte</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
