import { services } from '../config/site';
import Icon from './Icon';
import Reveal from './Reveal';

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="uppercase tracking-[0.3em] text-brass text-xs font-semibold mb-3">
            What We Offer
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-deepsea mb-4">
            Full-Service Home Concierge
          </h2>
          <p className="text-ink/70 text-lg">
            Every service below can be booked individually or bundled into an
            ongoing concierge plan for your condo or island home.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 60}>
              <a
                href="#booking"
                className="group block h-full p-6 bg-white rounded-2xl border border-brass/15 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center mb-4 group-hover:bg-brass group-hover:text-white transition-colors">
                  <Icon name={service.icon as any} className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-deepsea mb-2">
                  {service.name}
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed">
                  {service.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
