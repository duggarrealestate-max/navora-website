from pathlib import Path
p = Path('src/public/pages/IndustriesPage.tsx')
s = p.read_text(encoding='utf-8')
old = 'aria-label="An automatic journey through everyday business work"><div className="ni-narrative">'
new = 'aria-label="An automatic journey through everyday business work"><div className="ni-journey-beam" aria-hidden="true" /><div className="ni-narrative">'
assert s.count(old) == 1
p.write_text(s.replace(old, new), encoding='utf-8')
