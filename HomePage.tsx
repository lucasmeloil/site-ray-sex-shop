import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductCard from './components/ProductCard';
import PromotionsSection from './components/PromotionsSection';
import PrizeWheelTrigger from './components/PrizeWheelTrigger';
import type { Product } from './types';

interface HomePageProps {
  onNavigate: (page: 'catalog', productId?: number) => void;
  products: Product[];
  onWheelClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, products, onWheelClick }) => {
  const featuredProducts = products.slice(0, 8);
  const promotionProducts = products.filter(p => p.isPromotion);

  const handleProductClick = (productId: number) => {
    onNavigate('catalog', productId);
  };

  return (
    <>
      <HeroSection onNavigate={(page) => onNavigate(page)} />

      {promotionProducts.length > 0 && <PromotionsSection products={promotionProducts} />}
      
      <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-red-500">Produtos em Destaque</h2>
            <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product.id)} className="cursor-pointer">
                <ProductCard 
                  product={product} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
      <PrizeWheelTrigger onClick={onWheelClick} />
    </>
  );
};

export default HomePage;
