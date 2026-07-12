'use client';

import { useState, useRef, useEffect } from 'react';
import { ConciergeMessage } from '../types';
import { findConciergeResponse } from '../utils/concierge';

export default function Concierge() {
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    {
      id: '0',
      text: 'Hi! 👋 I\'m the College Launch Concierge. I can help you with questions about college preparation, dorm life, finances, health, and much more. What would you like to know?',
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ConciergeMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      const response = findConciergeResponse(input);

      const conciergeMessage: ConciergeMessage = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, conciergeMessage]);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">🎓 College Launch Concierge</h1>
        <p className="text-blue-100 mt-2">Your AI-powered guide to college preparation (Prototype)</p>
      </div>

      {/* Prototype Notice */}
      <div className="bg-amber-50 border-l-4 border-brand-warm rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>💡 Prototype Version:</strong> The Concierge currently has curated responses for common college
          preparation topics. In the production version, this will connect to a real AI API for unlimited, dynamic
          answers.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-96 md:h-[600px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.isUser
                    ? 'bg-brand-blue text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isUser ? 'text-blue-100' : 'text-gray-600'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about college prep..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Suggested Topics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Suggested Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {suggestedQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(question);
                setTimeout(() => {
                  document.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true }));
                }, 0);
              }}
              className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
            >
              <p className="text-sm font-semibold text-navy">{question}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Concierge Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border-l-4 border-brand-blue rounded-lg p-4">
          <h3 className="font-bold text-navy mb-2">📚 Topics Covered</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Housing & Dorm Life</li>
            <li>• Medical Preparation</li>
            <li>• Finances & Budgeting</li>
            <li>• Documents & Paperwork</li>
            <li>• Travel & Moving</li>
            <li>• Safety & Emergency Planning</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-status-success rounded-lg p-4">
          <h3 className="font-bold text-navy mb-2">💡 Usage Tips</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Ask specific questions for best results</li>
            <li>• Use natural language</li>
            <li>• Follow suggested topics to explore more</li>
            <li>• Create tasks from recommendations</li>
            <li>• Personalize answers to your situation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const suggestedQuestions = [
  'What size mattress do dorm rooms use?',
  'How do I coordinate with my roommate?',
  'What should I pack for college?',
  'How much should I budget for college?',
  'What vaccinations are required?',
  'How do I choose a meal plan?',
  'What about renter\'s insurance?',
  'How do I do laundry in the dorm?',
  'What are campus safety resources?',
  'How do I register for classes?',
  'When should I buy textbooks?',
  'What about financial aid?',
];
