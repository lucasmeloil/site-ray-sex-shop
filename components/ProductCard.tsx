
import React, { useContext, useState, useRef } from 'react';
import type { Product } from '../types';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';
import { ShoppingCart, Check, Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { name, price, originalPrice, imageUrl, images, shortDescription, isPromotion } = product;
  const { addToCart } = useContext(CartContext) as CartContextType;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Touch handling state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Use the images array if available, otherwise fallback to single imageUrl
  const productImages = images && images.length > 0 ? images : [imageUrl];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onQuickView) {
          onQuickView(product);
      }
  };
  
  const incrementQuantity = (e: React.MouseEvent) => {
      e.stopPropagation();
      setQuantity(q => q + 1);
  } 
  const decrementQuantity = (e: React.MouseEvent) => {
      e.stopPropagation();
      setQuantity(q => Math.max(1, q - 1));
  }

  // Image Navigation Handlers
  const nextImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
      if (!touchStartX.current || !touchEndX.current) return;
      
      const distance = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50;

      if (distance > minSwipeDistance) {
          // Swiped Left -> Next
          nextImage();
      } else if (distance < -minSwipeDistance) {
          // Swiped Right -> Prev
          prevImage();
      }

      touchStartX.current = null;
      touchEndX.current = null;
  };

  return (
    <div 
        className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 flex flex-col h-full cursor-pointer"
        onClick={handleQuickViewClick}
    >
      
      {/* Image Section */}
      <div 
        className="relative p-4 md:p-6 bg-white overflow-hidden border-b border-gray-50"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isPromotion && (
           <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider z-20">
            -{(Math.random() * 20 + 10).toFixed(0)}%
          </div>
        )}
        
        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all hover:scale-110" title="Favoritos" onClick={(e) => e.stopPropagation()}>
                <Heart size={18} />
            </button>
             <button 
                onClick={handleQuickViewClick}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all hover:scale-110 md:hidden group-hover:block" 
                title="Espiar"
            >
                <Eye size={18} />
            </button>
        </div>
        
        <div className="aspect-square w-full flex items-center justify-center relative z-0">
          <div className="absolute inset-0 bg-red-50 rounded-full scale-0 group-hover:scale-125 transition-transform duration-500 opacity-50 blur-xl"></div>
          
          {/* Main Image with Transition */}
          <img 
            src={productImages[currentImageIndex]} 
            alt={`${name} - Imagem ${currentImageIndex + 1}`} 
            className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300 group-hover:scale-110" 
          />
          
          {/* Navigation Arrows (Desktop - Hover) */}
          {productImages.length > 1 && (
             <>
                <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow-md text-gray-600 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all hidden md:block"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow-md text-gray-600 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all hidden md:block"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {productImages.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-red-600 w-3' : 'bg-gray-300'}`}
                        ></div>
                    ))}
                </div>
             </>
          )}

          {/* Quick View Button (Desktop Center Overlay) */}
          <button 
            onClick={handleQuickViewClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-900 px-6 py-3 rounded-full font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hidden md:flex items-center gap-2 hover:bg-red-600 hover:text-white"
          >
            <Eye size={16} />
            ESPIAR
          </button>
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
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-9 w-full sm:w-auto" onClick={e => e.stopPropagation()}>
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
