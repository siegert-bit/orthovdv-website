// Bouwt elke pagina vooraf als gewone HTML, zodat Google (en bezoekers met een
// trage verbinding) meteen de tekst krijgen in plaats van een lege pagina.
// Draait automatisch na "yarn build". Loopt er iets mis, dan blijft de gewone
// site gewoon werken: dit script laat de build nooit mislukken.

const fs = require('fs');
const path = require('path');
const Module = require('module');

const SITE = 'https://orthovdv.be';
const root = path.join(__dirname, '..');
const src = path.join(root, 'src');
const build = path.join(root, 'build');

function main() {
  // 'test' laat babel-preset-react-app code maken die Node rechtstreeks kan uitvoeren
  process.env.NODE_ENV = 'test';
  process.env.BABEL_ENV = 'test';

  const babel = require('@babel/core');

  // "@/..." verwijst naar de map src
  const resolve = Module._resolveFilename;
  Module._resolveFilename = function (request, ...rest) {
    if (request.startsWith('@/')) request = path.join(src, request.slice(2));
    return resolve.call(this, request, ...rest);
  };

  // Stijlbestanden en afbeeldingen zijn hier niet nodig
  for (const ext of ['.css', '.png', '.jpg', '.svg']) require.extensions[ext] = () => {};

  // Onze eigen bestanden in src omzetten naar gewone JavaScript
  const compile = (module, filename) => {
    const { code } = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
      filename,
      babelrc: false,
      configFile: false,
      presets: [[require.resolve('babel-preset-react-app'), { runtime: 'automatic' }]],
    });
    module._compile(code, filename);
  };
  const plainJs = require.extensions['.js'];
  require.extensions['.jsx'] = compile;
  require.extensions['.js'] = (module, filename) =>
    filename.startsWith(src + path.sep) ? compile(module, filename) : plainJs(module, filename);

  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const { StaticRouter } = require('react-router-dom');
  const App = require(path.join(src, 'App.js')).default;
  const { klachten } = require(path.join(src, 'data', 'klachten.js'));

  const template = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
  if (!template.includes('<div id="root"></div>')) throw new Error('lege root niet gevonden in build/index.html');

  const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  const pages = [
    { url: '/' },
    {
      url: '/privacy',
      title: 'Privacyverklaring | Orthopedie Van de Voorde',
      description: 'Hoe Ortho VdV BV omgaat met de gegevens die u via de website of het aanvraagformulier bezorgt.',
    },
    ...klachten.map((k) => ({
      url: `/klachten/${k.slug}`,
      title: `${k.title} | Orthopedie Van de Voorde`,
      description: k.summary,
    })),
  ];

  for (const page of pages) {
    const html = renderToString(
      React.createElement(StaticRouter, { location: page.url }, React.createElement(App))
    );
    let out = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    if (page.title) out = out.replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`);
    if (page.description) {
      out = out.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(page.description)}$2`);
    }
    out = out.replace('</head>', `<link rel="canonical" href="${SITE}${page.url === '/' ? '/' : page.url}"/></head>`);

    const file = page.url === '/' ? path.join(build, 'index.html') : path.join(build, page.url, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, out);
    console.log(`  vooraf gebouwd: ${page.url} (${Math.round(html.length / 1024)} kB)`);
  }

  // De lege versie bewaren voor adressen die niet vooraf gebouwd zijn
  fs.writeFileSync(path.join(build, '200.html'), template);

  // Lijst van pagina's voor zoekmachines
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map((p) => `  <url><loc>${SITE}${p.url}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  fs.writeFileSync(path.join(build, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(build, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
}

try {
  main();
} catch (error) {
  console.warn('\nLet op: pagina\'s vooraf bouwen is mislukt; de site werkt wel gewoon verder.');
  console.warn(error && error.stack ? error.stack : error);
}
