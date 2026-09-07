'use client';

import { motion } from 'framer-motion';
import { brands } from '@/data/categories';

export default function FeaturedBrands() {
  return (
    <section className="py-14 border-y border-slate-100 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-widest text-text-secondary mb-8"
        >
          Brands available on Ajo
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {brands.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-xl font-bold text-slate-300 hover:text-secondary transition-colors duration-300 cursor-default"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
