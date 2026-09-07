'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiArrowRight } from 'react-icons/fi';
import { useOrders } from '@/context/OrdersContext';
import Button from '@/components/ui/Button';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const { getOrderByNumber, hydrated } = useOrders();

  if (!hydrated) return <div className="max-w-3xl mx-auto px-4 py-24" />;

  const order = getOrderByNumber(orderNumber);

  const estimatedDate = order
    ? new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const paymentTime = order
    ? new Date(order.createdAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
        >
          <FiCheckCircle className="w-10 h-10 text-success" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          Payment Successful
        </h1>
        <p className="text-text-secondary text-sm mb-8">
          Thank you for your order. A confirmation has been placed and is now being prepared.
        </p>

        {order && (
          <div className="bg-surface rounded-2xl border border-slate-100 p-6 mb-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <p className="text-xs text-text-secondary">Order Number</p>
                <p className="text-sm font-bold text-text-primary">{order.orderNumber}</p>
              </div>
              <FiPackage className="w-6 h-6 text-secondary" />
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-secondary">Ordered By</p>
                <p className="text-sm font-semibold text-text-primary">{order.shipping?.fullName}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-secondary">Payment Time</p>
                <p className="text-sm font-semibold text-text-primary">{paymentTime}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-secondary">Payment Method</p>
                <p className="text-sm font-semibold text-text-primary">{order.payment?.label}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-secondary">Estimated Delivery</p>
                <p className="text-sm font-semibold text-text-primary">{estimatedDate}</p>
              </div>
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                <p className="text-xs text-text-secondary">Order Total</p>
                <p className="text-sm font-bold text-text-primary">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/shop" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <Link href={`/order-tracking?order=${orderNumber}`} className="flex-1">
            <Button variant="secondary" size="lg" className="w-full">
              Track Order
              <FiArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-24" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
