const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const [device, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport, isMobile: device === 'mobile' });
    await page.goto('http://127.0.0.1:3006/industries', { waitUntil: 'networkidle' });
    for (const [name, selector] of [['hero', '.ni-hero'], ['common', '.ni-common'], ['ending', '.ni-ending']]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      await page.screenshot({ path: `scratch/navora-industries-redesign/section-${device}-${name}.png` });
    }
    await page.locator('.ni-ending a').click();
    if (new URL(page.url()).pathname !== '/contact') throw new Error(`${device}: ending link missed /contact`);
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
