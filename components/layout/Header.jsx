'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/data/categories';

function MobileMenu({ open, onClose, isShopActive, pathname }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-secondary/50 lg:hidden"
            style={{ zIndex: 9998 }}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-[82%] max-w-sm bg-white lg:hidden overflow-y-auto"
            style={{ zIndex: 9999, height: '100vh' }}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <span className="text-lg font-bold text-secondary">BC ELECTRONICS</span>
              <button onClick={onClose} className="p-1">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-5 flex flex-col gap-1">
              <Link
                href="/shop"
                onClick={onClose}
                className={`px-3 py-3 text-sm font-medium rounded-lg ${
                  isShopActive ? 'bg-secondary/10 text-secondary' : 'hover:bg-slate-50'
                }`}
              >
                All Products
              </Link>
              <Link
                href="/shop?filter=deals"
                onClick={onClose}
                className="px-3 py-3 text-sm font-medium rounded-lg hover:bg-slate-50"
              >
                Deals
              </Link>
              <Link
                href="/shop?filter=new"
                onClick={onClose}
                className="px-3 py-3 text-sm font-medium rounded-lg hover:bg-slate-50"
              >
                New Arrivals
              </Link>
              <div className="h-px bg-slate-100 my-2" />
              <p className="px-3 text-xs uppercase tracking-wide text-text-secondary font-semibold mb-1">
                Categories
              </p>
              {categories.map((cat) => {
                const active = pathname === `/categories/${cat.id}`;
                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    onClick={onClose}
                    className={`px-3 py-2.5 text-sm rounded-lg ${
                      active ? 'bg-secondary/10 text-secondary font-medium' : 'hover:bg-slate-50 text-text-secondary'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

function HeaderContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const filterParam = searchParams.get('filter');
  const isShopActive = pathname === '/shop' && !filterParam;
  const isDealsActive = pathname === '/shop' && filterParam === 'deals';
  const isNewActive = pathname === '/shop' && filterParam === 'new';
  const isCategoryActive = pathname.startsWith('/categories');

  const navLinkClass = (active) =>
    `px-3 py-2 text-sm font-medium transition-colors relative ${
      active ? 'text-secondary' : 'text-text-primary hover:text-secondary/60'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden p-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">BC</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-secondary hidden sm:block">
                BC ELECTRONICS
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button className={`flex items-center gap-1 ${navLinkClass(isCategoryActive)}`}>
                  Shop
                  <FiChevronDown className="w-3.5 h-3.5" />
                  {isCategoryActive && (
                    <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-secondary rounded-full" />
                  )}
                </button>

                <AnimatePresence>
                  {megaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 grid grid-cols-3 gap-1"
                    >
                      {categories.map((cat) => {
                        const active = pathname === `/categories/${cat.id}`;
                        return (
                          <Link
                            key={cat.id}
                            href={`/categories/${cat.id}`}
                            className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                              active
                                ? 'text-secondary bg-secondary/5 font-medium'
                                : 'text-text-secondary hover:text-secondary hover:bg-secondary/5'
                            }`}
                          >
                            {cat.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/shop" className={navLinkClass(isShopActive)}>
                All Products
                {isShopActive && (
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
              <Link href="/shop?filter=deals" className={navLinkClass(isDealsActive)}>
                Deals
                {isDealsActive && (
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
              <Link href="/shop?filter=new" className={navLinkClass(isNewActive)}>
                New Arrivals
                {isNewActive && (
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:block relative">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.form
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: 260, opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSearchSubmit}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => !searchQuery && setSearchOpen(false)}
                      placeholder="Search products..."
                      className="w-full bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </motion.form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2.5 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Search"
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/search"
              className={`md:hidden p-2.5 rounded-full transition-colors ${
                pathname === '/search' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'
              }`}
            >
              <FiSearch className="w-5 h-5" />
            </Link>

            <Link
              href="/wishlist"
              className={`relative p-2.5 rounded-full transition-colors ${
                pathname === '/wishlist' ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100'
              }`}
            >
              <FiHeart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className={`relative p-2.5 rounded-full transition-colors ${
                pathname === '/cart' ? 'bg-secondary/10 text-secondary' : 'hover:bg-slate-100'
              }`}
            >
              <FiShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] flex items-center justify-center bg-secondary text-white text-[10px] font-bold rounded-full"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen((o) => !o)}
                className={`p-2.5 rounded-full transition-colors flex items-center gap-1.5 ${
                  pathname === '/profile' ? 'bg-primary/10 text-secondary' : 'hover:bg-slate-100'
                }`}
              >
                <FiUser className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2"
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-slate-100 mb-1">
                          <p className="text-sm font-semibold truncate">{user.firstName}</p>
                          <p className="text-xs text-text-secondary truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-slate-50"
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/profile?tab=orders"
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-slate-50"
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-slate-50"
                        >
                          Wishlist
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setProfileMenuOpen(false);
                            router.push('/');
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-slate-50 font-medium"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-2 text-sm hover:bg-slate-50"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isShopActive={isShopActive}
        pathname={pathname}
      />
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div className="sticky top-0 z-40 h-16 lg:h-[72px] bg-white/90 backdrop-blur-md" />}>
      <HeaderContent />
    </Suspense>
  );
}