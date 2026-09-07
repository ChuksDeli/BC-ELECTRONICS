'use client';

import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-slate-800',
  outline: 'border border-slate-300 text-text-primary hover:border-secondary bg-transparent',
  ghost: 'bg-transparent text-text-primary hover:bg-slate-100',
  accent: 'bg-accent text-white hover:bg-amber-600',
};

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-base px-7 py-3.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
