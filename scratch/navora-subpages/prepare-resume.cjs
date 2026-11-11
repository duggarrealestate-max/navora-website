const fs=require('fs');
let s=fs.readFileSync('scratch/navora-subpages/interaction-audit.cjs','utf8');
s=s.replace('const out={};','const out=JSON.parse(fs.readFileSync("scratch/navora-subpages/interaction-audit-failure.json","utf8")).partial;');
s=s.replace("[['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]","[['mobile',{width:390,height:844}]]");
s=s.replace("await p.goto(base+'/how-it-works',{waitUntil:'networkidle'});","console.log(device+' scenarios, scanner and principles passed');\n  await p.goto(base+'/how-it-works',{waitUntil:'networkidle'});\n  await p.locator('#stage-0').waitFor({timeout:60000});");
s=s.replace("await p.goto(base+'/contact',{waitUntil:'networkidle'});","console.log('Testing contact');await p.goto(base+'/contact',{waitUntil:'networkidle'});");
fs.writeFileSync('scratch/navora-subpages/interaction-resume.cjs',s);
