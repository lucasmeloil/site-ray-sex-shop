
import React, { useContext, useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { CartContext } from '../CartContext';
import type { CartContextType, NavLink } from '../types';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Phone, 
  Info, 
  LogIn, 
  ChevronRight 
} from 'lucide-react';

interface HeaderProps {
    onNavigate: (page: NavLink['id'] | 'admin') => void;
    onCartClick: () => void;
    onAdminClick: () => void;
    currentPage: NavLink['id'] | 'admin';
}

const BRAND_LOGO_URL = 'https://image2url.com/images/1761343291020-59b1ead0-0c00-4f56-ade4-696d390a6c7b.png';

const Header: React.FC<HeaderProps> = ({ onNavigate, onCartClick, onAdminClick, currentPage }) => {
  const { itemCount } = useContext(CartContext) as CartContextType;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavigate = (page: NavLink['id'] | 'admin') => {
      if (page === 'admin') {
          onAdminClick();
      } else {
          onNavigate(page as NavLink['id']);
      }
      setIsMobileMenuOpen(false);
  };

  const getIconForLink = (id: string) => {
      switch(id) {
          case 'home': return <Home size={20} />;
          case 'catalog': return <ShoppingBag size={20} />;
          case 'about': return <Info size={20} />;
          case 'contact': return <Phone size={20} />;
          default: return <ChevronRight size={20} />;
      }
  };

  return (
    <>
      {/* --- DESKTOP HEADER --- */}
      <header 
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between border-b transition-all duration-300 ease-in-out
        ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md py-3 px-8 shadow-md border-gray-200' 
            : 'bg-white/80 backdrop-blur-sm py-5 px-8 border-transparent'
        }`}
      >
        <button onClick={() => onNavigate('home')} className="relative group">
          <img 
            src={BRAND_LOGO_URL} 
            alt="Ray Sexshop Logo" 
            className={`w-auto transition-all duration-300 ${isScrolled ? 'h-10' : 'h-14'}`} 
          />
        </button>

        <nav className="flex items-center gap-10">
          <ul className="flex space-x-10">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <button 
                  onClick={() => onNavigate(link.id)} 
                  className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group py-2
                    ${currentPage === link.id ? 'text-red-600' : 'text-gray-600 hover:text-red-500'}
                  `}
                >
                  {link.name}
                  <span className={`absolute left-0 bottom-0 h-0.5 bg-red-600 transition-all duration-300 rounded-full
                     ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}></span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
            <button 
                onClick={onCartClick} 
                className="relative text-gray-600 hover:text-red-600 transition-all duration-300 p-2 rounded-full hover:bg-red-50 group"
                title="Carrinho"
            >
              <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce ring-2 ring-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button 
                onClick={onAdminClick} 
                className="text-gray-600 hover:text-red-600 transition-all duration-300 p-2 rounded-full hover:bg-red-50 group"
                title="Área Administrativa"
            >
              <User size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </nav>
      </header>

      {/* --- MOBILE TOP BAR --- */}
      <header 
        className={`md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 transition-all duration-300 border-b
        ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md py-2 shadow-sm border-gray-200' 
            : 'bg-white/90 backdrop-blur-sm py-3 border-gray-100'
        }`}
      >
         {/* Left: Logo */}
         <button onClick={() => onNavigate('home')} className="flex items-center">
            <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className={`w-auto transition-all ${isScrolled ? 'h-8' : 'h-10'}`} />
         </button>
         
         {/* Right: Actions */}
         <div className="flex items-center gap-3">
             <button onClick={onCartClick} className="relative p-2 text-gray-700 hover:text-red-600 transition-colors">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-1 ring-white">
                        {itemCount}
                    </span>
                )}
             </button>
             <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="p-2 text-gray-800 hover:text-red-600 transition-colors bg-gray-50 rounded-lg border border-gray-100 active:scale-95"
             >
                <Menu size={24} />
             </button>
         </div>
      </header>
      
      {/* --- MOBILE SIDE DRAWER (Right Aligned) --- */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm transition-opacity duration-300
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      
      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         
         {/* Drawer Header */}
         <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-red-50 to-white">
             <span className="font-bold text-lg text-gray-800 uppercase tracking-wide">Menu</span>
             <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 -mr-2 text-gray-500 hover:text-red-600 hover:bg-white rounded-full transition-all shadow-sm"
             >
                <X size={24} />
             </button>
         </div>

         {/* Drawer Navigation */}
         <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                    <li key={link.id}>
                        <button 
                            onClick={() => handleMobileNavigate(link.id)}
                            className={`w-full text-left p-4 rounded-xl font-semibold flex items-center justify-between group transition-all duration-200 border
                                ${currentPage === link.id 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-200' 
                                    : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50 hover:border-red-200 hover:text-red-600'}`}
                        >
                            <span className="flex items-center gap-4">
                                {getIconForLink(link.id)}
                                {link.name}
                            </span>
                            {currentPage !== link.id && <ChevronRight size={18} className="text-gray-300 group-hover:text-red-400" />}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100">
                <button 
                    onClick={() => handleMobileNavigate('admin')}
                    className={`w-full text-left p-4 rounded-xl font-semibold flex items-center gap-4 transition-all duration-200
                            ${currentPage === 'admin' 
                            ? 'bg-gray-800 text-white shadow-lg' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                    <LogIn size={20} />
                    Área Administrativa
                </button>
            </div>
         </nav>
         
         {/* Drawer Footer */}
         <div className="p-6 bg-gray-50 text-center">
            <p className="text-xs text-gray-400">Ray Sexshop &copy; 2025</p>
         </div>
      </div>

      {/* --- MOBILE BOTTOM NAV (Quick Actions) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 flex justify-around items-center px-2 py-3 pb-safe transition-transform duration-300">
        
        <button 
            onClick={() => onNavigate('home')} 
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16 group
                ${currentPage === 'home' ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-400'}`}
        >
            <Home size={24} strokeWidth={currentPage === 'home' ? 2.5 : 2} className="group-active:scale-90 transition-transform" />
        </button>

        <button 
            onClick={() => onNavigate('catalog')} 
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16 group
                ${currentPage === 'catalog' ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-400'}`}
        >
            <ShoppingBag size={24} strokeWidth={currentPage === 'catalog' ? 2.5 : 2} className="group-active:scale-90 transition-transform" />
        </button>

        <button 
            onClick={onCartClick} 
            className="flex flex-col items-center justify-center p-2 rounded-xl relative w-16 text-gray-400 hover:text-red-600 group active:scale-95 transition-transform"
        >
             <div className="relative">
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
                        {itemCount}
                    </span>
                )}
             </div>
        </button>

         <button 
            onClick={() => onNavigate('contact')} 
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16 group
                ${currentPage === 'contact' ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-400'}`}
        >
            <Phone size={24} strokeWidth={currentPage === 'contact' ? 2.5 : 2} className="group-active:scale-90 transition-transform" />
        </button>

      </nav>
    </>
  );
};

export default Header;
