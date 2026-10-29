const CACHE='elpatron-v20261029-offline-locale-1';
const CORE=['./','./manifest.webmanifest','./styles.css','./app.js','./enhancements.js','./icons.js','./menu-data.js','./i18n.js','./images/logo.webp','./icons/icon-192.webp','./icons/icon-512.webp','./fr/','./en/','./fr/pages/experience.html','./en/pages/experience.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==self.location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r,{cache:'no-cache'}).then(x=>{
      if(x&&x.ok){const c=x.clone();caches.open(CACHE).then(a=>a.put(r,c)).catch(()=>{});}
      return x;
    }).catch(async error=>{
      // Prefer the requested page, then the matching language home page, then the site root.
      const exact=await caches.match(r)||await caches.match(r,{ignoreSearch:true});
      if(exact)return exact;
      const parts=u.pathname.split('/').filter(Boolean);
      const locale=parts.find(part=>part==='fr'||part==='en');
      const fallbackUrl=locale
        ?new URL('./'+locale+'/',self.location.href).href
        :new URL('./',self.location.href).href;
      const localeHome=await caches.match(fallbackUrl);
      if(localeHome)return localeHome;
      const siteHome=await caches.match(new URL('./',self.location.href).href);
      if(siteHome)return siteHome;
      throw error;
    }));
    return;
  }
  e.respondWith((async()=>{
    const shouldRevalidate=/\.(?:js|css|html|webmanifest|webp|png|jpe?g|avif|svg|gif)$/i.test(u.pathname);
    try{
      // Revalidate pages, scripts, styles and images so updated content replaces stale cached files.
      const fresh=await fetch(r,{cache:shouldRevalidate?'no-cache':'default'});
      if(fresh&&fresh.ok){const copy=fresh.clone();caches.open(CACHE).then(a=>a.put(r,copy)).catch(()=>{});}
      return fresh;
    }catch(error){
      // Use cached files only when the network is unavailable.
      const fallback=await caches.match(r)||await caches.match(r,{ignoreSearch:true});
      if(fallback)return fallback;
      throw error;
    }
  })());
});
