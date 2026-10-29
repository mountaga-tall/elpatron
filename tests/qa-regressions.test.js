const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const enhancements = fs.readFileSync('enhancements.js', 'utf8');
const menuSource = fs.readFileSync('menu-data.js', 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(menuSource, sandbox, { filename: 'menu-data.js' });
const products = Object.values(sandbox.window.EL_PATRON_MENU).flat();

test('formula builder advertises the actual 3,000 FCFA taco XL upgrade in both languages', () => {
  assert.match(enhancements, /comboXL:'Passer en XL \(\+3 000 FCFA\)'/);
  assert.match(enhancements, /comboXL:'Upgrade taco to XL \(\+3,000 FCFA\)'/);

  for (let n = 1; n <= 6; n += 1) {
    const regular = products.find(product => product.id === 'tacos-kebab-' + n);
    const xl = products.find(product => product.id === 'tacos-kebab-' + (n + 6));
    assert.ok(regular, 'Missing L taco #' + n);
    assert.ok(xl, 'Missing XL taco #' + n);
    assert.equal(
      Number(xl.price?.[0]?.amount) - Number(regular.price?.[0]?.amount),
      3000,
      'XL taco #' + n + ' must cost 3,000 FCFA more than its L version'
    );
  }
});

test('home enhancements cover localized folder and index.html URLs', () => {
  assert.match(enhancements, /function isLocalizedHome\(\)\{return.*index.*location\.pathname\)\}/);
  assert.equal((enhancements.match(/isLocalizedHome\(\)/g) || []).length, 4,
    'The formula builder, reservation form and conversion rail must share the route predicate');

  const isLocalizedHome = path => /\/(fr|en)(?:\/|\/index\.html)?$/.test(path);
  for (const path of ['/fr', '/fr/', '/fr/index.html', '/en', '/en/', '/en/index.html']) {
    assert.equal(isLocalizedHome(path), true, path + ' should be treated as a localized home page');
  }
  for (const path of ['/', '/fr/pages/panier.html', '/en/pages/reservation.html']) {
    assert.equal(isLocalizedHome(path), false, path + ' should not be treated as a localized home page');
  }
});


test('cart drawer routes to the checkout form before WhatsApp if contact details are missing', () => {
  const app = fs.readFileSync('app.js', 'utf8');
  const start = app.indexOf('function orderWhatsApp(){');
  const end = app.indexOf('function setupCart(){', start);
  assert.ok(start >= 0 && end > start, 'Could not locate the WhatsApp checkout handler');
  const handler = app.slice(start, end);
  assert.match(handler, /if\(!details&&\(!String\(saved\.n\|\|''\)\.trim\(\)\|\|String\(saved\.tel\|\|''\)\.replace\(\/\\D\/g,''\)\.length<8\)\)/);
  assert.ok(handler.includes("location.href=(LANG==='en'?'/en':'/fr')+'/pages/panier.html';"), 'Missing route to the checkout details page');
  assert.match(handler, /if\(m==='l'&&!a\)/, 'Delivery must still require an address on the checkout form');
});
