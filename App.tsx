
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
import { INITIAL_PRODUCTS, INITIAL_ADMIN_USERS } from './constants';
import type { Product, AdminUser, NavLink } from './types';

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
  
  const [products, setProducts] = useState<Product[]>([]);
  
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
        const savedUsers = localStorage.getItem('ray_sexshop_admins');
        if (savedUsers) {
            return JSON.parse(savedUsers);
        }
    } catch (error) {
        console.error("Failed to parse admin users from localStorage", error);
    }
    return INITIAL_ADMIN_USERS;
  });

  const [loggedInUser, setLoggedInUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (ageVerified === 'true') setIsAgeVerified(true);
    
    const loggedInUserEmail = sessionStorage.getItem('adminLoggedIn');
    if (loggedInUserEmail) {
        const user = adminUsers.find(u => u.email === loggedInUserEmail);
        if (user) setLoggedInUser(user);
    }

    fetchProducts();

    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
        setProducts(INITIAL_PRODUCTS);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(INITIAL_PRODUCTS);
    }
  };


  useEffect(() => {
    try {
        localStorage.setItem('ray_sexshop_admins', JSON.stringify(adminUsers));
    } catch (error) {
        console.error("Failed to save admin users to localStorage", error);
    }
  }, [adminUsers]);

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

  const handleUpdateProduct = async (updatedProduct: Product): Promise<void> => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(prevProducts => 
          prevProducts.map(p => p.id === data.id ? data : p)
        );
      } else {
        const errorData = await response.json();
        console.error('Failed to update product:', errorData);
        throw new Error(errorData.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        const response = await fetch(`/api/products?id=${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>): Promise<void> => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts(prevProducts => [newProduct, ...prevProducts]);
        setIsAddModalOpen(false);
      } else {
        console.error('Failed to add product');
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };
  
  const handleLogin = (email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = adminUsers.find(u => u.email === email && u.password === pass);
        if (user) {
          sessionStorage.setItem('adminLoggedIn', user.email);
          setLoggedInUser(user);
          resolve();
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    setLoggedInUser(null);
    setPage('home');
  };

  const handleAddAdmin = (newAdmin: Omit<AdminUser, 'id'>) => {
      const newId = adminUsers.length > 0 ? Math.max(...adminUsers.map(u => u.id)) + 1 : 1;
      setAdminUsers(prev => [...prev, { ...newAdmin, id: newId }]);
  };

  const handleUpdateAdminPassword = (userId: number, newPassword: string) => {
      setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, password: newPassword } : u));
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
          adminUsers={adminUsers}
          onAddAdmin={handleAddAdmin}
          onUpdateAdminPassword={handleUpdateAdminPassword}
          currentUser={loggedInUser}
        />
      );
    }
    return <LoginPage onLogin={handleLogin} />;
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen font-sans">
      {page !== 'admin' && <FloatingHearts />}
      {page !== 'admin' && (
        <Header 
          currentPage={page}
          onNavigate={(p) => handleNavigate(p)} 
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
