import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SystemFrame, RecordLines } from './SystemExperience';
import { scenarios } from './scenarios';
const labels = ['Signal', 'Context', 'Decision', 'Action', 'Human approval', 'Outcome'];
const glyphs = ['↳', '≋', '◇', '↗', '◎', '✓'];
export function OrchestrationEngine() {
  const [scenario, setScenario] = useState(0);
  const [stage, setStage] = useState(0);
  const [escalated, setEscalated] = useState(false);
  const item = scenarios[scenario];
  const reduced = useReducedMotion();
  const positions = [[110,85],[500,85],[890,85],[890,255],[500,255],[110,255]];
  const details = [item.message, item.context, item.decision, item.action, item.approval, escalated ? 'Exception escalated. Full context handed to the named team member. The proposed action is held; no customer commitment is made.' : item.outcome];
  const reset = () => { setStage(0); setEscalated(false); };
  return <SystemFrame label="AI ORCHESTRATION ENGINE / EXPLORE A SCENARIO" className="nx-engine">
    <div className="nx-scenario-pick"><label htmlFor="scenario">What enters your business?</label><select id="scenario" value={scenario} onChange={event => { setScenario(Number(event.target.value)); reset(); }}>{scenarios.map((s, i) => <option key={s.name} value={i}>{s.name}</option>)}</select><span className="nx-label">01 SIGNAL → CONNECTED WORK</span></div>
    <div className="nx-engine-space">
      <div className="nx-input-note"><span className="nx-label">TRIGGER RECEIVED / {item.source}</span><p>“{item.message}”</p><span className="nx-note-foot">Example request · no live customer data</span></div>
      <div className="nx-orchestration-map" aria-label="Workflow progress">
        <svg className="nx-map-paths" viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true"><path d="M110 85 H500 H890 V255 H500 H110" /><path className="nx-completed-path" pathLength={100} strokeDasharray={String(stage * 20) + " 100"} d="M110 85 H500 H890 V255 H500 H110" /><motion.circle className="nx-moving-signal" r={5} initial={false} animate={{ cx: positions[stage][0], cy: positions[stage][1] }} transition={{ duration: reduced ? 0 : .7, ease: "easeInOut" }} /><path className="nx-gate-path" d="M500 255 V330" /></svg>
        {labels.map((label, i) => <div key={label} className={`nx-map-node nx-node-${i} ${stage === i ? 'is-current' : ''} ${stage > i ? 'is-done' : ''}`} aria-current={stage === i ? 'step' : undefined}><span className="nx-node-symbol" aria-hidden="true">{stage > i ? '✓' : glyphs[i]}</span><strong>{label}</strong><small>{stage > i ? 'Processed in example' : stage === i ? i === 4 ? 'Your decision' : 'Current step' : 'Waiting'}</small></div>)}
        <div className="nx-map-centre" aria-hidden="true"><span>N /</span><small>NAVORA<br />INTELLIGENCE LAYER</small></div>
      </div>
      <div className="nx-attached-note"><span className="nx-label">CONNECTED CONTEXT</span><RecordLines lines={item.records} /><div className="nx-tool-tags">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>
    </div>
    <div className="nx-engine-action"><div className="nx-stage-detail" role="status" aria-live="polite" aria-atomic="true"><span className="nx-label">0{stage + 1} / {stage === 5 && escalated ? 'EXCEPTION ESCALATED' : labels[stage].toUpperCase()}</span><h2>{stage === 0 ? 'Every signal deserves a next step.' : stage === 4 ? 'This is where your team decides.' : stage === 5 ? escalated ? 'Held safely. Handed to a person.' : 'Work completed. Context retained.' : ['','Context understood.','The next action is selected.','Useful work takes shape.'][stage]}</h2><p>{details[stage]}</p></div><div className="nx-engine-controls">{stage < 4 ? <button className="nx-button" onClick={() => setStage(stage + 1)}>Advance to {labels[stage + 1].toLowerCase()} <span aria-hidden="true">→</span></button> : stage === 4 ? <><button className="nx-button" onClick={() => { setEscalated(false); setStage(5); }}>Approve example action <span aria-hidden="true">✓</span></button><button className="nx-button nx-secondary" onClick={() => { setEscalated(true); setStage(5); }}>Escalate to a person ↗</button></> : <button className="nx-button" onClick={reset}>Replay this scenario ↻</button>}<p>{stage === 4 ? 'Nothing proceeds until you choose.' : 'Interactive demonstration. No external action is performed.'}</p></div></div>
  </SystemFrame>;
}
