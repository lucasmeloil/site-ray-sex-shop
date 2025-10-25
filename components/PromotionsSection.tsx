import React from 'react';
import type { Product } from '../types';
import Countdown from './Countdown';
import ProductCard from './ProductCard';

interface PromotionsSectionProps {
    products: Product[];
}

const PromotionsSection: React.FC<PromotionsSectionProps> = ({ products }) => {
  // Set the promotion to end 24 hours from now
  const promotionEndDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-8 md:p-12 text-center mb-12 shadow-2xl shadow-purple-500/20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">Promoção Relâmpago!</h2>
            <p className="text-lg text-gray-300 mt-4">Ofertas incríveis que terminam em:</p>
            <Countdown targetDate={promotionEndDate} />
        </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
