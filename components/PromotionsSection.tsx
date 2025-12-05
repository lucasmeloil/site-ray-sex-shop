
import React from 'react';
import type { Product } from '../types';
import Countdown from './Countdown';
import ProductCard from './ProductCard';
import { Flame, Timer } from 'lucide-react';

interface PromotionsSectionProps {
    products: Product[];
}

const PromotionsSection: React.FC<PromotionsSectionProps> = ({ products }) => {
  // Set the promotion to end 24 hours from now
  const promotionEndDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <section className="py-24 bg-gradient-to-b from-red-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration - Subtle and Clean */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Banner Strip - Light Theme */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div className="text-center md:text-left space-y-2">
                <div className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs py-1 px-3 bg-red-100 rounded-full animate-pulse">
                    <Flame size={14} fill="currentColor" /> Oferta Relâmpago
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">
                    HOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">DEALS</span>
                </h2>
                <p className="text-gray-500 text-lg font-light max-w-md">
                    Descontos exclusivos selecionados para você. Aproveite antes que o tempo acabe.
                </p>
            </div>
            
            {/* Timer Card - Glass/Light Effect */}
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-red-500/5 border border-red-100 min-w-[320px] transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center gap-2 mb-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <Timer size={14} />
                    <span>A oferta termina em</span>
                </div>
                <div className="text-gray-900">
                    <Countdown targetDate={promotionEndDate} theme="light" />
                </div>
            </div>
        </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
        
        <div className="mt-12 text-center">
             <button className="text-red-600 font-bold text-sm uppercase tracking-widest border-b-2 border-red-100 hover:border-red-600 transition-all pb-1 hover:text-red-700">
                 Ver todas as ofertas
             </button>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
