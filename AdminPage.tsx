

import React, { useState } from 'react';
import type { Product, AdminUser } from './types';
import AdminProfilePage from './AdminProfilePage';
// FIX: 'AdminProductRow' was not imported, causing a reference error.
import AdminProductRow from './components/AdminProductRow';

interface AdminPageProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onOpenAddModal: () => void;
  onLogout: () => void;
  adminUsers: AdminUser[];
  onAddAdmin: (newAdmin: Omit<AdminUser, 'id'>) => void;
  onUpdateAdminPassword: (userId: number, newPassword: string) => void;
  currentUser: AdminUser;
}

type AdminTab = 'products' | 'users';

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-purple-800 p-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-pink-400">Painel de Administração</h1>
        <button
          onClick={props.onLogout}
          className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </header>
      
      <nav className="flex border-b border-purple-800 px-4 md:px-8">
        <button 
          onClick={() => setActiveTab('products')} 
          className={`py-3 px-4 text-sm font-semibold transition-colors ${activeTab === 'products' ? 'border-b-2 border-pink-500 text-white' : 'text-gray-400'}`}
        >
          Gerenciar Produtos
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          className={`py-3 px-4 text-sm font-semibold transition-colors ${activeTab === 'users' ? 'border-b-2 border-pink-500 text-white' : 'text-gray-400'}`}
        >
          Gerenciar Admins
        </button>
      </nav>

      <main className="p-4 md:p-8">
        {activeTab === 'products' && (
          <AdminProductSection
            products={props.products}
            onUpdateProduct={props.onUpdateProduct}
            onDeleteProduct={props.onDeleteProduct}
            onOpenAddModal={props.onOpenAddModal}
          />
        )}
        {activeTab === 'users' && (
          <AdminProfilePage 
            adminUsers={props.adminUsers}
            onAddAdmin={props.onAddAdmin}
            onUpdateAdminPassword={props.onUpdateAdminPassword}
            currentUser={props.currentUser}
          />
        )}
      </main>
    </div>
  );
};


// Extracted the product management part into its own component for clarity
const AdminProductSection: React.FC<Omit<AdminPageProps, 'onLogout' | 'adminUsers' | 'onAddAdmin' | 'onUpdateAdminPassword' | 'currentUser'>> = ({ products, onUpdateProduct, onDeleteProduct, onOpenAddModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'price'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilter, setActiveFilter] = useState<'all' | 'promotion'>('all');

  const filteredAndSortedProducts = React.useMemo(() => {
    let tempProducts = [...products];

    if (activeFilter === 'promotion') {
        tempProducts = tempProducts.filter(p => p.isPromotion);
    }

    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    tempProducts.sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'price') {
        const priceA = parseFloat(a.price.replace('R$ ', '').replace(',', '.'));
        const priceB = parseFloat(b.price.replace('R$ ', '').replace(',', '.'));
        comparison = priceA - priceB;
      } else {
        comparison = a.name.localeCompare(b.name);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return tempProducts;
  }, [products, searchTerm, sortKey, sortDirection, activeFilter]);

  const handleSort = (key: 'name' | 'price') => {
    if (key === sortKey) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };
  
  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Filtrar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border-2 border-purple-700 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="flex items-center gap-4">
           <button onClick={onOpenAddModal} className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-pink-600 transition-colors">
              + Adicionar Produto
            </button>
          <div className="flex items-center gap-2 text-sm">
            <span>Ordenar por:</span>
            <select 
              value={sortKey} 
              onChange={(e) => handleSort(e.target.value as 'name' | 'price')}
              className="bg-gray-800 border border-purple-700 rounded-md p-2"
            >
              <option value="name">Nome</option>
              <option value="price">Preço</option>
            </select>
            <button onClick={() => handleSort(sortKey)} className="p-2 bg-gray-800 border border-purple-700 rounded-md">
              {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
      
       <div className="flex border-b border-purple-800 mb-4">
        <button 
          onClick={() => setActiveFilter('all')} 
          className={`py-2 px-4 text-sm font-semibold transition-colors ${activeFilter === 'all' ? 'border-b-2 border-pink-500 text-white' : 'text-gray-400'}`}
        >
          Todos os Produtos
        </button>
        <button 
          onClick={() => setActiveFilter('promotion')} 
          className={`py-2 px-4 text-sm font-semibold transition-colors ${activeFilter === 'promotion' ? 'border-b-2 border-pink-500 text-white' : 'text-gray-400'}`}
        >
          Produtos em Promoção
        </button>
      </div>
      
      <div className="space-y-3">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map(product => (
            <AdminProductRow
              key={product.id}
              product={product}
              onUpdate={onUpdateProduct}
              onDelete={onDeleteProduct}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 py-8">Nenhum produto encontrado para os filtros selecionados.</p>
        )}
      </div>
    </>
  );
};


export default AdminPage;