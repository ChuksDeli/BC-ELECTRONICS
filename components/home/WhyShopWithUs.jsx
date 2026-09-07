'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

const points = [
  {
    icon: FiTruck,
    title: 'Fast, Tracked Delivery',
    desc: 'Every order is tracked from confirmation to your door.',
  },
  {
    icon: FiShield,
    title: '2-Year Warranty',
    desc: 'Every product is backed by our extended protection plan.',
  },
  {
    icon: FiRefreshCw,
    title: '30-Day Returns',
    desc: 'Not the right fit? Send it back, no questions asked.',
  },
  {
    icon: FiHeadphones,
    title: 'Real Human Support',
    desc: 'Our team actually answers, and actually helps.',
  },
];

export default function WhyShopWithUs() {
  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {points.map((point, i) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-surface border border-slate-100"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/8 text-secondary flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1.5">{point.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{point.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
