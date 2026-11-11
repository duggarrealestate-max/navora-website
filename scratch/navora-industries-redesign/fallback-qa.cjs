const fs = require('fs');
const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--disable-webgl', '--disable-software-rasterizer'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:3006/industries', { waitUntil: 'networkidle' });
  await page.locator('.ni-chapter').nth(2).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const result = { fallback: await page.locator('.ni-robot-fallback').count(), heading: await page.locator('.ni-chapter').nth(2).locator('h2').textContent(), panels: await page.locator('.ni-mobile-scene[data-active=true] .ni-mobile-request,.ni-mobile-scene[data-active=true] .ni-mobile-work').count(), width: await page.evaluate(() => document.documentElement.scrollWidth), errors };
  await page.screenshot({ path: 'scratch/navora-industries-redesign/webgl-fallback.png' });
  fs.writeFileSync('scratch/navora-industries-redesign/webgl-fallback.json', JSON.stringify(result, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
