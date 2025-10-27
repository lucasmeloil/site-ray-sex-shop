
import React, { useContext, useState, ReactNode } from 'react';
import { NAV_LINKS } from '../constants';
import { CartContext } from '../CartContext';
import type { CartContextType, NavLink } from '../types';
import { Menu, X, Home, ShoppingBag, Heart, Mail, ShoppingCart, Instagram, MapPin, Clock, User } from 'lucide-react';

interface HeaderProps {
    onNavigate: (page: NavLink['id'] | 'admin') => void;
    onCartClick: () => void;
    onAdminClick: () => void;
    currentPage: NavLink['id'] | 'admin';
}

const BRAND_LOGO_URL = 'https://image2url.com/images/1761343291020-59b1ead0-0c00-4f56-ade4-696d390a6c7b.png';

const MobileNavItem: React.FC<{ icon: ReactNode; text: string; onClick: () => void; }> = ({ icon, text, onClick }) => (
    <li>
        <button onClick={onClick} className="flex items-center gap-4 text-lg text-gray-800 hover:text-red-500 w-full text-left p-2 rounded-lg hover:bg-red-100 transition-colors">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-200 to-red-100 text-red-600">
                {icon}
            </span>
            <span>{text}</span>
        </button>
    </li>
);

const BottomNavItem: React.FC<{
  icon: ReactNode;
  text: string;
  onClick: () => void;
  isActive?: boolean;
  children?: ReactNode;
}> = ({ icon, text, onClick, isActive = false, children }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-full pt-2 pb-1 transition-colors relative ${
      isActive ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
    }`}
  >
    {children}
    {icon}
    <span className="text-xs">{text}</span>
  </button>
);


const Header: React.FC<HeaderProps> = ({ onNavigate, onCartClick, onAdminClick, currentPage }) => {
  const { itemCount } = useContext(CartContext) as CartContextType;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (page: NavLink['id']) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  }
  
  const handleAdminClickMobile = () => {
    onAdminClick();
    setIsMobileMenuOpen(false);
  }

  const navIcons: Record<NavLink['id'], ReactNode> = {
    home: <Home size={20} />,
    catalog: <ShoppingBag size={20} />,
    about: <Heart size={20} />,
    contact: <Mail size={20} />,
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 items-center justify-between z-50 border-b border-red-200 shadow-lg shadow-red-500/10">
        <button onClick={() => onNavigate('home')} className="flex items-center">
          <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-12 w-auto" />
        </button>
        <nav className="flex items-center gap-8">
          <ul className="flex space-x-8">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <button onClick={() => onNavigate(link.id)} className="text-lg text-gray-700 hover:text-red-500 transition-colors duration-300 relative group">
                  {link.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <button onClick={onCartClick} className="relative text-gray-700 hover:text-red-500 transition-colors">
              <ShoppingCart size={28} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
            <button onClick={onAdminClick} className="text-gray-700 hover:text-red-500 transition-colors">
              <User size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Top Nav (Logo only) */}
       <header className="md:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md p-2 z-40 border-b border-red-200 flex items-center justify-start px-4">
         <button onClick={() => onNavigate('home')} className="flex items-center">
            <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-10 w-auto" />
         </button>
      </header>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-t border-red-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          <BottomNavItem
            icon={<Home size={24} />}
            text="Início"
            onClick={() => onNavigate('home')}
            isActive={currentPage === 'home'}
          />
          <BottomNavItem
            icon={<ShoppingBag size={24} />}
            text="Catálogo"
            onClick={() => onNavigate('catalog')}
            isActive={currentPage === 'catalog'}
          />
          <BottomNavItem
            icon={<ShoppingCart size={24} />}
            text="Carrinho"
            onClick={onCartClick}
          >
            {itemCount > 0 && (
              <span className="absolute top-1 right-[20%] bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </BottomNavItem>
          <BottomNavItem
            icon={<Menu size={24} />}
            text="Menu"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </nav>
      
      {/* Mobile Side Menu */}
      {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" onClick={() => setIsMobileMenuOpen(false)}>
              <div 
                className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-red-50 p-6 flex flex-col gap-8 overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                  <div className="flex justify-between items-center">
                      <img src={BRAND_LOGO_URL} alt="Ray Sexshop Logo" className="h-10 w-auto" />
                      <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-800">
                        <X size={24} />
                      </button>
                  </div>
                  
                  <nav className="flex-grow">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Navegação</h3>
                      <ul className="space-y-1">
                          {NAV_LINKS.map(link => (
                              <MobileNavItem key={link.id} icon={navIcons[link.id]} text={link.name} onClick={() => handleMobileNav(link.id)} />
                          ))}
                           <MobileNavItem icon={<User size={20} />} text="Admin" onClick={handleAdminClickMobile} />
                      </ul>
                  </nav>

                  <div className="space-y-6">
                      <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Redes Sociais</h3>
                          <a href="https://instagram.com/ray_sexshop_cvel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg text-gray-800 hover:text-red-500 w-full text-left p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-200 to-red-100 text-red-600">
                                <Instagram size={20} />
                              </span>
                              <span>@ray_sexshop_cvel</span>
                          </a>
                      </div>

                      <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Nossa Loja</h3>
                          <div className="space-y-3 text-gray-700 text-sm">
                              <p className="flex items-start gap-3 p-2">
                                  <MapPin size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>Av. Brasil, Nº 6282, Loja 305 Central Park Shopping</span>
                              </p>
                              <p className="flex items-start gap-3 p-2">
                                  <Clock size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>Segunda a Sábado <br/>9h às 19h</span>
                              </p>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      )}
    </>
  );
};

export default Header;
