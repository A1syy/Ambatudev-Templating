export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  featured: boolean;
  imageMain: string;
  imageGallery?: string[];
  stock: number;
  rating?: number;
  specs?: {
    [key: string]: string | number | boolean;
  };
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
