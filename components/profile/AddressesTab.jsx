'use client';

import { useState } from 'react';
import { FiPlus, FiTrash2, FiMapPin } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

export default function AddressesTab() {
  const { user, updateProfile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: '', address: '', city: '', state: '' });

  const addresses = user?.addresses || [];

  const handleAdd = (e) => {
    e.preventDefault();
    const newAddress = { id: `addr-${Date.now()}`, ...form };
    updateProfile({ addresses: [...addresses, newAddress] });
    setForm({ label: '', address: '', city: '', state: '' });
    setShowForm(false);
  };

  const handleRemove = (id) => {
    updateProfile({ addresses: addresses.filter((a) => a.id !== id) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-text-primary">Saved Addresses</h2>
        <Button variant="outline" size="sm" onClick={() => setShowForm((s) => !s)}>
          <FiPlus className="w-4 h-4" />
          Add Address
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="max-w-lg space-y-4 mb-8 p-5 bg-slate-50 rounded-2xl"
        >
          <div>
            <label className="text-sm font-medium text-text-primary mb-1.5 block">
              Label (e.g. Home, Work)
            </label>
            <input
              required
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary mb-1.5 block">Address</label>
            <input
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              required
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button type="submit" variant="primary" size="sm">
            Save Address
          </Button>
        </form>
      )}

      {addresses.length === 0 ? (
        <p className="text-sm text-text-secondary">No saved addresses yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-5 rounded-2xl border border-slate-100 bg-surface flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <FiMapPin className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">{addr.label}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {addr.address}, {addr.city}, {addr.state}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(addr.id)}
                className="text-text-secondary hover:text-red-500 transition-colors shrink-0"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
