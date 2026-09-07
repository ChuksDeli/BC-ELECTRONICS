'use client';

import { FiX } from 'react-icons/fi';
import { categories, brands } from '@/data/categories';

export default function ShopFilters({
  filters,
  onChange,
  mobile = false,
  onClose,
}) {
  const toggleCategory = (id) => {
    const current = filters.categories || [];
    const next = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    onChange({ ...filters, categories: next });
  };

  const toggleBrand = (b) => {
    const current = filters.brands || [];
    const next = current.includes(b) ? current.filter((x) => x !== b) : [...current, b];
    onChange({ ...filters, brands: next });
  };

  const handlePriceChange = (field, value) => {
    onChange({ ...filters, [field]: value ? Number(value) : null });
  };

  const setRating = (r) => {
    onChange({ ...filters, minRating: filters.minRating === r ? null : r });
  };

  const clearAll = () => {
    onChange({ categories: [], brands: [], minPrice: null, maxPrice: null, minRating: null });
  };

  return (
    <div className={mobile ? 'p-5' : ''}>
      {mobile && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Filters</h3>
          <button onClick={onClose} className="p-1">
            <FiX className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold">Filters</p>
        <button onClick={clearAll} className="text-xs text-primary font-medium hover:underline">
          Clear all
        </button>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">
          Category
        </p>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(filters.categories || []).includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/30"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">
          Brand
        </p>
        <div className="space-y-2">
          {brands.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(filters.brands || []).includes(b)}
                onChange={() => toggleBrand(b)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/30"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">
          Price
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange('minPrice', e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
          />
          <span className="text-text-secondary text-xs">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">
          Rating
        </p>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.minRating === r}
                onChange={() => setRating(r)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/30"
              />
              {r}+ stars
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
