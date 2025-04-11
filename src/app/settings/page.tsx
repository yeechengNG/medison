'use client';

import { Switch } from '@headlessui/react';
import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

export default function SettingsPage() {
  const [privacyEnabled, setPrivacyEnabled] = useState(true);
  const [shareEnabled, setShareEnabled] = useState(false);

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Privacy</h2>
                <p className="text-gray-500">Control your privacy settings</p>
              </div>
              <Switch
                checked={privacyEnabled}
                onChange={setPrivacyEnabled}
                className={`${
                  privacyEnabled ? 'bg-primary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable privacy</span>
                <span
                  className={`${
                    privacyEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Share Data</h2>
                <p className="text-gray-500">Allow sharing medical data with doctors</p>
              </div>
              <Switch
                checked={shareEnabled}
                onChange={setShareEnabled}
                className={`${
                  shareEnabled ? 'bg-primary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable data sharing</span>
                <span
                  className={`${
                    shareEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Home Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-center py-4">
            <Link href="/" className="flex flex-col items-center text-primary">
              <HomeIcon className="h-7 w-7" />
              <span className="text-sm mt-1">Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 