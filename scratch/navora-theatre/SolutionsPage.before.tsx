import { useState } from 'react';
import { OrchestrationEngine } from '@public/components/system/OrchestrationEngine';
import { SystemPage, SystemIntro, SystemClose, RecordLines } from '@public/components/system/SystemExperience';
import { Reveal } from '@public/components/ui/PublicDesign';
const capabilities = [
  ['Customer & sales', 'From first interest to a useful conversation.', ['Capture customer details and understand the need', 'Qualify the opportunity against agreed criteria', 'Notify the right salesperson with conversation history', 'Prepare personalised follow-up, an appointment or quotation']],
  ['Orders & operations', 'Keep the promise connected to the work.', ['Validate order details and check stock or availability', 'Assign an internal task and update the customer', 'Escalate exceptions to the person who can resolve them', 'Track delivery and request feedback']],
  ['Business administration', 'Let information do the travelling.', ['Move repetitive information between approved systems', 'Generate documents and request approval', 'Schedule reminders and update records', 'Highlight management exceptions']],
  ['Customer support', 'A useful answer. A complete handover.', ['Answer approved questions using permitted business data', 'Route the request to the right team', 'Hand complete context to a human when needed', 'Continue follow-up after the conversation']],
] as const;
const tools = ['Website', 'Email', 'CRM', 'Accounting', 'Inventory', 'Payments', 'Calendar', 'Courier', 'Customer portal', 'Management dashboard'];
export default function SolutionsPage() {
  const [selected, setSelected] = useState(0);
  return <SystemPage><SystemIntro number="01" label="INTELLIGENCE INTO ACTION" title={<>Your business receives the signal.<br /><em>We connect what happens next.</em></>}>NAVORA understands it, coordinates the work and keeps your team in control. Explore how an incoming request can become completed work.</SystemIntro>
    <section className="nv-container" aria-label="Interactive orchestration demonstration"><OrchestrationEngine /></section>
    <section className="nv-container nx-section nx-capabilities"><Reveal><p className="nx-label">THE WORK BETWEEN YOUR TOOLS</p><h2>More than a reply.<br />An entire chain of action.</h2></Reveal><div className="nx-capability-workspace"><div className="nx-category-tabs" aria-label="Automation capabilities">{capabilities.map(([name], i) => <button key={name} aria-pressed={selected === i} onClick={() => setSelected(i)}><span>0{i + 1}</span>{name}<b aria-hidden="true">↗</b></button>)}</div><div className="nx-capability-detail" aria-live="polite"><p className="nx-label">WORKFLOW / {capabilities[selected][0]}</p><h3>{capabilities[selected][1]}</h3><RecordLines lines={[...capabilities[selected][2]]} /><p className="nx-small">Completed automatically within agreed rules. Reviewed by your team wherever judgement is required.</p></div></div></section>
    <section className="nv-container nx-connections"><div><p className="nx-label">A CONNECTED BUSINESS / YOUR EXISTING TOOLS</p><h2>One intelligence layer.<br />The tools you already use.</h2><p>The final system connects to each client’s tools, subject to discovery, technical access and agreed permissions. These are possible connection points, not a list of live integrations.</p></div><div className="nx-connection-bus"><div className="nx-bus-hub">NAVORA <span>Coordinate · act · record</span></div><div className="nx-bus-tools">{tools.map(tool => <span key={tool}>{tool}</span>)}</div></div></section>
    <SystemClose title="Which signal should become less work?" /></SystemPage>;
}

