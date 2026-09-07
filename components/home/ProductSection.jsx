'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '@/components/product/ProductCard';

export default function ProductSection({ title, subtitle, products, viewAllHref, tone = 'light' }) {
  if (!products || products.length === 0) return null;

  return (
    <section
      className={`py-16 lg:py-20 ${tone === 'dark' ? 'bg-secondary' : ''}`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2
              className={`text-2xl sm:text-3xl font-bold ${tone === 'dark' ? 'text-white' : 'text-text-primary'}`}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`text-sm mt-1 ${tone === 'dark' ? 'text-slate-400' : 'text-text-secondary'}`}
              >
                {subtitle}
              </p>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold ${
                tone === 'dark' ? 'text-white hover:text-primary' : 'text-primary hover:text-primary-dark'
              } transition-colors`}
            >
              View All
              <FiArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
