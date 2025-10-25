import React from 'react';

// Using the new banner URL provided by the user
const BANNER_URL = 'https://image2url.com/images/1761343426235-89f30e35-bc5c-4d5d-b852-460f4e058853.png';

interface HeroSectionProps {
  onNavigate: (page: 'catalog') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="flex items-center bg-grid-purple-900/20 relative overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">
          
          {/* Text content (ordered first for desktop) */}
          <div className="text-center md:text-left md:w-6/12 md:order-1">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]">
              Explore Seus Desejos
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 mb-8">
              A fronteira final do prazer. Descubra uma nova dimensão de sensações com nossa coleção exclusiva.
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="inline-block bg-pink-500 text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider
                         hover:bg-pink-600 transition-all duration-300 transform hover:scale-105
                         shadow-[0_0_15px_rgba(236,72,153,0.7)] hover:shadow-[0_0_25px_rgba(236,72,153,1)]"
            >
              Ver Catálogo
            </button>
          </div>

          {/* Image container (ordered second for desktop) */}
          <div className="w-full md:w-5/12 md:order-2 mt-6 md:mt-0">
            <img 
              src={BANNER_URL} 
              alt="Ray Sexshop Banner" 
              className="w-full max-w-[14rem] mx-auto md:max-w-full rounded-lg shadow-2xl shadow-purple-500/30" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;