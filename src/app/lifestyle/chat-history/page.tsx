'use client';

import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

interface ChatMessage {
  sender: 'doctor' | 'patient';
  message: string;
  time: string;
}

interface Appointment {
  id: number;
  doctor: string;
  date: string;
  time: string;
  chat: ChatMessage[];
}

export default function ChatHistoryPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const appointments: Appointment[] = [
    {
      id: 2,
      doctor: "Dr. Sarah Chen",
      date: "March 15, 2024",
      time: "2:30 PM",
      chat: [
        { sender: "doctor", message: "Hello Sammy, how are you feeling today?", time: "2:30 PM" },
        { sender: "patient", message: "Hi Dr. Chen, I've been having some headaches lately.", time: "2:31 PM" },
        { sender: "doctor", message: "I see. How often do you experience these headaches?", time: "2:31 PM" },
        { sender: "patient", message: "Almost every afternoon, especially after work.", time: "2:32 PM" },
        { sender: "doctor", message: "Are you spending long hours looking at screens?", time: "2:32 PM" },
        { sender: "patient", message: "Yes, I work on a computer all day.", time: "2:33 PM" },
        { sender: "doctor", message: "I recommend taking regular breaks using the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.", time: "2:34 PM" },
      ]
    },
    {
      id: 1,
      doctor: "Dr. Sarah Chen",
      date: "March 1, 2024",
      time: "3:00 PM",
      chat: [
        { sender: "doctor", message: "Good afternoon Sammy, how's your blood pressure?", time: "3:00 PM" },
        { sender: "patient", message: "It's been stable, around 120/80.", time: "3:01 PM" },
        { sender: "doctor", message: "That's excellent! Have you been maintaining your exercise routine?", time: "3:01 PM" },
        { sender: "patient", message: "Yes, walking 30 minutes every day.", time: "3:02 PM" },
        { sender: "doctor", message: "Perfect, keep it up! Any side effects from the medication?", time: "3:02 PM" },
        { sender: "patient", message: "No side effects so far.", time: "3:03 PM" },
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* Green Header */}
      <div className="bg-green-500 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Medical Chat History</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {!selectedAppointment ? (
          // Appointments List
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <button
                key={appointment.id}
                className="w-full bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                onClick={() => setSelectedAppointment(appointment)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{appointment.doctor}</h2>
                    <p className="text-gray-500">Appointment {appointment.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-medium">{appointment.date}</p>
                    <p className="text-gray-500">{appointment.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Chat History View
          <div>
            <button
              onClick={() => setSelectedAppointment(null)}
              className="mb-4 text-primary font-medium flex items-center"
            >
              ← Back to Appointments
            </button>
            
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold">{selectedAppointment.doctor}</h2>
                <p className="text-gray-500">{selectedAppointment.date} at {selectedAppointment.time}</p>
              </div>
              
              <div className="space-y-4">
                {selectedAppointment.chat.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'doctor' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.sender === 'doctor'
                        ? 'bg-gray-100 rounded-tr-xl rounded-br-xl rounded-bl-xl'
                        : 'bg-primary text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl'
                    } p-3`}>
                      <p>{message.message}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'doctor' ? 'text-gray-500' : 'text-white/80'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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