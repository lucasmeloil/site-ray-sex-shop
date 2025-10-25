
import React, { useState, useMemo } from 'react';
import type { Product } from './types';
import AdminProductRow from './components/AdminProductRow';

interface AdminPageProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onOpenAddModal: () => void;
  onLogout: () => void;
}

type SortKey = 'name' | 'price';
type SortDirection = 'asc' | 'desc';
type Filter = 'all' | 'promotion';

const AdminPage: React.FC<AdminPageProps> = ({ products, onUpdateProduct, onDeleteProduct, onOpenAddModal, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = [...products];

    // Promotion filter
    if (activeFilter === 'promotion') {
        tempProducts = tempProducts.filter(p => p.isPromotion);
    }

    // Search term filtering
    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
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

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const renderTabs = () => (
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
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-purple-800 p-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-pink-400">Painel de Administração</h1>
        <button
          onClick={onLogout}
          className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </header>

      <main className="p-4 md:p-8">
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
                onChange={(e) => handleSort(e.target.value as SortKey)}
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
        
        {renderTabs()}
        
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
      </main>
    </div>
  );
};

export default AdminPage;