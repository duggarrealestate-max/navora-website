import { WorkJourney } from '@public/components/automation/WorkJourney';
import { ClosingNote, Eyebrow, PageIntro, Reveal } from '@public/components/ui/PublicDesign';
const capabilities = [
  ['Open the conversation', 'Premium websites and customer portals bring enquiries into the wider system. AI-assisted communication captures requirements and qualifies leads.'],
  ['Move the sale forward', 'Personalised sales follow-up, appointment and booking workflows, quotations, proposals and repeat-order journeys carry the conversation into action.'],
  ['Complete the administration', 'Create documents, assign staff tasks, send internal notifications and manage payment and status reminders through approved workflows.'],
  ['Stay with the customer', 'Customer support, timely updates and customer reactivation use the same history, so people do not have to repeat themselves.'],
  ['Keep the business connected', 'Connections between existing business tools feed reporting and operational insights. Management sees completed work, open actions and exceptions.'],
];
export default function SolutionsPage() {
  return <div className="nv-page"><PageIntro index="01" eyebrow="Connected workflows that act" title={<>From incoming work.<br /><span className="nv-muted">To work completed.</span></>}>Navora builds AI-driven systems that help businesses respond faster, reduce repetitive administration and keep sales, customers and operations connected.</PageIntro>
    <section className="nv-container" aria-label="Interactive automation demonstration"><Reveal><WorkJourney /></Reveal></section>
    <section className="nv-container nv-section"><Reveal className="nv-section-head"><div><Eyebrow>A digital team for repetitive work</Eyebrow><h2>One conversation.<br />A connected chain of action.</h2></div><p>Your business should not depend on people copying information, chasing updates and remembering every next step. Each capability has a job in the workflow.</p></Reveal><div className="nv-capability-list">{capabilities.map(([title, text],i)=><Reveal key={title} className="nv-capability-row"><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>
    <section className="nv-container"><Reveal className="nv-oversight"><div><Eyebrow>Always available. Deliberately bounded.</Eyebrow><h2>Work can continue.<br />Control stays with you.</h2><p>Configured workflows can receive and organise work outside business hours. You agree the rules, permissions and points where a person must decide.</p></div><div><div className="nv-rule-line"><span>AUTOMATE</span>Capture requests, update records, send agreed reminders.</div><div className="nv-rule-line"><span>APPROVE</span>Review quotations, sensitive replies and commitments.</div><div className="nv-rule-line"><span>ESCALATE</span>Route missing details, uncertainty and exceptions to a named person.</div></div></Reveal></section><ClosingNote />
  </div>;
}
