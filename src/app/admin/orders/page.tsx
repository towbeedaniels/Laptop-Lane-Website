/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Eye, Truck, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
  { value: 'in_transit', label: 'In Transit', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [trackingHistory, setTrackingHistory] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>('pending');
  const [trackingNotes, setTrackingNotes] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data && !error) {
      setOrders(data);
    }
    setLoading(false);
  };

  const openOrderDetails = async (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);

    // Fetch order items
    const { data: items } = await supabase
      .from('order_items')
      .select('*, products(*)')
      .eq('order_id', order.id);
    if (items) setOrderItems(items);

    // Fetch tracking history
    const { data: tracking } = await supabase
      .from('order_tracking')
      .select('*')
      .eq('order_id', order.id)
      .order('created_at', { ascending: false });
    if (tracking) setTrackingHistory(tracking);

    setShowModal(true);
  };

  const updateOrderStatus = async () => {
    if (!selectedOrder) return;

    try {
      // Use fetch API directly to bypass Supabase type issues
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/orders?id=eq.${selectedOrder.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      // Add tracking entry
      const trackingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/order_tracking`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            order_id: selectedOrder.id,
            status: `Order status updated to: ${newStatus.replace('_', ' ')}`,
            notes: trackingNotes || undefined,
          }),
        }
      );

      if (!trackingResponse.ok) {
        throw new Error('Failed to add tracking entry');
      }

      setShowModal(false);
      fetchOrders();
      alert('Order updated successfully!');
    } catch (error: any) {
      alert('Error updating order: ' + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    return STATUS_OPTIONS.find((s) => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer_name}</p>
                      <p className="text-xs text-gray-500">{order.customer_email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.tracking_number || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total_amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => openOrderDetails(order)}
                      className="btn-outline py-1 px-3 text-sm flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Truck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600">Orders will appear here when customers make purchases</p>
        </div>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500">#{selectedOrder.id.slice(0, 8)}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Customer Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> {selectedOrder.customer_name}</p>
                    <p><span className="text-gray-500">Email:</span> {selectedOrder.customer_email}</p>
                    <p><span className="text-gray-500">Phone:</span> {selectedOrder.customer_phone}</p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>{selectedOrder.shipping_address}</p>
                    <p>{selectedOrder.city}, {selectedOrder.state} {selectedOrder.zip_code}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="px-4 py-3 text-sm text-gray-900">{item.products.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">${item.price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right font-semibold text-gray-900">Total:</td>
                        <td className="px-4 py-3 font-bold text-primary-600">
                          ${selectedOrder.total_amount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Tracking History */}
              {trackingHistory.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Tracking History</h3>
                  <div className="space-y-3">
                    {trackingHistory.map((track) => (
                      <div key={track.id} className="bg-gray-50 rounded-lg p-3">
                        <p className="font-medium text-gray-900">{track.status}</p>
                        {track.notes && <p className="text-sm text-gray-600 mt-1">{track.notes}</p>}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(track.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Update Status */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Update Order Status</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                      className="input-field"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                    <textarea
                      value={trackingNotes}
                      onChange={(e) => setTrackingNotes(e.target.value)}
                      rows={2}
                      className="input-field"
                      placeholder="Add tracking notes..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 p-6 border-t">
              <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={updateOrderStatus} className="btn-primary flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Update Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
