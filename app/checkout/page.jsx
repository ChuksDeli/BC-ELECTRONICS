'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin,
  FiTruck,
  FiCreditCard,
  FiTag,
  FiLoader,
  FiCopy,
  FiCheck,
  FiChevronLeft,
  FiLock,
} from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrdersContext';
import { nigerianBanks } from '@/data/banks';
import Button from '@/components/ui/Button';

const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', time: '5-7 business days', price: 0 },
  { id: 'express', label: 'Express Delivery', time: '2-3 business days', price: 15 },
  { id: 'overnight', label: 'Overnight Delivery', time: 'Next business day', price: 39 },
];

const paymentOptions = [
  { id: 'card', label: 'Pay with Card' },
  { id: 'bank', label: 'Pay with Bank' },
  { id: 'transfer', label: 'Bank Transfer' },
];

const COMPANY_BANK = {
  name: 'Zenith Bank',
  accountNumber: '2034567891',
  accountName: 'AJO ELECTRONICS LTD',
};

export default function CheckoutPage() {
  const { isAuthenticated, user, hydrated: authHydrated } = useAuth();
  const { items, subtotal, clearCart, hydrated: cartHydrated } = useCart();
  const { createOrder } = useOrders();
  const router = useRouter();

  const [formStage, setFormStage] = useState('checkout'); // checkout | card-pin | transfer-confirm
  const orderPlacedRef = useRef(false);

  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [saveCard, setSaveCard] = useState(false);
  const [cardPin, setCardPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [selectedBank, setSelectedBank] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');

  const [copied, setCopied] = useState(false);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!authHydrated) return;
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [authHydrated, isAuthenticated, router]);

  useEffect(() => {
    if (!cartHydrated) return;
    if (items.length === 0 && !orderPlacedRef.current) {
      router.push('/cart');
    }
  }, [cartHydrated, items, router]);

  useEffect(() => {
    if (user) {
      setShipping((s) => ({ ...s, fullName: `${user.firstName} ${user.lastName}` }));
    }
  }, [user]);

  if (!authHydrated || !cartHydrated || !isAuthenticated || items.length === 0) {
    return <div className="max-w-8xl mx-auto px-4 py-24" />;
  }

  const deliveryCost = deliveryOptions.find((d) => d.id === deliveryMethod)?.price || 0;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryCost - discount;

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === 'AJO10') {
      setPromoApplied(true);
    }
  };

  const paymentMethodLabel = paymentOptions.find((p) => p.id === paymentMethod)?.label || '';

  const finalizeOrder = () => {
    orderPlacedRef.current = true;
    setProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        items,
        total,
        shipping,
        payment: {
          method: paymentMethod,
          label: paymentMethodLabel,
          bank: paymentMethod === 'bank' ? selectedBank : paymentMethod === 'transfer' ? COMPANY_BANK.name : null,
        },
      });
      clearCart();
      router.push(`/order-success?order=${order.orderNumber}`);
    }, 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      setFormStage('card-pin');
      return;
    }
    if (paymentMethod === 'transfer') {
      setFormStage('transfer-confirm');
      return;
    }
    // bank method: validated by required fields already, place order directly
    finalizeOrder();
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (cardPin.length !== 4) {
      setPinError('Please enter your 4-digit card PIN.');
      return;
    }
    setPinError('');
    finalizeOrder();
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(COMPANY_BANK.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Card PIN screen ──────────────────────────────────────────
  if (formStage === 'card-pin') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <button
          onClick={() => setFormStage('checkout')}
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-secondary mb-8 transition-colors"
        >
          <FiChevronLeft className="w-4 h-4" />
          Back
        </button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
            <FiLock className="w-6 h-6 text-secondary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Enter Card PIN</h1>
          <p className="text-text-secondary text-sm mb-8">
            Enter your 4-digit card PIN to confirm payment of{' '}
            <span className="font-semibold text-text-primary">${total.toFixed(2)}</span>.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-5">
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={cardPin}
              onChange={(e) => setCardPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              autoFocus
              className="w-full text-center text-3xl tracking-[0.6em] border border-slate-200 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-secondary/20"
            />
            {pinError && <p className="text-sm text-red-500 text-center">{pinError}</p>}

            <Button type="submit" variant="secondary" size="lg" disabled={processing} className="w-full">
              {processing ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Confirming...
                </>
              ) : (
                `Confirm Payment of $${total.toFixed(2)}`
              )}
            </Button>
          </form>
        </motion.div>

        <ProcessingOverlay show={processing} />
      </div>
    );
  }

  // ── Bank Transfer confirmation screen ────────────────────────
  if (formStage === 'transfer-confirm') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <button
          onClick={() => setFormStage('checkout')}
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary mb-8 transition-colors"
        >
          <FiChevronLeft className="w-4 h-4" />
          Back
        </button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Complete Your Transfer</h1>
          <p className="text-text-secondary text-sm mb-8">
            Transfer the exact amount below to complete your order.
          </p>

          <div className="bg-surface border border-slate-100 rounded-2xl p-6 space-y-4 mb-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-sm text-text-secondary">Amount</span>
              <span className="text-xl font-bold text-text-primary">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Bank Name</span>
              <span className="text-sm font-semibold text-text-primary">{COMPANY_BANK.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Account Number</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary tabular-nums">
                  {COMPANY_BANK.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="text-primary hover:text-primary-dark transition-colors"
                  aria-label="Copy account number"
                >
                  {copied ? <FiCheck className="w-4 h-4 text-success" /> : <FiCopy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Account Name</span>
              <span className="text-sm font-semibold text-text-primary">{COMPANY_BANK.accountName}</span>
            </div>
          </div>

          {copied && (
            <p className="text-xs text-success text-center -mt-5 mb-5">Account number copied</p>
          )}

          <Button
            variant="secondary"
            size="lg"
            onClick={finalizeOrder}
            disabled={processing}
            className="w-full"
          >
            {processing ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                Confirming...
              </>
            ) : (
              "I've Made the Transfer, Confirm Payment"
            )}
          </Button>
        </motion.div>

        <ProcessingOverlay show={processing} />
      </div>
    );
  }

  // ── Main checkout form ───────────────────────────────────────
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">Checkout</h1>

      <form onSubmit={handleFormSubmit} className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-8">
          <section className="bg-surface rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <FiMapPin className="w-4.5 h-4.5 text-secondary" />
              <h2 className="text-base font-bold text-text-primary">Shipping Information</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Full Name</label>
                <input
                  required
                  value={shipping.fullName}
                  onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Street Address</label>
                <input
                  required
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">City</label>
                <input
                  required
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">State / Region</label>
                <input
                  required
                  value={shipping.state}
                  onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">ZIP / Postal Code</label>
                <input
                  required
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">Phone Number</label>
                <input
                  required
                  value={shipping.phone}
                  onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          <section className="bg-surface rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <FiTruck className="w-4.5 h-4.5 text-secondary" />
              <h2 className="text-base font-bold text-text-primary">Delivery Method</h2>
            </div>
            <div className="space-y-3">
              {deliveryOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                    deliveryMethod === opt.id ? 'border-secondary bg-secondary/5' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === opt.id}
                      onChange={() => setDeliveryMethod(opt.id)}
                      className="w-4 h-4 text-secondary"
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{opt.label}</p>
                      <p className="text-xs text-text-secondary">{opt.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{opt.price === 0 ? 'Free' : `$${opt.price}`}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="bg-surface rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <FiCreditCard className="w-4.5 h-4.5 text-secondary" />
              <h2 className="text-base font-bold text-text-primary">Payment Method</h2>
            </div>
            <div className="space-y-3 mb-5">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === opt.id ? 'border-secondary bg-secondary/5' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-text-primary">{opt.label}</span>
                </label>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {paymentMethod === 'card' && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-text-primary mb-1.5 block">Card Number</label>
                      <input
                        required
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-1.5 block">Expiry Date</label>
                      <input
                        required
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-1.5 block">CVV</label>
                      <input
                        required
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary/20"
                      />
                    </div>
                    <label className="sm:col-span-2 flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-secondary focus:ring-secondary/30"
                      />
                      Save this card for next time
                    </label>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'bank' && (
                <motion.div
                  key="bank"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-1.5 block">Choose Your Bank</label>
                      <select
                        required
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                      >
                        <option value="">Choose your bank</option>
                        {nigerianBanks.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>

                    <AnimatePresence>
                      {selectedBank && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <label className="text-sm font-medium text-text-primary mb-1.5 block">
                            Enter Your Bank Account Number
                          </label>
                          <input
                            required
                            inputMode="numeric"
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value.replace(/\D/g, ''))}
                            placeholder="0123456789"
                            className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'transfer' && (
                <motion.div
                  key="transfer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-text-secondary pt-2">
                    You will receive transfer details on the next step to complete your payment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        <div>
          <div className="bg-surface rounded-2xl border border-slate-100 p-6 sticky top-24">
            <h2 className="text-base font-bold text-text-primary mb-5">Order Summary</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto mb-5 pr-1">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 shrink-0 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary truncate">{item.name}</p>
                    <p className="text-[11px] text-text-secondary">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div className="relative flex-1">
                <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Discount code"
                  className="w-full text-sm border border-slate-200 rounded-full pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              <button
                type="button"
                onClick={handlePromo}
                className="text-sm font-semibold text-secondary hover:text-secondary px-2 shrink-0"
              >
                Apply
              </button>
            </div>

            <div className="space-y-2.5 text-sm border-t border-slate-100 pt-5">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Delivery</span>
                <span className="font-medium">{deliveryCost === 0 ? 'Free' : `$${deliveryCost.toFixed(2)}`}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold pt-2.5 border-t border-slate-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" variant="secondary" size="lg" className="w-full mt-6">
              {paymentMethod === 'card' ? 'Continue to PIN' : paymentMethod === 'transfer' ? 'Get Transfer Details' : 'Place Order'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ProcessingOverlay({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
          style={{ zIndex: 9999 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary"
          />
          <p className="text-text-primary font-medium">Processing your payment...</p>
          <p className="text-text-secondary text-sm">This will only take a moment.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
