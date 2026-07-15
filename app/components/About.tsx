import Icon from './Icon';
import Reveal from './Reveal';

const trustPoints = [
  {
    title: 'Licensed & Insured',
    body: 'Every visit is covered — your property and your peace of mind come first.',
  },
  {
    title: 'Background-Checked Team',
    body: 'The same trusted, vetted concierge team every time, not a rotating gig-app roster.',
  },
  {
    title: 'Photo Reports',
    body: 'Home Watch and cleaning visits come with time-stamped photo updates, sent directly to you.',
  },
  {
    title: 'Flexible Scheduling',
    body: 'One-time, recurring, or seasonal — service built around when you actually need it.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-brass text-xs font-semibold mb-3">
            About Madison Moves
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-deepsea mb-6">
            Coastal Living Deserves a Concierge, Not Just a Contractor
          </h2>
          <p className="text-ink/70 text-lg leading-relaxed mb-6">
            South Florida&rsquo;s condo and island communities move at their own
            pace — seasonal residents, waterfront properties, and busy owners
            who need a single trusted partner for the details of daily life.
            Madison Moves was built to be that partner: dependable people,
            clear communication, and service that feels like it was made for
            your home specifically.
          </p>
          <p className="text-ink/70 text-lg leading-relaxed">
            Whether you&rsquo;re a full-time resident or fly in twice a year, we
            keep your home, your schedule, and your loved ones taken care of.
          </p>
        </Reveal>

        <Reveal delay={120} className="grid sm:grid-cols-2 gap-5">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="p-6 rounded-2xl bg-sand border border-brass/15"
            >
              <div className="w-10 h-10 rounded-full bg-deepsea text-cream flex items-center justify-center mb-3">
                <Icon name="check" className="w-5 h-5" />
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
