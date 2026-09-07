'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import SortDropdown from '@/components/product/SortDropdown';
import { getProductsByCategory } from '@/data/products';
import { categories } from '@/data/categories';
import { FiChevronRight } from 'react-icons/fi';

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

export default function CategoryPage({ params }) {
  const category = categories.find((c) => c.id === params.category);
  const [sortBy, setSortBy] = useState('newest');

  if (!category) return notFound();

  const products = useMemo(
    () => sortProducts(getProductsByCategory(category.id), sortBy),
    [category.id, sortBy]
  );

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <FiChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-text-primary">{category.name}</span>
      </div>

      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{category.name}</h1>
          <p className="text-text-secondary text-sm mt-1">{products.length} products</p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {products.length === 0 ? (
        <div className="py-24 text-center text-text-secondary">
          No products available in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
