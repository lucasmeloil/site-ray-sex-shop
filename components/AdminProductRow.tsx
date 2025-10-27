

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

  if (isEditing) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border-2 border-red-500 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
           <div className="flex flex-col items-center">
             <img src={editedProduct.imageUrl} alt={editedProduct.name} className="w-20 h-20 object-cover rounded-md" />
             <input type="file" id={`image-${product.id}`} accept="image/*" onChange={handleImageChange} className="hidden"/>
             <label htmlFor={`image-${product.id}`} className="mt-2 text-xs text-red-500 hover:text-red-600 cursor-pointer">Alterar</label>
           </div>
           <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="text" value={editedProduct.name} onChange={e => handleInputChange('name', e.target.value)} className="bg-white p-2 rounded w-full border border-red-200" placeholder="Nome" />
              <input type="text" value={editedProduct.sku} onChange={e => handleInputChange('sku', e.target.value)} className="bg-white p-2 rounded w-full border border-red-200" placeholder="SKU" />
              <input type="text" value={editedProduct.category} onChange={e => handleInputChange('category', e.target.value)} className="bg-white p-2 rounded w-full border border-red-200" placeholder="Categoria" />
              <input type="text" value={editedProduct.price} onChange={e => handleInputChange('price', e.target.value)} className="bg-white p-2 rounded w-full border border-red-200" placeholder="Preço Promocional (R$ 99,90)" />
              <input type="text" value={editedProduct.originalPrice || ''} onChange={e => handleInputChange('originalPrice', e.target.value)} className="bg-white p-2 rounded w-full border border-red-200" placeholder="Preço Original (R$ 129,90)" />
               <label className="flex items-center justify-center gap-2 cursor-pointer bg-white p-2 rounded border border-red-200">
                 <input type="checkbox" checked={editedProduct.isPromotion} onChange={e => handleInputChange('isPromotion', e.target.checked)} className="h-4 w-4 rounded text-red-500 bg-gray-100 border-red-300 focus:ring-red-500" />
                 <span className="text-sm">Promoção</span>
              </label>
           </div>
        </div>
        <textarea value={editedProduct.description} onChange={e => handleInputChange('description', e.target.value)} className="bg-white p-2 rounded w-full text-sm border border-red-200" rows={2} placeholder="Descrição Longa"></textarea>
        <input type="text" value={editedProduct.shortDescription} onChange={e => handleInputChange('shortDescription', e.target.value)} className="bg-white p-2 rounded w-full text-sm border border-red-200" placeholder="Descrição Curta (Ex: 10% no PIX)" />
        <div className="flex justify-end gap-2">
          <button onClick={handleCancel} className="p-2 text-2xl" title="Cancelar">❌</button>
          <button onClick={handleSave} className="p-2 text-2xl" title="Salvar">✔️</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-lg border border-red-200 flex flex-col md:flex-row items-center gap-4">
      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
      <div className="flex-grow text-center md:text-left">
        <p className="font-bold">{product.name} <span className="text-xs text-gray-500">(SKU: {product.sku})</span></p>
        <p className="text-red-500 font-semibold">{product.price} {product.originalPrice && <span className="text-gray-500 line-through text-sm ml-2">{product.originalPrice}</span>}</p>
        <p className="text-xs text-gray-600 mt-1">{product.shortDescription}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <label htmlFor={`promo-${product.id}`} className="flex items-center cursor-pointer" title="Marcar como promoção">
          <div className="relative">
            <input id={`promo-${product.id}`} type="checkbox" className="sr-only" checked={product.isPromotion} onChange={handlePromotionToggle} />
            <div className={`block w-12 h-6 rounded-full ${product.isPromotion ? 'bg-red-500' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${product.isPromotion ? 'transform translate-x-6' : ''}`}></div>
          </div>
        </label>
        <button onClick={() => setIsEditing(true)} className="p-2 text-2xl" title="Editar">✏️</button>
        <button onClick={() => onDelete(product.id)} className="p-2 text-2xl" title="Excluir">🗑️</button>
      </div>
    </div>
  );
};

export default AdminProductRow;
