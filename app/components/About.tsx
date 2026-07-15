import { siteConfig } from '../config/site';
import Icon from './Icon';
import Reveal from './Reveal';

const trustPoints = [
  {
    title: 'Detail-Obsessed',
    body: 'The same checklist discipline that goes into flying gets applied to every room, every visit.',
    icon: 'wings' as const,
  },
  {
    title: 'Background-Checked',
    body: 'You’re letting one trusted person into your home — not a rotating gig-app roster.',
    icon: 'shield' as const,
  },
  {
    title: 'Reliable & On Time',
    body: 'Booked is booked. If plans ever change, you’ll hear from me directly.',
    icon: 'check' as const,
  },
  {
    title: 'Flexible Scheduling',
    body: 'One-time, recurring, or seasonal — service built around when you actually need it.',
    icon: 'star' as const,
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-brass text-xs font-semibold mb-3">
            Meet {siteConfig.founderName}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-deepsea mb-6">
            29, Detail-Driven, and Headed for the Cockpit
          </h2>
          <div className="space-y-4">
            {siteConfig.founderBio.map((paragraph, i) => (
              <p key={i} className="text-ink/70 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="grid sm:grid-cols-2 gap-5">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="p-6 rounded-2xl bg-sand border border-brass/15"
            >
              <div className="w-10 h-10 rounded-full bg-deepsea text-cream flex items-center justify-center mb-3">
                <Icon name={point.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-deepsea mb-1">
                {point.title}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {point.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
