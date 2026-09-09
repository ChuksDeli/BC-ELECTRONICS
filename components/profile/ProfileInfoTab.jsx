'use client';

import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

export default function ProfileInfoTab() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-text-primary mb-6">Personal Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-primary mb-1.5 block">
              First Name
            </label>
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-primary mb-1.5 block">
              Last Name
            </label>
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-text-primary mb-1.5 block">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text-primary mb-1.5 block">
            Phone Number
          </label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Add a phone number"
            className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-secondary/20"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="secondary" size="md">
            Save Changes
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-success">
              <FiCheck className="w-4 h-4" />
              Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
