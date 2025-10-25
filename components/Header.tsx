import React, { useContext, useState } from 'react';
import { NAV_LINKS } from '../constants';
import { CartContext } from '../CartContext';
import type { CartContextType } from '../types';

interface HeaderProps {
    onNavigate: (page: 'home' | 'catalog' | 'contact') => void;
    onCartClick: () => void;
    onAdminClick: () => void;
}

const BRAND_LOGO_URL = 'https://image2url.com/images/1761343291020-59b1ead0-0c00-4f56-ade4-696d390a6c7b.png';

const Header: React.FC<HeaderProps> = ({ onNavigate, onCartClick, onAdminClick }) => {
  const { itemCount } = useContext(CartContext) as CartContextType;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileBottomNavLinks = [
    { id: 'home', icon: '🏠' },
    { id: 'catalog', icon: '🛍️' },
  ];
  
  const handleMobileNav = (page: 'home' | 'catalog' | 'contact') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md p-4 items-center justify-between z-50 border-b border-purple-900 shadow-lg shadow-purple-900/20">
        <button onClick={() => onNavigate('home')} className="flex items-center">
          <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-12 w-auto" />
        </button>
        <nav className="flex items-center gap-8">
          <ul className="flex space-x-8">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <button onClick={() => onNavigate(link.id)} className="text-lg text-gray-300 hover:text-pink-400 transition-colors duration-300 relative group">
                  {link.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <button onClick={onCartClick} className="relative text-gray-300 hover:text-pink-400 transition-colors">
              <span className="text-3xl">🛒</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
            <button onClick={onAdminClick} className="text-gray-300 hover:text-pink-400 transition-colors">
              <span className="text-3xl">👤</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Top Nav */}
       <header className="md:hidden fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md p-2 z-50 border-b border-purple-900 flex items-center justify-between px-4">
         <button onClick={() => onNavigate('home')} className="flex items-center">
            <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-10 w-auto" />
         </button>
         <button onClick={() => setIsMobileMenuOpen(true)} className="text-3xl text-gray-300">
            ☰
         </button>
      </header>
      
      {/* Mobile Side Menu */}
      {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]" onClick={() => setIsMobileMenuOpen(false)}>
              <div 
                className="fixed top-0 right-0 w-64 h-full bg-gray-900 border-l-2 border-purple-800 p-6 flex flex-col gap-8"
                onClick={(e) => e.stopPropagation()}
              >
                  <button onClick={() => setIsMobileMenuOpen(false)} className="self-end text-2xl text-gray-400">❌</button>
                  <nav>
                      <ul className="space-y-6">
                          {NAV_LINKS.map(link => (
                              <li key={link.id}>
                                  <button onClick={() => handleMobileNav(link.id)} className="text-xl text-gray-300 hover:text-pink-400 w-full text-left">{link.name}</button>
                              </li>
                          ))}
                           <li>
                                <button onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 text-xl text-gray-300 hover:text-pink-400 w-full text-left">
                                  <span>👤</span> Admin
                                </button>
                            </li>
                      </ul>
                  </nav>
              </div>
          </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-2 z-50 border-t border-purple-900 shadow-[0_-10px_25px_-5px_rgba(76,29,149,0.3)]">
        <ul className="flex justify-around">
          {mobileBottomNavLinks.map(({ id, icon }) => (
            <li key={id}>
              <button onClick={() => onNavigate(id as 'home' | 'catalog' | 'contact')} className="flex flex-col items-center text-gray-400 hover:text-pink-400 transition-colors p-2 text-2xl">
                {icon}
              </button>
            </li>
          ))}
           <li>
              <button onClick={onCartClick} className="relative flex flex-col items-center text-gray-400 hover:text-pink-400 transition-colors p-2 text-2xl">
                <span>🛒</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {itemCount}
                  </span>
                )}
              </button>
            </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;