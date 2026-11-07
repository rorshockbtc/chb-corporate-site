const fs = require('fs');
const path = require('path');
const chromePath = '/Users/kendallkylecyree/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const { chromium } = require('/Users/kendallkylecyree/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core');

const outDir = '/Users/kendallkylecyree/Developer/chb-corporate-site/client/public/images/og';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pages = [
  {
    slug: 'home',
    eyebrow: 'COLON HYPHEN BRACKET : - ]',
    title: 'We turn the scary parts of software into a smile.',
    subtitle: 'Principal design, software architecture, and sovereign tools. One principal architect, zero handoffs.',
    badge: 'STUDIO &amp; LAB',
    accent: '#FE299E',
    artFile: '/Users/kendallkylecyree/Developer/chb-corporate-site/client/public/images/brand/scary-staircase.jpg'
  },
  {
    slug: 'studio',
    eyebrow: 'COLON HYPHEN BRACKET STUDIO',
    title: 'One principal architect. No handoffs.',
    subtitle: 'From scary thesis to shipped production code in five days. Fixed sprints ($7.5k), embedded partnerships, custom builds.',
    badge: 'FIVE-DAY SPRINTS',
    accent: '#0A9BE0',
    artFile: '/Users/kendallkylecyree/Developer/chb-corporate-site/client/public/images/brand/founders-blueprint.jpg'
  },
  {
    slug: 'products',
    eyebrow: 'COLON HYPHEN BRACKET TOOLS',
    title: 'Software named after punctuation.',
    subtitle: 'Pipes |||, Hash #, Semi ; - ], Greater &gt;, Accént é, and Marigold ❀. Built for human sovereignty.',
    badge: 'INDEPENDENT ECOSYSTEM',
    accent: '#FE299E',
    artFile: '/Users/kendallkylecyree/Developer/chb-corporate-site/client/public/images/brand/products-workbench.jpg'
  },
  {
    slug: 'manifesto',
    eyebrow: 'COLON HYPHEN BRACKET MANIFESTO',
    title: 'Coastal rigor. Appalachian honesty.',
    subtitle: 'Why a principal designer-architect built a studio for the founders, creators, families, and Main Street businesses Big Tech overlooked.',
    badge: 'CORE OPINIONS',
    accent: '#3FA535',
    artFile: '/Users/kendallkylecyree/Developer/chb-corporate-site/client/public/images/brand/creators-terrace.jpg'
  },
  {
    slug: 'contact',
    eyebrow: 'START A PROJECT',
    title: 'Let’s build something worth smiling about.',
    subtitle: 'One-week sprint ($7.5k), single-day build, or embedded principal partner. Talk directly with Kyle.',
    badge: 'DIRECT TO PRINCIPAL',
    accent: '#FE299E',
    artFile: '/Users/kendallkylecyree/Developer/chb-corporate-site/client/public/images/brand/scary-staircase.jpg'
  }
];

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

  for (const p of pages) {
    const artB64 = fs.readFileSync(p.artFile).toString('base64');
    const artDataUrl = 'data:image/jpeg;base64,' + artB64;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1200px;
            height: 630px;
            background: #FAF8F5;
            color: #111827;
            font-family: 'Inter', -apple-system, sans-serif;
            display: flex;
            position: relative;
            overflow: hidden;
          }
          .grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(17,24,39,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(17,24,39,0.04) 1px, transparent 1px);
            background-size: 40px 40px;
          }
          .content {
            position: relative;
            z-index: 10;
            width: 690px;
            height: 100%;
            padding: 60px 0 56px 68px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .badge-row {
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            padding: 6px 14px;
            border-radius: 9999px;
            background: #111827;
            color: #FAF8F5;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.08em;
          }
          .eyebrow {
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: rgba(17,24,39,0.5);
          }
          .title {
            font-family: 'Bricolage Grotesque', sans-serif;
            font-size: 52px;
            font-weight: 800;
            line-height: 1.04;
            letter-spacing: -0.035em;
            color: #111827;
            margin-top: 22px;
          }
          .subtitle {
            font-size: 20px;
            line-height: 1.44;
            color: rgba(17,24,39,0.72);
            margin-top: 18px;
            max-width: 580px;
          }
          .footer-row {
            display: flex;
            align-items: center;
            gap: 18px;
            padding-top: 18px;
            border-top: 1px solid rgba(17,24,39,0.12);
            font-size: 15px;
            font-weight: 600;
            color: rgba(17,24,39,0.6);
          }
          .mark {
            color: ${p.accent};
            font-weight: 800;
            font-size: 18px;
          }
          .btc {
            color: #F7931A;
            font-weight: 700;
            margin-left: 8px;
          }
          .art-container {
            position: absolute;
            right: 56px;
            top: 56px;
            bottom: 56px;
            width: 420px;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 24px 48px -12px rgba(17,24,39,0.18), 0 0 0 1px rgba(17,24,39,0.08);
            background: #F7F6F1;
          }
          .art-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="grid-bg"></div>
        <div class="content">
          <div>
            <div class="badge-row">
              <span class="badge">${p.badge}</span>
              <span class="eyebrow">${p.eyebrow}</span>
            </div>
            <h1 class="title">${p.title}</h1>
            <p class="subtitle">${p.subtitle}</p>
          </div>
          <div class="footer-row">
            <span>colonhyphenbracket.pink</span>
            <span>·</span>
            <span><span class="mark">: - ]</span> Principal Design &amp; Architecture</span>
            <span>·</span>
            <span class="btc">₿ Powered by Bitcoin</span>
          </div>
        </div>
        <div class="art-container">
          <img src="${artDataUrl}" />
        </div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, `og-${p.slug}.jpg`), type: 'jpeg', quality: 90 });
    console.log('Successfully regenerated og-' + p.slug + '.jpg');
  }

  // Copy home as default og-image.jpg
  fs.copyFileSync(path.join(outDir, 'og-home.jpg'), path.join(outDir, 'og-image.jpg'));
  console.log('Successfully copied og-image.jpg');

  await browser.close();
})();
