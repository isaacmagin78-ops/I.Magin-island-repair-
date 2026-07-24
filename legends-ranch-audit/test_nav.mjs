import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  headless: true,
});
const page = await browser.newPage();
try {
  const resp = await page.goto('https://legendsranch.com', { timeout: 20000, waitUntil: 'domcontentloaded' });
  console.log('STATUS', resp?.status());
} catch (e) {
  console.log('NAV ERROR:', e.message);
}
await browser.close();
