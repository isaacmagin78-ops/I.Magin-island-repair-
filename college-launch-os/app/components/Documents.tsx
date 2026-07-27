'use client';

import { AppState, DocumentItem } from '../types';
import { Card, Bar } from './ui';

export default function Documents({ state, onUpdateDocument }: { state: AppState; onUpdateDocument: (docId: string, isReady: boolean) => void }) {
  const { documents } = state;
  const readyCount = documents.filter((d) => d.isReady).length;
  const readyPercent = Math.round((readyCount / Math.max(1, documents.length)) * 100);
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden"><div className="bg-gradient-to-br from-ink to-ink-secondary p-6 text-cream"><h1 className="text-2xl font-extrabold">Document Readiness Center</h1><p className="text-cream/80 text-sm mt-1">Track important documents needed for college.</p></div></Card>
      <Card className="p-5">
        <div className="flex justify-between mb-2"><span className="text-sm font-semibold text-ink-secondary">{readyCount} of {documents.length} documents ready</span><span className="text-lg font-bold text-gold">{readyPercent}%</span></div>
        <Bar percent={readyPercent} tone={readyPercent >= 75 ? 'green' : readyPercent >= 40 ? 'blue' : 'amber'} />
      </Card>
      <Card className="p-5 border-l-4 border-gold bg-gold-light/10"><h3 className="font-bold text-ink mb-1">Privacy note</h3><p className="text-sm text-ink-secondary">This is a planning tracker. Do not upload actual documents or sensitive personal information into this prototype.</p></Card>
      <Card className="p-5">
        <h2 className="text-lg font-bold text-ink mb-3">Documents</h2>
        <div className="divide-y divide-slate-100">
          {documents.map((doc) => <DocumentRow key={doc.id} doc={doc} onUpdate={(r) => onUpdateDocument(doc.id, r)} />)}
        </div>
      </Card>
    </div>
  );
}

function DocumentRow({ doc, onUpdate }: { doc: DocumentItem; onUpdate: (isReady: boolean) => void }) {
  return (
    <div className="py-3 flex items-center gap-4">
      <button onClick={() => onUpdate(!doc.isReady)} className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${doc.isReady ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-gold'}`}>{doc.isReady && '✓'}</button>
      <p className={`flex-1 font-semibold ${doc.isReady ? 'line-through text-slate-400' : 'text-ink'}`}>{doc.name}</p>
      <span className={`px-3 py-1 rounded text-xs font-semibold ${doc.isReady ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{doc.isReady ? 'Ready' : 'Pending'}</span>
    </div>
  );
}
