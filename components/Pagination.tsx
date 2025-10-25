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
            className="px-3 py-2 rounded-md bg-gray-800/50 border border-purple-800 text-gray-300 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
        </li>
        {pages.map(page => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-md border border-purple-800 font-bold transition-colors
                ${currentPage === page 
                  ? 'bg-pink-500 text-white border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.7)]' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-purple-700'
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
            className="px-3 py-2 rounded-md bg-gray-800/50 border border-purple-800 text-gray-300 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
