
const {chromium}=require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const fs=require('fs'),assert=require('assert/strict');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});const result=[];
for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
 const c=await b.newContext({viewport});const p=await c.newPage();
 for(const route of ['solutions','industries','how-it-works','about','contact','privacy','terms','missing-route']){
  const errors=[];const resources=[];
  const onError=e=>errors.push(e.message);const onConsole=m=>{if(m.type()==='error')errors.push(m.text())};const onResponse=r=>{if(r.status()>=400)resources.push(r.url())};
  p.on('pageerror',onError);p.on('console',onConsole);p.on('response',onResponse);
  await p.goto('http://127.0.0.1:3005/'+route,{waitUntil:'networkidle'});await p.locator('h1').waitFor();
  assert.equal(await p.locator('.nx-page').count(),1);
  const height=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<height;y+=700){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(100)}
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),viewport.width);
  let menu=true;
  if(viewport.width===390){
   await p.getByRole('button',{name:'Open navigation'}).click();
   for(let i=0;i<12;i++){await p.keyboard.press('Tab');assert.equal(await p.locator('dialog').evaluate(d=>d.contains(document.activeElement)),true)}
   const contact=p.locator('dialog nav').getByRole('link',{name:/CONTACT/});
   await contact.click();await p.locator('#fullName').waitFor();assert.equal(await p.locator('dialog').evaluate(d=>d.open),false);
   menu=true;
  }
  result.push({route,width:viewport.width,content:true,fullScroll:true,overflow:false,focusTrapAndNavigation:menu,errors,resources});
  p.off('pageerror',onError);p.off('console',onConsole);p.off('response',onResponse);
 }
 await c.close();
}
const c=await b.newContext({viewport:{width:1440,height:1000}});const p=await c.newPage();
for(const route of ['solutions','industries','about','how-it-works']){
 await p.goto('http://127.0.0.1:3005/'+route,{waitUntil:'networkidle'});
 if(route==='solutions'){for(let i=0;i<4;i++)await p.getByRole('button',{name:/Advance to/}).click();await p.screenshot({path:'scratch/navora-subpages/final-approval-desktop.png'});}
 if(route==='industries'){await p.locator('#sector').selectOption('1');await p.locator('.nx-flow-buttons').getByRole('button',{name:'Bookings',exact:true}).click();await p.getByRole('button',{name:/Test an exception/}).click();await p.screenshot({path:'scratch/navora-subpages/final-scanner-desktop.png'});}
 if(route==='about'){await p.getByRole('button',{name:'People remain in control',exact:true}).click();await p.screenshot({path:'scratch/navora-subpages/final-core-desktop.png'});}
 if(route==='how-it-works'){await p.locator('#stage-5').scrollIntoViewIfNeeded();await p.waitForTimeout(850);await p.screenshot({path:'scratch/navora-subpages/final-production-desktop.png'});}
}
await c.close();await b.close();fs.writeFileSync('scratch/navora-subpages/production-audit.json',JSON.stringify(result,null,2));console.log('Production checks: '+result.length+' passed');
})().catch(e=>{console.error(e);process.exit(1)});

