'use client';

import { QRCodeSVG } from 'qrcode.react';
import { CameraIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Medicare Card Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Link Medicare Card</h2>
            <button className="bg-primary p-2 rounded-full">
              <CameraIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">Doctors can view their info if they need to monitor</p>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Patient Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
              <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input type="date" className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biological Sex</label>
              <select className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary" rows={3}></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">QR code to scan info if needed</h2>
            <button className="bg-green-500 text-white px-4 py-1 rounded text-sm">
              open
            </button>
          </div>
          <div className="flex justify-center p-4 bg-gray-50 rounded">
            <QRCodeSVG
              value="https://medison.app/profile/123"
              size={200}
              level="H"
              includeMargin={true}
            />
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