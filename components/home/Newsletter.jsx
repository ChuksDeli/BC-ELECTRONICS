'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-secondary px-6 sm:px-12 py-14 text-center relative overflow-hidden"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Get early access to new drops
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
          Join the list for launch pricing, restock alerts, and offers we do not post anywhere
          else.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-white font-medium">
            <FiCheck className="w-5 h-5 text-success" />
            You are on the list. Thank you.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full flex-1 rounded-full px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button type="submit" variant="accent" size="md" className="w-full sm:w-auto">
              Subscribe
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
