'use client';

import { useState } from 'react';
import { FamilyProfile, HousingType } from '../types';

interface PersonalizeProps {
  profile: FamilyProfile;
  onProfileUpdate: (profile: FamilyProfile) => void;
}

export default function Personalize({ profile, onProfileUpdate }: PersonalizeProps) {
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof FamilyProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    onProfileUpdate(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">Family Profile</h1>
        <p className="text-blue-100 mt-2">Personalize your college preparation experience</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border-l-4 border-status-success rounded-lg p-4">
          <p className="text-green-800 font-semibold">✓ Profile saved successfully!</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Personal Information */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-navy border-b pb-3">Personal Information</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="e.g., Taylor Morgan"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Parent/Guardian Name</label>
              <input
                type="text"
                value={formData.parentName}
                onChange={(e) => handleChange('parentName', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="e.g., Sarah Morgan"
              />
            </div>
          </div>
        </fieldset>

        {/* College Information */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-navy border-b pb-3">College Information</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">College Name</label>
              <input
                type="text"
                value={formData.collegeName}
                onChange={(e) => handleChange('collegeName', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="e.g., University of Florida"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Move-In Date</label>
              <input
                type="date"
                value={formData.moveInDate}
                onChange={(e) => handleChange('moveInDate', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Housing Type</label>
              <select
                value={formData.housingType}
                onChange={(e) => handleChange('housingType', e.target.value as HousingType)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="dorm">On-Campus Dorm</option>
                <option value="apartment">Off-Campus Apartment</option>
                <option value="house">Off-Campus House</option>
                <option value="greek-life">Greek Life Housing</option>
                <option value="unknown">Not Sure Yet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Student Type</label>
              <select
                value={formData.studentType}
                onChange={(e) => handleChange('studentType', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="First-year">First-year</option>
                <option value="Transfer">Transfer Student</option>
                <option value="International">International Student</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Location Information */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-navy border-b pb-3">Location Information</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Home State</label>
              <input
                type="text"
                value={formData.homeState}
                onChange={(e) => handleChange('homeState', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="e.g., FL, CA"
                maxLength={2}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">College State</label>
              <input
                type="text"
                value={formData.collegeState}
                onChange={(e) => handleChange('collegeState', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="e.g., FL, CA"
                maxLength={2}
              />
            </div>
          </div>
        </fieldset>

        {/* Special Circumstances */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-navy border-b pb-3">Special Circumstances</legend>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasRoommate}
                onChange={(e) => handleChange('hasRoommate', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">Student has assigned roommate</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasVehicle}
                onChange={(e) => handleChange('hasVehicle', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">Student bringing vehicle to campus</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasPrescriptionMedication}
                onChange={(e) => handleChange('hasPrescriptionMedication', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">Student takes prescription medication</span>
            </label>
          </div>
        </fieldset>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition text-lg"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Information Display */}
      <div className="bg-blue-50 border-l-4 border-brand-blue rounded-lg p-6">
        <h2 className="font-bold text-navy mb-3">💡 How We Use This Information</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <strong>Personalized Recommendations:</strong> Your profile helps us tailor tasks and suggestions to your
            specific situation.
          </li>
          <li>
            <strong>Timeline Calculation:</strong> Your move-in date helps us create a customized timeline and count
            down to the big day.
          </li>
          <li>
            <strong>Specialized Tasks:</strong> Vehicle and medication information helps us show relevant tasks (e.g.,
            car maintenance, prescription refills).
          </li>
          <li>
            <strong>Dashboard Display:</strong> Your information is displayed prominently so you always know where you
            stand.
          </li>
          <li>
            <strong>Local Storage Only:</strong> All information is stored locally on this device. It's never sent to
            a server.
          </li>
        </ul>
      </div>
    </div>
  );
}
