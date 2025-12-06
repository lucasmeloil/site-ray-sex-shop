
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
import ProductDetailsModal from './components/ProductDetailsModal';
import { api } from './services/api';
import type { Product, AdminUser, NavLink, HeroSlide } from './types';

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState<'home' | 'catalog' | 'contact' | 'admin'>('home');
  const [targetProductId, setTargetProductId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { clearCart } = useCart();
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<AdminUser | null>(null);

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
        try {
            const [fetchedProducts, fetchedAdmins, fetchedSlides] = await Promise.all([
                api.products.list(),
                api.admins.list(),
                api.slides.list()
            ]);
            setProducts(fetchedProducts);
            setAdminUsers(fetchedAdmins);
            setHeroSlides(fetchedSlides);
        } catch (error) {
            console.error("Erro crítico ao conectar com API:", error);
        } finally {
             // Simulate Minimum loading time for aesthetics
             setTimeout(() => setIsLoading(false), 1000);
        }
    };

    loadData();

    const ageVerified = sessionStorage.getItem('ageVerified');
    if (ageVerified === 'true') setIsAgeVerified(true);
    
    // Check for persistent login
    const checkLogin = async () => {
        const loggedInUserEmail = sessionStorage.getItem('adminLoggedIn');
        if (loggedInUserEmail) {
            const admins = await api.admins.list();
            const user = admins.find(u => u.email === loggedInUserEmail);
            if (user) setLoggedInUser(user);
        }
    }
    checkLogin();
  }, []);

  const handleAgeVerification = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setIsAgeVerified(true);
  };
  
  if (isLoading) return <Loader />;

  if (!isAgeVerified && page !== 'admin') {
    return <AgeGate onVerify={handleAgeVerification} />;
  }

  const handleNavigate = (targetPage: NavLink['id'] | 'admin', productId?: number) => {
    if (targetPage === 'about') {
      setPage('home');
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setPage(targetPage as 'home' | 'catalog' | 'contact' | 'admin');
      setTargetProductId(productId || null);
      if (targetPage === 'catalog' && !productId) setTargetProductId(null);
      window.scrollTo(0, 0);
    }
  };

  const handleOpenProductDetails = (product: Product) => {
      setSelectedProduct(product);
  };

  // --- API Handlers ---

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
        const savedProduct = await api.products.update(updatedProduct);
        setProducts(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p));
    } catch (error) {
        alert("Erro de conexão ao atualizar produto.");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
          await api.products.delete(productId);
          setProducts(prev => prev.filter(p => p.id !== productId));
      } catch (error) {
          alert("Erro de conexão ao excluir produto.");
      }
    }
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    try {
        const newProduct = await api.products.create(productData);
        setProducts(prev => [newProduct, ...prev]);
        setIsAddModalOpen(false);
    } catch (error) {
        console.error(error);
        throw new Error("Erro de conexão com o banco de dados.");
    }
  };
  
  // FIX: Login now calls API directly instead of relying on potentially stale state
  const handleLogin = async (email: string, pass: string): Promise<void> => {
     try {
        const user = await api.admins.login(email, pass);
        if (user) {
            sessionStorage.setItem('adminLoggedIn', user.email);
            setLoggedInUser(user);
        } else {
            throw new Error('Credenciais inválidas');
        }
     } catch (e) {
         throw e;
     }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    setLoggedInUser(null);
    setPage('home');
  };

  const handleAddAdmin = async (newAdmin: Omit<AdminUser, 'id'>) => {
      try {
          const createdAdmin = await api.admins.create(newAdmin);
          setAdminUsers(prev => [...prev, createdAdmin]);
      } catch (error) {
          alert("Erro ao criar admin.");
      }
  };

  const handleUpdateAdminPassword = async (userId: number, newPassword: string) => {
      try {
          await api.admins.updatePassword(userId, newPassword);
          setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, password: newPassword } : u));
      } catch (error) {
          alert("Erro ao atualizar senha.");
      }
  };

  const handleUpdateSlide = async (updatedSlide: HeroSlide) => {
      try {
          const savedSlide = await api.slides.update(updatedSlide);
          setHeroSlides(prev => prev.map(s => s.id === savedSlide.id ? savedSlide : s));
      } catch (error) {
          alert("Erro ao atualizar slide.");
      }
  };

  const handleAddSlide = async (newSlide: Omit<HeroSlide, 'id'>) => {
      try {
          const createdSlide = await api.slides.create(newSlide);
          setHeroSlides(prev => [...prev, createdSlide]);
      } catch (error) {
          alert("Erro ao adicionar slide.");
      }
  };

  const handleDeleteSlide = async (slideId: number) => {
      if(heroSlides.length <= 1) {
          alert("Você deve ter pelo menos 1 slide.");
          return;
      }
      if (window.confirm('Tem certeza que deseja excluir este slide?')) {
          try {
              await api.slides.delete(slideId);
              setHeroSlides(prev => prev.filter(s => s.id !== slideId));
          } catch (error) {
              alert("Erro ao excluir slide.");
          }
      }
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
    if (loggedInUser) {
      return (
        <AdminPage
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onLogout={handleLogout}
          onBack={() => setPage('home')}
          adminUsers={adminUsers}
          onAddAdmin={handleAddAdmin}
          onUpdateAdminPassword={handleUpdateAdminPassword}
          currentUser={loggedInUser}
          heroSlides={heroSlides}
          onUpdateSlide={handleUpdateSlide}
          onAddSlide={handleAddSlide}
          onDeleteSlide={handleDeleteSlide}
        />
      );
    }
    return <LoginPage onLogin={handleLogin} onBack={() => setPage('home')} />;
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans selection:bg-red-200 selection:text-red-900">
      {page !== 'admin' && <FloatingHearts />}
      {page !== 'admin' && (
        <Header 
          currentPage={page}
          onNavigate={(p) => handleNavigate(p)} 
          onCartClick={() => setIsCartOpen(true)} 
          onAdminClick={() => handleNavigate('admin')}
        />
      )}
      
      <main className="relative z-10 pb-20 md:pb-0">
        {page === 'home' && (
            <HomePage 
                onNavigate={handleNavigate} 
                products={products} 
                onWheelClick={() => setIsWheelOpen(true)}
                heroSlides={heroSlides}
                onOpenProductDetails={handleOpenProductDetails}
            />
        )}
        {page === 'catalog' && (
            <CatalogPage 
                products={products} 
                targetProductId={targetProductId} 
                onOpenProductDetails={handleOpenProductDetails}
            />
        )}
        {page === 'contact' && <ContactPage />}
        {page === 'admin' && renderAdminSection()}
      </main>
      
      {page !== 'admin' && <Footer />}
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleOpenCheckout} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} onConfirm={handleConfirmCheckout} />
      <PrizeWheel isOpen={isWheelOpen} onClose={() => setIsWheelOpen(false)} />
      {isAddModalOpen && <AddProductModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddProduct} />}
      
      {selectedProduct && (
        <ProductDetailsModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
);

export default App;
