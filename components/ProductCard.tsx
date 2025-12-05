
import React, { useContext, useState } from 'react';
import type { Product } from '../types';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';
import { ShoppingCart, Check, Heart } from 'lucide-react';

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
  
  const incrementQuantity = (e: React.MouseEvent) => {
      e.stopPropagation();
      setQuantity(q => q + 1);
  } 
  const decrementQuantity = (e: React.MouseEvent) => {
      e.stopPropagation();
      setQuantity(q => Math.max(1, q - 1));
  }

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-500/10 border border-gray-100 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      
      {/* Image Section */}
      <div className="relative p-4 md:p-6 bg-gray-50 overflow-hidden">
        {isPromotion && (
           <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full z-10 shadow-sm uppercase tracking-wider">
            Oferta
          </div>
        )}
        
        {/* Wishlist placeholder (visual only) */}
        <button className="absolute top-2 right-2 md:top-3 md:right-3 text-gray-300 hover:text-red-500 transition-colors z-20">
            <Heart size={18} className="md:w-5 md:h-5" />
        </button>
        
        <div className="aspect-square w-full flex items-center justify-center relative z-0">
          <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 opacity-30 blur-2xl"></div>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-3 md:p-5 flex flex-col flex-grow bg-white">
        <div className="mb-1 md:mb-2">
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">{product.category}</p>
            <h3 className="text-sm md:text-base font-bold text-gray-800 leading-tight group-hover:text-red-600 transition-colors line-clamp-2 min-h-[2.5em]">{name}</h3>
        </div>
        
        <p className="hidden md:block text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{shortDescription}</p>
        
        <div className="mt-auto pt-2 md:pt-4 border-t border-gray-50">
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-3">
                <span className="text-lg md:text-2xl font-bold text-gray-900">{price}</span>
                {originalPrice && (
                    <span className="text-[10px] md:text-xs text-gray-400 line-through">{originalPrice}</span>
                )}
            </div>

            {/* Controls */}
            <div className="flex flex-col xl:flex-row items-stretch gap-2 md:gap-3">
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-8 md:h-10">
                    <button onClick={decrementQuantity} className="w-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-full rounded-l-lg transition-colors font-medium">-</button>
                    <span className="flex-1 text-center text-xs md:text-sm font-bold text-gray-800 px-2">{quantity}</span>
                    <button onClick={incrementQuantity} className="w-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-full rounded-r-lg transition-colors font-medium">+</button>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className={`h-8 md:h-10 flex items-center justify-center gap-2 rounded-lg font-bold text-xs md:text-sm tracking-wide transition-all duration-300 shadow-md px-2
                    ${isAdded 
                        ? 'bg-green-500 text-white shadow-green-500/30' 
                        : 'bg-red-600 text-white hover:bg-red-500 shadow-red-500/20 hover:shadow-red-500/40'
                    }`}
                >
                    {isAdded ? <Check size={16} strokeWidth={3} /> : <ShoppingCart size={16} strokeWidth={2} />}
                    {isAdded ? 'Add' : 'Comprar'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
