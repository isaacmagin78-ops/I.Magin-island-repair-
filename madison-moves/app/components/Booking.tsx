import BookingForm from './BookingForm';
import ContactBar from './ContactBar';
import PaymentLinks from './PaymentLinks';
import Reveal from './Reveal';

export default function Booking() {
  return (
    <section id="booking" className="relative pt-20 pb-0 md:pt-28 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="uppercase tracking-[0.3em] text-brass text-xs font-semibold mb-3">
            Get Started
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-deepsea mb-4">
            Book Madison
          </h2>
          <p className="text-ink/70 text-lg">
            Prefer to talk it through first? Call, text, or email me directly.
          </p>
        </Reveal>

        <Reveal className="mb-12">
          <ContactBar />
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <Reveal id="booking-form" className="lg:col-span-3">
            <BookingForm />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-2">
            <PaymentLinks />
          </Reveal>
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="block w-full text-deepsea"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,48 C240,0 480,80 720,56 C960,32 1200,0 1440,48 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  );
}
