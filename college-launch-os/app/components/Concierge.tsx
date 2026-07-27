'use client';

import { useEffect, useRef, useState } from 'react';
import { AppState, ConciergeMessage } from '../types';
import { QUICK_ACTIONS, respond, respondByKey } from '../utils/concierge';
import { Card } from './ui';

export default function Concierge({ state, onNavigate }: { state: AppState; onNavigate: (section: any) => void }) {
  const firstName = state.profile.studentName.split(' ')[0];
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    { id: '0', isUser: false, timestamp: new Date().toISOString(), text: `Hi! I'm your College Concierge. I read ${firstName}'s plan and help you focus on what matters most. What should we work on today?`, suggestions: ['What should I do this week?', 'Explain my readiness score', 'Check upcoming deadlines'] },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);
  function push(text: string, byKey?: string) {
    setMessages((m) => [...m, { id: `u${Date.now()}`, text, isUser: true, timestamp: new Date().toISOString() }]);
    setIsTyping(true);
    window.setTimeout(() => {
      const reply = byKey ? respondByKey(byKey, state) : respond(text, state);
      setMessages((m) => [...m, { id: `a${Date.now()}`, text: reply.answer, isUser: false, timestamp: new Date().toISOString(), suggestions: reply.suggestions }]);
      setIsTyping(false);
    }, 320);
  }
  function send(e: React.FormEvent) { e.preventDefault(); if (!input.trim()) return; push(input.trim()); setInput(''); }
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-teal to-gold p-6 text-cream"><h1 className="text-2xl font-extrabold">College Concierge</h1><p className="text-cream/90 text-sm mt-1">What should we work on today?</p></div>
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-100"><p className="text-xs text-amber-800"><strong>Prototype College Concierge</strong> — curated, rule-based guidance built from your plan. Not live AI, and no data leaves your device.</p></div>
      </Card>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {QUICK_ACTIONS.map((a) => <button key={a.key} onClick={() => push(a.label, a.key)} className="whitespace-nowrap px-3 py-2 rounded-full text-sm font-semibold bg-white border border-gold-light text-ink hover:bg-gold-light/40 transition">{a.label}</button>)}
      </div>
      <Card className="flex flex-col h-[26rem] md:h-[32rem] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${m.isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${m.isUser ? 'bg-ink text-cream rounded-br-sm' : 'bg-white border border-slate-200 text-ink rounded-bl-sm'}`}>{m.text}</div>
                {!m.isUser && m.suggestions && m.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2">{m.suggestions.map((s) => <button key={s} onClick={() => push(s)} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gold-light/50 text-ink hover:bg-gold-light transition">{s}</button>)}</div>
                )}
              </div>
            </div>
          ))}
          {isTyping && <div className="flex justify-start"><div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-sm"><div className="flex gap-1"><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" /><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} /><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} /></div></div></div>}
          <div ref={endRef} />
        </div>
        <form onSubmit={send} className="border-t border-slate-100 p-3 bg-white flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about your plan..." className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold" />
          <button type="submit" disabled={!input.trim()} className="bg-gold text-ink px-5 py-2 rounded-lg font-semibold hover:bg-gold-light transition disabled:opacity-50">Send</button>
        </form>
      </Card>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[{ label: 'Checklist', to: 'checklist' }, { label: 'Timeline', to: 'timeline' }, { label: 'College List', to: 'collegelist' }, { label: 'Documents', to: 'documents' }].map((l) => <button key={l.to} onClick={() => onNavigate(l.to)} className="bg-white border border-slate-200 rounded-lg py-2 text-sm font-semibold text-ink-secondary hover:bg-slate-50 transition">{l.label}</button>)}
      </div>
    </div>
  );
}
