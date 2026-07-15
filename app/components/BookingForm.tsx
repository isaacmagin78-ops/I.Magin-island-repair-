'use client';

import { FormEvent, useState } from 'react';
import { services, siteConfig, isPlaceholder } from '../config/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'service', string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const service = String(data.get('service') || '').trim();

    if (!name) next.name = 'Please enter your name.';
    if (!email) next.email = 'Please enter your email.';
    else if (!emailPattern.test(email)) next.email = 'Please enter a valid email address.';
    if (!phone) next.phone = 'Please enter a phone number.';
    if (!service) next.service = 'Please choose a service.';

    return next;
  }

  function buildMailtoUrl(data: FormData): string {
    const lines = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')}`,
      `Condo/Community: ${data.get('community') || 'N/A'}`,
      `Service Requested: ${data.get('service')}`,
      `Preferred Date: ${data.get('preferredDate') || 'N/A'}`,
      '',
      'Notes:',
      String(data.get('notes') || 'N/A'),
    ];
    const subject = encodeURIComponent(
      `Booking Request: ${data.get('service') || 'Madison Moves'}`
    );
    const body = encodeURIComponent(lines.join('\n'));
    return `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');

    const endpoint = siteConfig.formEndpoint;
    if (!isPlaceholder(endpoint)) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        if (res.ok) {
          setStatus('success');
          form.reset();
          return;
        }
        throw new Error('Form endpoint returned an error');
      } catch {
        // Fall through to mailto fallback below.
      }
    }

    window.location.href = buildMailtoUrl(data);
    setStatus('success');
    form.reset();
  }

  const fieldClass =
    'w-full rounded-xl border border-brass/25 bg-white px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition';
  const labelClass = 'block text-sm font-semibold text-deepsea mb-1.5';
  const errorClass = 'mt-1 text-sm text-red-600';

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-brass/15 p-6 sm:p-10">
      {status === 'success' && (
        <div
          role="status"
          className="mb-6 rounded-xl bg-teal/10 border border-teal/30 text-teal px-4 py-3 font-medium"
        >
          Thank you! Your request has been sent. We&rsquo;ll be in touch shortly
          to confirm your booking.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <p id="name-error" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={fieldClass}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass}>
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="community" className={labelClass}>
            Condo / Community
          </label>
          <input
            id="community"
            name="community"
            type="text"
            placeholder="e.g. Ocean Reef Tower"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            Service Requested <span aria-hidden="true">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Select a service&hellip;
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other">Other / Not Sure</option>
          </select>
          {errors.service && (
            <p id="service-error" className={errorClass}>
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            Preferred Date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Tell us anything that will help us serve you better."
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-deepsea text-cream font-semibold px-8 py-4 rounded-full hover:bg-teal transition-colors shadow-lg text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Request Booking'}
          </button>
          <p className="mt-3 text-xs text-ink/50">
            Submitting opens your email client with the details pre-filled
            unless a form service is configured in{' '}
            <code>app/config/site.ts</code>.
          </p>
        </div>
      </form>
    </div>
  );
}
