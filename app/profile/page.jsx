'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileInfoTab from '@/components/profile/ProfileInfoTab';
import AddressesTab from '@/components/profile/AddressesTab';
import OrdersTab from '@/components/profile/OrdersTab';
import ProfileWishlistTab from '@/components/profile/ProfileWishlistTab';
import SettingsTab from '@/components/profile/SettingsTab';

function ProfileContent() {
  const { isAuthenticated, hydrated, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.push('/login?redirect=/profile');
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) {
    return <div className="max-w-8xl mx-auto px-4 py-24" />;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">My Account</h1>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <div>
          <ProfileSidebar active={activeTab} onChange={setActiveTab} onLogout={handleLogout} />
        </div>

        <div className="bg-surface rounded-2xl border border-slate-100 p-6 sm:p-8">
          {activeTab === 'profile' && <ProfileInfoTab />}
          {activeTab === 'addresses' && <AddressesTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'wishlist' && <ProfileWishlistTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="max-w-8xl mx-auto px-4 py-24" />}>
      <ProfileContent />
    </Suspense>
  );
}
