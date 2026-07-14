import { findConciergeResponse, CONCIERGE_KNOWLEDGE_BASE } from '../concierge';

describe('findConciergeResponse', () => {
  it('matches an exact keyword from the knowledge base', () => {
    const result = findConciergeResponse('What Twin XL mattress size do I need?');
    expect(result.category).toBe('housing');
    expect(result.answer).toBe(CONCIERGE_KNOWLEDGE_BASE['mattress size'].answer);
  });

  it('is case-insensitive and trims whitespace', () => {
    const result = findConciergeResponse('  MATTRESS SIZE  ');
    expect(result.category).toBe('housing');
  });

  it('matches keywords embedded within a longer question', () => {
    const result = findConciergeResponse('Do I need renter\'s insurance for the dorm?');
    expect(result.category).toBe('finances');
    expect(result.suggestedTasks).toContain('Plan renter\'s insurance');
  });

  it('falls back to category keyword matching when no exact key matches', () => {
    const result = findConciergeResponse('Is my dorm room safe at night?');
    // No knowledge-base key matches; the housing check runs before safety and wins.
    expect(result.category).toBe('housing');
  });

  it('matches the medical fallback category for health-related questions', () => {
    const result = findConciergeResponse('How do I find a doctor near campus?');
    expect(result.category).toBe('medical');
  });

  it('matches the finances fallback category for money-related questions', () => {
    const result = findConciergeResponse('How much money should I budget monthly?');
    expect(result.category).toBe('finances');
  });

  it('returns the general fallback response for unrecognized questions', () => {
    const result = findConciergeResponse('What is the best pizza place nearby?');
    expect(result.category).toBe('general');
    expect(result.suggestedTasks).toBeUndefined();
  });
});
