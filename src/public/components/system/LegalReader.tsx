import { useEffect, useState } from 'react';
import { SystemPage, SystemIntro, Signal } from './SystemExperience';
interface LegalSection { id: string; title: string; content: string }
export function LegalReader({ title, label, number, intro, sections }: { title: string; label: string; number: string; intro: string; sections: LegalSection[] }) {
 const [active, setActive] = useState(sections[0]?.id ?? '');
 useEffect(() => {
  const observer = new IntersectionObserver(entries => {
   const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
   if (visible[0]) setActive(visible[0].target.id);
  }, { rootMargin: '-100px 0px -45% 0px', threshold: 0 });
  sections.forEach(section => { const element = document.getElementById(section.id); if (element) observer.observe(element); });
  return () => observer.disconnect();
 }, [sections]);
 return <SystemPage quiet><SystemIntro number={number} label={label.toUpperCase() + ' / READING ROOM'} title={title}>{intro}</SystemIntro><div className="nv-container nx-legal-layout"><aside className="nx-legal-index"><Signal>Document / {label}</Signal><nav aria-label="Page contents">{sections.map(section => <a key={section.id} href={'#' + section.id} aria-current={active === section.id ? 'location' : undefined} onClick={() => setActive(section.id)}>{section.title}</a>)}</nav></aside><article className="nx-legal-article"><p className="nx-legal-notice">Website demonstration: the enquiry form prepares a local preview only. It does not deliver a message or start a service agreement. Business contact details and applicable service providers must be confirmed before launch.</p>{sections.map((section, i) => <section id={section.id} key={section.id}><span className="nx-label">SECTION {String(i + 1).padStart(2, '0')}</span><h2>{section.title}</h2><p>{section.content}</p></section>)}</article></div></SystemPage>;
}

