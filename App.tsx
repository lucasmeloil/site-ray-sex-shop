
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingHearts from './components/FloatingHearts';
import AgeGate from './components/AgeGate';
import Loader from './components/Loader';
import { CartProvider, useCart } from './CartContext';
import Cart from './components/Cart';
import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import ContactPage from './ContactPage';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import PrizeWheel from './components/PrizeWheel';
import AddProductModal from './components/AddProductModal';
import CheckoutModal from './components/CheckoutModal';
import { INITIAL_PRODUCTS } from './constants';
import type { Product } from './types';

const ADMIN_EMAIL = 'ray@sexshop.com.br';
const ADMIN_PASS = 'admin123';

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState<'home' | 'catalog' | 'contact' | 'admin'>('home');
  const [targetProductId, setTargetProductId] = useState<number | null>(null);
  
  const { clearCart } = useCart();
  
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('ray_sexshop_products');
      if (savedProducts) {
        return JSON.parse(savedProducts);
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
    }
    return INITIAL_PRODUCTS;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
      setIsAgeVerified(true);
    }
    
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
        setIsLoggedIn(true);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ray_sexshop_products', JSON.stringify(products));
    } catch (error) {
        console.error("Failed to save products to localStorage", error);
    }
  }, [products]);

  const handleAgeVerification = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setIsAgeVerified(true);
  };
  
  if (isLoading) {
    return <Loader />;
  }

  if (!isAgeVerified && page !== 'admin') {
    return <AgeGate onVerify={handleAgeVerification} />;
  }

  const handleNavigate = (targetPage: 'home' | 'catalog' | 'contact' | 'admin', productId?: number) => {
    setPage(targetPage);
    setTargetProductId(productId || null);
    if (targetPage === 'catalog' && !productId) {
      setTargetProductId(null); // Clear target when just navigating to catalog
    }
    window.scrollTo(0, 0);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    }
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
          ...productData,
        };
        setProducts(prevProducts => [newProduct, ...prevProducts]);
        setIsAddModalOpen(false);
        resolve();
      }, 1000);
    });
  };
  
  const handleLogin = (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
          sessionStorage.setItem('adminLoggedIn', 'true');
          setIsLoggedIn(true);
          resolve();
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    setPage('home');
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmCheckout = (whatsappUrl: string) => {
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsCheckoutOpen(false);
  };

  const renderAdminSection = () => {
    if (isLoggedIn) {
      return (
        <AdminPage
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onLogout={handleLogout}
        />
      );
    }
    return <LoginPage onLogin={handleLogin} />;
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {page !== 'admin' && <FloatingHearts />}
      {page !== 'admin' && (
        <Header 
          onNavigate={(p) => handleNavigate(p as 'home' | 'catalog' | 'contact')} 
          onCartClick={() => setIsCartOpen(true)} 
          onAdminClick={() => handleNavigate('admin')}
        />
      )}
      
      <main className="relative z-10">
        {page === 'home' && <HomePage onNavigate={handleNavigate} products={products} onWheelClick={() => setIsWheelOpen(true)} />}
        {page === 'catalog' && <CatalogPage products={products} targetProductId={targetProductId} />}
        {page === 'contact' && <ContactPage />}
        {page === 'admin' && renderAdminSection()}
      </main>
      
      {page !== 'admin' && <Footer />}
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleOpenCheckout} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} onConfirm={handleConfirmCheckout} />
      <PrizeWheel isOpen={isWheelOpen} onClose={() => setIsWheelOpen(false)} />
      {isAddModalOpen && <AddProductModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddProduct} />}
    </div>
  );
};


const App: React.FC = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);


export default App;
