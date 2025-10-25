import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (whatsappUrl: string) => void;
}

const WHATSAPP_NUMBER = "45991484617";

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const { cart, totalPrice } = useContext(CartContext) as CartContextType;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const [change, setChange] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !address || !phone) {
      setError('Nome, endereço e telefone são obrigatórios.');
      return;
    }
    
    let paymentInfo = `*Forma de Pagamento:* ${paymentMethod}`;
    if (paymentMethod === 'Dinheiro' && change) {
        paymentInfo += ` (Troco para R$ ${change})`;
    }

    const productsList = cart.map(item =>
      `- ${item.quantity}x ${item.name} (${(parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`
    ).join('\n');

    const total = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const message = `
🛍️ *Novo Pedido do Site - Ray Sexshop* 🛍️

Olá! Gostaria de finalizar meu pedido:

*Produtos:*
${productsList}

*Total do Pedido:* ${total}
-----------------------------------

*Dados para Entrega:*
👤 *Nome:* ${name}
📞 *Telefone:* ${phone}
📍 *Endereço:* ${address}
${cpf ? `📄 *CPF:* ${cpf}` : ''}

${paymentInfo}

Aguardando as instruções para o pagamento. Obrigado! 😊
    `.trim();

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    onConfirm(whatsappUrl);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-gray-900 border-2 border-purple-800 rounded-2xl shadow-2xl shadow-purple-500/30 p-6 md:p-8 max-w-lg w-full text-center relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white">❌</button>
        <h2 className="text-3xl font-bold text-pink-400 mb-6">Finalizar Pedido</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome Completo*" className="w-full bg-gray-800 p-3 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" />
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Endereço Completo para Entrega*" className="w-full bg-gray-800 p-3 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" />
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone com DDD*" className="w-full bg-gray-800 p-3 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" />
          <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF (Opcional)" className="w-full bg-gray-800 p-3 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" />
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Forma de Pagamento</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full bg-gray-800 p-3 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500">
              <option>PIX</option>
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
              <option>Dinheiro</option>
            </select>
          </div>
          
          {paymentMethod === 'Dinheiro' && (
            <input type="text" value={change} onChange={e => setChange(e.target.value)} placeholder="Precisa de troco para quanto?" className="w-full bg-gray-800 p-3 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" />
          )}

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-full text-lg uppercase tracking-wider hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(147,51,234,0.5)] mt-4"
          >
            Confirmar e Enviar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;