import React, { useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const context = useContext(CartContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!context) return null;
  const { cart, removeFromCart, updateQuantity, itemCount, totalPrice } = context;
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end" onClick={onClose}>
      <div 
        className="w-full max-w-md h-full bg-white shadow-2xl shadow-red-500/20 flex flex-col border-l-2 border-red-300 transform transition-transform duration-300 ease-in-out" 
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex justify-between items-center p-4 border-b border-red-200">
          <h2 className="text-2xl font-bold text-red-500">Seu Carrinho ({itemCount})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-2xl">❌</button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <p className="text-gray-600 text-lg">Seu carrinho está vazio.</p>
            <button onClick={onClose} className="mt-4 bg-red-500 text-white font-bold py-2 px-6 rounded-full text-md hover:bg-red-600 transition-all duration-300">
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-red-500">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-red-200 hover:bg-red-300 text-sm">➖</button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-red-200 hover:bg-red-300 text-sm">➕</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 ml-2 text-xl">🗑️</button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-red-200 space-y-4">
              <div className="flex justify-between text-xl font-bold">
                <span className="text-gray-700">Total:</span>
                <span className="text-red-500">{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-full text-lg uppercase tracking-wider hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
