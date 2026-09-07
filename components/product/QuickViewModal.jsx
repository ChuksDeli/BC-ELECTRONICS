'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { FiX, FiPlus, FiMinus } from 'react-icons/fi';
import RatingStars from '@/components/ui/RatingStars';
import Button from '@/components/ui/Button';

export default function QuickViewModal({ product, open, onClose }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);

  const handleAdd = () => {
    addItem(product, quantity, { color: selectedColor });
    onClose();
    setQuantity(1);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-100"
              >
                <FiX className="w-4 h-4" />
              </button>

              <div className="relative aspect-square md:aspect-auto bg-slate-50">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>

              <div className="p-6 md:p-8 flex flex-col">
                <p className="text-xs uppercase tracking-wide text-text-secondary mb-1">
                  {product.brand}
                </p>
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <RatingStars rating={product.rating} reviews={product.reviews} />

                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>

                <p className="text-sm text-text-secondary mt-4 line-clamp-3">
                  {product.description}
                </p>

                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-semibold text-text-primary mb-2">Color</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
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

                <div className="flex items-center gap-3 mt-5">
                  <div className="flex items-center border border-slate-200 rounded-full">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 rounded-full"
                    >
                      <FiMinus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 rounded-full"
                    >
                      <FiPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex flex-col gap-2">
                  <Button variant="primary" size="lg" onClick={handleAdd} className="w-full">
                    Add to Cart
                  </Button>
                  <Link href={`/products/${product.id}`} onClick={onClose}>
                    <Button variant="outline" size="lg" className="w-full">
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
