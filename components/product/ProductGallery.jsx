'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden mb-4">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="relative bg-black h-full w-full"
        >
          <Image
            src={images[active]}
            alt={`${name} view ${active + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                active === i ? 'border-primary' : 'border-transparent'
              }`}
            >
              <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
