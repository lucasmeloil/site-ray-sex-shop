import React from 'react';
// FIX: In 'constants.ts', the product list is exported as `INITIAL_PRODUCTS`.
import { INITIAL_PRODUCTS as PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

const CatalogSection: React.FC = () => {
  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Nosso <span className="text-red-600">Catálogo</span></h2>
          <div className="mt-4 w-24 h-1 bg-red-500 mx-auto rounded-full shadow-sm"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;