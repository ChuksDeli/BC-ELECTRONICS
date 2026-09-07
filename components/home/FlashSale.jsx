'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';
import ProductCard from '@/components/product/ProductCard';

function getTimeParts(target) {
  const diff = Math.max(0, target - Date.now());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

export default function FlashSale({ products }) {
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 8);
  const [time, setTime] = useState(() => getTimeParts(target));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeParts(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (!products || products.length === 0) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-amber-50 to-transparent">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-white">
              <FiZap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Flash Sale</h2>
              <p className="text-text-secondary text-sm">Prices this good do not last.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[
              { label: 'HRS', value: time.hours },
              { label: 'MIN', value: time.minutes },
              { label: 'SEC', value: time.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-secondary text-white rounded-xl px-3 py-2 text-center min-w-[54px]"
              >
                <div className="text-lg font-bold tabular-nums leading-none">{pad(unit.value)}</div>
                <div className="text-[9px] text-slate-400 tracking-wide mt-1">{unit.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
