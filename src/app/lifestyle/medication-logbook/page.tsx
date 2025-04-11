'use client';

import { HomeIcon, BeakerIcon, BellIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'current' | 'past';
}

const DEFAULT_MEDICATIONS: Medication[] = [
  {
    id: 1,
    name: 'Blood Pressure Medicine',
    dosage: '2 tablets',
    frequency: 'Once daily',
    startDate: '2024-01-15',
    status: 'current'
  },
  {
    id: 2,
    name: 'Cholesterol Medicine',
    dosage: '1 tablet',
    frequency: 'Once daily',
    startDate: '2024-02-01',
    status: 'current'
  },
  {
    id: 3,
    name: 'Pain Relief',
    dosage: '1 tablet',
    frequency: 'As needed',
    startDate: '2023-12-01',
    endDate: '2024-01-30',
    status: 'past'
  }
];

function MedicationLogbookContent() {
  const searchParams = useSearchParams();
  const [showAddForm, setShowAddForm] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date().toISOString().split('T')[0]
  });

  // Load medications from localStorage on mount
  useEffect(() => {
    const savedMedications = localStorage.getItem('medications');
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    } else {
      setMedications(DEFAULT_MEDICATIONS);
      localStorage.setItem('medications', JSON.stringify(DEFAULT_MEDICATIONS));
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      setShowAddForm(true);
    }
  }, [searchParams]);

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    const newMed: Medication = {
      id: medications.length + 1,
      ...newMedication,
      status: 'current'
    };
    const updatedMedications = [newMed, ...medications];
    setMedications(updatedMedications);
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
    setShowAddForm(false);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Green Header */}
      <div className="bg-green-500 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Medication Logbook</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Add Medication Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Medication</h2>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddMedication} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newMedication.name}
                    onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    required
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <input
                    type="text"
                    required
                    value={newMedication.frequency}
                    onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newMedication.startDate}
                    onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Medication
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Current Medications Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Current Medications</h2>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
            >
              <BellIcon className="h-5 w-5 mr-2" />
              Add New Medication
            </button>
          </div>

          <div className="space-y-4">
            {medications
              .filter(med => med.status === 'current')
              .map((medication) => (
                <div key={medication.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <BeakerIcon className="h-6 w-6 text-primary mr-2" />
                      <h3 className="text-lg font-semibold">{medication.name}</h3>
                    </div>
                    <span className="text-gray-500">Since {medication.startDate}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-600">Dosage: {medication.dosage}</p>
                    <p className="text-gray-600">Frequency: {medication.frequency}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Past Medications Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-6 w-6 text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold">Past Medications</h2>
          </div>

          <div className="space-y-4">
            {medications
              .filter(med => med.status === 'past')
              .map((medication) => (
                <div key={medication.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <BeakerIcon className="h-6 w-6 text-gray-400 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-600">{medication.name}</h3>
                    </div>
                    <span className="text-gray-500">
                      {medication.startDate} - {medication.endDate}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Dosage: {medication.dosage}</p>
                    <p className="text-gray-500">Frequency: {medication.frequency}</p>
                  </div>
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

export default function MedicationLogbookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pb-16">
        <div className="bg-green-500 text-white py-4">
          <div className="max-w-screen-xl mx-auto px-4">
            <h1 className="text-2xl font-bold">Medication Logbook</h1>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <MedicationLogbookContent />
    </Suspense>
  );
} 