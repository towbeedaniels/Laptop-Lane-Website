export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'laptop' | 'keyboard' | 'mouse' | 'external_hard_drive' | 'flash_drive';
  brand: string;
  image_url: string;
  stock_quantity: number;
  specifications: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  zip_code: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface OrderTracking {
  id: string;
  order_id: string;
  status: string;
  location?: string;
  notes?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 'laptop' | 'keyboard' | 'mouse' | 'external_hard_drive' | 'flash_drive';

export const CATEGORY_LABELS: Record<Category, string> = {
  laptop: 'Laptops',
  keyboard: 'Keyboards',
  mouse: 'Mouse',
  external_hard_drive: 'External Hard Drives',
  flash_drive: 'Flash Drives',
};
