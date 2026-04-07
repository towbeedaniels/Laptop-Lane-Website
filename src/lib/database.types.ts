export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: 'laptop' | 'keyboard' | 'mouse' | 'external_hard_drive' | 'flash_drive';
          brand: string;
          image_url: string;
          stock_quantity: number;
          specifications: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          category: 'laptop' | 'keyboard' | 'mouse' | 'external_hard_drive' | 'flash_drive';
          brand: string;
          image_url?: string;
          stock_quantity?: number;
          specifications?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          category?: 'laptop' | 'keyboard' | 'mouse' | 'external_hard_drive' | 'flash_drive';
          brand?: string;
          image_url?: string;
          stock_quantity?: number;
          specifications?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
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
          tracking_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          shipping_address: string;
          city: string;
          state: string;
          zip_code: string;
          total_amount: number;
          status?: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';
          tracking_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          shipping_address?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          total_amount?: number;
          status?: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';
          tracking_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
        };
      };
      order_tracking: {
        Row: {
          id: string;
          order_id: string;
          status: string;
          location: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          status: string;
          location?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          status?: string;
          location?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'customer';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'admin' | 'customer';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'admin' | 'customer';
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_name: string;
          customer_email: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          customer_name: string;
          customer_email: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          customer_name?: string;
          customer_email?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
  };
}
