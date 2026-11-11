const fs = require('fs');
const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const root = 'scratch/navora-industries-redesign';
const phase = process.argv[2] || 'review';
const base = 'http://127.0.0.1:3006';
function intersects(a, b) { return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top; }
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  for (const [device, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, isMobile: device === 'mobile', reducedMotion: 'no-preference' });
    const page = await context.newPage();
    const errors = [];
    const failedRequests = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
    await page.goto(base + '/industries', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const chapters = await page.locator('.ni-chapter').count();
    for (let i = 0; i < chapters; i++) {
      const location = await page.locator('.ni-chapter').nth(i).evaluate(el => { const r = el.getBoundingClientRect(); return { top: r.top + scrollY, height: r.height }; });
      const start = location.top - viewport.height * .60;
      const end = location.top + location.height - viewport.height * .60;
      for (const [step, progress] of [[0, .1], [2, .5], [4, .9]]) {
        await page.evaluate(y => window.scrollTo(0, y), start + (end - start) * progress);
        await page.waitForTimeout(750);
        const state = await page.evaluate(index => {
          const box = selector => document.querySelector(selector)?.getBoundingClientRect().toJSON();
          const chapter = document.querySelectorAll('.ni-chapter')[index];
          const visible = [...document.querySelectorAll('.ni-float,.ni-mobile-request,.ni-mobile-work')].filter(el => { const r = el.getBoundingClientRect(); return el.getClientRects().length && r.top < innerHeight && r.bottom > 0 && getComputedStyle(el).visibility !== 'hidden'; });
          const packet = document.querySelector(innerWidth < 768 ? '.ni-mobile-scene[data-active=true] .ni-mobile-packet' : '.ni-packet');
          const result = document.querySelector(innerWidth < 768 ? '.ni-mobile-scene[data-active=true] .ni-mobile-result' : '.ni-stage-outcome');
          return { activity: document.querySelector('.ni-stage-title span')?.textContent, step: document.querySelector('.ni-stage-title strong')?.textContent, chapter: chapter?.querySelector('h2')?.textContent, stage: box(innerWidth < 768 ? '.ni-mobile-scene[data-active=true]' : '.ni-stage'), heading: chapter?.querySelector('h2')?.getBoundingClientRect().toJSON(), nav: box('.nv-header'), floats: visible.length, floatRects: visible.map(el => el.getBoundingClientRect().toJSON()), packet: packet?.getBoundingClientRect().toJSON(), resultOpacity: result ? Number(getComputedStyle(result).opacity) : null, width: document.documentElement.scrollWidth, missingAssets: [...document.images].filter(img => img.complete && !img.naturalWidth).map(img => img.src) };
        }, i);
        const overlap = state.stage && state.heading && intersects(state.stage, state.heading);
        results.push({ device, index: i, expectedStep: step, ...state, overlap });
        await page.screenshot({ path: `${root}/${phase}-${device}-${String(i + 1).padStart(2, '0')}-${step}.png` });
      }
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${root}/${phase}-${device}-full.png`, fullPage: true });
    if (device === 'mobile') {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      results.push({ device, check: 'menu open', visible: await page.getByRole('dialog').isVisible() });
      await page.getByRole('dialog').getByRole('link', { name: /ABOUT/ }).click();
      results.push({ device, check: 'menu route', pathname: new URL(page.url()).pathname });
      await page.goto(base + '/industries', { waitUntil: 'networkidle' });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(300);
      await page.locator('.ni-chapter').nth(3).scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      results.push({ device, check: 'reduced motion after change', activity: await page.locator('.ni-stage-title span').textContent(), panels: await page.locator('.ni-mobile-scene[data-active=true] .ni-mobile-request,.ni-mobile-scene[data-active=true] .ni-mobile-work').count(), motion: await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches) });
      await page.screenshot({ path: `${root}/${phase}-mobile-reduced.png` });
    }
    results.push({ device, check: 'browser errors', errors, failedRequests });
    await context.close();
  }
  fs.writeFileSync(`${root}/${phase}-journey-results.json`, JSON.stringify(results, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
