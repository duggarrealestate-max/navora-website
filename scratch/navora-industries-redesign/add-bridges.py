from pathlib import Path
p = Path('src/public/pages/IndustriesPage.tsx')
s = p.read_text(encoding='utf-8')
def change(old, new):
    global s
    assert s.count(old) == 1, (old, s.count(old))
    s = s.replace(old, new)
change('<div className="ni-hero-robot"><IndustriesRobot phase={1} activity={0} reduced={reduced} variant="opening" /></div>', '<div className="ni-hero-robot"><IndustriesRobot phase={1} activity={0} reduced={reduced} variant="opening" /></div><span className="ni-ambient-task ni-ambient-task-one">Booking to confirm</span><span className="ni-ambient-task ni-ambient-task-two">Quote needs a reply</span>')
change('<section className="ni-common ni-wrap"><div className="ni-common-intro">', '<section className="ni-common ni-wrap"><div className="ni-common-bridge" aria-hidden="true"><i /><i /><i /></div><div className="ni-common-intro">')
p.write_text(s, encoding='utf-8')
