
const {chromium}=require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const fs=require('fs');const assert=require('assert/strict');
const out={};const base='http://127.0.0.1:3004';
async function fill(p){
 await p.getByLabel('Full name',{exact:false}).fill('Test Reviewer');
 await p.getByLabel('Work email',{exact:false}).fill('reviewer@example.com');
 await p.getByLabel('Company',{exact:false}).fill('Example Company');
 await p.locator('#businessType').selectOption({index:1});
 await p.locator('#challenge').fill('Repeated order information needs to be checked by our team.');
 await p.locator('#consent').check();
}
(async()=>{
 const b=await chromium.launch({channel:'chrome',headless:true});
 for(const [device,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const c=await b.newContext({viewport});const p=await c.newPage();const errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/solutions',{waitUntil:'networkidle'});
  for(let i=0;i<8;i++){
   await p.locator('#scenario').selectOption(String(i));
   for(let stage=1;stage<=4;stage++)await p.getByRole('button',{name:/Advance to/}).click();
   assert.match(await p.locator('.nx-map-node[aria-current]').innerText(),/Human approval/);
   await p.getByRole('button',{name:/Approve example action/}).click();
   assert.match(await p.locator('.nx-stage-detail').innerText(),/Work completed/);
   await p.getByRole('button',{name:/Replay/}).click();
   for(let stage=1;stage<=4;stage++)await p.getByRole('button',{name:/Advance to/}).click();
   await p.getByRole('button',{name:/Escalate to a person/}).click();
   assert.match(await p.locator('.nx-stage-detail').innerText(),/no customer commitment/);
  }
  for(let i=0;i<4;i++){await p.locator('.nx-category-tabs button').nth(i).focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.nx-category-tabs button').nth(i).getAttribute('aria-pressed'),'true')}
  await p.goto(base+'/industries',{waitUntil:'networkidle'});
  const configs=new Set();
  for(let f=0;f<9;f++){await p.locator('.nx-flow-buttons button').nth(f).click();for(let s=0;s<10;s++){await p.locator('#sector').selectOption(String(s));configs.add(await p.locator('.nx-scan-layout').innerText());assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),viewport.width)}}
  assert.equal(configs.size,90);
  await p.getByRole('button',{name:/Test an exception/}).focus();await p.keyboard.press('Space');
  assert.match(await p.locator('.nx-scanner-result').innerText(),/EXCEPTION DETECTED/);
  await p.getByRole('button',{name:/Restore approved/}).click();
  await p.goto(base+'/about',{waitUntil:'networkidle'});
  for(let i=0;i<6;i++){await p.locator('.nx-principle-node').nth(i).focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.nx-principle-node').nth(i).getAttribute('aria-pressed'),'true')}
  await p.goto(base+'/how-it-works',{waitUntil:'networkidle'});
  const visited=[];
  for(let i=0;i<7;i++){await p.locator('#stage-'+i).scrollIntoViewIfNeeded();await p.waitForTimeout(250);visited.push(await p.locator('.nx-journey-links a[aria-current]').innerText());}
  assert.equal(new Set(visited).size,7);
  await p.goto(base+'/contact',{waitUntil:'networkidle'});
  await p.getByRole('button',{name:'Preview discovery request'}).click();
  assert.equal(await p.locator('.nv-field-error').count(),6);
  assert.equal(await p.locator('#fullName').evaluate(e=>e===document.activeElement),true);
  await fill(p);
  await p.locator('#workEmail').fill('invalid-email');
  await p.getByRole('button',{name:'Preview discovery request'}).click();
  assert.match(await p.locator('#workEmail-error').innerText(),/valid email/);
  await p.locator('#workEmail').fill('reviewer@example.com');
  assert.equal(await p.locator('.nx-init-terminal .is-ready').count(),5);
  await p.getByRole('button',{name:'Preview discovery request'}).click();
  assert.equal(await p.locator('form').getAttribute('aria-busy'),'true');
  assert.equal(await p.locator('#fullName').isDisabled(),true);
  await p.getByRole('heading',{name:'Your discovery request preview is complete.'}).waitFor();
  assert.equal(await p.locator('.nv-form-success h2').evaluate(e=>e===document.activeElement),true);
  assert.match(await p.locator('.nv-form-success').innerText(),/No message has been sent/);
  await p.screenshot({path:'scratch/navora-subpages/'+device+'-form-success.png',fullPage:true});
  await p.getByRole('button',{name:/Start a new preview/}).click();
  assert.equal(await p.locator('#fullName').inputValue(),'');
  await c.close();out[device]={scenarios:8,approvalPaths:8,escalationPaths:8,scannerConfigurations:configs.size,principles:6,productionStages:visited,form:'empty, invalid, loading, success, reset passed',errors};
 }
 for(const mode of ['response-error','exception']){
  const c=await b.newContext({viewport:{width:390,height:844}});const p=await c.newPage();
  await p.route('**/src/public/services/enquiry.ts*',route=>route.fulfill({contentType:'application/javascript',body:mode==='response-error'?'export async function submitEnquiry(){return {ok:false,message:"Test adapter failure. Your entries are retained."}}':'export async function submitEnquiry(){throw new Error("Test adapter exception")}'}));
  await p.goto(base+'/contact',{waitUntil:'networkidle'});await fill(p);
  await p.getByRole('button',{name:'Preview discovery request'}).click();
  await p.locator('form [role=alert]').waitFor();
  assert.equal(await p.locator('form [role=alert]').evaluate(e=>e===document.activeElement),true);
  assert.equal(await p.locator('#company').inputValue(),'Example Company');
  assert.equal(await p.getByRole('button',{name:'Preview discovery request'}).isEnabled(),true);
  out[mode]={retained:true,focused:true,retryEnabled:true};
  await p.screenshot({path:'scratch/navora-subpages/form-'+mode+'.png',fullPage:true});
  await c.close();
 }
 out.reduced=[];
 const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await c.newPage();
 for(const route of ['solutions','industries','how-it-works','about','contact','privacy','terms','missing-route']){
  await p.goto(base+'/'+route,{waitUntil:'networkidle'});
  const active=await p.evaluate(()=>[...document.querySelectorAll('.nx-page *')].filter(e=>getComputedStyle(e).animationName!=='none').map(e=>e.className));
  assert.deepEqual(active,[]);assert.equal(await p.locator('h1').isVisible(),true);
  await p.getByRole('button',{name:'Open navigation'}).click();await p.keyboard.press('Escape');
  out.reduced.push({route,activeAnimations:active.length});
 }
 await c.close();
 out.protected=[];
 const pc=await b.newContext({viewport:{width:1440,height:1000}});const pp=await pc.newPage();
 for(const route of ['command-centre','retailer','discovery']){
  const errors=[];pp.on('pageerror',e=>errors.push(e.message));
  await pp.goto(base+'/'+route,{waitUntil:'networkidle'});
  assert.ok((await pp.locator('body').innerText()).length>300);
  const buttons=pp.getByRole('button');let target=null;
  for(let i=0;i<Math.min(await buttons.count(),15);i++){if(await buttons.nth(i).isVisible()&&await buttons.nth(i).isEnabled()){target=buttons.nth(i);break}}
  const clicked=target?await target.innerText():null;if(target)await target.click();
  await pp.screenshot({path:'scratch/navora-subpages/protected-'+route+'.png'});
  out.protected.push({route,title:await pp.locator('h1').allTextContents(),clicked,errors});
 }
 await pp.goto(base+'/',{waitUntil:'networkidle'});assert.equal(await pp.locator('[data-scroll-zone]').count(),7);
 out.home={zones:await pp.locator('[data-scroll-zone]').count(),canvas:await pp.locator('canvas').count()};
 await pp.getByRole('link',{name:'SOLUTIONS',exact:true}).first().click();await pp.locator('.nx-page').waitFor();
 await pp.getByRole('link',{name:'HOME',exact:true}).first().click();await pp.locator('[data-scroll-zone]').first().waitFor();
 assert.equal(await pp.locator('.nx-page').count(),0);
 out.home.returnNavigation=true;
 await pc.close();await b.close();
 fs.writeFileSync('scratch/navora-subpages/interaction-audit.json',JSON.stringify(out,null,2));
 console.log(JSON.stringify(out));
})().catch(e=>{fs.writeFileSync('scratch/navora-subpages/interaction-audit-failure.json',JSON.stringify({error:e.stack,partial:out},null,2));console.error(e);process.exit(1)});


