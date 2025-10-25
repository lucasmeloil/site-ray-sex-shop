import React, { useContext } from 'react';
import type { Product } from '../types';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';

interface ProductCardProps {
  product: Product;
  variant: 'catalog' | 'featured';
  onCategoryClick?: (category: string) => void;
  isPromotion?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant, onCategoryClick, isPromotion }) => {
  const { name, price, imageUrl, category } = product;
  const { addToCart } = useContext(CartContext) as CartContextType;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCategoryClick?.(category);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-900/50 border border-purple-800 flex flex-col text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 hover:border-pink-500 h-full">
      {isPromotion && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full z-10 rotate-12">
          PROMO
        </div>
      )}
      <div className="relative w-full aspect-square overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm md:text-base font-semibold text-gray-200 mb-1 flex-grow">{name}</h3>
        {isPromotion ? (
           <div className="mb-4">
            <p className="text-lg font-bold text-yellow-400">{price}</p>
            <p className="text-sm text-gray-500 line-through">R$ {(parseFloat(price.replace('R$ ', '').replace(',', '.')) * 1.2).toFixed(2).replace('.',',')}</p>
           </div>
        ) : (
          <p className="text-lg font-bold text-pink-400 mb-4">{price}</p>
        )}
      </div>

      <div className="px-4 pb-4 mt-auto">
        {variant === 'catalog' ? (
           <button 
              onClick={handleAddToCart}
              className="w-full bg-pink-500 text-white text-sm md:text-base font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-pink-600 active:scale-95 shadow-md hover:shadow-lg shadow-pink-500/30"
            >
              Adicionar 🛒
           </button>
        ) : (
           <button 
              onClick={handleCategoryClick}
              className="w-full bg-purple-600 text-white text-sm md:text-base font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-purple-700 active:scale-95 shadow-md hover:shadow-lg shadow-purple-500/30"
            >
              Ver Categoria
           </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;