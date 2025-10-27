import React from 'react';

// Using the new banner URL provided by the user
const BANNER_URL = 'https://image2url.com/images/1761343426235-89f30e35-bc5c-4d5d-b852-460f4e058853.png';

interface HeroSectionProps {
  onNavigate: (page: 'catalog') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="flex items-center bg-gray-100 relative overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16">
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">
          
          {/* Image container (ordered first for mobile) */}
          <div className="w-full md:w-5/12 md:order-2">
            <img 
              src={BANNER_URL} 
              alt="Ray Sexshop Banner" 
              className="w-full max-w-[14rem] mx-auto md:max-w-full rounded-lg shadow-2xl shadow-red-500/20" 
            />
          </div>

          {/* Text content (ordered second for mobile) */}
          <div className="text-center md:text-left md:w-6/12 md:order-1">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              Explore Seus Desejos
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 mb-8">
              A fronteira final do prazer. Descubra uma nova dimensão de sensações com nossa coleção exclusiva.
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider
                         hover:bg-red-600 transition-all duration-300 transform hover:scale-105
                         shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]"
            >
              Ver Catálogo
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
