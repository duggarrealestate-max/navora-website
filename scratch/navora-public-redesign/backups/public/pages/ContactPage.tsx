import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type EnquiryData, type SubmissionState, submitEnquiry } from '@public/services/enquiry';

const businessTypes = [
  'Wholesale & Manufacturing',
  'Real Estate',
  'Restaurants & Hospitality',
  'Retail & E-commerce',
  'Professional Services',
  'Automotive',
  'Other',
];

export default function ContactPage(): JSX.Element {
  const [form, setForm] = useState<EnquiryData>({
    fullName: '',
    workEmail: '',
    company: '',
    businessType: '',
    challenge: '',
    consent: false,
  });
  const [state, setState] = useState<SubmissionState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryData, boolean>>>({});
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const validate = (): boolean => {
    const next: Partial<Record<keyof EnquiryData, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Name is required';
    if (!form.workEmail.trim()) next.workEmail = 'Work email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) next.workEmail = 'Enter a valid email';
    if (!form.company.trim()) next.company = 'Company is required';
    if (!form.businessType) next.businessType = 'Select a business type';
    if (!form.challenge.trim()) next.challenge = 'Describe your main challenge';
    if (!form.consent) next.consent = 'You must accept the consent to continue';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleBlur = (field: keyof EnquiryData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, workEmail: true, company: true, businessType: true, challenge: true, consent: true });
    if (!validate()) return;
    setState('loading');
    try {
      const res = await submitEnquiry(form);
      if (res.ok) {
        setState('success');
        setForm({ fullName: '', workEmail: '', company: '', businessType: '', challenge: '', consent: false });
        setTouched({});
        setErrors({});
      } else {
        setState('error');
        setErrors((prev) => ({ ...prev, workEmail: res.message || 'Something went wrong' }));
      }
    } catch {
      setState('error');
      setErrors((prev) => ({ ...prev, workEmail: 'Network error. Please try again.' }));
    }
  };

  const inputClasses = (field: keyof EnquiryData) =>
    `w-full rounded-xl border bg-charcoal/40 px-4 py-3 text-sm text-soft-white placeholder:text-silver/40 outline-none transition-all duration-200 ${
      touched[field] && errors[field]
        ? 'border-red-500/50 focus:border-red-400'
        : 'border-silver/10 focus:border-soft-cyan/40 focus:bg-charcoal/60'
    }`;

  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased">
      <div className="h-16 md:h-20" />

      <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left: invitation */}
          <div className="relative flex items-center px-6 md:px-12 lg:px-16 py-12 lg:py-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal/40 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-xl">
              <motion.p
                className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-soft-cyan/80 uppercase mb-4 md:mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                START A CONVERSATION
              </motion.p>
              <motion.h1
                className="text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-soft-white leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Let us design a system around your business.
              </motion.h1>
              <motion.p
                className="text-sm md:text-base text-silver/60 leading-relaxed mb-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Every project starts with a 15-minute conversation. No pitch deck, no pressure — just a genuine conversation about what your business needs.
              </motion.p>

              <div className="space-y-6">
                {[
                  { num: '01', title: 'Tell us about your business', desc: 'Share your industry, team size and the systems you currently use.' },
                  { num: '02', title: 'We identify the strongest bottleneck', desc: 'We will pinpoint the one area that, if improved, would have the biggest impact.' },
                  { num: '03', title: 'You receive a clear proposal', desc: 'No jargon. No templates. A plan built around your specific situation and budget.' },
                ].map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                  >
                    <span className="text-xs font-bold text-soft-cyan/70 mt-0.5">{step.num}</span>
                    <div>
                      <p className="text-sm font-semibold text-soft-white/85 tracking-wide mb-1">{step.title}</p>
                      <p className="text-[11px] text-silver/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="relative flex items-center px-6 md:px-12 lg:px-16 py-12 lg:py-0 bg-charcoal/20">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-charcoal/40 pointer-events-none" />
            <motion.div
              ref={formRef}
              className="relative z-10 w-full max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {state === 'success' ? (
                  <motion.div
                    key="success"
                    className="rounded-2xl border border-soft-cyan/15 bg-charcoal/40 backdrop-blur-xl p-8 md:p-10 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-12 h-12 rounded-full border border-soft-cyan/30 bg-soft-cyan/10 flex items-center justify-center mx-auto mb-5">
                      <span className="text-lg font-bold text-soft-cyan">OK</span>
                    </div>
                    <h3 className="text-xl font-bold text-soft-white tracking-tight mb-2">
                      Message received
                    </h3>
                    <p className="text-sm text-silver/60 leading-relaxed">
                      Thank you. We will be in touch within one working day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-silver/10 bg-charcoal/40 backdrop-blur-xl p-6 md:p-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="fullName" className="block text-[11px] font-semibold tracking-wider text-silver/60 uppercase mb-2">
                          Full name <span className="text-electric-violet">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={form.fullName}
                          onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                          onBlur={() => handleBlur('fullName')}
                          className={inputClasses('fullName')}
                          placeholder="Your name"
                          autoComplete="name"
                        />
                        {touched.fullName && errors.fullName && (
                          <p className="mt-1.5 text-[11px] text-red-400/90">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="workEmail" className="block text-[11px] font-semibold tracking-wider text-silver/60 uppercase mb-2">
                          Work email <span className="text-electric-violet">*</span>
                        </label>
                        <input
                          id="workEmail"
                          type="email"
                          value={form.workEmail}
                          onChange={(e) => setForm((p) => ({ ...p, workEmail: e.target.value }))}
                          onBlur={() => handleBlur('workEmail')}
                          className={inputClasses('workEmail')}
                          placeholder="you@company.com"
                          autoComplete="email"
                        />
                        {touched.workEmail && errors.workEmail && (
                          <p className="mt-1.5 text-[11px] text-red-400/90">{errors.workEmail}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-[11px] font-semibold tracking-wider text-silver/60 uppercase mb-2">
                          Company <span className="text-electric-violet">*</span>
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                          onBlur={() => handleBlur('company')}
                          className={inputClasses('company')}
                          placeholder="Company name"
                          autoComplete="organization"
                        />
                        {touched.company && errors.company && (
                          <p className="mt-1.5 text-[11px] text-red-400/90">{errors.company}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="businessType" className="block text-[11px] font-semibold tracking-wider text-silver/60 uppercase mb-2">
                          Business type <span className="text-electric-violet">*</span>
                        </label>
                        <select
                          id="businessType"
                          value={form.businessType}
                          onChange={(e) => setForm((p) => ({ ...p, businessType: e.target.value }))}
                          onBlur={() => handleBlur('businessType')}
                          className={inputClasses('businessType')}
                        >
                          <option value="">Select a sector</option>
                          {businessTypes.map((bt) => (
                            <option key={bt} value={bt}>{bt}</option>
                          ))}
                        </select>
                        {touched.businessType && errors.businessType && (
                          <p className="mt-1.5 text-[11px] text-red-400/90">{errors.businessType}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="challenge" className="block text-[11px] font-semibold tracking-wider text-silver/60 uppercase mb-2">
                          Main operational challenge <span className="text-electric-violet">*</span>
                        </label>
                        <textarea
                          id="challenge"
                          value={form.challenge}
                          onChange={(e) => setForm((p) => ({ ...p, challenge: e.target.value }))}
                          onBlur={() => handleBlur('challenge')}
                          rows={4}
                          className={inputClasses('challenge')}
                          placeholder="Describe the workflow or process that is slowing your team down..."
                        />
                        {touched.challenge && errors.challenge && (
                          <p className="mt-1.5 text-[11px] text-red-400/90">{errors.challenge}</p>
                        )}
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          id="consent"
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
                          onBlur={() => handleBlur('consent')}
                          className="mt-0.5 h-4 w-4 rounded border-silver/20 bg-charcoal/40 text-soft-cyan focus:ring-soft-cyan/40"
                        />
                        <label htmlFor="consent" className="text-[11px] text-silver/50 leading-relaxed">
                          I agree to Navora processing my enquiry. I understand I can request deletion at any time. <span className="text-electric-violet">*</span>
                        </label>
                      </div>
                      {touched.consent && errors.consent && (
                        <p className="text-[11px] text-red-400/90">{errors.consent}</p>
                      )}

                      <button
                        type="submit"
                        disabled={state === 'loading'}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wider text-graphite bg-soft-white rounded-xl hover:bg-silver transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {state === 'loading' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-graphite/20 border-t-graphite rounded-full animate-spin" />
                            SENDING...
                          </>
                        ) : (
                          <>
                            SEND ENQUIRY
                            <span className="text-electric-violet">→</span>
                          </>
                        )}
                      </button>

                      <AnimatePresence>
                        {state === 'error' && errors.workEmail && (
                          <motion.p
                            className="text-center text-[11px] text-red-400/90"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                          >
                            {errors.workEmail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
