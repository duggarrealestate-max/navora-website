const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const routes = ['/', '/solutions', '/industries', '/how-it-works', '/about', '/contact', '/privacy', '/terms', '/missing-page', '/command-centre', '/retailer', '/discovery'];
const out = path.join(__dirname, 'navora-copy-qa');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  for (const [device, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, isMobile: device === 'mobile', reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of routes) {
      const name = route === '/' ? 'home' : route.slice(1);
      await page.goto('http://127.0.0.1:3004' + route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(900);
      const data = await page.evaluate(() => {
        const headline = document.querySelector('h1');
        const text = [...document.querySelectorAll('h1,h2,h3,p,button,a')].filter(e => e.getBoundingClientRect().width > 0).map(e => ({ text: (e.textContent || '').trim().slice(0, 100), rect: e.getBoundingClientRect().toJSON(), scrollWidth: e.scrollWidth, clientWidth: e.clientWidth }));
        return { headline: headline?.textContent?.trim(), bodyWidth: document.body.scrollWidth, viewport: innerWidth, textOverflow: text.filter(x => x.clientWidth && x.scrollWidth > x.clientWidth + 3).slice(0, 12), headings: text.filter(x => x.text && x.rect.width && x.text.length < 100).slice(0, 20).map(x => x.text), canvasCount: document.querySelectorAll('canvas').length };
      });
      await page.screenshot({ path: path.join(out, `${device}-${name}.png`), fullPage: true });
      results.push({ route, device, ...data });
    }
    await page.goto('http://127.0.0.1:3004/', { waitUntil: 'networkidle' });
    const zones = await page.locator('[data-scroll-zone]').count();
    for (let i = 0; i < zones; i++) {
      await page.locator('[data-scroll-zone]').nth(i).scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(out, `${device}-home-zone-${i}.png`) });
    }
    results.push({ route: 'home zones', device, zones });
    if (device === 'mobile') {
      await page.goto('http://127.0.0.1:3004/');
      await page.getByRole('button', { name: 'Open navigation' }).click();
      results.push({ route: 'mobile navigation', opened: await page.getByRole('dialog').isVisible() });
      await page.getByRole('dialog').getByRole('link', { name: /SOLUTIONS/ }).click();
      results.push({ route: 'mobile navigation', destination: new URL(page.url()).pathname });
    }
    await context.close();
  }
  fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
