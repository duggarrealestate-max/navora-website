const fs = require('fs');
for (const [page,title,label,number,intro] of [
 ['Privacy','How we handle data','Privacy','06','A readable guide to information used by the NAVORA website and enquiry experience.'],
 ['Terms','Website and service terms','Terms','07','The basis for using this website. Individual projects are agreed separately.']
]) {
 const path = 'src/public/pages/'+page+'Page.tsx';
 let text=fs.readFileSync(path,'utf8');
 text=text.slice(0,text.indexOf('export default function'));
 text=text.replace(/import[^\n]+\n/, "import { LegalReader } from '@public/components/system/LegalReader';\n");
 if(page==='Privacy') text=text.replace('For privacy enquiries, use the contact form on this site. Include the subject "Privacy Enquiry" and we will respond within a reasonable timeframe.', 'The current form is a local demonstration and cannot receive privacy requests. A working privacy contact route must be published before collecting live enquiries.');
 text += 'export default function '+page+'Page(){ return <LegalReader title='+JSON.stringify(title)+' label='+JSON.stringify(label)+' number='+JSON.stringify(number)+' intro='+JSON.stringify(intro)+' sections={sections} />; }\n';
 fs.writeFileSync(path,text);
}
