const fs=require('fs');
const {chromium}=require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:1440,height:1000}});
for(const [i,routes] of [['1',['solutions','industries']],['2',['how-it-works','about']],['3',['contact','privacy']],['4',['terms','missing-route']]]){
const cells=routes.flatMap(route=>['desktop','mobile'].map(device=>{const path='scratch/navora-subpages/'+device+'-'+route+'.png';return '<div style="width:'+(device==='desktop'?470:230)+'px"><h3>'+route+' / '+device+'</h3><img style="width:100%" src="data:image/png;base64,'+fs.readFileSync(path).toString('base64')+'"></div>'}));
await p.setContent('<body style="margin:0;background:#222;color:white;font:12px sans-serif;display:flex;align-items:flex-start;gap:10px">'+cells.join('')+'</body>');
await p.screenshot({path:'scratch/navora-subpages/review-sheet-'+i+'.png',fullPage:true});}
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
