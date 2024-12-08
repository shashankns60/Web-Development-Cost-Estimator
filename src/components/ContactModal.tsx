import React, { useState } from 'react';
import { ContactInfo } from '../types/calculator';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contactInfo: ContactInfo) => void;
}

export function ContactModal({ isOpen, onClose, onSubmit }: ContactModalProps) {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    city: '',
    email: '',
    mobile: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(contactInfo);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={contactInfo.name}
              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              required
              value={contactInfo.city}
              onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="tel"
              required
              value={contactInfo.mobile}
              onChange={(e) => setContactInfo({ ...contactInfo, mobile: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Download Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}