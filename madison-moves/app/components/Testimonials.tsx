import Icon from './Icon';
import Reveal from './Reveal';

const placeholderCount = 3;

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="uppercase tracking-[0.3em] text-brass text-xs font-semibold mb-3">
            In Our Clients&rsquo; Words
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-deepsea mb-4">
            Customer Testimonials
          </h2>
          <p className="text-ink/70 text-lg">
            This section is reserved for real feedback from Madison&rsquo;s
            actual clients. Nothing below is a fabricated quote — reviews
            will be added here as they come in.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="h-full p-7 bg-white rounded-2xl border border-dashed border-brass/40 shadow-sm flex flex-col">
                <div
                  className="flex gap-1 text-brass/30 mb-4"
                  aria-hidden="true"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" className="w-5 h-5" />
                  ))}
                </div>
                <p className="text-ink/50 italic flex-1">
                  &ldquo;Customer Testimonial &mdash; placeholder space reserved
                  for a real review from one of Madison&rsquo;s customers.&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-deepsea/60">
                  Customer Testimonial
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
