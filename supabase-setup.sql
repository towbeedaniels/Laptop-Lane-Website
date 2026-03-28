-- Laptop Lane Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('laptop', 'keyboard', 'mouse', 'external_hard_drive', 'flash_drive')),
  brand TEXT NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  specifications JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'in_transit', 'delivered', 'cancelled')),
  tracking_number TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Create order_tracking table
CREATE TABLE IF NOT EXISTS order_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_tracking_number ON orders(tracking_number);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_tracking_order_id ON order_tracking(order_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for products (public read, admin write)
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (
    user_id = auth.uid()::TEXT OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can create orders (guest checkout)"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for order_items
CREATE POLICY "Order items viewable by order owner or admin"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE id = order_items.order_id AND
      (user_id = auth.uid()::TEXT OR
       EXISTS (
         SELECT 1 FROM profiles
         WHERE id = auth.uid() AND role = 'admin'
       ))
    )
  );

CREATE POLICY "Order items can be inserted"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Create policies for order_tracking
CREATE POLICY "Order tracking viewable by order owner or admin"
  ON order_tracking FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE id = order_tracking.order_id AND
      (user_id = auth.uid()::TEXT OR
       EXISTS (
         SELECT 1 FROM profiles
         WHERE id = auth.uid() AND role = 'admin'
       ))
    )
  );

CREATE POLICY "Admins can insert order tracking"
  ON order_tracking FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      (SELECT role FROM public.profiles WHERE email = NEW.email),
      'customer'
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample products (optional - remove if you want to start fresh)
INSERT INTO products (name, description, price, category, brand, image_url, stock_quantity, specifications) VALUES
  ('MacBook Pro 14"', 'Powerful laptop with M3 Pro chip, perfect for professionals', 1999.99, 'laptop', 'Apple', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 15, '{"processor": "M3 Pro", "ram": "18GB", "storage": "512GB SSD", "display": "14.2 inch Liquid Retina XDR"}'),
  ('Dell XPS 15', 'Premium Windows laptop with stunning OLED display', 1799.99, 'laptop', 'Dell', 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=500', 20, '{"processor": "Intel i7-13700H", "ram": "32GB", "storage": "1TB SSD", "display": "15.6 inch OLED"}'),
  ('HP Spectre x360', 'Convertible laptop with premium design', 1499.99, 'laptop', 'HP', 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500', 12, '{"processor": "Intel i7-1355U", "ram": "16GB", "storage": "512GB SSD", "display": "13.5 inch OLED Touch"}'),
  ('Lenovo ThinkPad X1', 'Business laptop with legendary keyboard', 1699.99, 'laptop', 'Lenovo', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500', 18, '{"processor": "Intel i7-1365U", "ram": "16GB", "storage": "512GB SSD", "display": "14 inch IPS"}'),
  ('Logitech MX Keys', 'Wireless keyboard for productivity', 99.99, 'keyboard', 'Logitech', 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500', 50, '{"connectivity": "Bluetooth/USB", "battery": "10 days", "backlight": "Yes", "layout": "Full-size"}'),
  ('Keychron K2', 'Mechanical wireless keyboard', 89.99, 'keyboard', 'Keychron', 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500', 35, '{"switches": "Gateron Brown", "connectivity": "Bluetooth/USB-C", "layout": "75%", "backlight": "RGB"}'),
  ('Logitech MX Master 3S', 'Premium wireless mouse for professionals', 99.99, 'mouse', 'Logitech', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', 45, '{"connectivity": "Bluetooth/USB", "dpi": "8000", "buttons": "7", "battery": "70 days"}'),
  ('Razer DeathAdder V3', 'Lightweight gaming mouse', 69.99, 'mouse', 'Razer', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', 40, '{"connectivity": "Wireless/USB-C", "dpi": "30000", "buttons": "5", "weight": "59g"}'),
  ('Samsung T7 Shield', 'Rugged portable SSD with fast transfer speeds', 129.99, 'external_hard_drive', 'Samsung', 'https://images.unsplash.com/photo-1628135899478-5090077e74aa?w=500', 60, '{"capacity": "1TB", "interface": "USB 3.2", "speed": "1050 MB/s", "durability": "IP65"}'),
  ('WD Black P50', 'High-performance portable SSD for gamers', 149.99, 'external_hard_drive', 'Western Digital', 'https://images.unsplash.com/photo-1628135899478-5090077e74aa?w=500', 30, '{"capacity": "1TB", "interface": "USB 3.2", "speed": "2000 MB/s", "compatibility": "PC/Mac/Console"}'),
  ('SanDisk Extreme Pro', 'Ultra-fast USB 3.2 flash drive', 49.99, 'flash_drive', 'SanDisk', 'https://images.unsplash.com/photo-1628135899478-5090077e74aa?w=500', 100, '{"capacity": "256GB", "interface": "USB 3.2", "speed": "420 MB/s", "design": "Retractable"}'),
  ('Samsung BAR Plus', 'Durable metal flash drive', 24.99, 'flash_drive', 'Samsung', 'https://images.unsplash.com/photo-1628135899478-5090077e74aa?w=500', 150, '{"capacity": "128GB", "interface": "USB 3.1", "speed": "400 MB/s", "durability": "Water/Shock proof"}');

-- Note: To create an admin user, you need to:
-- 1. Sign up a user through the auth system
-- 2. Run this SQL to make them admin:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
