'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Amara O.',
    role: 'Verified Buyer',
    text: 'The Aria 14 Pro is the first phone in years that felt worth the upgrade. Camera is genuinely impressive and the battery lasts the whole day without babying it.',
    rating: 5,
  },
  {
    name: 'Daniel K.',
    role: 'Verified Buyer',
    text: 'Ordered the Slate 16 for video editing work. Delivery was fast, packaging was solid, and the laptop itself handles everything I throw at it.',
    rating: 5,
  },
  {
    name: 'Priya M.',
    role: 'Verified Buyer',
    text: 'Customer support actually helped me pick the right headphones for what I needed instead of just upselling. Rare these days.',
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          What customers are saying
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="p-7 rounded-2xl bg-surface border border-slate-100"
          >
            <div className="flex gap-0.5 text-accent mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar key={s} className={`w-4 h-4 ${s <= t.rating ? 'fill-accent' : ''}`} />
              ))}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">"{t.text}"</p>
            <div>
              <p className="text-sm font-semibold text-text-primary">{t.name}</p>
              <p className="text-xs text-text-secondary">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
