const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const [device, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport, isMobile: device === 'mobile' });
    await page.goto('http://127.0.0.1:3004/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `scratch/navora-copy-qa/${device}-home-final.png` });
    console.log(device, await page.locator('h1').evaluate(e => ({ scrollWidth: e.scrollWidth, clientWidth: e.clientWidth, rect: e.getBoundingClientRect().toJSON() })));
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  await page.goto('http://127.0.0.1:3004/solutions', { waitUntil: 'networkidle' });
  const first = await page.locator('.ct-panel-status').textContent();
  await page.waitForTimeout(4000);
  const second = await page.locator('.ct-panel-status').textContent();
  console.log('solutions cycle', { first, second, advanced: first !== second });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
