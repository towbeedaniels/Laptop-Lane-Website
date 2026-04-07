/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Product, Review } from '@/types';
import { ArrowLeft, ShoppingCart, Laptop, Check, Truck, Shield, Heart, MessageSquare, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import StarRating from '@/components/StarRating';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const wishlist = useWishlistStore();
  const isInWishlist = wishlist.isInWishlist(String(params.id));
  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist) {
      wishlist.removeItem(product.id);
    } else {
      wishlist.addItem(product);
    }
  };

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({ customer_name: '', customer_email: '', rating: 0, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (data && !error) {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
    fetchReviews();
  }, [params.id]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', params.id)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setReviews(data);
      if (data.length > 0) {
        const avg = data.reduce((sum: number, r: any) => sum + r.rating, 0) / data.length;
        setAvgRating(Math.round(avg * 10) / 10);
      }
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewForm.rating === 0 || !reviewForm.customer_name || !reviewForm.customer_email) return;
    setSubmittingReview(true);

    const { error } = await supabase.from('reviews').insert({
      product_id: params.id,
      customer_name: reviewForm.customer_name,
      customer_email: reviewForm.customer_email,
      rating: reviewForm.rating,
      comment: reviewForm.comment || null,
    } as never);

    if (!error) {
      setReviewSuccess('Review submitted successfully!');
      setReviewForm({ customer_name: '', customer_email: '', rating: 0, comment: '' });
      fetchReviews();
    }
    setSubmittingReview(false);
    setTimeout(() => setReviewSuccess(''), 3000);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <Laptop className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h2>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 dark:text-primary-400">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center relative">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Laptop className="h-48 w-48 text-gray-400" />
              )}
              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'}`} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2 uppercase tracking-wide">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <StarRating rating={Math.round(avgRating)} size={20} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {avgRating > 0 ? `${avgRating} (${reviews.length} review${reviews.length !== 1 ? 's' : ''})` : 'No reviews yet'}
                </span>
              </div>

              <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-6">
                ₦{product.price.toLocaleString()}
              </p>

              <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>

                {/* Specifications */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Specifications</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{key.replace(/_/g, ' ')}: </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock_quantity > 0 ? (
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    ✓ In Stock ({product.stock_quantity} available)
                  </p>
                ) : (
                  <p className="text-red-600 dark:text-red-400 font-medium">✗ Out of Stock</p>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex space-x-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="input-field w-24"
                    disabled={product.stock_quantity === 0}
                  >
                    {Array.from({ length: Math.min(product.stock_quantity, 10) }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">&nbsp;</label>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock_quantity === 0}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Truck className="h-5 w-5 text-primary-600" />
                  <span className="text-sm">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span className="text-sm">1 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="section-title flex items-center space-x-2">
            <MessageSquare className="h-6 w-6" />
            <span>Customer Reviews ({reviews.length})</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Review Form */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Write a Review</h3>
                {reviewSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg mb-4 text-sm">
                    {reviewSuccess}
                  </div>
                )}
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={reviewForm.customer_name}
                      onChange={(e) => setReviewForm({ ...reviewForm, customer_name: e.target.value })}
                      required
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={reviewForm.customer_email}
                      onChange={(e) => setReviewForm({ ...reviewForm, customer_email: e.target.value })}
                      required
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating *</label>
                    <StarRating rating={reviewForm.rating} onRate={(r) => setReviewForm({ ...reviewForm, rating: r })} size={24} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Review</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      rows={3}
                      className="input-field"
                      placeholder="Share your experience..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingReview || reviewForm.rating === 0}
                    className="btn-primary w-full"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className="md:col-span-2">
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{review.customer_name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size={16} />
                      </div>
                      {review.comment && (
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No reviews yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
