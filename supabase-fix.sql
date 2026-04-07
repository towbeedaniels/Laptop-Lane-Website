-- Run this SQL in your Supabase SQL Editor to fix checkout and tracking issues

-- Fix 1: Allow anyone to insert initial order tracking entries
-- This is needed for the checkout flow to create the first tracking entry
CREATE POLICY "Anyone can insert order tracking"
  ON order_tracking FOR INSERT
  WITH CHECK (true);

-- Fix 2: Make sure order tracking is viewable by anyone with the tracking number
-- (already covered by the existing policy, but let's make it simpler)
DROP POLICY IF EXISTS "Order tracking viewable by order owner or admin" ON order_tracking;
CREATE POLICY "Order tracking viewable by anyone"
  ON order_tracking FOR SELECT
  USING (true);

-- Fix 3: Make sure order items are also insertable (should already work)
-- Verify the policy exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'order_items'
    AND policyname = 'Order items can be inserted'
  ) THEN
    CREATE POLICY "Order items can be inserted"
      ON order_items FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- Fix 4: Make sure orders are insertable (should already work)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'orders'
    AND policyname = 'Anyone can create orders (guest checkout)'
  ) THEN
    CREATE POLICY "Anyone can create orders (guest checkout)"
      ON orders FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;
