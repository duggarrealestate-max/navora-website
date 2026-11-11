const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const [device, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport, isMobile: device === 'mobile' });
    await page.goto('http://127.0.0.1:3006/industries', { waitUntil: 'networkidle' });
    for (const [name, index, progress] of [['opening', 0, .1], ['middle', 3, .5], ['ending', 7, .9]]) {
      const location = await page.locator('.ni-chapter').nth(index).evaluate(el => { const r = el.getBoundingClientRect(); return { top: r.top + scrollY, height: r.height }; });
      const start = location.top - viewport.height * .6;
      const end = location.top + location.height - viewport.height * .6;
      await page.evaluate(y => scrollTo(0, y), start + (end - start) * progress);
      await page.waitForTimeout(750);
      await page.screenshot({ path: `scratch/navora-industries-redesign/final-stage-${device}-${name}.png` });
    }
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
