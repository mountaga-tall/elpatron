const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('sw.js', 'utf8');

async function offlineNavigation(path, cachedPages) {
  const listeners = {};
  const cacheEntries = new Map(Object.entries(cachedPages));
  let responsePromise;
  const self = {
    location: { href: 'https://example.test/sw.js', origin: 'https://example.test' },
    clients: { claim: async () => {} },
    skipWaiting: async () => {},
    addEventListener(type, listener) { listeners[type] = listener; }
  };
  const caches = {
    async match(request, options = {}) {
      const key = typeof request === 'string' ? request : request.url;
      if (cacheEntries.has(key)) return cacheEntries.get(key);
      if (options.ignoreSearch) {
        const requested = new URL(key);
        for (const [candidate, value] of cacheEntries) {
          const cached = new URL(candidate);
          if (cached.origin === requested.origin && cached.pathname === requested.pathname) return value;
        }
      }
      return undefined;
    },
    async open() { return { addAll: async () => {}, put: async () => {} }; },
    async keys() { return []; }
  };

  vm.runInNewContext(source, {
    self, caches, URL, Promise, console,
    fetch: async () => { throw new Error('offline'); }
  }, { filename: 'sw.js' });

  listeners.fetch({
    request: { method: 'GET', url: 'https://example.test' + path, mode: 'navigate' },
    respondWith(value) { responsePromise = Promise.resolve(value); }
  });
  return responsePromise;
}

test('offline English pages fall back to the English home page', async () => {
  const response = await offlineNavigation('/en/pages/panier.html', {
    'https://example.test/en/': 'EN_HOME',
    'https://example.test/fr/': 'FR_HOME'
  });
  assert.equal(response, 'EN_HOME');
});

test('offline French pages fall back to the French home page', async () => {
  const response = await offlineNavigation('/fr/pages/panier.html', {
    'https://example.test/en/': 'EN_HOME',
    'https://example.test/fr/': 'FR_HOME'
  });
  assert.equal(response, 'FR_HOME');
});

test('offline navigation preserves a cached page before using a language home page', async () => {
  const response = await offlineNavigation('/en/pages/panier.html', {
    'https://example.test/en/pages/panier.html': 'EN_CART',
    'https://example.test/en/': 'EN_HOME'
  });
  assert.equal(response, 'EN_CART');
});
