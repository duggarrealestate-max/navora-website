const fs=require('fs'),crypto=require('crypto');
const baseline=JSON.parse(fs.readFileSync('scratch/navora-subpages/baseline.json','utf8'));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]);
const changed=Object.keys(baseline).filter(p=>!fs.existsSync(p)||hash(p)!==baseline[p]);
const added=walk('src').filter(p=>!baseline[p]);
const protectedChanged=changed.filter(p=>!/^src\/public\/pages\/(Solutions|Industries|HowItWorks|About|Contact|Privacy|Terms|NotFound)Page.tsx$/.test(p));
const result={changed,added,protectedChanged,homepageAndSharedShellUnchanged:protectedChanged.length===0};
fs.writeFileSync('scratch/navora-subpages/source-audit.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
