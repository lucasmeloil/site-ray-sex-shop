
import React, { useState } from 'react';
import type { Product } from '../types';

interface AdminProductRowProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const AdminProductRow: React.FC<AdminProductRowProps> = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const handleInputChange = (field: keyof Product, value: string | boolean) => {
    setEditedProduct(prev => ({ ...prev, [field]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onUpdate(editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const handlePromotionToggle = () => {
    onUpdate({ ...product, isPromotion: !product.isPromotion });
  }

  // Estilos comuns para inputs no admin para garantir visibilidade
  const inputStyle = "bg-white text-gray-900 border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400";

  if (isEditing) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border-2 border-red-500 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
           <div className="flex flex-col items-center">
             <img src={editedProduct.imageUrl} alt={editedProduct.name} className="w-20 h-20 object-cover rounded-md border border-gray-200" />
             <input type="file" id={`image-${product.id}`} accept="image/*" onChange={handleImageChange} className="hidden"/>
             <label htmlFor={`image-${product.id}`} className="mt-2 text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer bg-white px-2 py-1 rounded border border-red-200 shadow-sm">Alterar Foto</label>
           </div>
           <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="text" value={editedProduct.name} onChange={e => handleInputChange('name', e.target.value)} className={inputStyle} placeholder="Nome" />
              <input type="text" value={editedProduct.sku} onChange={e => handleInputChange('sku', e.target.value)} className={inputStyle} placeholder="SKU" />
              <input type="text" value={editedProduct.category} onChange={e => handleInputChange('category', e.target.value)} className={inputStyle} placeholder="Categoria" />
              <input type="text" value={editedProduct.price} onChange={e => handleInputChange('price', e.target.value)} className={inputStyle} placeholder="Preço (R$)" />
              <input type="text" value={editedProduct.originalPrice || ''} onChange={e => handleInputChange('originalPrice', e.target.value)} className={inputStyle} placeholder="Preço Orig. (Opcional)" />
               <label className="flex items-center justify-center gap-2 cursor-pointer bg-white p-2 rounded border border-gray-300 hover:bg-gray-50">
                 <input type="checkbox" checked={editedProduct.isPromotion} onChange={e => handleInputChange('isPromotion', e.target.checked)} className="h-5 w-5 rounded text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500" />
                 <span className="text-sm font-bold text-gray-700">Promoção</span>
              </label>
           </div>
        </div>
        <textarea value={editedProduct.description} onChange={e => handleInputChange('description', e.target.value)} className={inputStyle} rows={3} placeholder="Descrição Longa"></textarea>
        <input type="text" value={editedProduct.shortDescription} onChange={e => handleInputChange('shortDescription', e.target.value)} className={inputStyle} placeholder="Descrição Curta (Ex: 10% no PIX)" />
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-colors">Cancelar</button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg">Salvar Alterações</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow">
      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0 border border-gray-100" />
      <div className="flex-grow text-center md:text-left">
        <p className="font-bold text-gray-800 text-lg">{product.name} <span className="text-xs text-gray-500 font-normal">(SKU: {product.sku})</span></p>
        <p className="text-red-600 font-bold">{product.price} {product.originalPrice && <span className="text-gray-400 line-through text-sm ml-2 font-normal">{product.originalPrice}</span>}</p>
        <p className="text-sm text-gray-500 mt-1">{product.shortDescription}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <label htmlFor={`promo-${product.id}`} className="flex items-center cursor-pointer" title="Marcar como promoção">
          <div className="relative">
            <input id={`promo-${product.id}`} type="checkbox" className="sr-only" checked={product.isPromotion} onChange={handlePromotionToggle} />
            <div className={`block w-12 h-7 rounded-full transition-colors ${product.isPromotion ? 'bg-red-500' : 'bg-gray-200'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform shadow-sm ${product.isPromotion ? 'transform translate-x-5' : ''}`}></div>
          </div>
        </label>
        <button onClick={() => setIsEditing(true)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Editar">
             ✏️
        </button>
        <button onClick={() => onDelete(product.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Excluir">
            🗑️
        </button>
      </div>
    </div>
  );
};

export default AdminProductRow;
