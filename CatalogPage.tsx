
import React, { useState, useMemo, useEffect, useRef } from 'react';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import type { Product, PageBanner } from './types';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface CatalogPageProps {
  products: Product[];
  targetProductId?: number | null;
  onOpenProductDetails: (product: Product) => void;
  pageBanner: PageBanner;
}

const ITEMS_PER_PAGE = 12;

const CatalogPage: React.FC<CatalogPageProps> = ({ products, targetProductId, onOpenProductDetails, pageBanner }) => {
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
        
        setTimeout(() => {
          const element = productRefs.current[targetProductId];
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-4', 'ring-red-300', 'rounded-2xl', 'scale-105', 'transition-transform');
            setTimeout(() => element.classList.remove('ring-4', 'ring-red-300', 'rounded-2xl', 'scale-105', 'transition-transform'), 2000);
          }
        }, 300);
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
    setCurrentPage(1);
  };

  return (
    <section id="catalog" className="bg-gray-50 min-h-screen pb-20">
      {/* --- BANNER HEADER (Dynamic) --- */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden flex items-center justify-center bg-gray-900">
         {/* Background Image */}
         <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
            style={{ backgroundImage: `url('${pageBanner.imageUrl}')` }}
         ></div>
         
         {/* Overlay - Elegant Gradient */}
         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                Catálogo Exclusivo
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-4">
               {pageBanner.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-lg font-light leading-relaxed">
               {pageBanner.subtitle}
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* --- FILTER BAR (Clean White Card) --- */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-2 md:p-4 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar produtos..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all shadow-inner group-hover:bg-white"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
            </div>

            {/* Categories Desktop */}
            <div className="hidden md:flex flex-wrap gap-2 justify-end flex-1">
                {categories.map(category => (
                    <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-xs font-bold rounded-full border transition-all duration-200
                        ${selectedCategory === category
                        ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-500/30 transform scale-105'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50'
                        }`}
                    >
                    {category}
                    </button>
                ))}
            </div>

            {/* Mobile Filter Icon (Hint for horizontal scroll) */}
            <div className="md:hidden w-full flex items-center gap-2 text-gray-400 text-xs px-2 mb-[-10px]">
                <SlidersHorizontal size={14} />
                <span>Filtrar por categoria:</span>
            </div>

            {/* Mobile Categories Scroll */}
            <div className="md:hidden w-full overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex gap-2 min-w-max">
                    {categories.map(category => (
                        <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 text-xs font-bold rounded-full border whitespace-nowrap transition-all duration-200
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
        </div>

        {/* --- PRODUCT GRID --- */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {paginatedProducts.map((product) => (
              <div key={product.id} ref={el => { productRefs.current[product.id] = el; }} className="animate-fade-in-up">
                <ProductCard 
                  product={product} 
                  onQuickView={onOpenProductDetails}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                 <Filter size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Não encontramos produtos com esses termos. Tente limpar os filtros.</p>
            <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('Todos')}} 
                className="mt-6 px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold text-sm hover:bg-red-100 transition-colors"
            >
                Limpar Filtros
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
