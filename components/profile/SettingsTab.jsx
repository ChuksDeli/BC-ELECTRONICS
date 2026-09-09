'use client';

import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import Button from '@/components/ui/Button';

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    smsAlerts: false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const options = [
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive account related emails' },
    { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about shipping and delivery status' },
    { key: 'promotions', label: 'Promotions and Offers', desc: 'Receive deals and discount alerts' },
    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Get order updates via text message' },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-text-primary mb-6">Settings</h2>

      <div className="space-y-4 max-w-lg">
        {options.map((opt) => (
          <div
            key={opt.key}
            className="flex items-center justify-between p-4 rounded-xl border border-slate-100"
          >
            <div>
              <p className="text-sm font-medium text-text-primary">{opt.label}</p>
              <p className="text-xs text-text-secondary mt-0.5">{opt.desc}</p>
            </div>
            <button
              onClick={() => toggle(opt.key)}
              className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors shrink-0 ${
                settings[opt.key] ? 'bg-secondary justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-sm block" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button variant="secondary" size="md" onClick={handleSave}>
          Save Settings
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-success">
            <FiCheck className="w-4 h-4" />
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
