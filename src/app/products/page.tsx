'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/types';
import { Laptop, Filter, SlidersHorizontal } from 'lucide-react';
import { CATEGORY_LABELS } from '@/types';
import { useCartStore } from '@/store/cartStore';

export const dynamic = 'force-dynamic';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<'name' | 'price_asc' | 'price_desc'>('name');
  const addItem = useCartStore((state) => state.addItem);

  const categories: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'laptop', label: 'Laptops' },
    { id: 'keyboard', label: 'Keyboards' },
    { id: 'mouse', label: 'Mouse' },
    { id: 'external_hard_drive', label: 'External Drives' },
    { id: 'flash_drive', label: 'Flash Drives' },
  ];

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam as Category);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from('products').select('*');

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (data && !error) {
        let filtered = (data as Product[]).filter(
          (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        if (sortBy === 'name') {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price_asc') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          filtered.sort((a, b) => b.price - a.price);
        }

        setProducts(filtered);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Browse our complete collection of tech products</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="h-5 w-5 text-primary-600" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="input-field"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price_asc">Price (Low to High)</option>
                  <option value="price_desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600">{products.length} products found</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="card group">
                      <Link href={`/products/${product.id}`}>
                        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <Laptop className="h-24 w-24 text-gray-400" />
                          )}
                        </div>
                      </Link>
                      <div className="p-4">
                        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 mb-2 truncate hover:text-primary-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between">
                          <p className="text-primary-600 font-bold text-lg">
                            ₦{product.price.toLocaleString()}
                          </p>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="btn-primary py-2 px-4 text-sm"
                            disabled={product.stock_quantity === 0}
                          >
                            {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <Laptop className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
