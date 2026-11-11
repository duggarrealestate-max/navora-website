import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Status } from '@public/components/ui/PublicDesign';

export const workStages = [
  { label: 'Enquiry', title: 'A request becomes a piece of work.', action: 'Enquiry captured', detail: 'A website, email or portal brings the request into one place. The original message stays attached.', input: '“We need a repeat order. Can you confirm availability and arrange delivery?”', output: 'A new enquiry, ready to be understood', owner: 'System captures the message', record: ['Source · Website enquiry', 'Request · Repeat order', 'Next action · Understand the details'] },
  { label: 'Understand', title: 'The system finds what matters.', action: 'Requirement understood', detail: 'AI extracts the requirement, checks the customer record and identifies missing information before work moves on.', input: 'A repeat order request, with a delivery question.', output: 'Customer matched. Delivery details needed.', owner: 'A person reviews uncertain information', record: ['Customer · Existing record matched', 'Intent · Repeat order', 'Missing detail · Required delivery date'] },
  { label: 'Respond', title: 'A relevant reply, without starting again.', action: 'Personalised response prepared', detail: 'The reply uses the customer’s context. Agreed rules decide what can be sent and what needs approval.', input: 'Customer recognised. Delivery date not yet supplied.', output: '“We can help with your repeat order. What delivery date do you need?”', owner: 'Your team controls approval rules', record: ['Customer record · Updated', 'Reply · Ready for approval', 'Follow-up · Scheduled if no reply'] },
  { label: 'Sell / book', title: 'Turn the conversation into a next step.', action: 'Order draft created', detail: 'A quotation, appointment or order is created with the information already collected. No retyping the conversation.', input: 'The customer confirms the requested delivery date.', output: 'Order draft assigned to the sales team', owner: 'Staff approve price and availability', record: ['Order · Draft created', 'Owner · Sales team notified', 'Approval · Price and availability'] },
  { label: 'Operate', title: 'The right person gets the right task.', action: 'Work assigned', detail: 'After approval, the system assigns tasks, creates documents and sends status updates using connected tools.', input: 'Order approved by the sales team.', output: 'Dispatch task created. Customer update sent.', owner: 'Exceptions are escalated to the team', record: ['Task · Assigned to dispatch', 'Document · Order confirmation prepared', 'Customer · Status update sent'] },
  { label: 'Support', title: 'Keep the conversation connected.', action: 'Follow-up scheduled', detail: 'Routine questions, payment reminders and follow-ups use the same customer history. Sensitive issues go to a person.', input: 'The order is being prepared for delivery.', output: 'Delivery update ready. Follow-up scheduled.', owner: 'A person handles complaints and exceptions', record: ['Support · Customer history available', 'Reminder · Based on agreed timing', 'Exception · Assigned to a named owner'] },
  { label: 'Learn', title: 'See what happened. Improve what happens next.', action: 'Management view updated', detail: 'Completed work, open actions and exceptions become visible. Use real activity to improve the workflow with your team.', input: 'The order and follow-up have been completed.', output: 'Outcome recorded in the management view', owner: 'People decide what to improve', record: ['Outcome · Order completed', 'Open work · Visible to management', 'Review · Next improvement identified'] },
];

export function WorkJourney() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const stage = workStages[active];
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      if (active === workStages.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [playing, reduced, active]);
  return <div className={`nv-workbench${playing && !reduced ? ' is-running' : ''}`}>
    <div className="nv-workbench-bar"><span><span className="nv-square" /> CONNECTED WORK / EXAMPLE 01</span><button className="nv-text-button" disabled={!!reduced} onClick={() => { if (active === 6) setActive(0); setPlaying(!playing); }}>{reduced ? 'Manual steps · reduced motion' : playing ? 'Pause demonstration Ⅱ' : 'Play demonstration ▷'}</button></div>
    <div className="nv-workbench-body">
      <div className="nv-stage-rail" aria-label="Explore the connected workflow">{workStages.map((item, i) => <button type="button" key={item.label} aria-pressed={active === i} className={i <= active ? 'is-reached' : ''} onClick={() => { setPlaying(false); setActive(i); }}><span className="nv-stage-number">{String(i + 1).padStart(2, '0')}</span><span>{item.label}</span><span aria-hidden="true">{i < active ? '✓' : '↗'}</span></button>)}</div>
      <div className="nv-workspace">
        <div className="nv-workspace-heading"><p className="nv-mono">AI-DRIVEN WORKFLOW</p><Status success={active === 6}>{stage.action}</Status></div>
        <motion.div key={active} initial={{ opacity: 0.65, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35 }} className="nv-workspace-content">
          <h2>{stage.title}</h2><p>{stage.detail}</p>
          <div className="nv-handoff"><div className="nv-message"><span className="nv-mono">INCOMING CONTEXT</span><p>{stage.input}</p><span className="nv-message-foot">Customer history stays connected</span></div><div className="nv-transfer" aria-hidden="true"><span /><b>→</b><span /></div><div className="nv-result"><span className="nv-mono">SYSTEM ACTION</span><h3>{stage.output}</h3>{stage.record.map(row => <div className="nv-record-row" key={row}><span aria-hidden="true">{active === 6 ? '✓' : '—'}</span>{row}</div>)}</div></div>
        </motion.div>
        <div className="nv-human-rule"><span className="nv-human-icon" aria-hidden="true">◎</span><div><span className="nv-mono">HUMAN OVERSIGHT</span><p>{stage.owner}</p></div></div>
      </div>
    </div><div className="nv-workbench-foot"><span>Illustrative workflow. No live customer data.</span><span>SELECT A STAGE TO EXPLORE ↗</span></div>
  </div>;
}
