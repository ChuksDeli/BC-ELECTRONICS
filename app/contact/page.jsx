'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiCheck, FiClock } from 'react-icons/fi';
import Button from '@/components/ui/Button';

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email Us',
    value: 'support@BC-ELECTRONICS.com',
    detail: 'We reply within 24 hours',
  },
  {
    icon: FiPhone,
    label: 'Call Us',
    value: '+234 700 000 0000',
    detail: 'Mon to Sat, 8am to 7pm',
  },
  {
    icon: FiMapPin,
    label: 'Visit Us',
    value: 'Lagos, Nigeria',
    detail: 'Showroom by appointment',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mb-14"
      >
        <p className="text-[11px] uppercase tracking-widest text-secondary font-semibold mb-4">
          Contact Us
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
          We&apos;re here to help.
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Questions about an order, a product, or anything else? Reach out and a real person will
          get back to you.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-surface rounded-2xl border border-slate-100 p-6 sm:p-8"
        >
          {submitted ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                <FiCheck className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Message Sent</h2>
              <p className="text-text-secondary text-sm">
                Thanks for reaching out. We will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-primary mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">
                  Subject
                </label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Order inquiry, product question, etc."
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-1.5 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <Button type="submit" variant="secondary" size="lg" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <div
                key={info.label}
                className="bg-surface rounded-2xl border border-slate-100 p-5 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 text-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-0.5">{info.label}</p>
                  <p className="text-sm font-semibold text-text-primary">{info.value}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{info.detail}</p>
                </div>
              </div>
            );
          })}

          <div className="bg-secondary rounded-2xl p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
              <FiClock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Support Hours</p>
              <p className="text-sm font-semibold text-white">Monday to Saturday</p>
              <p className="text-xs text-slate-400 mt-0.5">8:00 AM to 7:00 PM WAT</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}