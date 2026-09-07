'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
  const { items, removeFromWishlist, hydrated } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (item) => {
    addItem(
      { id: item.id, name: item.name, brand: item.brand, price: item.price, images: [item.image] },
      1,
      {}
    );
    removeFromWishlist(item.id);
  };

  if (!hydrated) return <div className="max-w-8xl mx-auto px-4 py-24" />;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <FiHeart className="w-8 h-8 text-text-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Your wishlist is empty</h1>
        <p className="text-text-secondary text-sm mb-8">
          Save products you love here so you never lose track of them.
        </p>
        <Link href="/shop">
          <Button variant="primary" size="lg">
            Explore Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">My Wishlist</h1>
      <p className="text-text-secondary text-sm mb-8">{items.length} item(s) saved</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-surface rounded-2xl border border-slate-100 overflow-hidden"
            >
              <Link href={`/products/${item.id}`} className="block relative aspect-square bg-slate-50">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </Link>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-wide text-text-secondary mb-1">
                  {item.brand}
                </p>
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-2 hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-base font-bold text-text-primary mb-3">${item.price}</p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-secondary text-white text-xs font-semibold py-2.5 rounded-full hover:bg-primary transition-colors"
                  >
                    <FiShoppingCart className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-9 h-9 shrink-0 flex items-center justify-center border border-slate-200 rounded-full hover:border-red-300 hover:text-red-500 transition-colors"
                    aria-label="Remove"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
