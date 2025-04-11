'use client';

import { HomeIcon, ChatBubbleLeftRightIcon, BookOpenIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LifestylePage() {
  const recentSymptoms = [
    { date: '2024-03-10', symptom: 'Mild headache', severity: 'Low' },
    { date: '2024-03-09', symptom: 'Fatigue', severity: 'Medium' },
    { date: '2024-03-07', symptom: 'Joint pain', severity: 'High' },
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* Green Header */}
      <div className="bg-green-500 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold">My Lifestyle</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Main Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/lifestyle/chat-history" className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-50 p-4 rounded-full mb-3">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary" />
            </div>
            <span className="text-lg font-medium">Medical Chat History</span>
          </Link>

          <Link href="/lifestyle/medication-logbook" className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-50 p-4 rounded-full mb-3">
              <BookOpenIcon className="h-8 w-8 text-primary" />
            </div>
            <span className="text-lg font-medium">Medication Logbook</span>
          </Link>
        </div>

        {/* Recent Symptoms List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <ClipboardDocumentListIcon className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-xl font-semibold">Recent Symptoms</h2>
          </div>
          
          <div className="space-y-4">
            {recentSymptoms.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.symptom}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.severity === 'High' ? 'bg-red-100 text-red-800' :
                  item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.severity}
                </span>
              </div>
            ))}
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