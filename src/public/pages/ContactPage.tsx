import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { type EnquiryData, type SubmissionState, submitEnquiry } from '@public/services/enquiry';
import { SystemPage, SystemIntro, Signal } from '@public/components/system/SystemExperience';
import { sectors } from '@public/components/system/industryFlows';
const emptyForm: EnquiryData = { fullName: '', workEmail: '', company: '', businessType: '', challenge: '', consent: false };
const fieldLabels: Record<keyof EnquiryData, string> = { fullName: 'Full name', workEmail: 'Work email', company: 'Company', businessType: 'Business type', challenge: 'What is taking too much time', consent: 'Consent' };
export default function ContactPage() {
 const [form, setForm] = useState<EnquiryData>({ ...emptyForm });
 const [state, setState] = useState<SubmissionState>('idle');
 const [errors, setErrors] = useState<Partial<Record<keyof EnquiryData, string>>>({});
 const [submissionError, setSubmissionError] = useState('');
 const formRef = useRef<HTMLFormElement>(null);
 const successRef = useRef<HTMLHeadingElement>(null);
 const errorRef = useRef<HTMLParagraphElement>(null);
 const pending = useRef(false);
 const mounted = useRef(true);
 useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
 useEffect(() => { if (state === 'success') successRef.current?.focus(); if (state === 'error') errorRef.current?.focus(); }, [state]);
 const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim());
 const ready = [!!form.company.trim() && !!form.businessType, !!form.challenge.trim(), !!form.fullName.trim() && emailValid, form.consent];
 const allReady = ready.every(Boolean);
 const progress = [...ready, allReady];
 const update = (field: keyof EnquiryData, value: string | boolean) => { setForm(previous => ({ ...previous, [field]: value })); setErrors(previous => ({ ...previous, [field]: undefined })); };
 const submit = async (event: React.FormEvent) => {
  event.preventDefault(); if (pending.current) return;
  const next: Partial<Record<keyof EnquiryData, string>> = {};
  for (const key of ['fullName', 'workEmail', 'company', 'businessType', 'challenge'] as const) if (!form[key].trim()) next[key] = fieldLabels[key] + ' is required.';
  if (form.workEmail && !emailValid) next.workEmail = 'Enter a valid email address.';
  if (!form.consent) next.consent = 'Please confirm consent to continue.';
  setErrors(next); const first = Object.keys(next)[0];
  if (first) { formRef.current?.querySelector<HTMLElement>('#' + first)?.focus(); return; }
  pending.current = true; setState('loading'); setSubmissionError('');
  try {
   const result = await submitEnquiry({ ...form, fullName: form.fullName.trim(), workEmail: form.workEmail.trim(), company: form.company.trim(), challenge: form.challenge.trim() });
   if (!mounted.current) return;
   if (result.ok) setState('success');
   else { setState('error'); setSubmissionError(result.message || 'The enquiry preview could not be completed. Your entries are still here; please try again.'); }
  } catch { if (mounted.current) { setState('error'); setSubmissionError('The enquiry preview could not be completed. Your entries are still here; please try again.'); } }
  finally { pending.current = false; }
 };
 const attrs = (key: keyof EnquiryData) => ({ id: key, name: key, 'aria-required': true, 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? key + '-error' : undefined, disabled: state === 'loading' });
 const error = (key: keyof EnquiryData) => errors[key] ? <p id={key + '-error'} className="nv-field-error" role="alert">{errors[key]}</p> : null;
 return <SystemPage><SystemIntro number="05" label="TELL US ABOUT YOUR BUSINESS" title={<>Tell us what is taking<br /><em>too much time.</em></>}>Our first conversation is about understanding the problem, not selling technology you do not need.</SystemIntro>
 <div className="nv-container nx-contact-layout"><section className="nx-contact-copy" aria-label="Discovery sequence"><p className="nx-label">THE FIRST CONVERSATION</p><h2>Start with one task you want to make easier.</h2><ol className="nx-discovery-stages">{[
 ['Tell us where work slows down', 'Bring one repeated task, a delayed handover or a process someone keeps chasing.'],
 ['We listen to how the work happens', 'We ask who handles the work now and what information they need.'],
 ['You receive a practical next step', 'A clear first step, with anything uncertain explained.'],
 ].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>
 <div className="nx-init-terminal"><div className="nx-init-header"><span className="nx-label">ENQUIRY EXAMPLE / THIS PAGE ONLY</span><Signal>Waiting for details</Signal></div><ol>{['Business identified', 'Challenge received', 'Details entered', 'Consent confirmed', 'Ready to preview'].map((label, i) => <li key={label} className={progress[i] ? 'is-ready' : ''}><span aria-hidden="true">{progress[i] ? '✓' : '○'}</span><span>{label}</span><small>{progress[i] ? 'Entered here' : 'Awaiting input'}</small></li>)}</ol><p className="nx-init-foot" aria-live="polite">{state === 'success' ? 'Preview complete. Nothing has been delivered.' : allReady ? 'Your details are ready to preview. Nothing will be sent.' : 'This preview shows which fields are complete. It does not assess your business.'}</p></div>
 <p className="nx-contact-note"><strong>Demonstration only.</strong> This form does not send details to email or a customer list, request a callback or book a consultation. Entries stay in this page and are cleared when you leave or reset.</p></section>
 <section className="nv-form-panel" aria-label="Enquiry form">{state === 'success' ? <div className="nv-form-success"><Signal>Demonstration complete</Signal><h2 ref={successRef} tabIndex={-1}>Your enquiry preview is complete.</h2><p>No message has been sent and no callback has been booked. A live form could pass these details to a team member once connected.</p><button className="nx-button" onClick={() => { setForm({ ...emptyForm }); setState('idle'); requestAnimationFrame(() => document.getElementById('fullName')?.focus()); }}>Start a new preview <span aria-hidden="true">→</span></button></div> : <form ref={formRef} onSubmit={submit} noValidate aria-busy={state === 'loading'}><div className="nv-form-header"><h2>Preview your enquiry.</h2><Signal>Preview mode</Signal></div><div className="nx-form-progress" aria-hidden="true"><span style={{ width: ready.filter(Boolean).length * 25 + '%' }} /></div><div className="nv-form-grid">
 {(['fullName', 'workEmail', 'company'] as const).map(key => <div className={'nv-field' + (key === 'company' ? ' nv-field-wide' : '')} key={key}><label htmlFor={key}>{fieldLabels[key]} *</label><input {...attrs(key)} type={key === 'workEmail' ? 'email' : 'text'} autoComplete={key === 'fullName' ? 'name' : key === 'workEmail' ? 'email' : 'organization'} maxLength={key === 'workEmail' ? 254 : 150} value={form[key]} onChange={e => update(key, e.target.value)} placeholder={key === 'fullName' ? 'Your name' : key === 'workEmail' ? 'you@company.com' : 'Company name'} />{error(key)}</div>)}
 <div className="nv-field nv-field-wide"><label htmlFor="businessType">Business type *</label><select {...attrs('businessType')} value={form.businessType} onChange={e => update('businessType', e.target.value)}><option value="">Select a business type</option>{sectors.map(sector => <option key={sector.name}>{sector.name}</option>)}</select>{error('businessType')}</div>
 <div className="nv-field nv-field-wide"><label htmlFor="challenge">What is taking too much time *</label><textarea {...attrs('challenge')} value={form.challenge} maxLength={4000} onChange={e => update('challenge', e.target.value)} rows={4} placeholder="What does your team keep receiving, copying, checking or chasing?" />{error('challenge')}</div></div>
 <div className="nv-consent"><input {...attrs('consent')} type="checkbox" checked={form.consent} onChange={e => update('consent', e.target.checked)} /><label htmlFor="consent">I consent to my details being used in this local enquiry preview and understand that nothing is sent. See <Link to="/privacy">Privacy</Link>. *</label></div>{error('consent')}
 <button className="nx-button" type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Preparing your preview…' : 'Preview my enquiry'}<span aria-hidden="true">→</span></button>
 <p className="nx-form-status" role="status">{state === 'loading' ? 'Checking the demonstration. No message is being sent.' : ''}</p>
 {state === 'error' && <p ref={errorRef} tabIndex={-1} className="nv-field-error" role="alert">{submissionError}</p>}
 <p className="nv-form-note">* Required fields · No live submission connection</p></form>}</section></div></SystemPage>;
}


