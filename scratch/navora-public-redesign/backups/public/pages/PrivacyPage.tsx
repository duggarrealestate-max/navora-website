import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@public/components/ui/PagePrimitives';

const sections = [
  { id: 'overview', title: 'Overview', content: 'This policy explains how Navora collects, uses and protects personal data through this website and related business systems.' },
  { id: 'data-we-collect', title: 'Data we collect', content: 'Enquiry forms may collect your name, work email, company name, business type and operational details. Analytics data may include IP address, browser type and pages visited. No sensitive personal data is collected by default.' },
  { id: 'how-we-use-data', title: 'How we use data', content: 'Data is used to respond to enquiries, improve our services and understand audience interest. We do not sell or rent personal data. We do not share data with unrelated third parties without consent or legal obligation.' },
  { id: 'cookies', title: 'Cookies', content: 'This site uses essential cookies for operation and analytics cookies to understand usage. You can disable non-essential cookies through your browser settings.' },
  { id: 'security', title: 'Security', content: 'Reasonable technical and organisational measures are applied. No method of transmission or storage is completely secure, and absolute security cannot be guaranteed.' },
  { id: 'data-retention', title: 'Data retention', content: 'Enquiry data is retained only for as long as needed to respond and follow up. You may request deletion by contacting us. Analytics data is retained in aggregate form.' },
  { id: 'your-rights', title: 'Your rights', content: 'You have the right to access, correct or request deletion of your data. Requests should be sent to the contact address on this site.' },
  { id: 'third-parties', title: 'Third parties', content: 'Hosting and analytics may involve third-party processors. Each processor is selected for security and compliance. Links to external sites are not covered by this policy.' },
  { id: 'changes', title: 'Changes', content: 'This policy may be updated as the business and legal requirements change. Significant changes will be communicated through the site or by direct contact where appropriate.' },
  { id: 'contact', title: 'Contact', content: 'For privacy enquiries, use the contact form on this site. Include the subject "Privacy Enquiry" and we will respond within a reasonable timeframe.' },
];

export default function PrivacyPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased">
      <div className="h-16 md:h-20" />

      <Section className="pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sidebar nav */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-silver/40 uppercase mb-4">Contents</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-[11px] font-medium text-silver/50 hover:text-soft-white transition-colors py-1.5 border-l border-silver/10 pl-3 hover:border-silver/30"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-9">
            <SectionHeader
              eyebrow="PRIVACY POLICY"
              title="How we handle data"
              subtitle="Transparent, minimal and respectful. This policy covers the public website and enquiry systems operated by Navora."
            />

            <div className="max-w-3xl space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                >
                  <h3 className="text-lg font-semibold text-soft-white tracking-tight mb-3">
                    {section.title}
                  </h3>
                  <p className="text-sm text-silver/60 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 p-5 md:p-6 rounded-2xl border border-soft-cyan/10 bg-charcoal/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] text-silver/50 leading-relaxed">
                <span className="text-soft-cyan font-semibold">Note:</span> Final business details, service providers and project-specific terms must be confirmed before any project launch. This policy covers the website and enquiry process; project-specific terms are agreed separately.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
