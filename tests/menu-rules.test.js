const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const menuSource = fs.readFileSync('menu-data.js', 'utf8');
const context = { window: {} };
vm.runInNewContext(menuSource, context, { filename: 'menu-data.js' });
const menu = context.window.EL_PATRON_MENU;
const app = fs.readFileSync('app.js', 'utf8');
const enhancements = fs.readFileSync('enhancements.js', 'utf8');

test('all catalog pizzas expose Moyen and Grand with positive prices', () => {
  assert.equal(menu.pizzas.length, 13);
  for (const pizza of menu.pizzas) {
    const labels = pizza.price.map(option => option.label);
    assert.ok(labels.includes('Moyen'), pizza.id + ' is missing Moyen');
    assert.ok(labels.includes('Grand'), pizza.id + ' is missing Grand');
    for (const option of pizza.price) assert.ok(option.amount > 0, pizza.id + ' has invalid price');
    const medium = pizza.price.find(option => option.label === 'Moyen');
    const grand = pizza.price.find(option => option.label === 'Grand');
    const surcharge = ['pizzas-1', 'pizzas-2'].includes(pizza.id) ? 1000 : 1500;
    assert.equal(Number(grand.amount), Number(medium.amount) + surcharge, pizza.id + ' has an incorrect Grand surcharge');
  }
  assert.match(app, /function pizzaLargeSurcharge\(p\)/);
  assert.match(app, /function pizzaPriceOptions\(p\)/);
  assert.match(app, /categorySlug==='pizzas'\?pizzaPriceOptions\(p\)/);
  assert.match(app, /pizzaPriceOptions\(product\)\.filter/);
  assert.match(app, /pizzaLargeSurcharge\(product\)/);
});

test('the six L / L Royal tacos have a matching XL exactly 3,000 FCFA more expensive', () => {
  for (let n = 1; n <= 6; n += 1) {
    const base = menu['tacos-kebab'].find(item => item.id === 'tacos-kebab-' + n);
    const xl = menu['tacos-kebab'].find(item => item.id === 'tacos-kebab-' + (n + 6));
    assert.ok(base, 'Missing base taco ' + n);
    assert.ok(xl, 'Missing XL taco ' + (n + 6));
    assert.equal(Number(xl.price[0].amount), Number(base.price[0].amount) + 3000);
  }
});

test('only L tacos 1-6 have the XL popup rule; already-XL tacos are not eligible', () => {
  assert.match(app, /function isTacoUpgradeProduct\(p,categorySlug\)\{return categorySlug==='tacos-kebab'&&\/\^tacos-kebab-\[1-6\]\$\/\.test/);
  assert.match(app, /isTacoUpgradeProduct\(p,productCategory\)/);
  assert.match(app, /data-pizza-size-index/);
  assert.match(app, /Number\(selected\.amount\)===Math\.min\(\.\.\.options\.map\(item=>Number\(item\.amount\)\)\)/);
  assert.match(app, /window\.EL_PATRON_ADD_FROM_COMBO/);
});

test('snack and burger products restore the Sandwich / Plat popup, with a free side for Plat', () => {
  for (const category of ['snack', 'burgers']) {
    assert.ok(menu[category].length > 0, 'Missing category ' + category);
    const configurable = menu[category].filter(product => product.price?.length > 1);
    assert.ok(configurable.length > 0, category + ' should contain format choices');
    for (const product of configurable) {
      assert.equal(product.defaultPriceOnly, true, product.id + ' should use the option popup');
      assert.equal(product.price.length, 2, product.id + ' should expose two formats');
      assert.equal(product.price[0].label, 'Sandwich', product.id + ' is missing Sandwich');
      assert.equal(product.price[1].label, 'Plat', product.id + ' is missing Plat');
    }
  }
  assert.match(app, /p\.defaultPriceOnly&&options\.length>1/);
  assert.match(app, /const formatChoices=product\.defaultPriceOnly&&Array\.isArray\(product\.price\)/);
  assert.match(app, /function productNeedsAccompaniment\(p,option\).*normalize\(option\?\.label\)==='plat'/);
  assert.match(app, /Included in the price/);
});

test('free accompaniment popup coverage includes all configured plates, grills and chicken dishes', () => {
  const match = app.match(/const FREE_ACCOMPANIMENT_IDS=new Set\(\[([\s\S]*?)\]\);/);
  assert.ok(match, 'Free accompaniment ID set is missing');
  assert.match(app, /needsAccompaniment\(p\)/);
  const ids = match[1];
  for (let n = 1; n <= 15; n += 1) assert.ok(ids.includes("'plats-" + n + "'"), 'Missing plats-' + n);
  for (let n = 1; n <= 6; n += 1) assert.ok(ids.includes("'grill-" + n + "'"), 'Missing grill-' + n);
  for (let n = 1; n <= 5; n += 1) assert.ok(ids.includes("'poulet-" + n + "'"), 'Missing poulet-' + n);
});

test('checkout includes a delivery address and rejects incomplete delivery details', () => {
  assert.match(app, /deliveryAddressRequired/);
  assert.match(app, /Delivery address: /);
  assert.match(app, /Adresse de livraison : /);
  assert.match(enhancements, /name="a"/);
  assert.match(enhancements, /v\.m==='l'&&!v\.a/);
});

test('combo builder uses selected catalog prices without hard-coded discounts', () => {
  assert.match(enhancements, /function formulaBuilder\(\)/);
  assert.match(enhancements, /f\.amount\+d\.amount/);
  assert.match(enhancements, /No automatic discount is applied/);
  assert.match(enhancements, /Aucune remise n’est appliquée automatiquement/);
});

test('category sorting is available and reservation forms validate past dates and times', () => {
  assert.match(app, /data-category-sort/);
  assert.match(app, /sortCheap/);
  assert.match(enhancements, /setCustomValidity\(dateField\.value&&dateField\.value<now\.date\?copy\.pastDate:''\)/);
  assert.match(enhancements, /timeField\.setCustomValidity/);
});
