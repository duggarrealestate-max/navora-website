import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IndustriesRobot from './IndustriesRobot';
import '../styles/industries.css';

gsap.registerPlugin(ScrollTrigger);

type Activity = { name: string; object: string; request: string; handling: string; staff: string; result: string; steps: [string, string, string, string, string] };
const activities: Activity[] = [
  { name: 'Enquiries', object: 'message', request: 'Someone contacts your business.', handling: 'Their details are saved and a helpful reply is prepared.', staff: 'The right team member is notified when the request needs a personal answer.', result: 'The follow-up is added, so the enquiry is not forgotten.', steps: ['A customer gets in touch', 'Customer details are saved', 'A helpful reply is prepared', 'Your team is notified', 'The follow-up is added'] },
  { name: 'Bookings', object: 'calendar', request: 'A customer asks for an appointment.', handling: 'Available times are shown and the booking is prepared.', staff: 'Your team checks any change that needs a personal decision.', result: 'The booking is confirmed, the calendar is updated and a reminder is prepared.', steps: ['An appointment is requested', 'Available times are shown', 'A booking is prepared', 'A reminder is prepared', 'The calendar is updated'] },
  { name: 'Quotes', object: 'document', request: 'A quote is waiting for a customer reply.', handling: 'The quote and customer details are kept together and a polite follow-up is prepared.', staff: 'A team member checks any new price or special terms before replying.', result: 'The customer receives a helpful follow-up and the next action is saved.', steps: ['A quote is waiting for a reply', 'Customer details are checked', 'A follow-up is prepared', 'Your team checks if needed', 'The next action is saved'] },
  { name: 'Orders', object: 'parcel', request: 'A regular customer places another order.', handling: 'Their usual details are found and the repeat order is recorded.', staff: 'Your team decides what to do if stock or delivery details are unclear.', result: 'The customer receives an update and everyone can see the order’s progress.', steps: ['A repeat order is placed', 'Usual details are found', 'Your team receives the task', 'The customer gets an update', 'Order progress is visible'] },
  { name: 'Customer updates', object: 'message', request: 'A customer wants to know what happens next.', handling: 'The latest order or booking details are found and an update is prepared.', staff: 'A team member steps in when the answer needs judgement.', result: 'The customer is kept informed and the conversation is saved.', steps: ['A customer asks for an update', 'Current details are checked', 'An answer is prepared', 'Staff review anything uncertain', 'The conversation is saved'] },
  { name: 'Follow-ups', object: 'details', request: 'A customer has not replied to an earlier message.', handling: 'The latest conversation is checked and a relevant follow-up is prepared.', staff: 'Your team checks anything sensitive or needing a new promise.', result: 'The next step is recorded, so nobody has to remember it alone.', steps: ['A follow-up becomes due', 'The latest reply is checked', 'A message is prepared', 'Your team reviews it if needed', 'The next step is recorded'] },
  { name: 'Payments', object: 'payment', request: 'An invoice is nearly due.', handling: 'The payment status is checked and a polite reminder is prepared.', staff: 'Your finance team is alerted if the invoice is disputed or needs help.', result: 'The reminder goes only when appropriate and the record stays up to date.', steps: ['An invoice is nearly due', 'Payment status is checked', 'A reminder is prepared', 'Finance reviews any dispute', 'The record is updated'] },
  { name: 'Reports', object: 'report', request: 'A manager needs to see what is still outstanding.', handling: 'Completed work and tasks needing attention are brought into one clear view.', staff: 'A manager decides which issue to address first.', result: 'The team can see what has been completed and what happens next.', steps: ['Work is recorded', 'Open tasks are gathered', 'Completed work is shown', 'A manager reviews priorities', 'The next action is clear'] },
];
const problems = ['Missed enquiries', 'Slow replies', 'Repeated customer questions', 'Forgotten follow-ups', 'Manual bookings', 'Slow quotations', 'Order-status requests', 'Payment reminders', 'Information kept in different places', 'Staff unsure what happens next'];
const resultLabels = ['Follow-up ready', 'Booking confirmed', 'Quote followed up', 'Order recorded', 'Customer updated', 'Team notified', 'Reminder sent', 'Task completed'];
const businesses = [
  ['Wholesale and manufacturing', 'trade orders and stock updates'], ['Property businesses', 'viewings and buyer enquiries'],
  ['Restaurants and hotels', 'bookings and guest questions'], ['Shops and online stores', 'orders and customer updates'],
  ['Professional services', 'quotes and client follow-ups'], ['Construction and trades', 'site visits and job updates'],
  ['Healthcare administration', 'appointments and routine enquiries'], ['Delivery businesses', 'parcel progress and delivery changes'],
  ['Education and training', 'course enquiries and bookings'], ['Other growing businesses', 'the repeated work taking staff time'],
] as const;

function WorkObject({ kind }: { kind: string }) {
  return <div className={`ni-object ni-object-${kind}`} aria-hidden="true"><span className="ni-object-mark" /><span className="ni-object-line" /><span className="ni-object-line" /><span className="ni-object-line" /></div>;
}

export default function IndustriesPage() {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState({ activity: 0, step: 0 });
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const current = activities[shown.activity];

  useLayoutEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    const context = gsap.context(() => {
      const travel = (progress: number, activity: number) => {
        if (query.matches || !root.current) return;
        const p = Math.max(0, Math.min(1, progress));
        const entrance = Math.min(1, p / .12);
        const departure = Math.min(1, Math.max(0, (p - .82) / .08));
        const outcomeDeparture = Math.min(1, Math.max(0, (p - .92) / .08));
        const delivery = Math.min(1, Math.max(0, (p - .28) / .24));
        gsap.set('.ni-float-request', { x: (1 - entrance) * 85 - departure * 125, opacity: entrance * (1 - departure) });
        gsap.set('.ni-float-work', { x: (1 - delivery) * 85 + departure * 115, opacity: delivery * (1 - departure) });
        gsap.set('.ni-packet', {
          x: p < .32 ? -130 * p / .32 : p < .7 ? -130 + 205 * (p - .32) / .38 : 75 + 65 * (p - .7) / .3,
          y: p < .32 ? -95 + 105 * p / .32 : p < .7 ? 10 + 125 * (p - .32) / .38 : 135 - 45 * (p - .7) / .3,
          opacity: Math.min(1, p / .08) * (1 - departure), rotation: p < .32 ? -18 + 18 * p / .32 : 9 * (p - .32),
        });
        gsap.set('.ni-stage-robot', { x: 20 - p * 40 + 45 * Math.max(0, 1 - p / .35), y: p < .5 ? 14 - p * 34 : -3 + (p - .5) * 32 });
        gsap.set('.ni-route-beam', { scaleX: Math.min(1, Math.max(0, (p - .18) / .55)), transformOrigin: 'left' });
        gsap.set('.ni-stage-light', { xPercent: -5 + p * 13, scale: 1 + p * .07 });
        gsap.set('.ni-stage-outcome', { x: (1 - Math.min(1, Math.max(0, (p - .7) / .12))) * 35 + outcomeDeparture * 45, opacity: Math.min(1, Math.max(0, (p - .7) / .12)) * (1 - outcomeDeparture) });
        gsap.set('.ni-journey-beam', { scaleY: (activity + p) / activities.length, transformOrigin: 'top' });
        const scene = root.current.querySelector<HTMLElement>(`.ni-chapter[data-activity="${activity}"] .ni-mobile-scene`);
        if (scene) {
          gsap.set(scene.querySelector('.ni-mobile-request'), { x: (1 - entrance) * 35 - departure * 55, opacity: entrance * (1 - departure) });
          gsap.set(scene.querySelector('.ni-mobile-work'), { x: (1 - delivery) * 35 + departure * 55, opacity: delivery * (1 - departure) });
          gsap.set(scene.querySelector('.ni-mobile-packet'), { x: -25 + p * 76, y: -35 + p * 80, opacity: Math.min(1, p / .08) * (1 - departure) });
          gsap.set(scene.querySelector('.ni-mobile-robot'), { x: p * 12, y: p < .5 ? 8 - p * 22 : -3 + (p - .5) * 18 });
          gsap.set(scene.querySelector('.ni-mobile-result'), { opacity: Math.min(1, Math.max(0, (p - .7) / .12)) * (1 - outcomeDeparture), x: (1 - Math.min(1, Math.max(0, (p - .7) / .12))) * 25 });
        }
      };
      gsap.utils.toArray<HTMLElement>('.ni-chapter').forEach((chapter, activity) => {
        ScrollTrigger.create({
          trigger: chapter, start: 'top 60%', end: 'bottom 60%',
          onUpdate: self => {
            const step = Math.min(4, Math.floor(self.progress * 5));
            setShown(previous => previous.activity === activity && previous.step === step ? previous : { activity, step });
            travel(self.progress, activity);
          },
          onEnter: () => { setShown({ activity, step: 0 }); travel(0, activity); },
          onEnterBack: () => { setShown({ activity, step: 4 }); travel(1, activity); },
        });
      });
      if (!query.matches) {
        gsap.timeline({ defaults: { ease: 'power2.out' } })
          .fromTo('.ni-hero-robot', { opacity: 0, x: 70, y: 30 }, { opacity: 1, x: 0, y: 0, duration: .8 })
          .fromTo('.ni-preview-message', { opacity: 0, x: -70, rotation: -8 }, { opacity: 1, x: 0, rotation: -2, duration: .65 }, .15)
          .fromTo('.ni-preview-connection i', { y: -55, opacity: 0 }, { y: 0, opacity: 1, duration: .75 }, .6)
          .fromTo('.ni-preview-action', { opacity: 0, x: 70, rotation: 8 }, { opacity: 1, x: 0, rotation: 2, duration: .7 }, .9);
        gsap.timeline({ defaults: { ease: 'power2.out' } })
          .fromTo('.ni-ambient-task-one', { opacity: 0, x: 45 }, { opacity: 1, x: 0, duration: .5 })
          .fromTo('.ni-ambient-task-two', { opacity: 0, x: 55 }, { opacity: 1, x: 0, duration: .5 }, .25)
          .to('.ni-ambient-task', { opacity: 0, x: -35, duration: .7, stagger: .12 }, 1.2);
        gsap.fromTo('.ni-common-bridge i', { x: 250, opacity: 0 }, { x: -210, opacity: 1, stagger: .1, scrollTrigger: { trigger: '.ni-common', start: 'top 93%', end: 'top 20%', scrub: .6 } });
        gsap.fromTo('.ni-ending-results span', { x: -55 }, { x: 0, stagger: .08, ease: 'power2.out', scrollTrigger: { trigger: '.ni-ending', start: 'top 82%', end: 'bottom 55%', scrub: .6 } });
        gsap.fromTo('.ni-ending-robot', { x: -75, y: 20, opacity: 0 }, { x: 0, y: 0, opacity: 1, scrollTrigger: { trigger: '.ni-ending', start: 'top 82%', end: 'top 48%', scrub: .6 } });
      }
    }, root);
    return () => { context.revert(); query.removeEventListener('change', change); };
  }, []);

  return <div className="ni-page" ref={root}>
    <header className="ni-hero ni-wrap"><div className="ni-hero-copy"><p className="ni-small">NAVORA / EVERYDAY WORK</p><h1>Whatever your business, we make everyday work easier.</h1><p className="ni-hero-lede">We help you manage enquiries, bookings, orders, follow-ups and customer updates—so less work is missed and your team has more time for customers.</p><a href="#journey" className="ni-scroll-link">See the work move <span aria-hidden="true">↓</span></a></div><div className="ni-hero-preview" aria-label="Illustrative enquiry preview"><div className="ni-hero-robot"><IndustriesRobot phase={1} activity={0} reduced={reduced} variant="opening" /></div><span className="ni-ambient-task ni-ambient-task-one">Booking to confirm</span><span className="ni-ambient-task ni-ambient-task-two">Quote needs a reply</span><div className="ni-preview-message"><span>New customer message</span><strong>Can you help with my request?</strong></div><div className="ni-preview-connection" aria-hidden="true"><i /></div><div className="ni-preview-action"><span>Next step prepared</span><strong>Details saved. Your team knows what to do.</strong></div></div></header>

    <section className="ni-journey ni-wrap" id="journey" aria-label="An automatic journey through everyday business work"><div className="ni-journey-beam" aria-hidden="true" /><div className="ni-narrative"><div className="ni-journey-intro"><p className="ni-small">ONE WORKING DAY / MANY USEFUL TASKS</p><h2>From the first message to the next clear step.</h2><p>Scroll to see common work move through a business. These are examples of what NAVORA could help organise, not client results.</p></div>{activities.map((activity, index) => <article className="ni-chapter" key={activity.name} data-activity={index} aria-label={activity.name}><div className="ni-chapter-inner"><span className="ni-chapter-number">{String(index + 1).padStart(2, '0')} / 08</span><h2>{activity.name}</h2><div className="ni-mobile-scene" aria-label={`${activity.name} example in progress`} data-active={shown.activity === index}><div className="ni-mobile-request"><WorkObject kind={activity.object} /><div><small>What arrived</small><p>{activity.request}</p></div></div><div className="ni-mobile-connection" aria-hidden="true"><i /></div>{shown.activity === index && <div className="ni-mobile-robot"><IndustriesRobot phase={shown.step} activity={index} reduced={reduced} /></div>}<div className="ni-mobile-packet" aria-hidden="true"><WorkObject kind={activity.object} /></div><div className="ni-mobile-work"><small>{shown.activity === index && shown.step === 3 ? 'Your team checks when needed' : shown.activity === index && shown.step === 4 ? 'Result saved' : 'NAVORA prepares the work'}</small><p>{shown.activity === index && shown.step === 0 ? ('Next: ' + activity.steps[1]) : activity.steps[shown.activity === index ? shown.step : 0]}</p></div><span className="ni-mobile-result">{resultLabels[index]}</span></div><dl><div><dt>What happens</dt><dd>{activity.request}</dd></div><div><dt>What NAVORA handles</dt><dd>{activity.handling}</dd></div><div><dt>When staff step in</dt><dd>{activity.staff}</dd></div><div><dt>The result</dt><dd>{activity.result}</dd></div></dl><div className="ni-step-list" aria-label={`${activity.name} steps`}>{activity.steps.map((step, i) => <span key={step} className={shown.activity === index && shown.step === i ? 'is-current' : ''}>{step}</span>)}</div></div></article>)}</div>
      <aside className="ni-stage" aria-label="Illustrative work in progress" aria-live="polite"><div className="ni-stage-light" aria-hidden="true" /><div className="ni-stage-robot"><IndustriesRobot phase={shown.step} activity={shown.activity} reduced={reduced} /></div><div className="ni-packet" aria-hidden="true"><WorkObject kind={current.object} /></div><div className="ni-stage-head"><span>NAVORA / WORK IN PROGRESS</span><span>{String(shown.activity + 1).padStart(2, '0')} / 08</span></div><div className="ni-stage-title"><span>{current.name}</span><strong>{current.steps[shown.step]}</strong></div><div className="ni-workspace"><div className="ni-float ni-float-request"><WorkObject kind={current.object} /><div><small>What arrived</small><p>{current.request}</p></div></div><div className="ni-route"><span className="ni-route-beam" /><i aria-hidden="true" /></div><div className="ni-float ni-float-work"><small>{shown.step < 3 ? 'NAVORA prepares the work' : shown.step === 3 ? 'Your team checks when needed' : 'Result saved'}</small><p className="ni-current-step">{shown.step === 0 ? ('Next: ' + current.steps[1]) : current.steps[shown.step]}</p><span className="ni-panel-status">{shown.step === 4 ? 'Completed in this example' : shown.step === 3 ? 'Staff involved where needed' : 'Next step in progress'}</span></div><div className="ni-stage-outcome">{resultLabels[shown.activity]}</div></div><div className="ni-stage-foot"><span>Illustrative journey</span><div className="ni-progress" aria-hidden="true">{activities.map((item, i) => <i key={item.name} className={i === shown.activity ? 'is-active' : ''} />)}</div><span>No live actions</span></div></aside>
    </section>

    <section className="ni-common ni-wrap"><div className="ni-common-bridge" aria-hidden="true"><i /><i /><i /></div><div className="ni-common-intro"><p className="ni-small">THE WORK YOU RECOGNISE</p><h2>Different businesses. Similar problems.</h2><p>Every business works differently, but many lose time answering the same questions, chasing updates, copying information and remembering follow-ups. NAVORA helps keep that work organised.</p></div><div className="ni-common-problems" aria-label="Common problems">{problems.map(problem => <span key={problem}>{problem}</span>)}</div><div className="ni-business-lines"><p>For example, this work can show up in:</p><ul>{businesses.map(([name, example]) => <li key={name}><strong>{name}</strong><span>{example}</span></li>)}</ul></div></section>

    <section className="ni-ending ni-wrap"><div className="ni-ending-copy"><h2>Show us what takes too much time.</h2><p>Tell us how your business works. We’ll help you find the best place to begin.</p><div className="ni-ending-results" aria-label="Work brought together">{resultLabels.slice(0, 6).map(label => <span key={label}><i aria-hidden="true" />{label}</span>)}</div></div><div className="ni-ending-robot"><IndustriesRobot phase={4} activity={7} reduced={reduced} variant="ending" /></div><Link to="/contact">Tell us about your business <span aria-hidden="true">↗</span></Link></section>
  </div>;
}
