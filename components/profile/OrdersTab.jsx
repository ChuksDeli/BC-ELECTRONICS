'use client';

import Link from 'next/link';
import { FiPackage, FiChevronRight } from 'react-icons/fi';
import { useOrders } from '@/context/OrdersContext';

export default function OrdersTab() {
  const { orders, hydrated } = useOrders();

  if (!hydrated) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-text-primary mb-6">Recent Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-text-secondary">You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.orderNumber}
              href={`/order-tracking?order=${order.orderNumber}`}
              className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/8 flex items-center justify-center shrink-0">
                  <FiPackage className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{order.orderNumber}</p>
                  <p className="text-xs text-text-secondary">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    · {order.items.length} item(s) · ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text-secondary">
                  {order.stages[order.currentStage]}
                </span>
                <FiChevronRight className="w-4 h-4 text-text-secondary" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
