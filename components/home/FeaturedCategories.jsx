'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiSun,
  FiSquare,
  FiToggleRight,
  FiActivity,
  FiToggleLeft,
  FiGrid,
  FiZap,
  FiBox,
  FiBatteryCharging,
  FiWind,
  FiLink,
  FiSliders,
} from 'react-icons/fi';

const featured = [
  { id: 'led-bulbs', name: 'LED Bulbs', icon: FiSun },
  { id: 'wall-sockets', name: 'Wall Sockets', icon: FiSquare },
  { id: 'wall-switches', name: 'Wall Switches', icon: FiToggleRight },
  { id: 'wires-cables', name: 'Wires & Cables', icon: FiActivity },
  { id: 'changeover-switches', name: 'Changeover Switches', icon: FiToggleLeft },
  { id: 'extension-sockets', name: 'Extension Sockets', icon: FiGrid },
  { id: 'circuit-breakers', name: 'Circuit Breakers', icon: FiZap },
  { id: 'distribution-boards', name: 'Distribution Boards', icon: FiBox },
  { id: 'plugs-adapters', name: 'Plugs & Adapters', icon: FiBatteryCharging },
  { id: 'ceiling-fans', name: 'Ceiling Fans', icon: FiWind },
  { id: 'tape-connectors', name: 'Tape & Connectors', icon: FiLink },
  { id: 'voltage-stabilizers', name: 'Voltage Stabilizers', icon: FiSliders },
];

export default function FeaturedCategories() {
  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Shop by Category</h2>
        <p className="text-text-secondary text-sm mt-1">
          Find exactly what you are looking for.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {featured.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/categories/${cat.id}`}
                className="flex flex-col items-center justify-center gap-3 p-5 h-[17vh] sm:p-7 rounded-2xl bg-surface border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center group-hover:bg-secondary group-hover:text-white text-secondary transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-text-primary text-center">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}