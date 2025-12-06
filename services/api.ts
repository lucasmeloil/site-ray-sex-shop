
import type { Product, AdminUser, HeroSlide, CartItem, PageBanner, AuthResponse } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SLIDES, INITIAL_PAGE_BANNERS } from '../constants';

const API_BASE = '/api';

const handleResponse = async (res: Response) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${res.status}`);
    }
    return res.json();
};

// Helper to get JWT from storage and format header
const getAuthHeaders = () => {
    const token = sessionStorage.getItem('adminToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const api = {
  products: {
    list: async (): Promise<Product[]> => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        return await handleResponse(res);
      } catch (error) {
        console.warn("API Error (Products):", error);
        return INITIAL_PRODUCTS; 
      }
    },
    create: async (product: Omit<Product, 'id'>): Promise<Product> => {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
      });
      return await handleResponse(res);
    },
    update: async (product: Product): Promise<Product> => {
      const res = await fetch(`${API_BASE}/products/${product.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
      });
      return await handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      await fetch(`${API_BASE}/products/${id}`, { 
          method: 'DELETE',
          headers: getAuthHeaders()
      });
    }
  },
  
  cart: {
    get: async (): Promise<CartItem[]> => {
      const data = localStorage.getItem('ray_sexshop_cart');
      return data ? JSON.parse(data) : [];
    },
    add: async (product: Product, quantity: number): Promise<CartItem[]> => {
      const currentCart = await api.cart.get();
      const existing = currentCart.find(i => i.id === product.id);
      let newCart;
      if (existing) {
          newCart = currentCart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
          newCart = [...currentCart, { ...product, quantity }];
      }
      localStorage.setItem('ray_sexshop_cart', JSON.stringify(newCart));
      return newCart;
    },
    updateQuantity: async (productId: number, quantity: number): Promise<CartItem[]> => {
      let cart = await api.cart.get();
      if (quantity <= 0) cart = cart.filter(i => i.id !== productId);
      else cart = cart.map(i => i.id === productId ? { ...i, quantity } : i);
      localStorage.setItem('ray_sexshop_cart', JSON.stringify(cart));
      return cart;
    },
    remove: async (productId: number): Promise<CartItem[]> => {
      const cart = await api.cart.get();
      const newCart = cart.filter(i => i.id !== productId);
      localStorage.setItem('ray_sexshop_cart', JSON.stringify(newCart));
      return newCart;
    },
    clear: async (): Promise<void> => {
      localStorage.removeItem('ray_sexshop_cart');
    }
  },

  admins: {
    list: async (): Promise<AdminUser[]> => {
      try {
        const res = await fetch(`${API_BASE}/admins`, {
            headers: getAuthHeaders()
        });
        return await handleResponse(res);
      } catch (e) {
          console.warn("API Error (Admins):", e);
          return [];
      }
    },
    login: async (email: string, pass: string): Promise<AdminUser | null> => {
      // SECURITY: No local fallback. Credentials must be validated by server.
      try {
          const res = await fetch(`${API_BASE}/admins/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password: pass })
          });
          
          if (res.ok) {
            const data: AuthResponse = await res.json();
            // Store JWT securely in Session Storage
            sessionStorage.setItem('adminToken', data.token);
            return data.user;
          } else {
              throw new Error('Credenciais inválidas');
          }
      } catch (e) {
          console.error("Login failed:", e);
          return null;
      }
    },
    create: async (admin: { email: string, password: string }): Promise<AdminUser> => {
      const res = await fetch(`${API_BASE}/admins`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(admin)
      });
      return await handleResponse(res);
    },
    updatePassword: async (id: number, newPass: string): Promise<void> => {
      await fetch(`${API_BASE}/admins/${id}/password`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ password: newPass })
      });
    }
  },

  slides: {
    list: async (): Promise<HeroSlide[]> => {
      try {
          const res = await fetch(`${API_BASE}/slides`);
          return await handleResponse(res);
      } catch (e) {
          console.warn("API Error (Slides):", e);
          return INITIAL_SLIDES;
      }
    },
    create: async (slide: Omit<HeroSlide, 'id'>): Promise<HeroSlide> => {
       const res = await fetch(`${API_BASE}/slides`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(slide)
      });
      return await handleResponse(res);
    },
    update: async (slide: HeroSlide): Promise<HeroSlide> => {
       const res = await fetch(`${API_BASE}/slides/${slide.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(slide)
      });
      return await handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
       await fetch(`${API_BASE}/slides/${id}`, { 
           method: 'DELETE',
           headers: getAuthHeaders()
       });
    }
  },

  pageBanners: {
      list: async (): Promise<PageBanner[]> => {
         try {
             const res = await fetch(`${API_BASE}/page-banners`);
             const data = await handleResponse(res);
             return data.length > 0 ? data : INITIAL_PAGE_BANNERS;
         } catch (e) {
             console.warn("API Error (Banners):", e);
             return INITIAL_PAGE_BANNERS;
         }
      },
      update: async (banner: PageBanner): Promise<PageBanner> => {
         const res = await fetch(`${API_BASE}/page-banners`, {
             method: 'PUT',
             headers: getAuthHeaders(),
             body: JSON.stringify(banner)
         });
         return await handleResponse(res);
      }
  }
};
