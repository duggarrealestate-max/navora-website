const {chromium}=require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:390,height:844}});
p.on('pageerror',e=>console.log('ERROR '+e.stack));p.on('console',m=>{if(m.type()==='error')console.log(m.text())});
await p.goto('http://127.0.0.1:3004/how-it-works',{waitUntil:'networkidle'});await p.waitForTimeout(1000);console.log('stages '+await p.locator('.nx-journey-step').count());console.log((await p.locator('body').innerText()).slice(0,1500));await p.screenshot({path:'scratch/navora-subpages/how-diagnostic.png'});await b.close()})()
