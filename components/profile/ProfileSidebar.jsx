'use client';

import { FiUser, FiMapPin, FiPackage, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';

const tabs = [
  { id: 'profile', label: 'Personal Information', icon: FiUser },
  { id: 'addresses', label: 'Saved Addresses', icon: FiMapPin },
  { id: 'orders', label: 'Recent Orders', icon: FiPackage },
  { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function ProfileSidebar({ active, onChange, onLogout }) {
  return (
    <div className="bg-surface rounded-2xl border border-slate-100 p-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              active === tab.id
                ? 'bg-primary/8 text-primary'
                : 'text-text-secondary hover:bg-slate-50 hover:text-text-primary'
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
            {tab.label}
          </button>
        );
      })}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-1"
      >
        <FiLogOut className="w-4.5 h-4.5" />
        Sign Out
      </button>
    </div>
  );
}
