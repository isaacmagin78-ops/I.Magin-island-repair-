import BookingForm from './BookingForm';
import ContactBar from './ContactBar';
import PaymentLinks from './PaymentLinks';
import Reveal from './Reveal';

export default function Booking() {
  return (
    <section id="booking" className="py-20 md:py-28 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="uppercase tracking-[0.3em] text-brass text-xs font-semibold mb-3">
            Get Started
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-deepsea mb-4">
            Book Your Concierge Service
          </h2>
          <p className="text-ink/70 text-lg">
            Prefer to talk it through first? Call, text, or email us directly.
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
    </section>
  );
}
