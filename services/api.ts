
import type { Product, AdminUser, HeroSlide } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ADMIN_USERS, INITIAL_SLIDES } from '../constants';

// Simulating Database Keys
const DB_KEYS = {
  PRODUCTS: 'ray_sexshop_db_products',
  ADMINS: 'ray_sexshop_db_admins',
  SLIDES: 'ray_sexshop_db_slides'
};

// Helper to delay (simulate network latency)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  products: {
    list: async (): Promise<Product[]> => {
      await delay(500); // Simulate loading
      const data = localStorage.getItem(DB_KEYS.PRODUCTS);
      if (!data) {
        // Initialize DB if empty
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      return JSON.parse(data);
    },
    create: async (product: Omit<Product, 'id'>): Promise<Product> => {
      await delay(800);
      const products = await api.products.list();
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProduct = { ...product, id: newId };
      const updatedList = [newProduct, ...products];
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updatedList));
      return newProduct;
    },
    update: async (product: Product): Promise<Product> => {
      await delay(800);
      const products = await api.products.list();
      const updatedList = products.map(p => p.id === product.id ? product : p);
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updatedList));
      return product;
    },
    delete: async (id: number): Promise<void> => {
      await delay(600);
      const products = await api.products.list();
      const updatedList = products.filter(p => p.id !== id);
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(updatedList));
    }
  },
  
  admins: {
    list: async (): Promise<AdminUser[]> => {
      await delay(300);
      const data = localStorage.getItem(DB_KEYS.ADMINS);
      if (!data) {
        localStorage.setItem(DB_KEYS.ADMINS, JSON.stringify(INITIAL_ADMIN_USERS));
        return INITIAL_ADMIN_USERS;
      }
      return JSON.parse(data);
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
      const data = localStorage.getItem(DB_KEYS.SLIDES);
      if (!data) {
        localStorage.setItem(DB_KEYS.SLIDES, JSON.stringify(INITIAL_SLIDES));
        return INITIAL_SLIDES;
      }
      return JSON.parse(data);
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
