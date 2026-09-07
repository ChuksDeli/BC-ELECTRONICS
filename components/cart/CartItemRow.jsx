'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

export default function CartItemRow({ item }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 py-5 border-b border-slate-100 last:border-0"
    >
      <Link href={`/products/${item.id}`} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-50 shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-text-secondary">{item.brand}</p>
            <Link href={`/products/${item.id}`}>
              <h3 className="text-sm font-semibold text-text-primary truncate hover:text-primary transition-colors">
                {item.name}
              </h3>
            </Link>
            {item.color && <p className="text-xs text-text-secondary mt-0.5">Color: {item.color}</p>}
          </div>
          <button
            onClick={() => removeItem(item.key)}
            className="text-text-secondary hover:text-red-500 transition-colors shrink-0"
            aria-label="Remove item"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-slate-200 rounded-full">
            <button
              onClick={() => decreaseQuantity(item.key)}
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-full"
            >
              <FiMinus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.key)}
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-full"
            >
              <FiPlus className="w-3 h-3" />
            </button>
          </div>
          <span className="text-sm font-bold text-text-primary">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
