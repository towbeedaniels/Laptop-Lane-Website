/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Package, ShoppingCart, DollarSign, TrendingUp, Truck, Star, BarChart3, Users, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    inTransitOrders: 0,
    lowStockProducts: 0,
    totalReviews: 0,
    avgRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [categoryStats, setCategoryStats] = useState<any[]>([]);
  const [orderStatusBreakdown, setOrderStatusBreakdown] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      // Products
      const { data: products } = await supabase.from('products').select('*');
      const lowStockProducts = products?.filter((p: any) => p.stock_quantity <= 5).length || 0;

      // Orders
      const { data: orders } = await supabase.from('orders').select('*');

      // Recent orders
      const { data: recentOrdersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      // Reviews
      const { data: reviews } = await supabase.from('reviews').select('rating');
      const totalReviews = reviews?.length || 0;
      const avgRating = reviews && reviews.length > 0
        ? Math.round((reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length) * 10) / 10
        : 0;

      if (recentOrdersData) {
        setRecentOrders(recentOrdersData);
      }

      if (orders) {
        const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total_amount, 0);
        const pendingOrders = orders.filter((o: any) => o.status === 'pending').length;
        const deliveredOrders = orders.filter((o: any) => o.status === 'delivered').length;
        const inTransitOrders = orders.filter((o: any) => o.status === 'in_transit' || o.status === 'shipped').length;

        // Order status breakdown
        const statusBreakdown = [
          { status: 'Pending', count: orders.filter((o: any) => o.status === 'pending').length, color: 'bg-yellow-500' },
          { status: 'Processing', count: orders.filter((o: any) => o.status === 'processing').length, color: 'bg-blue-500' },
          { status: 'Shipped', count: orders.filter((o: any) => o.status === 'shipped').length, color: 'bg-purple-500' },
          { status: 'In Transit', count: orders.filter((o: any) => o.status === 'in_transit').length, color: 'bg-indigo-500' },
          { status: 'Delivered', count: orders.filter((o: any) => o.status === 'delivered').length, color: 'bg-green-500' },
          { status: 'Cancelled', count: orders.filter((o: any) => o.status === 'cancelled').length, color: 'bg-red-500' },
        ].filter((s) => s.count > 0);
        setOrderStatusBreakdown(statusBreakdown);

        // Category breakdown
        if (products) {
          const categoryBreakdown = products.reduce((acc: Record<string, number>, p: any) => {
            const cat = p.category.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
          }, {});
          const catStats = Object.entries(categoryBreakdown)
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => (b.count as number) - (a.count as number));
          setCategoryStats(catStats);
        }

        setStats({
          totalProducts: products?.length || 0,
          totalOrders: orders.length,
          totalRevenue,
          pendingOrders,
          deliveredOrders,
          inTransitOrders,
          lowStockProducts,
          totalReviews,
          avgRating,
        });
      }

      setLoading(false);
    };

    fetchStats();
  }, []);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    in_transit: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>

      {/* Key Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Order Status Breakdown */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">Order Status</h2>
          </div>
          {orderStatusBreakdown.length > 0 ? (
            <div className="space-y-3">
              {orderStatusBreakdown.map((item) => (
                <div key={item.status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.status}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${(item.count / stats.totalOrders) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No orders yet</p>
          )}
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">Product Categories</h2>
          </div>
          {categoryStats.length > 0 ? (
            <div className="space-y-3">
              {categoryStats.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.category}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(item.count / stats.totalProducts) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No products yet</p>
          )}
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">Performance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Delivered</span>
              </div>
              <span className="font-bold text-gray-900">{stats.deliveredOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <span className="font-bold text-gray-900">{stats.pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm text-gray-600">In Transit</span>
              </div>
              <span className="font-bold text-gray-900">{stats.inTransitOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm text-gray-600">Low Stock</span>
              </div>
              <span className="font-bold text-red-600">{stats.lowStockProducts}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-600">Avg Rating</span>
              </div>
              <span className="font-bold text-gray-900">
                {stats.avgRating > 0 ? `${stats.avgRating}/5` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₦{order.total_amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p>No orders yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
