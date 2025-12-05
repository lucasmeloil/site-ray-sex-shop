import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center mt-16">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-sm"
          >
            Anterior
          </button>
        </li>
        {pages.map(page => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full font-bold transition-all duration-300 flex items-center justify-center text-sm shadow-sm
                ${currentPage === page 
                  ? 'bg-red-600 text-white shadow-red-500/40 scale-110' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50'
                }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-sm"
          >
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;