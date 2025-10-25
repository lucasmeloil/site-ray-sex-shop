
import React, { useState, useRef, useEffect } from 'react';
import type { Product } from '../types';

interface AddProductModalProps {
  onClose: () => void;
  onAdd: (productData: Omit<Product, 'id'>) => Promise<void>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://placehold.co/300x300/ec4899/ffffff?text=Imagem');
  const [isPromotion, setIsPromotion] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trapping and close on escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    const firstInput = modalRef.current?.querySelector('input');
    firstInput?.focus();
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !sku || !category || !price || !description) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    
    const numericPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(numericPrice)) {
        setError('O preço deve ser um número válido.');
        return;
    }

    setIsLoading(true);
    try {
      await onAdd({
        name,
        sku,
        category,
        price: `R$ ${numericPrice.toFixed(2).replace('.', ',')}`,
        description,
        imageUrl,
        isPromotion,
      });
      // On success, the App component will close the modal.
    } catch (err) {
      setError('Falha ao adicionar o produto. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div
        ref={modalRef}
        className="bg-gray-900 border-2 border-purple-800 rounded-2xl shadow-2xl shadow-purple-500/30 p-6 md:p-8 max-w-4xl w-full text-center relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white">❌</button>
        <h2 className="text-3xl font-bold text-pink-400 mb-6">Adicionar Novo Produto</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left">
          {/* Image Column */}
          <div className="flex flex-col items-center justify-center gap-4 row-start-2 md:row-start-1">
            <img src={imageUrl} alt="Preview" className="w-48 h-48 object-cover rounded-lg border-2 border-purple-700" />
            <label htmlFor="image-upload" className="cursor-pointer text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700">
              Selecionar Imagem
            </label>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden"
              disabled={isLoading}
            />
          </div>

          {/* Fields Column */}
          <div className="space-y-4 row-start-1 md:row-start-1">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome do Produto</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 p-2 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" disabled={isLoading} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-300 mb-1">SKU</label>
                <input type="text" id="sku" value={sku} onChange={e => setSku(e.target.value)} className="w-full bg-gray-800 p-2 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" disabled={isLoading} />
              </div>
               <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Preço (R$)</label>
                <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-gray-800 p-2 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" placeholder="199,90" inputMode="decimal" disabled={isLoading} />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Categoria</label>
              <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-800 p-2 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" disabled={isLoading} />
            </div>
             <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-gray-800 p-2 rounded border border-purple-700 focus:ring-pink-500 focus:border-pink-500" disabled={isLoading}></textarea>
            </div>
            <div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isPromotion} onChange={e => setIsPromotion(e.target.checked)} className="h-4 w-4 rounded text-pink-500 bg-gray-800 border-purple-600 focus:ring-pink-500" />
                    <span className="text-sm font-medium text-gray-300">Produto em Promoção</span>
                </label>
            </div>
          </div>
          
          {/* Footer */}
          <div className="md:col-span-2">
            {error && <p className="text-red-400 text-sm text-center my-4">{error}</p>}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:bg-pink-600 transform hover:scale-105 disabled:bg-pink-800 disabled:scale-100 disabled:cursor-wait mt-4"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Salvando...</span>
                </>
              ) : (
                'Salvar Produto'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;