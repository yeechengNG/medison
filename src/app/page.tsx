'use client';

import { BellIcon, CalendarIcon, BeakerIcon, MicrophoneIcon, CameraIcon, ShareIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import IndianSonAvatar from '../components/IndianSonAvatar';

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [frequency, setFrequency] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [reminders, setReminders] = useState([
    {
      type: 'appointment',
      title: 'Dr. Smith Appointment',
      time: '2:30 PM',
      description: 'Regular checkup'
    }
  ]);

  // Load medications from localStorage and convert them to reminders
  useEffect(() => {
    const savedMedications = localStorage.getItem('medications');
    if (savedMedications) {
      const medications = JSON.parse(savedMedications);
      const medicationReminders = medications
        .filter((med: any) => med.status === 'current')
        .map((med: any) => ({
          type: 'medicine',
          title: med.name,
          time: '9:00 AM',
          description: `${med.dosage}, ${med.frequency}`
        }));
      setReminders([...medicationReminders, ...reminders.filter(r => r.type === 'appointment')]);
    }
  }, []);

  const handleTalkClick = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTranscribedText("I've been feeling a bit tired lately and have some mild headaches.");
    } else {
      // Start recording
      setIsRecording(true);
      setTranscribedText('');
      setFrequency(0);
      
      // Simulate voice frequency visualization
      const interval = setInterval(() => {
        setFrequency(Math.random() * 100);
      }, 100);

      intervalRef.current = interval;
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen pb-16">
      {/* Green Header with Tabs */}
      <div className="bg-green-500 text-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around py-4">
            <Link href="/lifestyle" className="px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
              My Lifestyle
            </Link>
            <Link href="/profile" className="px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Profile
            </Link>
            <Link href="/settings" className="px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Settings
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Language and Greeting */}
        <div className="text-center mb-4">
          <p className="text-gray-600 mb-2">Primary Language: Tamil</p>
          {/* Profile Picture with Speech Bubble */}
          <div className="relative flex items-center justify-center gap-4 mb-8">
            {/* Avatar */}
            <div className="w-80 h-80">
              <IndianSonAvatar className="w-full h-full" />
            </div>
            {/* Speech Bubble */}
            <div className="relative bg-white px-8 py-4 rounded-3xl shadow-lg border-2 border-gray-200">
              <h1 className="text-4xl font-bold text-black">Hello, Sammy</h1>
              {/* Speech Bubble Triangle */}
              <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-white border-l-2 border-b-2 border-gray-200 rotate-45 transform origin-center"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex justify-center mb-8">
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={handleTalkClick}
              className={`flex items-center space-x-3 p-3 rounded-full border-2 ${
                isRecording ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-primary'
              } transition-colors`}
            >
              <div className={`p-2 rounded-full ${isRecording ? 'bg-red-100' : 'bg-gray-100'}`}>
                <MicrophoneIcon className={`h-6 w-6 ${isRecording ? 'text-red-500' : 'text-primary'}`} />
              </div>
              <span>{isRecording ? 'Recording...' : 'Talk'}</span>
            </button>
            
            <button className="flex items-center space-x-3 p-3 rounded-full border-2 border-gray-200 hover:border-primary transition-colors">
              <div className="bg-gray-100 p-2 rounded-full">
                <CameraIcon className="h-6 w-6 text-primary" />
              </div>
              <span>Upload</span>
            </button>
            
            <button className="flex items-center space-x-3 p-3 rounded-full border-2 border-gray-200 hover:border-primary transition-colors">
              <div className="bg-gray-100 p-2 rounded-full">
                <ShareIcon className="h-6 w-6 text-primary" />
              </div>
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Voice Recording Visualization */}
        {isRecording && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="h-8 flex items-center space-x-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full transition-all"
                  style={{ height: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Transcribed Text */}
        {transcribedText && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">{transcribedText}</p>
          </div>
        )}

        {/* Reminders Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            {reminders.map((reminder, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {reminder.type === 'medicine' ? (
                      <BeakerIcon className="h-6 w-6 text-primary mr-2" />
                    ) : (
                      <CalendarIcon className="h-6 w-6 text-primary mr-2" />
                    )}
                    <h2 className="text-lg font-semibold">{reminder.title}</h2>
                  </div>
                  <span className="text-gray-500">{reminder.time}</span>
                </div>
                <p className="text-gray-600">{reminder.description}</p>
              </div>
            ))}
          </div>

          <Link 
            href="/lifestyle/medication-logbook?add=true"
            className="mt-6 w-full bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <BellIcon className="h-5 w-5 mr-2" />
            Add New Reminder
          </Link>
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