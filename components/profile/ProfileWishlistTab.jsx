'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';
import { useWishlist } from '@/context/WishlistContext';

export default function ProfileWishlistTab() {
  const { items, hydrated } = useWishlist();

  if (!hydrated) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-text-primary mb-6">Wishlist</h2>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <FiHeart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-text-secondary">Nothing saved to your wishlist yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors"
            >
              <div className="relative w-14 h-14 rounded-xl bg-slate-50 shrink-0 overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{item.name}</p>
                <p className="text-xs text-text-secondary">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <Link
          href="/wishlist"
          className="inline-block mt-6 text-sm font-semibold text-primary hover:underline"
        >
          View full wishlist
        </Link>
      )}
    </div>
  );
}
