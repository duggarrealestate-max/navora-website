const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const root = __dirname;
const routes = ['/', '/solutions', '/industries', '/how-it-works', '/about', '/contact', '/command-centre', '/retailer', '/discovery'];
const results = JSON.parse(fs.readFileSync(path.join(root,'browser-results.json'),'utf8'));
async function inspect(page) {
  return page.evaluate(() => ({
    title: document.title, textLength: document.body.innerText.trim().length,
    headings: [...document.querySelectorAll('h1')].map(e => e.textContent),
    width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
    missingImages: [...document.images].filter(e => e.complete && !e.naturalWidth).map(e => e.src),
    canvasCount: document.querySelectorAll('canvas').length,
    overflow: [...document.querySelectorAll('body *')].filter(e => { const r=e.getBoundingClientRect(); const s=getComputedStyle(e); return r.width>0 && (r.right>innerWidth+1 || r.left < -1) && s.position!=='fixed' && s.display!=='none'; }).slice(0,12).map(e => ({tag:e.tagName,cls:e.className?.baseVal ?? e.className,right:Math.round(e.getBoundingClientRect().right)}))
  }));
}
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  for (const [device, viewport] of [['mobile',{width:390,height:844}]]) {
    const context = await browser.newContext({viewport, isMobile:device==='mobile', deviceScaleFactor:1});
    for (const route of routes) {
      const page = await context.newPage(); const errors=[], warnings=[], failed=[], badResponses=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});
      page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
      page.on('response',r=>{if(r.status()>=400)badResponses.push({url:r.url(),status:r.status()});});
      const response=await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'networkidle',timeout:60000});
      await page.waitForTimeout(1800);
      const initial=await inspect(page);
      const name=device+'-'+(route.slice(1)||'home');
      await page.screenshot({path:path.join(root,name+'.png'),fullPage:true});
      const scrolls=[];
      for(const fraction of [0.3,0.65,1,0]) {
        await page.evaluate(f=>{const main=document.querySelector('main');const el=main&&main.scrollHeight>main.clientHeight+10?main:document.scrollingElement;el.scrollTo(0,(el.scrollHeight-el.clientHeight)*f);},fraction);
        await page.waitForTimeout(400); scrolls.push({fraction,...await inspect(page)});
      }
      if(route==='/') {
        await page.evaluate(()=>window.scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*0.4));await page.waitForTimeout(1000);await page.screenshot({path:path.join(root,device+'-home-scrolled.png')});await page.evaluate(()=>window.scrollTo(0,0));
      }
      let navigation;
      if(!['/command-centre','/retailer','/discovery'].includes(route)) {
        if(device==='mobile') await page.getByRole('button',{name:'Toggle navigation'}).click();
        const target=route==='/solutions'?'/industries':'/solutions';
        await page.locator('a[href="'+target+'"]').filter({visible:true}).first().click();
        await page.waitForURL('**'+target);navigation=page.url();
      } else {
        const target=route==='/command-centre'?'/commerce':route==='/retailer'?'/retailer/catalogue':null;
        if(target){await page.locator('a[href="'+target+'"]').filter({visible:true}).first().click();await page.waitForURL('**'+target);navigation=page.url();}
      }
      const result={device,route,status:response.status(),initial,scrolls,navigation,errors:[...new Set(errors)],warnings:[...new Set(warnings)],failed,badResponses};results.push(result);fs.writeFileSync(path.join(root,'browser-results.json'),JSON.stringify(results,null,2));
      console.log(JSON.stringify({device,route,status:result.status,text:initial.textLength,overflow:initial.scrollWidth>initial.width,errors:result.errors,failed,badResponses,navigation}));
      await page.close();
    }
    await context.close();
  }
  for(const mode of ['no-webgl','model-failure','reduced-motion']){
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:mode==='reduced-motion'?'reduce':'no-preference'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    if(mode==='no-webgl')await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(['webgl','webgl2','experimental-webgl'].includes(type))return null;return original.call(this,type,...args);};});
    if(mode==='model-failure')await page.route('**/models/robot-guide.glb',r=>r.abort());
    await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle',timeout:60000});await page.waitForTimeout(2000);const initial=await inspect(page);await page.screenshot({path:path.join(root,mode+'.png'),fullPage:true});
    await page.getByRole('button',{name:'Toggle navigation'}).click();await page.locator('a[href="/solutions"]').filter({visible:true}).first().click();await page.waitForURL('**/solutions');
    const result={mode,initial,errors:[...new Set(errors)],navigation:page.url()};results.push(result);fs.writeFileSync(path.join(root,'browser-results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(result));await context.close();
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
