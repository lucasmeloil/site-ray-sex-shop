
import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductCard from './components/ProductCard';
import PromotionsSection from './components/PromotionsSection';
import type { Product, HeroSlide } from './types';

interface HomePageProps {
  onNavigate: (page: 'catalog', productId?: number) => void;
  products: Product[];
  onWheelClick: () => void;
  heroSlides: HeroSlide[];
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, products, onWheelClick, heroSlides }) => {
  const featuredProducts = products.slice(0, 8);
  const promotionProducts = products.filter(p => p.isPromotion);

  const handleProductClick = (productId: number) => {
    onNavigate('catalog', productId);
  };

  return (
    <>
      <HeroSection onNavigate={(page) => onNavigate(page)} slides={heroSlides} />

      {promotionProducts.length > 0 && <PromotionsSection products={promotionProducts} />}
      
      <section id="featured" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-red-500 font-bold tracking-wider text-sm uppercase block mb-2">Curadoria Exclusiva</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Destaques da <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Coleção</span>
            </h2>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-red-500 to-red-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                <ProductCard 
                  product={product} 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button 
                onClick={() => onNavigate('catalog')}
                className="px-10 py-3.5 border-2 border-red-600 text-red-600 font-bold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 uppercase tracking-widest text-sm"
            >
                Ver Todo o Catálogo
            </button>
          </div>
        </div>
      </section>

      <AboutSection />
    </>
  );
};

export default HomePage;
