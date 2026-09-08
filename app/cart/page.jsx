'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import CartItemRow from '@/components/cart/CartItemRow';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items, subtotal, clearCart, hydrated } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handlePromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AJO10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code.');
      setPromoApplied(false);
    }
  };

  if (!hydrated) {
    return <div className="max-w-8xl mx-auto px-4 py-24" />;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <FiShoppingBag className="w-8 h-8 text-text-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Your cart is empty</h1>
        <p className="text-text-secondary text-sm mb-8">
          Looks like you have not added anything yet. Let us fix that.
        </p>
        <Link href="/shop">
          <Button variant="secondary" size="lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-10 py-10 overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">{items.length} item(s)</p>
            <button
              onClick={clearCart}
              className="text-xs text-text-secondary hover:text-red-500 transition-colors"
            >
              Clear cart
            </button>
          </div>

          <div className="bg-surface rounded-2xl border border-slate-100 px-5">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartItemRow key={item.key} item={item} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <div className="bg-surface rounded-2xl border border-slate-100 p-6 sticky top-24">
            <h2 className="text-base font-bold text-text-primary mb-5">Order Summary</h2>

            <form onSubmit={handlePromo} className="mb-5">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="w-full text-sm border border-slate-200 rounded-full pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  className="text-sm font-semibold text-secondary hover:text-secondary px-2 shrink-0"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-red-500 mt-1.5">{promoError}</p>}
              {promoApplied && (
                <p className="text-xs text-success mt-1.5">Promo code applied. 10% off.</p>
              )}
              <p className="text-[11px] text-text-secondary mt-1.5">Try: AJO10</p>
            </form>

            <div className="space-y-2.5 text-sm border-t border-slate-100 pt-5">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold pt-2.5 border-t border-slate-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button variant="secondary" size="lg" className="w-full mt-6">
                Checkout
                <FiArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/shop">
              <button className="w-full text-center text-sm text-text-secondary hover:text-primary mt-4 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
