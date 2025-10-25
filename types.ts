
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
  description: string;
  sku: string;
  isPromotion: boolean;
}

export interface NavLink {
  name: string;
  id: 'home' | 'catalog' | 'contact';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}