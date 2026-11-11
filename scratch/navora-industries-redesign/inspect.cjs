const fs = require('fs');
const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const root = 'scratch/navora-industries-redesign';
const phase = process.argv[2] || 'before';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  for (const [device, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport, isMobile: device === 'mobile' });
    for (const [name, route] of [['home', '/'], ['solutions', '/solutions'], ['industries', '/industries']]) {
      await page.goto('http://127.0.0.1:3006' + route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${root}/${phase}-${device}-${name}.png` });
      const data = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const s = h1 && getComputedStyle(h1);
        return { h1: h1?.textContent, font: s?.fontFamily, size: s?.fontSize, color: s?.color, body: getComputedStyle(document.body).backgroundColor, width: document.documentElement.scrollWidth, canvas: document.querySelectorAll('canvas').length };
      });
      results.push({ device, name, ...data });
      if (name === 'industries') await page.screenshot({ path: `${root}/${phase}-${device}-industries-full.png`, fullPage: true });
    }
    await page.close();
  }
  fs.writeFileSync(`${root}/${phase}-inspection.json`, JSON.stringify(results, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
