const { chromium } = require('C:/Users/chib4/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const base = 'http://127.0.0.1:3001';
  const routes = ['/', '/solutions', '/industries', '/how-it-works', '/about', '/contact', '/privacy', '/terms'];
  const result = { routes: [], interactions: {}, fallbacks: {} };
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  for (const route of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    result.routes.push({ route, status: response.status(), width: await page.evaluate(() => document.documentElement.scrollWidth), errors: [...new Set(errors)] });
    await page.close();
  }
  const home = await context.newPage();
  await home.goto(base + '/', { waitUntil: 'networkidle' });
  result.interactions.homeCentreLogoCount = await home.locator('main img[src*="navora-logo"]').count();
  const zones = await home.locator('[data-scroll-zone]').count();
  for (let i = 0; i < zones; i++) await home.locator('[data-scroll-zone]').nth(i).scrollIntoViewIfNeeded();
  result.interactions.homeZones = zones;
  await home.close();
  const solutions = await context.newPage();
  await solutions.goto(base + '/solutions', { waitUntil: 'networkidle' });
  const solutionButtons = solutions.locator('.nv-workbench__stage');
  const solutionLabels = [];
  for (let i = 0; i < await solutionButtons.count(); i++) { await solutionButtons.nth(i).click(); solutionLabels.push(await solutions.locator('.nv-workbench__stage-title').innerText()); }
  result.interactions.solutionStages = solutionLabels;
  await solutions.close();
  const industries = await context.newPage();
  await industries.goto(base + '/industries', { waitUntil: 'networkidle' });
  const challengeButtons = industries.locator('.nv-explorer__challenge');
  const challengeLabels = [];
  for (let i = 0; i < await challengeButtons.count(); i++) { await challengeButtons.nth(i).click(); challengeLabels.push(await industries.locator('.nv-explorer__title').innerText()); }
  result.interactions.industryChallenges = challengeLabels;
  await industries.close();
  const contact = await context.newPage();
  await contact.goto(base + '/contact', { waitUntil: 'networkidle' });
  await contact.getByRole('button', { name: /send enquiry/i }).click();
  result.interactions.contactValidation = await contact.locator('[role="alert"]').count() > 0 || await contact.locator(':invalid').count() > 0;
  await contact.close();
  await context.close();
  const fallbackContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const fallback = await fallbackContext.newPage();
  await fallback.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(type, ...args) { if (type === 'webgl' || type === 'webgl2') return null; return original.call(this, type, ...args); }; });
  await fallback.goto(base + '/', { waitUntil: 'networkidle' });
  result.fallbacks.noWebGLText = (await fallback.locator('body').innerText()).includes('3D preview unavailable') || (await fallback.locator('body').innerText()).includes('automation');
  result.fallbacks.mobileWidth = await fallback.evaluate(() => document.documentElement.scrollWidth);
  await fallback.close();
  await fallbackContext.close();
  await browser.close();
  console.log(JSON.stringify(result, null, 2));
})();
