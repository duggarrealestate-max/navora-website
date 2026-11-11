from pathlib import Path
p = Path('src/public/pages/IndustriesPage.tsx')
s = p.read_text(encoding='utf-8')
def change(old, new):
    global s
    assert s.count(old) == 1, (old, s.count(old))
    s = s.replace(old, new)
change('<div className="ni-hero-preview" aria-label="Illustrative enquiry preview">', '<div className="ni-hero-preview" aria-label="Illustrative enquiry preview"><div className="ni-hero-robot"><IndustriesRobot phase={1} activity={0} reduced={reduced} variant="opening" /></div>')
change('<div className="ni-mobile-connection" aria-hidden="true"><i /></div><div className="ni-mobile-work">', '<div className="ni-mobile-connection" aria-hidden="true"><i /></div>{shown.activity === index && <div className="ni-mobile-robot"><IndustriesRobot phase={shown.step} activity={index} reduced={reduced} /></div>}<div className="ni-mobile-packet" aria-hidden="true"><WorkObject kind={activity.object} /></div><div className="ni-mobile-work">')
change('</div></div><dl><div><dt>What happens', '</div><span className="ni-mobile-result">{resultLabels[index]}</span></div><dl><div><dt>What happens')
change('<div className="ni-stage-light" aria-hidden="true" />', '<div className="ni-stage-light" aria-hidden="true" /><div className="ni-stage-robot"><IndustriesRobot phase={shown.step} activity={shown.activity} reduced={reduced} /></div><div className="ni-packet" aria-hidden="true"><WorkObject kind={current.object} /></div>')
change('<span className="ni-panel-status">', '<span className="ni-panel-status">')
change('</div></div><div className="ni-stage-foot">', '</div><div className="ni-stage-outcome">{resultLabels[shown.activity]}</div></div><div className="ni-stage-foot">')
change('<section className="ni-ending ni-wrap"><div>', '<section className="ni-ending ni-wrap"><div className="ni-ending-copy">')
change('</p></div><Link to="/contact">', '</p><div className="ni-ending-results" aria-label="Work brought together">{resultLabels.slice(0, 6).map(label => <span key={label}><i aria-hidden="true" />{label}</span>)}</div></div><div className="ni-ending-robot"><IndustriesRobot phase={4} activity={7} reduced={reduced} variant="ending" /></div><Link to="/contact">')
p.write_text(s, encoding='utf-8')
