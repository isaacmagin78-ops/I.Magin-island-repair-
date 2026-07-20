'use client';

import { useState } from 'react';
import { FamilyProfile, HousingType } from '../types';
import { Card } from './ui';

export default function Personalize({ profile, onProfileUpdate }: { profile: FamilyProfile; onProfileUpdate: (profile: FamilyProfile) => void }) {
  const [formData, setFormData] = useState(profile);
  const change = (field: keyof FamilyProfile, value: any) => setFormData((prev) => ({ ...prev, [field]: value }));
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden"><div className="bg-gradient-to-br from-ink to-ink-secondary p-6 text-cream"><h1 className="text-2xl font-extrabold">Family Profile</h1><p className="text-cream/80 text-sm mt-1">Personalize your college preparation experience.</p></div></Card>
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-ink-secondary mb-1">Student name</label><input value={formData.studentName} onChange={(e) => change('studentName', e.target.value)} className="input" /></div>
          <div><label className="block text-sm font-semibold text-ink-secondary mb-1">Parent/Guardian name</label><input value={formData.parentName} onChange={(e) => change('parentName', e.target.value)} className="input" /></div>
          <div><label className="block text-sm font-semibold text-ink-secondary mb-1">College name</label><input value={formData.collegeName} onChange={(e) => change('collegeName', e.target.value)} className="input" /></div>
          <div><label className="block text-sm font-semibold text-ink-secondary mb-1">Move-in date</label><input type="date" value={formData.moveInDate} onChange={(e) => change('moveInDate', e.target.value)} className="input" /></div>
          <div><label className="block text-sm font-semibold text-ink-secondary mb-1">Graduation / Enrollment year</label><input type="number" value={formData.graduationYear ?? ''} onChange={(e) => change('graduationYear', e.target.value ? Number(e.target.value) : undefined)} className="input" placeholder="e.g., 2027" /></div>
          <div><label className="block text-sm font-semibold text-ink-secondary mb-1">Housing type</label><select value={formData.housingType} onChange={(e) => change('housingType', e.target.value as HousingType)} className="input bg-white"><option value="dorm">On-Campus Dorm</option><option value="apartment">Off-Campus Apartment</option><option value="house">Off-Campus House</option><option value="greek-life">Greek Life Housing</option><option value="unknown">Not Sure Yet</option></select></div>
          <div><label className="block text-sm font-semibold text-ink-secondary mb-1">Home state</label><input value={formData.homeState} onChange={(e) => change('homeState', e.target.value)} maxLength={2} className="input" /></div>
          <div><label className="block text-sm font-semibold text-ink-secondary mb-1">College state</label><input value={formData.collegeState} onChange={(e) => change('collegeState', e.target.value)} maxLength={2} className="input" /></div>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-3"><input type="checkbox" checked={formData.hasRoommate} onChange={(e) => change('hasRoommate', e.target.checked)} className="w-4 h-4" /><span className="text-ink-secondary">Student has an assigned roommate</span></label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={formData.hasVehicle} onChange={(e) => change('hasVehicle', e.target.checked)} className="w-4 h-4" /><span className="text-ink-secondary">Student bringing a vehicle to campus</span></label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={formData.hasPrescriptionMedication} onChange={(e) => change('hasPrescriptionMedication', e.target.checked)} className="w-4 h-4" /><span className="text-ink-secondary">Student takes prescription medication</span></label>
        </div>
        <button onClick={() => onProfileUpdate(formData)} className="w-full bg-ink text-cream py-3 rounded-lg font-bold hover:bg-ink-secondary transition">Save Profile</button>
      </Card>
    </div>
  );
}
