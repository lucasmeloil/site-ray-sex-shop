
import React, { useContext, useState } from 'react';
import type { Product } from '../types';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';
import { ShoppingCart, Check, Heart, Eye } from 'lucide-react';

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
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative p-4 md:p-6 bg-white overflow-hidden border-b border-gray-50">
        {isPromotion && (
           <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider z-10">
            -{(Math.random() * 20 + 10).toFixed(0)}%
          </div>
        )}
        
        {/* Wishlist placeholder (visual only) */}
        <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors z-20 hover:scale-110">
            <Heart size={20} />
        </button>
        
        <div className="aspect-square w-full flex items-center justify-center relative z-0">
          <div className="absolute inset-0 bg-red-50 rounded-full scale-0 group-hover:scale-125 transition-transform duration-500 opacity-50 blur-xl"></div>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{product.category}</p>
            <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 min-h-[2.5em]">{name}</h3>
        </div>
        
        <p className="hidden md:block text-xs text-gray-500 mb-4 line-clamp-2">{shortDescription}</p>
        
        <div className="mt-auto">
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-3">
                <span className="text-lg md:text-xl font-black text-gray-900">{price}</span>
                {originalPrice && (
                    <span className="text-xs text-gray-400 line-through decoration-red-300">{originalPrice}</span>
                )}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-9 w-full sm:w-auto">
                    <button onClick={decrementQuantity} className="w-8 flex items-center justify-center text-gray-500 hover:text-red-600 h-full font-bold active:scale-90 transition-transform">-</button>
                    <span className="flex-1 text-center text-xs font-bold text-gray-900 px-1">{quantity}</span>
                    <button onClick={incrementQuantity} className="w-8 flex items-center justify-center text-gray-500 hover:text-red-600 h-full font-bold active:scale-90 transition-transform">+</button>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className={`h-9 flex-1 flex items-center justify-center gap-2 rounded-lg font-bold text-xs uppercase tracking-wide transition-all duration-300 shadow-sm active:scale-95
                    ${isAdded 
                        ? 'bg-green-600 text-white shadow-green-200' 
                        : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-red-200'
                    }`}
                >
                    {isAdded ? <Check size={16} strokeWidth={3} /> : <ShoppingCart size={16} strokeWidth={2} />}
                    {isAdded ? 'Adicionado' : 'Comprar'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
