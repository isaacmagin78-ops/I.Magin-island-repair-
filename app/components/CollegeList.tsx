'use client';

import { useState } from 'react';
import { AppState, CollegeListItem, CollegeTier, ApplicationStatus, Essay, EssayStatus, Scholarship, ScholarshipStatus } from '../types';
import { relativeDue, formatDate } from '../utils/derive';
import { Card, StatusPill, Tone } from './ui';

type Tab = 'colleges' | 'essays' | 'scholarships';
const TIER_TONE: Record<CollegeTier, Tone> = { reach: 'red', target: 'blue', safety: 'green' };
const APP_TONE: Record<ApplicationStatus, Tone> = { 'not-started': 'gray', 'in-progress': 'blue', submitted: 'green', accepted: 'green', waitlisted: 'amber', denied: 'red' };
const ESSAY_TONE: Record<EssayStatus, Tone> = { 'not-started': 'gray', 'in-progress': 'blue', draft: 'blue', revising: 'amber', complete: 'green' };
const SCH_TONE: Record<ScholarshipStatus, Tone> = { researching: 'gray', applying: 'blue', submitted: 'amber', awarded: 'green', 'not-awarded': 'red' };
const uid = () => Math.random().toString(36).slice(2, 9);
function label(s: string): string { return s.replace('-', ' ').replace(/\b\w/g, (m) => m.toUpperCase()); }

interface Props {
  state: AppState;
  onAddCollege: (c: CollegeListItem) => void;
  onUpdateCollege: (id: string, patch: Partial<CollegeListItem>) => void;
  onRemoveCollege: (id: string) => void;
  onAddEssay: (e: Essay) => void;
  onUpdateEssay: (id: string, patch: Partial<Essay>) => void;
  onRemoveEssay: (id: string) => void;
  onAddScholarship: (s: Scholarship) => void;
  onUpdateScholarship: (id: string, patch: Partial<Scholarship>) => void;
  onRemoveScholarship: (id: string) => void;
}

export default function CollegeList(props: Props) {
  const { state } = props;
  const [tab, setTab] = useState<Tab>('colleges');
  const potentialAid = state.scholarships.reduce((s, x) => s + x.amount, 0);
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'colleges', label: 'Colleges', count: state.collegeList.length },
    { key: 'essays', label: 'Essays', count: state.essays.length },
    { key: 'scholarships', label: 'Scholarships', count: state.scholarships.length },
  ];
  return (
    <div className="space-y-5">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-ink to-ink-secondary p-6 text-cream">
          <h1 className="text-2xl font-extrabold">College List & Applications</h1>
          <p className="text-cream/80 text-sm mt-1">{state.collegeList.length} schools · {state.essays.length} essays · ${potentialAid.toLocaleString()} in scholarships tracked</p>
        </div>
        <div className="flex gap-1 p-2">
          {tabs.map((t) => <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition ${tab === t.key ? 'bg-ink text-cream' : 'text-ink-secondary hover:bg-slate-50'}`}>{t.label} <span className="opacity-60">({t.count})</span></button>)}
        </div>
      </Card>
      {tab === 'colleges' && <CollegesTab {...props} />}
      {tab === 'essays' && <EssaysTab {...props} />}
      {tab === 'scholarships' && <ScholarshipsTab {...props} />}
    </div>
  );
}

function CollegesTab({ state, onAddCollege, onUpdateCollege, onRemoveCollege }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [tier, setTier] = useState<CollegeTier>('target');
  const [deadline, setDeadline] = useState('');
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCollege({ id: uid(), name: name.trim(), location: location.trim(), tier, applicationStatus: 'not-started', deadline: deadline || undefined });
    setName(''); setLocation(''); setDeadline(''); setTier('target'); setShowForm(false);
  };
  const tiers: CollegeTier[] = ['reach', 'target', 'safety'];
  return (
    <div className="space-y-4">
      <div className="flex justify-end"><button onClick={() => setShowForm(!showForm)} className="bg-gold text-ink px-4 py-2 rounded-lg font-semibold hover:bg-gold-light transition text-sm">+ Add college</button></div>
      {showForm && (
        <Card className="p-4"><form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="College name" className="input" required />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="input" />
          <select value={tier} onChange={(e) => setTier(e.target.value as CollegeTier)} className="input bg-white"><option value="reach">Reach</option><option value="target">Target</option><option value="safety">Safety</option></select>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="input" />
          <div className="sm:col-span-2 flex gap-2"><button type="submit" className="flex-1 bg-ink text-cream py-2 rounded-lg font-semibold hover:bg-ink-secondary">Add</button><button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300">Cancel</button></div>
        </form></Card>
      )}
      {tiers.map((t) => {
        const items = state.collegeList.filter((c) => c.tier === t);
        if (!items.length) return null;
        return (
          <div key={t}>
            <div className="flex items-center gap-2 mb-2"><StatusPill tone={TIER_TONE[t]} label={t.toUpperCase()} /><span className="text-sm text-ink-secondary">{items.length} schools</span></div>
            <div className="space-y-2">
              {items.map((c) => (
                <Card key={c.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2"><button onClick={() => onUpdateCollege(c.id, { favorite: !c.favorite })} className={`text-lg ${c.favorite ? 'text-gold' : 'text-slate-300 hover:text-gold'}`} aria-label="favorite">★</button><p className="font-bold text-ink truncate">{c.name}</p></div>
                      <p className="text-xs text-ink-secondary ml-7">{c.location}</p>
                      {c.deadline && <p className="text-xs ml-7 mt-0.5 text-ink-secondary">Deadline {formatDate(c.deadline)} · {relativeDue(c.deadline)}</p>}
                    </div>
                    <button onClick={() => onRemoveCollege(c.id)} className="text-slate-400 hover:text-red-500 text-lg leading-none" aria-label="remove">×</button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3 ml-7">
                    <StatusPill tone={APP_TONE[c.applicationStatus]} label={label(c.applicationStatus)} />
                    <select value={c.applicationStatus} onChange={(e) => onUpdateCollege(c.id, { applicationStatus: e.target.value as ApplicationStatus })} className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-white">{(['not-started', 'in-progress', 'submitted', 'accepted', 'waitlisted', 'denied'] as ApplicationStatus[]).map((s) => <option key={s} value={s}>{label(s)}</option>)}</select>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
      {state.collegeList.length === 0 && <Card className="p-8 text-center text-ink-secondary">Add your first college to start tracking applications.</Card>}
    </div>
  );
}

function EssaysTab({ state, onAddEssay, onUpdateEssay, onRemoveEssay }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Supplemental');
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddEssay({ id: uid(), title: title.trim(), type, status: 'not-started' });
    setTitle(''); setType('Supplemental'); setShowForm(false);
  };
  return (
    <div className="space-y-3">
      <div className="flex justify-end"><button onClick={() => setShowForm(!showForm)} className="bg-gold text-ink px-4 py-2 rounded-lg font-semibold hover:bg-gold-light transition text-sm">+ Add essay</button></div>
      {showForm && (
        <Card className="p-4"><form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Essay title" className="input" required />
          <select value={type} onChange={(e) => setType(e.target.value)} className="input bg-white"><option>Personal statement</option><option>Supplemental</option><option>Scholarship</option></select>
          <div className="sm:col-span-2 flex gap-2"><button type="submit" className="flex-1 bg-ink text-cream py-2 rounded-lg font-semibold hover:bg-ink-secondary">Add</button><button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300">Cancel</button></div>
        </form></Card>
      )}
      {state.essays.map((es) => (
        <Card key={es.id} className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0"><p className="font-bold text-ink">{es.title}</p><p className="text-xs text-ink-secondary">{es.type}{es.college ? ` · ${es.college}` : ''}{es.wordLimit ? ` · ${es.wordLimit} words` : ''}{es.dueDate ? ` · ${relativeDue(es.dueDate)}` : ''}</p></div>
            <button onClick={() => onRemoveEssay(es.id)} className="text-slate-400 hover:text-red-500 text-lg leading-none" aria-label="remove">×</button>
          </div>
          <div className="flex items-center gap-2 mt-3"><StatusPill tone={ESSAY_TONE[es.status]} label={label(es.status)} /><select value={es.status} onChange={(e) => onUpdateEssay(es.id, { status: e.target.value as EssayStatus })} className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-white">{(['not-started', 'in-progress', 'draft', 'revising', 'complete'] as EssayStatus[]).map((s) => <option key={s} value={s}>{label(s)}</option>)}</select></div>
        </Card>
      ))}
      {state.essays.length === 0 && <Card className="p-8 text-center text-ink-secondary">Track each essay's progress here.</Card>}
    </div>
  );
}

function ScholarshipsTab({ state, onAddScholarship, onUpdateScholarship, onRemoveScholarship }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddScholarship({ id: uid(), name: name.trim(), amount: Number(amount) || 0, deadline: deadline || undefined, status: 'researching' });
    setName(''); setAmount(''); setDeadline(''); setShowForm(false);
  };
  return (
    <div className="space-y-3">
      <div className="flex justify-end"><button onClick={() => setShowForm(!showForm)} className="bg-gold text-ink px-4 py-2 rounded-lg font-semibold hover:bg-gold-light transition text-sm">+ Add scholarship</button></div>
      {showForm && (
        <Card className="p-4"><form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Scholarship name" className="input sm:col-span-3" required />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount ($)" className="input" />
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="input sm:col-span-2" />
          <div className="sm:col-span-3 flex gap-2"><button type="submit" className="flex-1 bg-ink text-cream py-2 rounded-lg font-semibold hover:bg-ink-secondary">Add</button><button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-300">Cancel</button></div>
        </form></Card>
      )}
      {state.scholarships.map((s) => (
        <Card key={s.id} className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0"><p className="font-bold text-ink">{s.name}</p><p className="text-xs text-ink-secondary">${s.amount.toLocaleString()}{s.deadline ? ` · ${relativeDue(s.deadline)}` : ''}</p></div>
            <button onClick={() => onRemoveScholarship(s.id)} className="text-slate-400 hover:text-red-500 text-lg leading-none" aria-label="remove">×</button>
          </div>
          <div className="flex items-center gap-2 mt-3"><StatusPill tone={SCH_TONE[s.status]} label={label(s.status)} /><select value={s.status} onChange={(e) => onUpdateScholarship(s.id, { status: e.target.value as ScholarshipStatus })} className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-white">{(['researching', 'applying', 'submitted', 'awarded', 'not-awarded'] as ScholarshipStatus[]).map((x) => <option key={x} value={x}>{label(x)}</option>)}</select></div>
        </Card>
      ))}
      {state.scholarships.length === 0 && <Card className="p-8 text-center text-ink-secondary">Track scholarships and their deadlines here.</Card>}
    </div>
  );
}
