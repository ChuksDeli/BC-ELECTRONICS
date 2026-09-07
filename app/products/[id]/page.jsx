'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiPlus,
  FiMinus,
  FiCheck,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductGallery from '@/components/product/ProductGallery';
import ProductReviews from '@/components/product/ProductReviews';
import RatingStars from '@/components/ui/RatingStars';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProductSection from '@/components/home/ProductSection';
import { getProductById, getRelatedProducts } from '@/data/products';

export default function ProductDetailsPage({ params }) {
  const product = getProductById(params.id);
  const router = useRouter();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [activeTab, setActiveTab] = useState('description');
  const [addedNotice, setAddedNotice] = useState(false);
  const [shareNotice, setShareNotice] = useState(false);

  if (!product) return notFound();

  const related = getRelatedProducts(product);
  const wishlisted = isWishlisted(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, quantity, { color: selectedColor });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, { color: selectedColor });
    router.push('/cart');
  };

  const handleShare = () => {
    setShareNotice(true);
    setTimeout(() => setShareNotice(false), 2000);
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <FiChevronRight className="w-3 h-3" />
        <Link href={`/categories/${product.category}`} className="hover:text-primary capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-text-primary">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
        <ProductGallery images={product.images} name={product.name} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            {product.isNew && <Badge tone="primary">New</Badge>}
            {discount && <Badge tone="accent">{discount}% off</Badge>}
          </div>

          <p className="text-xs uppercase tracking-wide text-text-secondary mb-1">
            {product.brand}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            {product.name}
          </h1>

          <RatingStars rating={product.rating} reviews={product.reviews} size="w-4 h-4" />

          <div className="flex items-baseline gap-3 mt-5 mb-6">
            <span className="text-3xl font-bold text-text-primary">${product.price}</span>
            {product.oldPrice && (
              <span className="text-base text-text-secondary line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <p className="text-sm text-text-secondary leading-relaxed mb-6">
            {product.description}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-text-primary mb-2.5">
                Color: <span className="font-normal text-text-secondary">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      selectedColor === color
                        ? 'border-secondary bg-secondary text-white'
                        : 'border-slate-200 text-text-secondary hover:border-slate-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm font-semibold text-text-primary mb-2.5">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-text-secondary">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              variant="outline"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
            >
              Add to Cart
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1"
            >
              Buy Now
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => toggleWishlist(product)}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-red-500 transition-colors"
            >
              <FiHeart className={`w-4 h-4 ${wishlisted ? 'text-red-500 fill-red-500' : ''}`} />
              {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
            <div className="relative">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <FiShare2 className="w-4 h-4" />
                Share
              </button>
              {shareNotice && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 top-full mt-1 text-xs text-success whitespace-nowrap"
                >
                  Link copied
                </motion.span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiTruck className="w-5 h-5 text-primary" />
              <span className="text-[11px] text-text-secondary">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiShield className="w-5 h-5 text-primary" />
              <span className="text-[11px] text-text-secondary">2-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiRefreshCw className="w-5 h-5 text-primary" />
              <span className="text-[11px] text-text-secondary">30-Day Returns</span>
            </div>
          </div>

          {addedNotice && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-center gap-2 bg-success/10 text-success text-sm font-medium px-4 py-3 rounded-xl"
            >
              <FiCheck className="w-4 h-4" />
              Added to cart
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-6 border-b border-slate-200 mb-8">
          {[
            { id: 'description', label: 'Description' },
            { id: 'specs', label: 'Specifications' },
            { id: 'reviews', label: `Reviews (${product.reviews})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="max-w-3xl">
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="text-sm font-semibold text-text-primary mb-3">Key Features</p>
            <ul className="space-y-2.5">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <FiCheck className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-2xl">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? 'bg-slate-50' : ''}>
                    <td className="py-3 px-4 font-medium text-text-primary w-40">{key}</td>
                    <td className="py-3 px-4 text-text-secondary">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && <ProductReviews product={product} />}
      </div>

      {related.length > 0 && (
        <div className="-mx-4 sm:-mx-6 lg:-mx-10">
          <ProductSection title="You may also like" products={related} />
        </div>
      )}
    </div>
  );
}
