import React, { useState, useMemo } from 'react';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import type { Product } from './types';

interface CatalogPageProps {
  initialCategory?: string;
  products: Product[];
}

const ITEMS_PER_PAGE = 12;

const CatalogPage: React.FC<CatalogPageProps> = ({ initialCategory, products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Todos');
  const [searchQuery, setSearchQuery] = useState('');

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
    <section id="catalog" className="py-28 px-4 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 pt-12 md:pt-0">
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-400">Nosso Catálogo</h2>
          <div className="mt-2 w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
             <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar por nome ou código..."
              className="w-full bg-gray-900 border-2 border-purple-800 rounded-full py-3 px-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full border-2 transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-pink-500 border-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.7)]'
                  : 'bg-gray-800/50 border-purple-800 text-gray-300 hover:border-pink-500 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                variant="catalog" 
                isPromotion={product.isPromotion}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">Nenhum produto encontrado.</p>
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