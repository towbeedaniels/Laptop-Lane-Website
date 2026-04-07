'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/types';
import { Laptop, Filter, SlidersHorizontal, Search } from 'lucide-react';
import { CATEGORY_LABELS } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Heart } from 'lucide-react';
import StarRating from '@/components/StarRating';

export const dynamic = 'force-dynamic';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [sortBy, setSortBy] = useState<'name' | 'price_asc' | 'price_desc' | 'newest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [productRatings, setProductRatings] = useState<Record<string, { avg: number; count: number }>>({});
  const addItem = useCartStore((state) => state.addItem);
  const wishlist = useWishlistStore();

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

        // Text search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q)
          );
        }

        // Brand filter
        if (selectedBrands.length > 0) {
          filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
        }

        if (sortBy === 'name') {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price_asc') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }

        // Extract unique brands
        const uniqueBrands = Array.from(new Set((data as Product[]).map((p) => p.brand))).sort();
        setBrands(uniqueBrands);

        setProducts(filtered);

        // Fetch ratings for each product
        const ratings: Record<string, { avg: number; count: number }> = {};
        for (const product of filtered) {
          const { data: reviews } = await supabase.from('reviews').select('rating').eq('product_id', product.id) as any;
          if (reviews && reviews.length > 0) {
            const avg = reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length;
            ratings[product.id] = { avg: Math.round(avg * 10) / 10, count: reviews.length };
          }
        }
        setProductRatings(ratings);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, priceRange, sortBy, searchQuery, selectedBrands]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse our complete collection of tech products</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, brand, or description..."
              className="input-field pl-10 w-full md:w-96"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden mb-4 btn-secondary w-full flex items-center justify-center space-x-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Show Filters</span>
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="h-5 w-5 text-primary-600" />
                  <h2 className="font-semibold text-lg dark:text-white">Filters</h2>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Category</h3>
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
                        <span className="text-gray-700 dark:text-gray-300">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Brand</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="text-primary-600 focus:ring-primary-500 rounded"
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    Max Price: ₦{(priceRange[1] / 1000000).toFixed(1)}M
                  </h3>
                  <input
                    type="range"
                    min={0}
                    max={10000000}
                    step={100000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="input-field"
                  >
                    <option value="newest">Newest First</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="price_desc">Price (High to Low)</option>
                  </select>
                </div>
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
                  <p className="text-gray-600 dark:text-gray-400">{products.length} products found</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => {
                    const ratingData = productRatings[product.id];
                    const isInWishlist = wishlist.isInWishlist(product.id);
                    return (
                      <div key={product.id} className="card group relative">
                        <Link href={`/products/${product.id}`}>
                          <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
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
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (isInWishlist) {
                              wishlist.removeItem(product.id);
                            } else {
                              wishlist.addItem(product);
                            }
                          }}
                          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                        <div className="p-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 truncate hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          {ratingData && (
                            <div className="flex items-center space-x-2 mb-2">
                              <StarRating rating={Math.round(ratingData.avg)} size={14} />
                              <span className="text-xs text-gray-500 dark:text-gray-400">({ratingData.count})</span>
                            </div>
                          )}
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
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <Laptop className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or check back later</p>
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
