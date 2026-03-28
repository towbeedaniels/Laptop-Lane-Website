'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const statusIcons: Record<string, any> = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  in_transit: Truck,
  delivered: CheckCircle,
  cancelled: AlertCircle,
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  in_transit: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusSteps = [
  { status: 'pending', label: 'Order Placed' },
  { status: 'processing', label: 'Processing' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'in_transit', label: 'In Transit' },
  { status: 'delivered', label: 'Delivered' },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const trackingParam = searchParams.get('tracking');
  const success = searchParams.get('success');

  const [trackingNumber, setTrackingNumber] = useState(trackingParam || '');
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [trackingHistory, setTrackingHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (trackingParam) {
      handleTrack();
    }
  }, []);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Find order by tracking number
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/orders?tracking_number=eq.${trackingNumber.trim()}&select=*`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        }
      );

      if (!response.ok) {
        setError('Order not found. Please check your tracking number.');
        setOrder(null);
        setLoading(false);
        return;
      }

      const orderData = await response.json();
      if (!orderData || orderData.length === 0) {
        setError('Order not found. Please check your tracking number.');
        setOrder(null);
        setLoading(false);
        return;
      }

      setOrder(orderData[0]);

      // Get order items
      const itemsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/order_items?order_id=eq.${orderData[0].id}&select=*,products(*)`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        }
      );

      if (itemsResponse.ok) {
        const itemsData = await itemsResponse.json();
        setOrderItems(itemsData);
      }

      // Get tracking history
      const trackingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/order_tracking?order_id=eq.${orderData[0].id}&select=*&order=created_at.asc`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        }
      );

      if (trackingResponse.ok) {
        const trackingData = await trackingResponse.json();
        setTrackingHistory(trackingData);
      }
    } catch (err) {
      setError('An error occurred while tracking your order.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold">Enter Tracking Number</h2>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              placeholder="Enter tracking number (e.g., LL1234567890)"
              className="input-field flex-1 uppercase"
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
            />
            <button onClick={handleTrack} disabled={loading} className="btn-primary">
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </div>
          {success === 'true' && (
            <p className="text-green-600 mt-4 text-sm">
              ✓ Order placed successfully! Your tracking number is: {trackingNumber}
            </p>
          )}
          {error && (
            <p className="text-red-600 mt-4 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </p>
          )}
        </div>

        {order && (
          <>
            {/* Order Status */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h2>
                  <p className="text-gray-600">Tracking: {order.tracking_number}</p>
                </div>
                <span className={`px-4 py-2 rounded-full font-medium ${statusColors[order.status]}`}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${((getCurrentStepIndex(order.status) + 1) / statusSteps.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const Icon = statusIcons[step.status] || Clock;
                    const isActive = index <= getCurrentStepIndex(order.status);
                    const isCurrent = index === getCurrentStepIndex(order.status);

                    return (
                      <div key={step.status} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isActive
                              ? 'bg-primary-600 border-primary-600 text-white'
                              : 'bg-white border-gray-300 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-primary-200' : ''}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span
                          className={`text-xs mt-2 font-medium ${
                            isActive ? 'text-primary-600' : 'text-gray-400'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Shipping Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">Shipping Address</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium text-gray-900">{order.customer_name}</p>
                  <p>{order.shipping_address}</p>
                  <p>
                    {order.city}, {order.state} {order.zip_code}
                  </p>
                  <p>{order.customer_phone}</p>
                  <p>{order.customer_email}</p>
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${order.total_amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                    <span>Total Paid</span>
                    <span className="text-primary-600">${order.total_amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-4 border-b last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.products.image_url ? (
                        <img
                          src={item.products.image_url}
                          alt={item.products.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.products.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking History */}
            {trackingHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">Tracking History</h3>
                <div className="space-y-4">
                  {trackingHistory.map((track, index) => (
                    <div
                      key={track.id}
                      className={`flex items-start space-x-4 ${
                        index !== trackingHistory.length - 1 ? 'pb-4 border-b' : ''
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary-600 mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{track.status}</p>
                        {track.notes && <p className="text-sm text-gray-600">{track.notes}</p>}
                        {track.location && (
                          <p className="text-sm text-gray-500">Location: {track.location}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(track.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
