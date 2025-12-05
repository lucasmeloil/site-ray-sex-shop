
import React, { useState, useMemo, useEffect, useRef } from 'react';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import type { Product } from './types';
import { Search, Filter } from 'lucide-react';

interface CatalogPageProps {
  products: Product[];
  targetProductId?: number | null;
}

const ITEMS_PER_PAGE = 12;

const CatalogPage: React.FC<CatalogPageProps> = ({ products, targetProductId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const productRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const categories = useMemo(() => ['Todos', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  const filteredProducts = useMemo(() => {
    let tempProducts = products;

    if (selectedCategory !== 'Todos') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      tempProducts = tempProducts.filter(p => 
        p.name.toLowerCase().includes(lowercasedQuery) ||
        p.id.toString() === lowercasedQuery
      );
    }
    
    return tempProducts;
  }, [selectedCategory, products, searchQuery]);

  useEffect(() => {
    if (targetProductId) {
      const targetProductIndex = filteredProducts.findIndex(p => p.id === targetProductId);
      if (targetProductIndex !== -1) {
        const targetPage = Math.floor(targetProductIndex / ITEMS_PER_PAGE) + 1;
        setCurrentPage(targetPage);
        
        // Scroll to the product after the page has updated
        setTimeout(() => {
          const element = productRefs.current[targetProductId];
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-4', 'ring-red-300', 'rounded-2xl');
            setTimeout(() => element.classList.remove('ring-4', 'ring-red-300', 'rounded-2xl'), 2000);
          }
        }, 100);
      }
    }
  }, [targetProductId, filteredProducts]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  return (
    <section id="catalog" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-pattern min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 pt-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Catálogo <span className="text-red-600">Completo</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md group">
                <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar produto ou código..."
                className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all shadow-sm group-hover:shadow-md"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
            </div>

             {/* Categories (Desktop) */}
            <div className="hidden md:flex flex-wrap gap-2 justify-end">
                {categories.map(category => (
                    <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-300
                        ${selectedCategory === category
                        ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                    >
                    {category}
                    </button>
                ))}
            </div>
        </div>

        {/* Mobile Categories Scroll */}
        <div className="md:hidden overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
             <div className="flex gap-2">
                {categories.map(category => (
                    <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full border whitespace-nowrap transition-all duration-300
                        ${selectedCategory === category
                        ? 'bg-red-600 border-red-600 text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600'
                        }`}
                    >
                    {category}
                    </button>
                ))}
             </div>
        </div>

        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {paginatedProducts.map((product) => (
              <div key={product.id} ref={el => { productRefs.current[product.id] = el; }}>
                <ProductCard 
                  product={product} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Filter size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ops! Nenhum produto encontrado.</h3>
            <p className="text-gray-500">Tente ajustar seus filtros ou buscar por outro termo.</p>
            <button onClick={() => {setSearchQuery(''); setSelectedCategory('Todos')}} className="mt-6 text-red-600 hover:text-red-700 font-semibold hover:underline">
                Limpar todos os filtros
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
};

export default CatalogPage;
