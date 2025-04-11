'use client';

import Link from 'next/link';
import { HomeIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-primary">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link href="/profile" className="flex flex-col items-center text-gray-600 hover:text-primary">
            <UserCircleIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          
          <Link href="/settings" className="flex flex-col items-center text-gray-600 hover:text-primary">
            <Cog6ToothIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 