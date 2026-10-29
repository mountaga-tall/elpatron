const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const app = fs.readFileSync('app.js', 'utf8');
const enhancements = fs.readFileSync('enhancements.js', 'utf8');
const styles = fs.readFileSync('styles.css', 'utf8');
const manifest = JSON.parse(fs.readFileSync('manifest.webmanifest', 'utf8'));
const serviceWorker = fs.readFileSync('sw.js', 'utf8');
const workflow = fs.readFileSync('.github/workflows/pages.yml', 'utf8');

test('medium pizza price opens the size selector and the large price can be added directly', () => {
  assert.match(app, /data-pizza-size-index/);
  assert.match(app, /if\(Number\(selected\.amount\)===Math\.min\(\.\.\.options\.map\(item=>Number\(item\.amount\)\)\)&&typeof window\.openProductOptions==='function'\)/);
  assert.match(app, /window\.openProductOptions\(p,selected,productCategory\)/);
  assert.match(app, /addToCart\(p,selected\)/);
  assert.match(app, /function pizzaPriceOptions\(p\)/);
});

test('L tacos open the L / XL popup, with the XL surcharge preserved', () => {
  assert.match(app, /function isTacoUpgradeProduct\(p,categorySlug\)\{return categorySlug==='tacos-kebab'&&\/\^tacos-kebab-\[1-6\]\$\/\.test/);
  assert.match(app, /isTacoUpgradeProduct\(p,productCategory\)/);
  assert.match(app, /function buildTacoSizeChoices\(product\)/);
  assert.match(app, /Number\(baseOption\.amount\)\+3000/);
  assert.match(app, /chooseTacoSize/);
});

test('install helper supports the native Android prompt and manual iOS Home Screen steps', () => {
  assert.match(enhancements, /beforeinstallprompt/);
  assert.match(enhancements, /installEvent\.prompt\(\)/);
  assert.match(enhancements, /installTitle:'Install EL PATRÓN'/);
  assert.match(enhancements, /installIosTitle:'Installation sur iPhone \/ iPad'/);
  assert.match(enhancements, /installIosStep2:'Touchez Partager, puis « Sur l’écran d’accueil »\.'/);
  assert.match(enhancements, /installIosStep3:'Activez « Ouvrir comme app web » si l’option est proposée, puis touchez Ajouter\.'/);
  assert.match(enhancements, /apple-mobile-web-app-capable/);
  assert.match(enhancements, /apple-touch-icon/);
  assert.match(styles, /\.ep-install-dialog/);
});

test('responsive layout handles compact phones, tablets, safe areas and landscape orientation', () => {
  assert.match(styles, /@media\(max-width:380px\)/);
  assert.match(styles, /@media\(max-width:760px\)/);
  assert.match(styles, /grid-template-columns:minmax\(0,1fr\)/);
  assert.match(styles, /env\(safe-area-inset-bottom\)/);
  assert.match(styles, /overflow-x:clip/);
  assert.equal(Object.hasOwn(manifest, 'orientation'), false);
  assert.match(serviceWorker, /elpatron-v20261029-pwa-responsive-1/);
  assert.match(serviceWorker, /images\/logo\.png/);
});


test('all app pages receive the PWA manifest before the installability checks run', () => {
  assert.ok(app.includes('function ensurePwaManifestLink(){'));
  assert.ok(app.includes('ensurePwaManifestLink();'));
  assert.ok(workflow.includes('Ensure the PWA manifest is linked on every app page'));
  assert.ok(workflow.includes('relative_manifest = os.path.relpath'));
  assert.ok(
    workflow.indexOf('Ensure the PWA manifest is linked on every app page')
      < workflow.indexOf('Run menu, popup and checkout regression tests'),
    'Manifest links must be added before the integrity/test run and publish steps'
  );
});
