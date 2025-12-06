
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  images?: string[]; // Array para múltiplas imagens
  description: string;
  shortDescription: string;
  sku: string;
  isPromotion: boolean;
}

export interface NavLink {
  name: string;
  id: 'home' | 'catalog' | 'about' | 'contact';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

// SECURITY UPDATE: Password removed from frontend interface
export interface AdminUser {
  id: number;
  email: string;
  // password field removed. Frontend should never know the password hash.
}

export interface AuthResponse {
    token: string;
    user: AdminUser;
}

export interface HeroSlide {
    id: number;
    imageUrl: string;
    title: string;
    subtitle: string;
    buttonText: string;
}

export interface PageBanner {
    pageId: 'catalog' | 'contact';
    imageUrl: string;
    title: string;
    subtitle: string;
}
