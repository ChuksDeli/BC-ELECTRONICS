'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductCard from '@/components/product/ProductCard';
import ShopFilters from '@/components/product/ShopFilters';
import SortDropdown from '@/components/product/SortDropdown';
import { products as allProducts } from '@/data/products';

function sortProducts(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'popular':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case 'newest':
    default:
      return sorted.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
  }
}

function ShopContent() {
  const searchParams = useSearchParams();
  const urlFilter = searchParams.get('filter');

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    minRating: null,
  });
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (urlFilter === 'deals') list = list.filter((p) => p.isFlashSale || p.oldPrice);
    if (urlFilter === 'new') list = list.filter((p) => p.isNew);
    if (urlFilter === 'bestsellers') list = list.filter((p) => p.isBestSeller);

    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.minPrice) list = list.filter((p) => p.price >= filters.minPrice);
    if (filters.maxPrice) list = list.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating);

    return sortProducts(list, sortBy);
  }, [filters, sortBy, urlFilter]);

  const pageTitle =
    urlFilter === 'deals'
      ? 'Deals'
      : urlFilter === 'new'
      ? 'New Arrivals'
      : urlFilter === 'bestsellers'
      ? 'Best Sellers'
      : 'All Products';

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{pageTitle}</h1>
        <p className="text-text-secondary text-sm mt-1">{filtered.length} products found</p>
      </div>

      <div className="flex items-center justify-between mb-6 lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 text-sm font-medium border border-slate-200 rounded-full px-4 py-2.5"
        >
          <FiFilter className="w-4 h-4" />
          Filters
        </button>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ShopFilters filters={filters} onChange={setFilters} />
          </div>
        </aside>

        <div>
          <div className="hidden lg:flex justify-end mb-6">
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-text-secondary">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-secondary/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
            >
              <ShopFilters
                filters={filters}
                onChange={setFilters}
                mobile
                onClose={() => setMobileFiltersOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-8xl mx-auto px-4 py-24" />}>
      <ShopContent />
    </Suspense>
  );
}
