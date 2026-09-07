'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCompass } from 'react-icons/fi';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-20 h-20 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-6">
          <FiCompass className="w-9 h-9 text-primary" />
        </div>
        <p className="text-6xl font-bold text-secondary mb-3">404</p>
        <h1 className="text-xl font-bold text-text-primary mb-2">Page not found</h1>
        <p className="text-text-secondary text-sm mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
