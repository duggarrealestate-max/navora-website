const fs=require('fs');const p='src/public/pages/HowItWorksPage.tsx';
let s=fs.readFileSync(p,'utf8').replace("import { motion } from 'framer-motion';","import { motion, useReducedMotion } from 'framer-motion';");
s=s.replace('const [active, setActive] = useState(0);','const [active, setActive] = useState(0);\n const reduced = useReducedMotion();');
s=s.replace('<div className="nx-rail-marker" aria-hidden="true">{String(i + 1).padStart(2, \'0\')}</div>','<div className="nx-rail-marker" aria-hidden="true">{active === i && <motion.span className="nx-production-signal" layoutId="production-signal" transition={{ duration: reduced ? 0 : .7, ease: "easeInOut" }} />}{String(i + 1).padStart(2, \'0\')}</div>');
fs.writeFileSync(p,s);
