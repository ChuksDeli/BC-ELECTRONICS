'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiUsers, FiTarget } from 'react-icons/fi';
import { brands } from '@/data/categories';

const values = [
  {
    icon: FiShield,
    title: 'Genuine, Always',
    desc: 'Every product on Ajo is sourced directly from authorized distributors. No fakes, no grey market imports.',
  },
  {
    icon: FiTruck,
    title: 'Delivery You Can Trust',
    desc: 'Every order is tracked from the moment you pay to the moment it lands in your hands.',
  },
  {
    icon: FiUsers,
    title: 'Built for Real People',
    desc: 'We stock what Nigerians actually buy, from flagship phones to everyday accessories.',
  },
  {
    icon: FiTarget,
    title: 'No Wahala Returns',
    desc: 'If something is not right, our 30-day return policy means you are never stuck with it.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16"
      >
        <p className="text-[11px] uppercase tracking-widest text-secondary font-semibold mb-4">
          About Us
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
          Electronics that actually deliver.
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Ajo started with a simple frustration: too many people paying for electronics online and
          getting something different from what they ordered, or nothing at all. We built Ajo to
          be the opposite of that. Genuine devices, honest pricing, and delivery that actually
          shows up.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {values.map((value, i) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-surface border border-slate-100"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/8 text-secondary flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1.5">{value.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{value.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid lg:grid-cols-2 gap-10 items-center mb-20"
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">Our Story</h2>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            We started Ajo because buying electronics online in Nigeria felt like a gamble. You
            never really knew if what arrived would match what you paid for, or if it would arrive
            at all.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            So we built a platform that only sells what it can actually stand behind. Every phone,
            laptop, and accessory on Ajo comes from brands people already trust, backed by a real
            warranty and a delivery process you can follow every step of the way.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            No hype, no games. Just electronics that work, delivered the way they should be.
          </p>
        </div>
        <div className="bg-secondary rounded-3xl p-8 sm:p-10">
          <p className="text-4xl sm:text-5xl font-bold text-white mb-2">10+</p>
          <p className="text-slate-400 text-sm mb-6">Trusted brands stocked</p>
          <div className="h-px bg-white/10 mb-6" />
          <p className="text-4xl sm:text-5xl font-bold text-white mb-2">30-Day</p>
          <p className="text-slate-400 text-sm">Return window on every order</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 text-center">
          Brands you already trust
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-xl font-bold text-slate-300 hover:text-secondary transition-colors duration-300 cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}