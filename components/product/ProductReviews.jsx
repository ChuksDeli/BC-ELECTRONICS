'use client';

import { motion } from 'framer-motion';
import { FiStar, FiUser } from 'react-icons/fi';
import RatingStars from '@/components/ui/RatingStars';

const sampleReviews = [
  {
    name: 'Chidi A.',
    rating: 5,
    date: '3 weeks ago',
    text: 'Exactly as described and the build quality feels premium. Delivery was faster than expected too.',
  },
  {
    name: 'Sarah T.',
    rating: 4,
    date: '1 month ago',
    text: 'Really solid product. Only reason it is not 5 stars is the box was slightly dented on arrival, but the item itself is perfect.',
  },
  {
    name: 'Michael B.',
    rating: 5,
    date: '2 months ago',
    text: 'Been using it daily for weeks now and it still performs like new. Worth every penny.',
  },
];

export default function ProductReviews({ product }) {
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    percent: star === Math.round(product.rating) ? 62 : star === Math.round(product.rating) - 1 ? 24 : 5,
  }));

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center md:text-left mb-6">
          <div className="text-4xl font-bold text-text-primary">{product.rating.toFixed(1)}</div>
          <RatingStars rating={product.rating} showValue={false} size="w-4 h-4" />
          <p className="text-xs text-text-secondary mt-1">Based on {product.reviews} reviews</p>
        </div>

        <div className="space-y-2">
          {ratingBreakdown.map(({ star, percent }) => (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="w-8 text-text-secondary">{star} star</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${percent}%` }} />
              </div>
              <span className="w-8 text-text-secondary text-right">{percent}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-6">
        {sampleReviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="pb-6 border-b border-slate-100 last:border-0"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                <FiUser className="w-4 h-4 text-text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{review.name}</p>
                <p className="text-xs text-text-secondary">{review.date}</p>
              </div>
            </div>
            <div className="flex gap-0.5 text-accent mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-accent' : ''}`} />
              ))}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{review.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
