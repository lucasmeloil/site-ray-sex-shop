
import type { Product, AdminUser, HeroSlide, CartItem } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ADMIN_USERS, INITIAL_SLIDES } from '../constants';

// Chaves do "Banco de Dados" (LocalStorage)
const DB_KEYS = {
  PRODUCTS: 'ray_sexshop_db_products',
  ADMINS: 'ray_sexshop_db_admins',
  SLIDES: 'ray_sexshop_db_slides',
  CART: 'ray_sexshop_db_cart' // Nova tabela para persistência do carrinho
};

// Simulador de Latência de Rede (Network Latency)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  products: {
    list: async (): Promise<Product[]> => {
      await delay(300); 
      try {
        const data = localStorage.getItem(DB_KEYS.PRODUCTS);
        if (!data) {
          localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
          return INITIAL_PRODUCTS;
        }
        return JSON.parse(data);
      } catch (error) {
        console.error("Database Error (Products):", error);
        return INITIAL_PRODUCTS;
      }
    },
    create: async (product: Omit<Product, 'id'>): Promise<Product> => {
      await delay(500);
      const products = await api.products.list();
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProduct = { ...product, id: newId };
      const updatedList = [newProduct, ...products];
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updatedList));
      return newProduct;
    },
    update: async (product: Product): Promise<Product> => {
      await delay(500);
      const products = await api.products.list();
      const updatedList = products.map(p => p.id === product.id ? product : p);
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updatedList));
      return product;
    },
    delete: async (id: number): Promise<void> => {
      await delay(400);
      const products = await api.products.list();
      const updatedList = products.filter(p => p.id !== id);
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updatedList));
    }
  },
  
  cart: {
    get: async (): Promise<CartItem[]> => {
      await delay(200);
      try {
        const data = localStorage.getItem(DB_KEYS.CART);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    },
    add: async (product: Product, quantity: number): Promise<CartItem[]> => {
      await delay(300);
      const currentCart = await api.cart.get();
      const existingItem = currentCart.find(item => item.id === product.id);
      
      let newCart;
      if (existingItem) {
        newCart = currentCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newCart = [...currentCart, { ...product, quantity }];
      }
      
      localStorage.setItem(DB_KEYS.CART, JSON.stringify(newCart));
      return newCart;
    },
    updateQuantity: async (productId: number, quantity: number): Promise<CartItem[]> => {
      await delay(200);
      let currentCart = await api.cart.get();
      
      if (quantity <= 0) {
        currentCart = currentCart.filter(item => item.id !== productId);
      } else {
        currentCart = currentCart.map(item => 
          item.id === productId ? { ...item, quantity } : item
        );
      }
      
      localStorage.setItem(DB_KEYS.CART, JSON.stringify(currentCart));
      return currentCart;
    },
    remove: async (productId: number): Promise<CartItem[]> => {
      await delay(200);
      const currentCart = await api.cart.get();
      const newCart = currentCart.filter(item => item.id !== productId);
      localStorage.setItem(DB_KEYS.CART, JSON.stringify(newCart));
      return newCart;
    },
    clear: async (): Promise<void> => {
      await delay(200);
      localStorage.removeItem(DB_KEYS.CART);
    }
  },

  admins: {
    list: async (): Promise<AdminUser[]> => {
      await delay(300);
      try {
        const data = localStorage.getItem(DB_KEYS.ADMINS);
        if (!data) {
          localStorage.setItem(DB_KEYS.ADMINS, JSON.stringify(INITIAL_ADMIN_USERS));
          return INITIAL_ADMIN_USERS;
        }
        return JSON.parse(data);
      } catch (error) {
         return INITIAL_ADMIN_USERS;
      }
    },
    login: async (email: string, pass: string): Promise<AdminUser | null> => {
        // Simula uma query segura ao banco
        await delay(600);
        const admins = await api.admins.list();
        const user = admins.find(u => u.email === email && u.password === pass);
        return user || null;
    },
    create: async (admin: Omit<AdminUser, 'id'>): Promise<AdminUser> => {
      await delay(500);
      const admins = await api.admins.list();
      const newId = admins.length > 0 ? Math.max(...admins.map(u => u.id)) + 1 : 1;
      const newAdmin = { ...admin, id: newId };
      const updatedList = [...admins, newAdmin];
      localStorage.setItem(DB_KEYS.ADMINS, JSON.stringify(updatedList));
      return newAdmin;
    },
    updatePassword: async (id: number, newPass: string): Promise<void> => {
      await delay(500);
      const admins = await api.admins.list();
      const updatedList = admins.map(u => u.id === id ? { ...u, password: newPass } : u);
      localStorage.setItem(DB_KEYS.ADMINS, JSON.stringify(updatedList));
    }
  },

  slides: {
    list: async (): Promise<HeroSlide[]> => {
      await delay(300);
      try {
        const data = localStorage.getItem(DB_KEYS.SLIDES);
        if (!data) {
            localStorage.setItem(DB_KEYS.SLIDES, JSON.stringify(INITIAL_SLIDES));
            return INITIAL_SLIDES;
        }
        return JSON.parse(data);
      } catch (e) {
          return INITIAL_SLIDES;
      }
    },
    create: async (slide: Omit<HeroSlide, 'id'>): Promise<HeroSlide> => {
      await delay(500);
      const slides = await api.slides.list();
      const newId = slides.length > 0 ? Math.max(...slides.map(s => s.id)) + 1 : 1;
      const newSlide = { ...slide, id: newId };
      const updatedList = [...slides, newSlide];
      localStorage.setItem(DB_KEYS.SLIDES, JSON.stringify(updatedList));
      return newSlide;
    },
    update: async (slide: HeroSlide): Promise<HeroSlide> => {
        await delay(500);
        const slides = await api.slides.list();
        const updatedList = slides.map(s => s.id === slide.id ? slide : s);
        localStorage.setItem(DB_KEYS.SLIDES, JSON.stringify(updatedList));
        return slide;
    },
    delete: async (id: number): Promise<void> => {
        await delay(500);
        const slides = await api.slides.list();
        const updatedList = slides.filter(s => s.id !== id);
        localStorage.setItem(DB_KEYS.SLIDES, JSON.stringify(updatedList));
    }
  }
};
