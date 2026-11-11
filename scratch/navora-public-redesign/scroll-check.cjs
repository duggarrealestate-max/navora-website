const fs = require('fs');
const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:3002/', { waitUntil: 'networkidle' });
  const zones = await page.locator('[data-scroll-zone]').count();
  for (let i = 0; i < zones; i++) await page.locator('[data-scroll-zone]').nth(i).scrollIntoViewIfNeeded();
  const result = { zones, scrollY: await page.evaluate(() => window.scrollY), centreLogo: await page.locator('main img[src*="navora-logo"]').count(), errors };
  fs.writeFileSync('scratch/navora-public-redesign/scroll-check.json', JSON.stringify(result, null, 2));
  await browser.close();
})();
