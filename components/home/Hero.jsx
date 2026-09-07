'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiSun,
  FiSquare,
  FiActivity,
  FiToggleLeft,
  FiZap,
  FiWind,
  FiShield,
  FiTruck,
  FiCheckCircle,
} from 'react-icons/fi';
import { brands } from '@/data/categories';

const gridItems = [
  { icon: FiSun, label: 'LED Bulbs', href: '/categories/led-bulbs' },
  { icon: FiSquare, label: 'Wall Sockets', href: '/categories/wall-sockets' },
  { icon: FiActivity, label: 'Wires & Cables', href: '/categories/wires-cables' },
  { icon: FiToggleLeft, label: 'Changeover Switches', href: '/categories/changeover-switches' },
  { icon: FiZap, label: 'Circuit Breakers', href: '/categories/circuit-breakers' },
  { icon: FiWind, label: 'Ceiling Fans', href: '/categories/ceiling-fans' },
];

const trustPoints = [
  { icon: FiShield, label: 'Certified & Safe' },
  { icon: FiTruck, label: 'Fast Delivery' },
  { icon: FiCheckCircle, label: '30-Day Returns' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] tracking-tight mb-6">
              Shop genuine electrical
              <br />
              fittings
              <br />
              <span className="text-accent">online in Nigeria.</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-md mb-7 leading-relaxed">
              Schneider Electric, Legrand, MK Electric, Hager and more, all in one place, with fast
              delivery and certified quality on every order.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-9">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-secondary px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-slate-100 transition-colors"
              >
                Shop Now
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop?filter=deals"
                className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-semibold text-sm border border-white/20 hover:bg-white/10 transition-colors"
              >
                See Today's Deals
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-accent" />
                    <span className="text-slate-300 text-xs font-medium">{point.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-3 gap-3 mb-4">
              {gridItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className="aspect-square rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-300 flex flex-col items-center justify-center gap-2.5 p-3"
                    >
                      <Icon className="w-6 h-6 text-white" />
                      <span className="text-[11px] font-medium text-slate-300 text-center leading-tight">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-5"
            >
              <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3">
                Brands available
              </p>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="text-xs font-medium text-slate-300 border border-white/10 rounded-full px-3 py-1.5"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}