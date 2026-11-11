const {chromium}=require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const b=await chromium.launch({channel:'chrome',headless:true});
 const report=[];
 for(const [device,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const context=await b.newContext({viewport});const page=await context.newPage();
  for(const route of ['solutions','industries','how-it-works','about','contact','privacy','terms','missing-route']){
   const errors=[];const missing=[];
   const onError=e=>errors.push(e.message);const onConsole=m=>{if(m.type()==='error')errors.push(m.text())};const onResponse=r=>{if(r.status()>=400)missing.push(r.url()+' '+r.status())};
   page.on('pageerror',onError);page.on('console',onConsole);page.on('response',onResponse);
   await page.goto('http://127.0.0.1:3004/'+route,{waitUntil:'networkidle'});await page.waitForTimeout(300);
   const height=await page.evaluate(()=>document.documentElement.scrollHeight);
   for(let y=0;y<height;y+=650){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(100)}
   await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(800);
   const overflow=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth,elements:[...document.querySelectorAll('.nx-page *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)&&getComputedStyle(e).position!=='absolute'}).slice(0,8).map(e=>e.className)}));
   await page.screenshot({path:'scratch/navora-subpages/'+device+'-'+route+'.png',fullPage:true});
   let menu=true;
   if(device==='mobile'){
    await page.getByRole('button',{name:'Open navigation'}).click();
    menu=await page.locator('dialog').evaluate(d=>d.open&&d.matches(':modal'));
    await page.keyboard.press('Tab');await page.keyboard.press('Escape');
    menu=menu&&await page.getByRole('button',{name:'Open navigation'}).evaluate(e=>e===document.activeElement);
   }
   report.push({device,route,height,overflow,menu,errors,missing});
   page.off('pageerror',onError);page.off('console',onConsole);page.off('response',onResponse);
  }
  await context.close();
 }
 fs.writeFileSync('scratch/navora-subpages/visual-audit.json',JSON.stringify(report,null,2));
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
