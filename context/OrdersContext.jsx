'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const OrdersContext = createContext(undefined);
const STORAGE_KEY = 'novek_orders';

const STAGES = ['Order Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

function generateOrderNumber() {
  return 'AJO-' + Math.floor(100000 + Math.random() * 900000);
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setOrders(JSON.parse(stored));
    } catch (e) {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders, hydrated]);

  const createOrder = useCallback(({ items, total, shipping, payment }) => {
    const orderNumber = generateOrderNumber();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const order = {
      orderNumber,
      items,
      total,
      shipping,
      payment,
      createdAt: new Date().toISOString(),
      estimatedDelivery: deliveryDate.toISOString(),
      currentStage: 1,
      stages: STAGES,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const getOrderByNumber = useCallback(
    (orderNumber) => orders.find((o) => o.orderNumber === orderNumber),
    [orders]
  );

  return (
    <OrdersContext.Provider value={{ orders, createOrder, getOrderByNumber, hydrated }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
