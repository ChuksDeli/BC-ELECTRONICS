'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCheck, FiPackage, FiSearch } from 'react-icons/fi';
import { useOrders } from '@/context/OrdersContext';
import Button from '@/components/ui/Button';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const { getOrderByNumber, hydrated } = useOrders();
  const [inputValue, setInputValue] = useState(searchParams.get('order') || '');
  const [searchedOrder, setSearchedOrder] = useState(searchParams.get('order') || '');

  const order = hydrated ? getOrderByNumber(searchedOrder) : null;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchedOrder(inputValue.trim());
  };

  const stageProgress = order ? (order.currentStage / (order.stages.length - 1)) * 100 : 30;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 text-center">
        Track Your Order
      </h1>
      <p className="text-text-secondary text-sm text-center mb-8">
        Enter your order number to see live status.
      </p>

      <form onSubmit={handleSearch} className="flex items-center gap-3 mb-10 max-w-md mx-auto">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. AJO-482913"
            className="w-full text-sm border border-slate-200 rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button type="submit" variant="secondary" size="md">
          Track
        </Button>
      </form>

      {hydrated && searchedOrder && !order && (
        <p className="text-center text-text-secondary text-sm">
          No order found with that number.
        </p>
      )}

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-surface rounded-2xl border border-slate-100 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-text-secondary">Order</p>
              <p className="text-lg font-bold text-text-primary">{order.orderNumber}</p>
            </div>
            <div className="w-11 h-11 rounded-full bg-secondary/10 flex items-center justify-center">
              <FiPackage className="w-5 h-5 text-secondary" />
            </div>
          </div>

          <div className="relative mb-4">
            <div className="absolute top-4 left-0 right-0 h-1 bg-slate-100 rounded-full" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stageProgress}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-4 left-0 h-1 bg-success rounded-full"
            />
            <div className="relative flex justify-between">
              {order.stages.map((stage, i) => {
                const completed = i <= order.currentStage;
                return (
                  <div key={stage} className="flex flex-col items-center gap-2 flex-1">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-white ${
                        completed ? 'border-success text-success' : 'border-slate-200 text-slate-300'
                      }`}
                    >
                      {completed ? (
                        <FiCheck className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </motion.div>
                    <span
                      className={`text-[10px] text-center leading-tight ${
                        completed ? 'text-text-primary font-medium' : 'text-text-secondary'
                      }`}
                    >
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-10 pt-6 border-t border-slate-100">
            <div>
              <p className="text-xs text-text-secondary mb-1">Shipping To</p>
              <p className="text-sm font-medium text-text-primary">{order.shipping?.fullName}</p>
              <p className="text-xs text-text-secondary">
                {order.shipping?.address}, {order.shipping?.city}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Estimated Delivery</p>
              <p className="text-sm font-medium text-text-primary">
                {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-text-secondary mb-3">Items in this order</p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between text-sm">
                  <span className="text-text-primary">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-16" />}>
      <OrderTrackingContent />
    </Suspense>
  );
}
