'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import RatingStars from '@/components/ui/RatingStars';
import Badge from '@/components/ui/Badge';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
        className="group relative bg-surface rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden"
      >
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square bg-slate-50 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && <Badge tone="primary">New</Badge>}
              {discount && <Badge tone="accent">{discount}% off</Badge>}
              {product.stock < 15 && product.stock > 0 && (
                <Badge tone="danger">Low stock</Badge>
              )}
            </div>

            <motion.button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              whileTap={{ scale: 0.85 }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              aria-label="Toggle wishlist"
            >
              <FiHeart
                className={`w-4.5 h-4.5 ${wishlisted ? 'text-red-500 fill-red-500' : 'text-text-secondary'}`}
              />
            </motion.button>

            <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuickViewOpen(true);
                }}
                className="flex-1 bg-white/95 backdrop-blur text-text-primary text-xs font-semibold py-2.5 rounded-full flex items-center justify-center gap-1.5 hover:bg-white transition-colors"
              >
                <FiEye className="w-3.5 h-3.5" />
                Quick View
              </button>
            </div>
          </div>
        </Link>

        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wide text-text-secondary mb-1">
            {product.brand}
          </p>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-1.5 hover:text-secondary/60 transition-colors">
              {product.name}
            </h3>
          </Link>
          <RatingStars rating={product.rating} reviews={product.reviews} />

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-text-primary">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xs text-text-secondary line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                addItem(product, 1, { color: product.colors?.[0] });
              }}
              disabled={product.stock === 0}
              className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/70 transition-colors disabled:opacity-40"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>

          {product.stock === 0 && (
            <p className="text-xs text-red-500 font-medium mt-2">Out of stock</p>
          )}
        </div>
      </motion.div>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
