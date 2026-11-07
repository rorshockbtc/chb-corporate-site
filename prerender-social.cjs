const fs = require('fs');
const path = require('path');

const distHtmlPath = path.resolve(__dirname, 'dist/public/index.html');
if (!fs.existsSync(distHtmlPath)) {
  console.error('dist/public/index.html not found, cannot prerender metadata.');
  process.exit(1);
}

const template = fs.readFileSync(distHtmlPath, 'utf8');

const pages = [
  {
    path: 'studio',
    title: 'Studio | Colon Hyphen Bracket : - ] — One Principal Architect. No Handoffs.',
    desc: 'From scary thesis to shipped production code in five days. Fixed one-week sprints ($7.5k), embedded partnerships, and custom builds by principal designer-architect Kyle Cyree.',
    image: 'https://colonhyphenbracket.pink/images/og/og-studio.jpg'
  },
  {
    path: 'products',
    title: 'Products | Colon Hyphen Bracket : - ] — Pipes |||, Hash #, Semi ; - ], Greater >, Accént é & Marigold ❀',
    desc: 'Independent sovereign software by Colon Hyphen Bracket: Pipes ||| for curated human knowledge, Hash # for private writing, Semi ; - ] editor, Greater > classroom, Accént é, and Marigold ❀ civic data.',
    image: 'https://colonhyphenbracket.pink/images/og/og-products.jpg'
  },
  {
    path: 'manifesto',
    title: 'Manifesto | Colon Hyphen Bracket : - ] — Coastal Rigor, Appalachian Honesty',
    desc: 'Why a principal designer-architect from Southern Appalachia built Colon Hyphen Bracket for the founders, creators, families, and Main Street businesses Big Tech overlooked.',
    image: 'https://colonhyphenbracket.pink/images/og/og-manifesto.jpg'
  },
  {
    path: 'contact',
    title: 'Start a Project | Colon Hyphen Bracket : - ] — Principal Design & Architecture',
    desc: 'Book a one-week sprint ($7,500), single-day build, or embedded principal partner with Kyle Cyree at Colon Hyphen Bracket.',
    image: 'https://colonhyphenbracket.pink/images/og/og-contact.jpg'
  }
];

for (const p of pages) {
  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${p.desc}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${p.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${p.desc}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="https://colonhyphenbracket.pink/${p.path}" />`);
  html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${p.image}" />`);
  html = html.replace(/<meta property="og:image:secure_url" content=".*?" \/>/, `<meta property="og:image:secure_url" content="${p.image}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${p.title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${p.desc}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${p.image}" />`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://colonhyphenbracket.pink/${p.path}" />`);

  const dir = path.join(__dirname, 'dist/public', p.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Prerendered social metadata for /${p.path}`);
}
