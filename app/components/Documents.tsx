'use client';

import { AppState, DocumentItem } from '../types';

interface DocumentsProps {
  state: AppState;
  onUpdateDocument: (docId: string, isReady: boolean) => void;
}

export default function Documents({ state, onUpdateDocument }: DocumentsProps) {
  const { documents } = state;

  const readyCount = documents.filter(d => d.isReady).length;
  const readyPercent = Math.round((readyCount / documents.length) * 100);

  const documentGroups = {
    identification: documents.slice(0, 2),
    medical: documents.slice(2, 5),
    financial: documents.slice(5, 6),
    emergency: documents.slice(6, 8),
    vehicle: documents.slice(8, 10),
    other: documents.slice(10),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-ink to-ink-secondary rounded-2xl p-6 text-cream">
        <h1 className="text-3xl font-bold">Document Readiness Center</h1>
        <p className="text-cream/80 mt-2">Track important documents needed for college.</p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-ink mb-4">Overall Readiness</h2>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              {readyCount} of {documents.length} documents ready
            </span>
            <span className="text-lg font-bold text-gold">{readyPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-status-success h-3 rounded-full transition-all"
              style={{ width: `${readyPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-50 border-l-4 border-gold rounded-lg p-6">
        <h3 className="font-bold text-ink mb-2">🔒 Privacy & Security</h3>
        <p className="text-sm text-gray-700">
          Magin is a planning tool. In the production version, sensitive documents will be encrypted
          and securely stored. For now, this tracker helps you remember which documents you need to gather. Do not
          upload actual documents or sensitive personal information into this prototype.
        </p>
      </div>

      {/* Documents by Category */}
      <div className="space-y-6">
        {Object.entries(documentGroups).map(([groupName, docs]) => {
          if (docs.length === 0) return null;

          const groupReady = docs.filter(d => d.isReady).length;
          const groupPercent = Math.round((groupReady / docs.length) * 100);

          return (
            <div key={groupName} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-ink capitalize">{formatGroupName(groupName)}</h3>
                  <span className="text-sm font-semibold text-gray-600">
                    {groupReady}/{docs.length} ({groupPercent}%)
                  </span>
                </div>
              </div>

              <div className="divide-y">
                {docs.map(doc => (
                  <DocumentRow
                    key={doc.id}
                    doc={doc}
                    onUpdate={(isReady) => onUpdateDocument(doc.id, isReady)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Checklist Tips */}
      <div className="bg-amber-50 border-l-4 border-teal rounded-lg p-6">
        <h3 className="font-bold text-ink mb-3">📋 Document Gathering Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <strong>Health Records:</strong> Request immunization records from your doctor's office early.
          </li>
          <li>
            <strong>Government ID:</strong> If expired, renew at your state DMV or ID office (can take 2-4 weeks).
          </li>
          <li>
            <strong>Financial Aid:</strong> Keep all financial aid letters and loan paperwork organized.
          </li>
          <li>
            <strong>Insurance Cards:</strong> Make copies and keep both digital and physical copies.
          </li>
          <li>
            <strong>Prescription List:</strong> Ask your doctor for a complete list of medications and dosages.
          </li>
          <li>
            <strong>Emergency Contacts:</strong> Create a document with family phone numbers and relationships.
          </li>
        </ul>
      </div>

      {/* Document Preparation Timeline */}
      <div className="bg-blue-50 border-l-4 border-gold rounded-lg p-6">
        <h3 className="font-bold text-ink mb-3">⏰ When to Gather Each Document</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>3 Months Before:</strong> Request immunization records, start passport application if needed.
          </p>
          <p>
            <strong>2 Months Before:</strong> Get financial aid letters, renew ID if expired, request medical records.
          </p>
          <p>
            <strong>1 Month Before:</strong> Collect health insurance info, create emergency contacts list.
          </p>
          <p>
            <strong>2 Weeks Before:</strong> Print and organize all documents, make copies for travel.
          </p>
          <p>
            <strong>Move-In Day:</strong> Bring originals of ID, insurance cards, and important documents.
          </p>
        </div>
      </div>
    </div>
  );
}

interface DocumentRowProps {
  doc: DocumentItem;
  onUpdate: (isReady: boolean) => void;
}

function DocumentRow({ doc, onUpdate }: DocumentRowProps) {
  return (
    <div className="p-4 hover:bg-gray-50 transition flex items-center gap-4">
      <button
        onClick={() => onUpdate(!doc.isReady)}
        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
          doc.isReady
            ? 'bg-status-success border-status-success text-white'
            : 'border-gray-400 hover:border-gold'
        }`}
      >
        {doc.isReady && '✓'}
      </button>

      <div className="flex-1">
        <p className={`font-semibold ${doc.isReady ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {doc.name}
        </p>
        {doc.notes && <p className="text-sm text-gray-600 mt-1">{doc.notes}</p>}
      </div>

      <span
        className={`px-3 py-1 rounded text-xs font-semibold ${
          doc.isReady ? 'bg-status-success text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {doc.isReady ? '✓ Ready' : 'Pending'}
      </span>
    </div>
  );
}

function formatGroupName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
