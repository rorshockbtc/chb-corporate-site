const fs = require('fs');
const path = require('path');
const chromePath = '/Users/kendallkylecyree/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const { chromium } = require('/Users/kendallkylecyree/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core');

const publicDir = '/Users/kendallkylecyree/Developer/chb-corporate-site/client/public';

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });

  // 1. Generate crisp high-contrast SVG favicon with white background, deep navy circle, hot pink winking smiley
  // Spaced and scaled for ultra-legibility even at 16x16
  const svgFavicon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="soft" x="-8%" y="-8%" width="116%" height="116%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#111827" flood-opacity="0.12" />
    </filter>
  </defs>
  <!-- Dark navy container circle with subtle shadow -->
  <circle cx="256" cy="256" r="236" fill="#111827" filter="url(#soft)" />
  
  <!-- Hot pink bold colon : -->
  <circle cx="156" cy="214" r="28" fill="#FE299E" />
  <circle cx="156" cy="298" r="28" fill="#FE299E" />
  
  <!-- Hot pink bold hyphen - -->
  <rect x="222" y="242" width="68" height="28" rx="14" fill="#FE299E" />
  
  <!-- Hot pink bold bracket ] -->
  <path d="M 330 186 L 372 186 C 379 186 384 191 384 198 L 384 314 C 384 321 379 326 372 326 L 330 326" 
        fill="none" stroke="#FE299E" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`.trim();

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon);
  console.log('Saved favicon.svg');

  // 2. Render 512x512, 192x192, 180x180 (apple-touch-icon), 64x64, 32x32 to PNG
  const page = await browser.newPage();
  
  const sizes = [
    { size: 512, name: 'favicon-512.png' },
    { size: 192, name: 'favicon-192.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 64, name: 'favicon-64.png' },
    { size: 32, name: 'favicon-32.png' },
    { size: 256, name: 'favicon.png' }, // Default favicon.png
  ];

  for (const s of sizes) {
    await page.setViewportSize({ width: s.size, height: s.size });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:transparent;display:flex;align-items:center;justify-content:center;width:${s.size}px;height:${s.size}px;">
        ${svgFavicon}
      </body>
      </html>
    `);
    await page.screenshot({ path: path.join(publicDir, s.name), omitBackground: true });
    console.log('Saved ' + s.name);
  }

  await browser.close();
})();
