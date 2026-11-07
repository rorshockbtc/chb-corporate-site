const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/kendallkylecyree/.gemini/antigravity/brain/2804fc5d-5420-40b9-a0a1-eaec0eabdb55/scratch/node_modules/playwright');

const publicDir = '/Users/kendallkylecyree/Developer/chb-corporate-site/client/public';

(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  // 1. Generate crisp high-contrast SVG favicon with hot pink (#FE299E) circle and pure white (: - ]) mark
  // Spaced and scaled for ultra-legibility even at 16x16 and on dark mode browser tabs
  const svgFavicon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="soft" x="-8%" y="-8%" width="116%" height="116%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.18" />
    </filter>
  </defs>
  <!-- Distinctive hot pink brand container circle -->
  <circle cx="256" cy="256" r="236" fill="#FE299E" filter="url(#soft)" />
  
  <!-- Crisp white bold colon : -->
  <circle cx="156" cy="214" r="28" fill="#FFFFFF" />
  <circle cx="156" cy="298" r="28" fill="#FFFFFF" />
  
  <!-- Crisp white bold hyphen - -->
  <rect x="222" y="242" width="68" height="28" rx="14" fill="#FFFFFF" />
  
  <!-- Crisp white bold bracket ] -->
  <path d="M 330 186 L 372 186 C 379 186 384 191 384 198 L 384 314 C 384 321 379 326 372 326 L 330 326" 
        fill="none" stroke="#FFFFFF" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`.trim();

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon);
  console.log('Saved favicon.svg');

  // 2. Render 512x512, 192x192, 180x180 (apple-touch-icon), 64x64, 32x32, 256x256 to PNG
  const page = await browser.newPage();
  
  const sizes = [
    { size: 512, name: 'favicon-512.png' },
    { size: 192, name: 'favicon-192.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 64, name: 'favicon-64.png' },
    { size: 32, name: 'favicon-32.png' },
    { size: 256, name: 'favicon.png' },
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
