const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) htmlFiles.push(absolute);
  }
}
walk(root);

function localTarget(fromFile, rawUrl) {
  let value = rawUrl.trim().replace(/&amp;/g, '&');
  if (!value || value.startsWith('#') || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) return null;
  value = value.split('#', 1)[0].split('?', 1)[0];
  if (!value) return null;
  try { value = decodeURIComponent(value); } catch {}
  const target = value.startsWith('/')
    ? path.join(root, value.replace(/^\/+/, ''))
    : path.resolve(path.dirname(fromFile), value);
  return path.normalize(target);
}
function existsAsPublishedPath(target) {
  if (!target.startsWith(root + path.sep) && target !== root) return false;
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    return fs.existsSync(path.join(target, 'index.html'));
  }
  return false;
}

test('all static HTML pages resolve their local scripts, stylesheets, images and links', () => {
  const broken = [];
  const attr = /\b(href|src|action)\s*=\s*(["'])(.*?)\2/gi;
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(attr)) {
      const target = localTarget(file, match[3]);
      if (target && !existsAsPublishedPath(target)) {
        broken.push({
          page: path.relative(root, file).replace(/\\/g, '/'),
          attribute: match[1],
          url: match[3],
          target: path.relative(root, target).replace(/\\/g, '/')
        });
      }
    }
  }
  assert.deepEqual(broken, [], 'Broken local HTML references:\n' + JSON.stringify(broken, null, 2));
});

test('all localized category pages exist in both languages', () => {
  const source = fs.readFileSync(path.join(root, 'menu-data.js'), 'utf8');
  const match = source.match(/window\.EL_PATRON_CATEGORIES=(\[[\s\S]*?\n\]);/);
  assert.ok(match, 'Could not extract the category catalogue');
  const categories = JSON.parse(match[1]);
  for (const locale of ['fr', 'en']) {
    for (const category of categories) {
      const file = path.join(root, locale, 'pages', category.slug + '.html');
      assert.ok(fs.existsSync(file), 'Missing category page: ' + path.relative(root, file));
    }
  }
});

test('every service-worker precache entry resolves to a real local asset', () => {
  const source = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const match = source.match(/const CORE=\[([\s\S]*?)\];/);
  assert.ok(match, 'Service-worker CORE asset list is missing');
  const assets = Array.from(match[1].matchAll(/['"]([^'"]+)['"]/g), m => m[1]);
  for (const asset of assets) {
    const target = path.resolve(root, asset.replace(/^\.\//, ''));
    assert.ok(existsAsPublishedPath(target), 'Missing service-worker precache asset: ' + asset);
  }
});
