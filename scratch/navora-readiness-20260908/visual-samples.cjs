const fs=require('fs'),path=require('path');
const {chromium}=require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
for(const [name,viewport,mode,route] of [
 ['mobile-home-final',{width:390,height:844},'normal','/'],['mobile-solutions-final',{width:390,height:844},'normal','/solutions'],
 ['desktop-no-webgl',{width:1440,height:1000},'no-webgl','/'],['desktop-model-failure',{width:1440,height:1000},'model-failure','/'],['desktop-scene-failure',{width:1440,height:1000},'scene-failure','/'],
 ['mobile-no-webgl-final',{width:390,height:844},'no-webgl','/'],['mobile-model-failure-final',{width:390,height:844},'model-failure','/'],['mobile-scene-failure',{width:390,height:844},'scene-failure','/']]){
 const context=await browser.newContext({viewport,isMobile:viewport.width===390});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 if(mode==='no-webgl')await page.addInitScript(()=>{const orig=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,...a){return t.includes('webgl')?null:orig.call(this,t,...a);};});
 if(mode==='model-failure')await page.route('**/models/robot-guide.glb',r=>r.abort());
 if(mode==='scene-failure')await page.route('**/*.hdr',r=>r.abort());
 await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle'});await page.waitForTimeout(1600);await page.screenshot({path:path.join(__dirname,name+'.png')});
 const data=await page.evaluate(()=>({title:document.title,textLength:document.body.innerText.length,canvas:document.querySelectorAll('canvas').length,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,innerWidth,visualWidth:visualViewport.width,favicon:document.querySelector('link[rel="icon"]').href}));
 if(viewport.width===390){await page.getByRole('button',{name:'Toggle navigation'}).click();await page.locator('a[href="/contact"]').filter({visible:true}).first().click();}else await page.locator('nav a[href="/contact"]').first().click();await page.waitForURL('**/contact');
 results.push({name,...data,navigation:page.url(),errors});console.log(JSON.stringify(results.at(-1)));await context.close();
}
const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});const sections=page.locator('[data-scroll-zone]');const shots=[];
for(let i=0;i<await sections.count();i++){await sections.nth(i).scrollIntoViewIfNeeded();await page.waitForTimeout(1000);const screenshot=await page.screenshot({path:path.join(__dirname,'desktop-zone-'+i+'.png')});shots.push({i,src:screenshot.toString('base64')});}
await sections.first().scrollIntoViewIfNeeded();await page.waitForTimeout(1000);results.push({scrollReturnedToStart:await page.evaluate(()=>window.scrollY),zones:shots.length});
const sheet=await context.newPage();await sheet.setViewportSize({width:1440,height:1050});await sheet.setContent('<html><body style="margin:0;background:#ddd;display:grid;grid-template-columns:repeat(3,480px)">'+shots.map(x=>'<div><div style="height:22px">Homepage zone '+x.i+'</div><img style="display:block;width:480px" src="data:image/png;base64,'+x.src+'"></div>').join('')+'</body></html>');await sheet.screenshot({path:path.join(__dirname,'homepage-scroll-review.png'),fullPage:true});
fs.writeFileSync(path.join(__dirname,'additional-browser-results.json'),JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
