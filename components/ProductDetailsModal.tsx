
import React, { useContext, useState, useEffect } from 'react';
import type { Product } from '../types';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';
import { ShoppingCart, X, Check, ShieldCheck, Truck, CreditCard } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext) as CartContextType;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.imageUrl);

  // Determine image list
  const productImages = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Reset image when product changes (if reused)
    setCurrentImage(productImages[0]);
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
      
      <div 
        className="relative bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-all text-gray-500 hover:text-red-600 backdrop-blur-md"
        >
          <X size={24} />
        </button>

        {/* Left: Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 relative flex flex-col p-6 md:p-8">
            <div className="flex-1 relative flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-red-50/50 mix-blend-multiply rounded-xl"></div>
                <img 
                    src={currentImage} 
                    alt={product.name} 
                    className="relative z-10 w-full h-full object-contain max-h-[300px] md:max-h-[350px] transition-all duration-300"
                />
                 {product.isPromotion && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg uppercase tracking-wider z-20">
                        Oferta Especial
                    </div>
                 )}
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
                    {productImages.map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentImage(img)}
                            className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all ${currentImage === img ? 'border-red-500 opacity-100 ring-2 ring-red-200' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Right: Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
            <div className="mb-6">
                <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 block">{product.category}</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3">{product.name}</h2>
                <p className="text-gray-500 font-light text-sm">SKU: {product.sku}</p>
            </div>

            <div className="flex items-end gap-3 mb-8 border-b border-gray-100 pb-6">
                <span className="text-4xl font-black text-gray-900">{product.price}</span>
                {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mb-1">{product.originalPrice}</span>
                )}
            </div>

            <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
                <p className="font-semibold text-gray-800 mb-2">Descrição:</p>
                <p>{product.description}</p>
            </div>

            {/* Actions */}
            <div className="mt-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex items-center bg-gray-100 rounded-xl px-2 h-14 w-full sm:w-40 border border-transparent focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 transition-all">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-500 hover:text-red-600 font-bold text-xl active:scale-90 transition-transform">-</button>
                        <span className="flex-1 text-center font-bold text-lg text-gray-900">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-gray-500 hover:text-red-600 font-bold text-xl active:scale-90 transition-transform">+</button>
                    </div>
                    
                    <button 
                        onClick={handleAddToCart}
                        className={`h-14 flex-1 rounded-xl font-bold text-lg uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1 active:scale-95
                        ${isAdded 
                            ? 'bg-green-600 text-white shadow-green-200' 
                            : 'bg-red-600 text-white hover:bg-red-700 shadow-red-200'}`}
                    >
                        {isAdded ? <Check size={24} /> : <ShoppingCart size={24} />}
                        {isAdded ? 'Adicionado' : 'Adicionar ao Carrinho'}
                    </button>
                </div>
                
                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 font-semibold uppercase tracking-wide text-center">
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50">
                        <ShieldCheck size={18} className="text-red-500" />
                        <span>Compra Segura</span>
                    </div>
                     <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50">
                        <Truck size={18} className="text-red-500" />
                        <span>Entrega Discreta</span>
                    </div>
                     <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50">
                        <CreditCard size={18} className="text-red-500" />
                        <span>Até 12x no Cartão</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
