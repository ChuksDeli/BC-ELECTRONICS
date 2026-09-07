'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import ProductCard from '@/components/product/ProductCard';
import SortDropdown from '@/components/product/SortDropdown';
import { searchProducts } from '@/data/products';

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
    default:
      return sorted;
  }
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return sortProducts(searchProducts(query), sortBy);
  }, [query, sortBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <form onSubmit={handleSubmit} className="max-w-xl mb-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-secondary" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands, categories..."
            className="w-full text-sm border border-slate-200 rounded-full pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </form>

      {query.trim() && (
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              Results for "{query}"
            </h1>
            <p className="text-text-secondary text-sm mt-1">{results.length} products found</p>
          </div>
          {results.length > 0 && <SortDropdown value={sortBy} onChange={setSortBy} />}
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center"
        >
          <p className="text-text-secondary">
            No products found for "{query}". Try a different search term.
          </p>
        </motion.div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {results.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}

      {!query.trim() && (
        <div className="py-24 text-center text-text-secondary text-sm">
          Start typing to search our catalog.
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-8xl mx-auto px-4 py-24" />}>
      <SearchContent />
    </Suspense>
  );
}
