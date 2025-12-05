
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
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

export interface AdminUser {
  id: number;
  email: string;
  password: string;
}

export interface HeroSlide {
    id: number;
    imageUrl: string;
    title: string;
    subtitle: string;
    buttonText: string;
}
