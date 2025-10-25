



import React from 'react';
// FIX: In 'constants.ts', the product list is exported as `INITIAL_PRODUCTS`.
import { INITIAL_PRODUCTS as PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

const CatalogSection: React.FC = () => {
  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-400">Nosso Catálogo</h2>
          <div className="mt-2 w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {PRODUCTS.map((product) => (
            // FIX: Removed the 'variant' prop as it does not exist on ProductCardProps.
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;