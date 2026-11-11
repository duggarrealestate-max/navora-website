import { motion } from 'framer-motion';
import { Section, SectionHeader } from '@public/components/ui/PagePrimitives';

const sections = [
  { id: 'overview', title: 'Overview', content: 'These terms govern your use of the Navora website and related enquiry services. By using this site, you agree to these terms. If you do not agree, please do not use the site.' },
  { id: 'website-information', title: 'Website information', content: 'Content is provided for general information only. It is not professional advice. We aim to keep information accurate but make no representations or warranties of any kind about completeness, reliability or suitability.' },
  { id: 'project-agreements', title: 'Project agreements', content: 'Projects are governed by separate agreements tailored to each client. These terms do not form a contract for services unless a signed agreement is in place. Project scope, timeline, deliverables and payment terms are defined in each agreement.' },
  { id: 'intellectual-property', title: 'Intellectual property', content: 'Unless otherwise stated, Navora owns or licenses all content on this site. Unauthorised use may violate copyright, trademark or other laws. Client projects remain client property as defined in each project agreement.' },
  { id: 'third-party-services', title: 'Third-party services', content: 'We may use third-party hosting, analytics and integration providers. These providers have their own terms and privacy policies. We are not responsible for third-party content or practices.' },
  { id: 'acceptable-use', title: 'Acceptable use', content: 'You may not use this site to distribute unlawful material, interfere with security, attempt unauthorised access or transmit malicious code. We reserve the right to restrict access where behaviour violates these terms.' },
  { id: 'liability', title: 'Liability', content: 'To the fullest extent permitted by law, Navora excludes liability for any loss, damage or disruption arising from use of this site. Nothing in these terms limits liability for death or personal injury caused by negligence.' },
  { id: 'updates', title: 'Updates', content: 'Terms may be revised periodically. The current version is always available on this page. Continued use after changes constitutes acceptance of the updated terms.' },
];

export default function TermsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased">
      <div className="h-16 md:h-20" />

      <Section className="pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
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

          <div className="lg:col-span-9">
            <SectionHeader
              eyebrow="TERMS"
              title="Website and service terms"
              subtitle="Clear, fair and transparent terms for using the Navora website and enquiry services."
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
              className="mt-16 p-5 md:p-6 rounded-2xl border border-electric-violet/10 bg-charcoal/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] text-silver/50 leading-relaxed">
                <span className="text-electric-violet font-semibold">Note:</span> Separate project agreements govern individual client engagements. These terms apply to the public website and enquiry process only. Project-specific terms are agreed and documented before work begins.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
