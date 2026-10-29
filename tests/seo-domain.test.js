const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();

test('site metadata, robots.txt and sitemap use the GitHub Pages canonical domain', () => {
  const domain = fs.readFileSync(path.join(root, 'CNAME'), 'utf8').trim().toLowerCase();
  assert.ok(domain && !domain.startsWith('www.'), 'CNAME must declare the canonical apex domain');

  const menuSource = fs.readFileSync(path.join(root, 'menu-data.js'), 'utf8');
  const siteMatch = menuSource.match(/window\.EL_PATRON_SITE=(\{[\s\S]*?\n\});/);
  assert.ok(siteMatch, 'Could not read site metadata');
  const site = JSON.parse(siteMatch[1]);
  assert.equal(new URL(site.site).hostname, domain, 'Structured data must use the CNAME host');

  const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
  const sitemapLine = robots.match(/^Sitemap:\s*(\S+)\s*$/mi);
  assert.ok(sitemapLine, 'robots.txt must point to a sitemap');
  assert.equal(new URL(sitemapLine[1]).hostname, domain, 'robots.txt sitemap host must match CNAME');
  assert.equal(new URL(sitemapLine[1]).pathname, '/sitemap.xml');

  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const locations = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/gi), match => match[1].trim());
  assert.ok(locations.length > 0, 'Sitemap must contain URLs');
  for (const raw of locations) {
    const url = new URL(raw);
    assert.equal(url.protocol, 'https:', 'Sitemap URLs must use HTTPS: ' + raw);
    assert.equal(url.hostname, domain, 'Sitemap host must match CNAME: ' + raw);
    assert.equal(url.search, '', 'Sitemap URLs must not contain queries: ' + raw);
    assert.equal(url.hash, '', 'Sitemap URLs must not contain fragments: ' + raw);

    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    if (!relative || relative.endsWith('/')) relative = path.join(relative, 'index.html');
    const file = path.resolve(root, relative);
    assert.ok(file.startsWith(root + path.sep) || file === path.join(root, 'index.html'),
      'Sitemap path escaped repository root: ' + raw);
    assert.ok(fs.existsSync(file) && fs.statSync(file).isFile(),
      'Sitemap URL does not map to a published file: ' + raw + ' -> ' + relative);
  }
});
