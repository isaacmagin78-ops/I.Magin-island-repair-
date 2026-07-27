import { services, siteConfig, isPlaceholder } from '../config/site';
import Icon from './Icon';

export default function PaymentLinks() {
  const depositConfigured = !isPlaceholder(siteConfig.stripeLinks.depositGeneral);

  return (
    <div className="bg-deepsea text-cream rounded-3xl p-6 sm:p-10">
      <h3 className="font-serif text-2xl font-bold mb-2">Secure Your Booking</h3>
      <p className="text-cream/75 mb-8">
        Pay a deposit online to lock in your service date. Payments are
        processed securely by Stripe.
      </p>

      <div className="mb-8">
        {depositConfigured ? (
          <a
            href={siteConfig.stripeLinks.depositGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brass text-deepsea font-bold px-8 py-4 rounded-full hover:bg-brass-light transition-colors shadow-lg text-lg"
          >
            Pay Deposit &amp; Book Now
          </a>
        ) : (
          <a
            href="#booking-form"
            className="inline-flex items-center justify-center gap-2 bg-cream/10 border border-cream/30 text-cream font-semibold px-8 py-4 rounded-full hover:bg-cream/20 transition-colors text-lg"
          >
            Online Payment Coming Soon &mdash; Request a Booking
          </a>
        )}
        <p className="text-xs text-cream/50 mt-3">
          *Secure checkout powered by Stripe.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {services.map((service) => {
          const link = siteConfig.stripeLinks[service.stripeKey];
          const configured = !isPlaceholder(link);
          return (
            <div
              key={service.id}
              className="flex items-center justify-between gap-3 p-4 rounded-xl bg-cream/5 border border-cream/10"
            >
              <span className="flex items-center gap-3">
                <Icon name={service.icon as any} className="w-5 h-5 text-brass" />
                <span className="font-medium">{service.name}</span>
              </span>
              {configured ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-brass hover:underline shrink-0"
                >
                  Pay Now
                </a>
              ) : (
                <span className="text-xs text-cream/40 shrink-0">Coming Soon</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
