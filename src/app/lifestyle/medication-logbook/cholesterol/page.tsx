'use client';

import { HomeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon, XCircleIcon as XCircleSolidIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface MedicationLog {
  date: string;
  taken: boolean;
  time?: string;
}

export default function CholesterolTrackingPage() {
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([]);

  useEffect(() => {
    // Load or initialize the last 7 days of logs
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        taken: Math.random() < 0.8, // Random initial state for demo
        time: Math.random() < 0.8 ? '9:00 AM' : undefined
      };
    });

    setMedicationLogs(last7Days.reverse());
  }, []);

  const toggleMedicationTaken = (index: number) => {
    const newLogs = [...medicationLogs];
    newLogs[index] = {
      ...newLogs[index],
      taken: !newLogs[index].taken,
      time: !newLogs[index].taken ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
    };
    setMedicationLogs(newLogs);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Green Header */}
      <div className="bg-green-500 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center">
            <Link href="/lifestyle/medication-logbook" className="mr-4">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold">Cholesterol Medicine</h1>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Medication Details</h2>
            <p className="text-gray-600">Dosage: 1 tablet</p>
            <p className="text-gray-600">Frequency: Once daily</p>
            <p className="text-gray-600">Time: 9:00 AM</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent History</h2>
            {medicationLogs.map((log, index) => (
              <div
                key={log.date}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {new Date(log.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  {log.taken && (
                    <p className="text-sm text-gray-500">Taken at {log.time}</p>
                  )}
                </div>
                <button
                  onClick={() => toggleMedicationTaken(index)}
                  className="focus:outline-none"
                >
                  {log.taken ? (
                    <CheckCircleSolidIcon className="h-8 w-8 text-green-500" />
                  ) : (
                    <XCircleSolidIcon className="h-8 w-8 text-red-500" />
                  )}
                </button>
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