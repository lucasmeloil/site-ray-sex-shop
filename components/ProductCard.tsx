
import React, { useContext, useState } from 'react';
import type { Product } from '../types';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, price, originalPrice, imageUrl, shortDescription, isPromotion } = product;
  const { addToCart } = useContext(CartContext) as CartContextType;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="group bg-white/60 backdrop-blur-md text-gray-800 rounded-lg border border-red-200/50 shadow-lg shadow-red-500/5 flex flex-col h-full transition-shadow duration-300 hover:shadow-2xl hover:shadow-red-500/20">
      <div className="relative p-2">
        {isPromotion && (
           <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-[0_0_8px_rgba(239,68,68,0.5)]">
            Melhor preço
          </div>
        )}
        <button className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm rounded-full p-2 z-10 text-gray-500 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
        <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200/50">
          <img src={imageUrl} alt={name} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">{name}</h3>
        
        <div className="flex-grow"></div>
        
        <div className="mb-3">
          {originalPrice && (
            <p className="text-xs text-gray-500 line-through">{originalPrice}</p>
          )}
          <p className="text-2xl font-bold text-red-500">{price}</p>
          <p className="text-xs text-gray-600 mt-1 h-8">{shortDescription}</p>
        </div>

        <div className="flex items-center justify-between border border-red-300 rounded-md p-1 mb-3 bg-white/20">
            <button onClick={decrementQuantity} className="text-gray-600 px-2 text-lg hover:text-red-500">-</button>
            <span className="font-bold text-gray-800">{quantity}</span>
            <button onClick={incrementQuantity} className="text-gray-600 px-2 text-lg hover:text-red-500">+</button>
        </div>

        <button 
            onClick={handleAddToCart}
            className={`w-full font-bold py-3 px-4 rounded-md transition-all duration-300 text-sm ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.4)] hover:shadow-[0_0_15px_rgba(239,68,68,0.6)]'
            }`}
        >
          {isAdded ? 'Adicionado ✓' : 'Comprar Agora'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
