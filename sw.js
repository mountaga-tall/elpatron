const CACHE='elpatron-v20261018-fix4';
const CORE=['./','./manifest.webmanifest','./styles.css','./app.js','./enhancements.js','./icons.js','./menu-data.js','./i18n.js','./images/logo.webp','./icons/icon-192.webp','./icons/icon-512.webp','./fr/','./en/','./ar/','./fr/pages/experience.html','./en/pages/experience.html','./ar/pages/experience.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==self.location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(x=>{
      if(x&&x.ok){const c=x.clone();caches.open(CACHE).then(a=>a.put(r,c)).catch(()=>{});}
      return x;
    }).catch(()=>caches.match(r).then(x=>x||caches.match('./fr/').then(x=>x||caches.match('./')))));
    return;
  }
  e.respondWith((async()=>{
    // Use an exact cached URL first; don't let an old query-string variant win.
    const exact=await caches.match(r);
    if(exact)return exact;
    try{
      const fresh=await fetch(r);
      if(fresh&&fresh.ok){
        const copy=fresh.clone();
        caches.open(CACHE).then(a=>a.put(r,copy)).catch(()=>{});
      }
      return fresh;
    }catch(error){
      // Preserve offline support for files pre-cached without query strings.
      const fallback=await caches.match(r,{ignoreSearch:true});
      if(fallback)return fallback;
      throw error;
    }
  })());
});