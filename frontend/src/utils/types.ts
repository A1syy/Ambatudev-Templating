export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  featured: boolean;
  imageMain: string;
  imageGallery: string[];
  stock: number;
  rating: number;
  specs: Record<string, any>;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  profileImage?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
