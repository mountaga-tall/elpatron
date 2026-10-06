(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const base=$('[data-shell]')?.dataset.base||'', lang=(window.EL_PATRON_LANG||document.documentElement.lang||'fr').slice(0,2), site=window.EL_PATRON_SITE||{};
const favKey='ep-favorites-v1', orderKey='ep-order-v1';
const T={
fr:{fav:'Favoris',share:'Partager',search:'Rechercher',cart:'Panier',menu:'Menu',whatsapp:'WhatsApp',reviews:'Avis Google',reviewsSub:'Une expérience saluée par les clients',review:'Voir les avis Google',write:'Laisser un avis',rating:'4,9 / 5',count:'50 avis Google',book:'Réserver une table',bookSub:'Choisissez votre créneau et envoyez la demande sur WhatsApp.',date:'Date',time:'Heure',people:'Personnes',send:'Envoyer la demande',info:'Informations de commande',name:'Nom',phone:'Téléphone',mode:'Type de commande',dine:'Sur place',take:'À emporter',delivery:'Livraison',notes:'Instructions / précision',save:'Enregistrer',saved:'Enregistré',install:'Installer l’app',open:'Ouvrir',emptyFav:'Aucun favori pour le moment.',openNow:'Ouvert maintenant',closed:'Fermé',hours:'08:00 — 02:00',route:'Itinéraire',copied:'Lien copié',shared:'Partagé',addFav:'Ajouter aux favoris',removeFav:'Retirer des favoris'},
en:{fav:'Favorites',share:'Share',search:'Search',cart:'Cart',menu:'Menu',whatsapp:'WhatsApp',reviews:'Google reviews',reviewsSub:'An experience praised by guests',review:'See Google reviews',write:'Leave a review',rating:'4.9 / 5',count:'50 Google reviews',book:'Book a table',bookSub:'Choose a time and send the request on WhatsApp.',date:'Date',time:'Time',people:'Guests',send:'Send request',info:'Order details',name:'Name',phone:'Phone',mode:'Order type',dine:'Dine in',take:'Takeaway',delivery:'Delivery',notes:'Instructions / notes',save:'Save',saved:'Saved',install:'Install app',open:'Open',emptyFav:'No favorites yet.',openNow:'Open now',closed:'Closed',hours:'08:00 — 02:00',route:'Directions',copied:'Link copied',shared:'Shared',addFav:'Add to favorites',removeFav:'Remove from favorites'},
ar:{fav:'المفضلة',share:'مشاركة',search:'بحث',cart:'السلة',menu:'القائمة',whatsapp:'واتساب',reviews:'آراء Google',reviewsSub:'تجربة تحظى بإعجاب الزبائن',review:'عرض آراء Google',write:'إضافة تقييم',rating:'4.9 / 5',count:'50 مراجعة على Google',book:'حجز طاولة',bookSub:'اختر الوقت وأرسل الطلب عبر واتساب.',date:'التاريخ',time:'الوقت',people:'الأشخاص',send:'إرسال الطلب',info:'بيانات الطلب',name:'الاسم',phone:'الهاتف',mode:'نوع الطلب',dine:'في المطعم',take:'استلام',delivery:'توصيل',notes:'ملاحظات',save:'حفظ',saved:'تم الحفظ',install:'تثبيت التطبيق',open:'فتح',emptyFav:'لا توجد مفضلات بعد.',openNow:'مفتوح الآن',closed:'مغلق',hours:'08:00 — 02:00',route:'الاتجاهات',copied:'تم نسخ الرابط',shared:'تمت المشاركة',addFav:'إضافة للمفضلة',removeFav:'إزالة من المفضلة'}
};
const t=k=>T[lang]?.[k]||T.fr[k]||k, esc=s=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
const products=()=>Object.entries(window.EL_PATRON_MENU||{}).flatMap(([slug,items])=>items.filter(p=>!p.noteOnly).map(p=>({...p,slug})));
const product=id=>products().find(p=>p.id===id);
const money=n=>new Intl.NumberFormat(lang==='fr'?'fr-FR':'en-US').format(Number(n)||0)+' FCFA';
const maps='https://www.google.com/maps/search/?api=1&query=5.403111,-3.980472';
const googleReviewUrl='https://www.google.com/maps/search/?api=1&query=El%20Patr%C3%B3n%20Abidjan';
const reviews=googleReviewUrl;
const googleReviews={
  fr:[
    {name:'COLORS « Sortez de l\'ombre » LOROUGNON Hermann',meta:'Google · 5/5',text:'Cuisine, service et ambiance évalués 5/5.'},
    {name:'LA MAISON DU BITCOIN CÔTE D’IVOIRE',meta:'Google · 5/5',text:'Cuisine, service et ambiance évalués 5/5.'},
    {name:'Ousman Sylla',meta:'Google · 5/5',text:'« Mr Tall is the best manager… » — un accueil et un service particulièrement appréciés.'}
  ],
  en:[
    {name:'COLORS “sortez de l\'ombre” LOROUGNON Hermann',meta:'Google · 5/5',text:'Food, service and atmosphere rated 5/5.'},
    {name:'LA MAISON DU BITCOIN CÔTE D’IVOIRE',meta:'Google · 5/5',text:'Food, service and atmosphere rated 5/5.'},
    {name:'Ousman Sylla',meta:'Google · 5/5',text:'“Mr Tall is the best manager…” — warm welcome and service especially appreciated.'}
  ],
  ar:[
    {name:'COLORS «Sortez de l\'ombre» LOROUGNON Hermann',meta:'Google · 5/5',text:'الطعام والخدمة والأجواء حصلت على 5/5.'},
    {name:'LA MAISON DU BITCOIN CÔTE D’IVOIRE',meta:'Google · 5/5',text:'الطعام والخدمة والأجواء حصلت على 5/5.'},
    {name:'Ousman Sylla',meta:'Google · 5/5',text:'«Mr Tall is the best manager…» — إشادة خاصة بالترحيب وجودة الخدمة.'}
  ]
};
const favs=()=>{try{return JSON.parse(localStorage.getItem(favKey)||'[]')}catch{return[]}};
const setFavs=a=>localStorage.setItem(favKey,JSON.stringify([...new Set(a)]));
function toast(msg){let e=$('.ep-toast');if(!e){e=document.createElement('div');e.className='ep-toast';document.body.append(e)}e.textContent=msg;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1800)}
function syncFav(){const f=favs();$$('[data-ep-fav]').forEach(b=>{const on=f.includes(b.dataset.epFav);b.textContent=on?'♥':'♡';b.classList.toggle('is-favorite',on);b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',t(on?'removeFav':'addFav'))});$$('[data-ep-fav-count]').forEach(e=>{e.textContent=f.length;e.hidden=!f.length})}
function enhanceProducts(){
 $$('.product-card[data-product-id]').forEach(card=>{
  if(card.dataset.epReady)return;card.dataset.epReady='1';
  const foot=$('.product-foot',card),id=card.dataset.productId;if(!foot||!product(id))return;
  const box=document.createElement('div');box.className='ep-product-tools';
  box.innerHTML='<button type="button" class="ep-tool ep-fav" data-ep-fav="'+esc(id)+'" aria-pressed="false" aria-label="'+esc(t('addFav'))+'">♡</button><button type="button" class="ep-tool" data-ep-share="'+esc(id)+'" aria-label="'+esc(t('share'))+'">↗</button>';
  foot.insertBefore(box,foot.lastElementChild);
  $$('.product-images img',card).forEach((img,i)=>{img.dataset.epImg='1';img.dataset.epId=id;img.dataset.epIndex=i});
 });
 syncFav();
}
function shareProduct(id){const p=product(id);if(!p)return;const url=location.href.split('#')[0]+'#product-'+encodeURIComponent(id);if(navigator.share){navigator.share({title:p.name,text:p.desc||p.name,url}).then(()=>toast(t('shared'))).catch(()=>{})}else if(navigator.clipboard){navigator.clipboard.writeText(url).then(()=>toast(t('copied'))).catch(()=>{})}else window.prompt(t('share'),url)}
function lightbox(){
 if($('.ep-lightbox'))return;const el=document.createElement('div');el.className='ep-lightbox';el.hidden=true;
 el.innerHTML='<div class="ep-lb-backdrop" data-lb-close></div><section class="ep-lb-panel" role="dialog" aria-modal="true"><button class="ep-lb-close" data-lb-close>×</button><button class="ep-lb-prev">‹</button><img alt=""><button class="ep-lb-next">›</button><div class="ep-lb-caption"></div></section>';document.body.append(el);
 let st={i:0,imgs:[]};const draw=()=>{const x=st.imgs[st.i],im=$('img',el);im.src=x.src;im.alt=x.alt||'';$('.ep-lb-caption',el).textContent=(st.i+1)+' / '+st.imgs.length};
 const close=()=>{el.classList.remove('open');document.body.classList.remove('ep-modal-open');setTimeout(()=>el.hidden=true,160)};
 window.epOpenLb=(id,i)=>{const card=$$('.product-card[data-product-id]').find(c=>c.dataset.productId===id);if(!card)return;st={i:i||0,imgs:$$('.product-images img',card).map(x=>({src:x.currentSrc||x.src,alt:x.alt}))};if(!st.imgs.length)return;el.hidden=false;document.body.classList.add('ep-modal-open');draw();requestAnimationFrame(()=>el.classList.add('open'))};
 el.addEventListener('click',e=>{if(e.target.closest('[data-lb-close]'))return close();if(e.target.closest('.ep-lb-prev')){st.i=(st.i-1+st.imgs.length)%st.imgs.length;draw()}if(e.target.closest('.ep-lb-next')){st.i=(st.i+1)%st.imgs.length;draw()}});
 document.addEventListener('keydown',e=>{if(el.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')$('.ep-lb-prev',el)?.click();if(e.key==='ArrowRight')$('.ep-lb-next',el)?.click()});
}
function favoritesModal(){
 if($('.ep-favorites'))return;const el=document.createElement('div');el.className='ep-favorites';el.hidden=true;
 el.innerHTML='<div class="ep-fav-backdrop" data-fav-close></div><section class="ep-fav-panel" role="dialog" aria-modal="true"><header class="ep-fav-head"><div><div class="kicker">'+esc(t('fav'))+'</div><h2>'+esc(t('fav'))+'</h2></div><button class="icon-btn" data-fav-close>×</button></header><div class="ep-fav-list"></div></section>';document.body.append(el);
 const render=()=>{$('.ep-fav-list',el).innerHTML=favs().map(product).filter(Boolean).map(p=>'<article class="ep-fav-item"><div><strong>'+esc(p.name)+'</strong><span>'+esc(p.desc||'')+'</span></div><div><b>'+money(p.price?.[0]?.amount||0)+'</b><a class="btn btn-glass" href="'+base+'pages/'+esc(p.slug)+'.html#product-'+encodeURIComponent(p.id)+'">'+esc(t('open'))+'</a></div></article>').join('')||'<div class="empty">'+esc(t('emptyFav'))+'</div>'};
 window.epOpenFav=()=>{render();el.hidden=false;document.body.classList.add('ep-modal-open');requestAnimationFrame(()=>el.classList.add('open'))};
 const close=()=>{el.classList.remove('open');document.body.classList.remove('ep-modal-open');setTimeout(()=>el.hidden=true,160)};el.addEventListener('click',e=>{if(e.target.closest('[data-fav-close]'))close()});
}
function headerFav(){const h=$('.header-actions');if(!h||h.querySelector('[data-open-favorites]'))return;const b=document.createElement('button');b.type='button';b.className='icon-btn';b.dataset.openFavorites='1';b.setAttribute('aria-label',t('fav'));b.innerHTML='♡<span data-ep-fav-count class="ep-fav-count" hidden>0</span>';h.prepend(b)}
function mobileBar(){if($('.ep-mobile-bar'))return;const b=document.createElement('nav');b.className='ep-mobile-bar';b.innerHTML='<button data-q-search>⌕<span>'+esc(t('search'))+'</span></button><button data-q-fav>♡<span>'+esc(t('fav'))+'</span><em data-ep-fav-count hidden>0</em></button><button data-q-cart>🛍<span>'+esc(t('cart'))+'</span></button><a href="https://wa.me/'+esc(site.phoneRaw||'')+'" target="_blank" rel="noopener">◉<span>'+esc(t('whatsapp'))+'</span></a><button data-q-menu>☰<span>'+esc(t('menu'))+'</span></button>';document.body.append(b);document.body.classList.add('ep-mobile-ready')}
function reviewsBlock(){
 if(!/\/fr\/?$|\/en\/?$|\/ar\/?$|pages\/contact\.html$/.test(location.pathname)||$('.ep-reviews'))return;
 const s=document.createElement('section');s.className='section ep-reviews';
 const rateLabel=lang==='en'?'Rate us on Google':lang==='ar'?'قيّمنا على Google':'Noter El Patrón sur Google';
 const viewLabel=lang==='en'?'See all Google reviews':lang==='ar'?'عرض جميع آراء Google':'Voir tous les avis Google';
 const data=googleReviews[lang]||googleReviews.fr;
 s.innerHTML='<div class="container"><div class="section-head"><div><div class="kicker">'+esc(t('reviews'))+'</div><h2>'+esc(t('reviewsSub'))+'</h2></div><p class="section-intro">'+esc(t('count'))+'</p></div><div class="ep-reviews-grid"><article class="ep-rating-card"><strong class="ep-rating-number">4.9</strong><div class="ep-stars">★★★★★</div><b>'+esc(t('rating'))+'</b><span>'+esc(t('count'))+'</span><div class="ep-rating-actions"><a class="btn btn-primary" href="'+googleReviewUrl+'" target="_blank" rel="noopener noreferrer">'+esc(rateLabel)+'</a><a class="btn btn-glass" href="'+googleReviewUrl+'" target="_blank" rel="noopener noreferrer">'+esc(viewLabel)+'</a></div></article><div class="ep-review-quote-list">'+data.map(r=>'<article class="ep-review-quote"><div class="ep-review-stars">★★★★★</div><strong>'+esc(r.name)+'</strong><span>'+esc(r.meta)+'</span><p>'+esc(r.text)+'</p></article>').join('')+'</div></div><p class="section-intro" style="margin:18px auto 0;max-width:900px">'+esc(lang==='en'?'Reviews shown here are public Google feedback excerpts; use the buttons above to read the full listing or leave your own rating.':lang==='ar'?'الآراء المعروضة هنا مقتطفات من تقييمات Google العامة؛ استخدم الأزرار أعلاه لقراءة القائمة كاملة أو إضافة تقييمك.':'Les avis affichés ici sont des extraits d’avis Google publics ; utilisez les boutons ci-dessus pour lire la fiche complète ou laisser votre propre note.')+'</p></div>';
 const target=$('.global-search-section')||$('.contact-grid')?.parentElement?.parentElement||$('#contenu');target?.insertAdjacentElement('afterend',s);
}
function reservation(){
 if(!/\/fr\/?$|\/en\/?$|\/ar\/?$|pages\/contact\.html$/.test(location.pathname)||$('.ep-reservation'))return;const s=document.createElement('section');s.className='section ep-reservation';
 s.innerHTML='<div class="container"><div class="ep-reservation-card"><div><div class="kicker">'+esc(t('book'))+'</div><h2>'+esc(t('book'))+'</h2><p>'+esc(t('bookSub'))+'</p></div><form><label>'+esc(t('date'))+'<input type="date" name="d" required></label><label>'+esc(t('time'))+'<input type="time" name="h" required></label><label>'+esc(t('people'))+'<input type="number" name="p" min="1" max="30" value="2" required></label><button class="btn btn-primary">'+esc(t('send'))+'</button></form></div></div>';
 const target=$('.ep-reviews')||$('.contact-grid')?.parentElement?.parentElement||$('#contenu');target?.insertAdjacentElement('afterend',s);
 s.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg='Bonjour EL PATRÓN, je souhaite réserver une table.\\nDate : '+f.get('d')+'\\nHeure : '+f.get('h')+'\\nPersonnes : '+f.get('p');location.href='https://wa.me/'+(site.phoneRaw||'')+'?text='+encodeURIComponent(msg)});
}
function orderForm(){
 if(!/pages\/panier\.html$/.test(location.pathname)||$('.ep-order-info'))return;const card=$('.cart-actions')?.closest('.contact-card');if(!card)return;let saved={};try{saved=JSON.parse(localStorage.getItem(orderKey)||'{}')}catch{}
 const s=document.createElement('section');s.className='ep-order-info';s.innerHTML='<div class="kicker">'+esc(t('info'))+'</div><h3>'+esc(t('info'))+'</h3><div class="ep-order-grid"><label>'+esc(t('name'))+'<input name="n" value="'+esc(saved.n||'')+'"></label><label>'+esc(t('phone'))+'<input name="tel" inputmode="tel" value="'+esc(saved.tel||'')+'"></label><label>'+esc(t('mode'))+'<select name="m"><option value="d">'+esc(t('dine'))+'</option><option value="t">'+esc(t('take'))+'</option><option value="l">'+esc(t('delivery'))+'</option></select></label></div><label>'+esc(t('notes'))+'<textarea name="x" rows="3">'+esc(saved.x||'')+'</textarea></label><button type="button" class="btn btn-glass" data-save-order>'+esc(t('save'))+'</button>';
 $('.cart-actions',card)?.parentElement?.prepend(s);s.querySelector('[name="m"]').value=saved.m||'d';s.querySelector('[data-save-order]').onclick=()=>{localStorage.setItem(orderKey,JSON.stringify({n:s.querySelector('[name="n"]').value.trim(),tel:s.querySelector('[name="tel"]').value.trim(),m:s.querySelector('[name="m"]').value,x:s.querySelector('[name="x"]').value.trim()}));toast(t('saved'))}
}
function categoryVisual(){
 const root=$('[data-category-page]'),v=$('.menu-visual');if(!root||!v)return;
 const items=window.EL_PATRON_MENU?.[root.dataset.category]||[],src=items.find(p=>p.images?.length)?.images?.[0];
 if(!src)return;
 const url=String(src).startsWith('http')?src:(base+String(src).replace(/^\.\/?/,''));
 v.style.backgroundImage='linear-gradient(135deg,rgba(23,19,19,.12),rgba(209,31,26,.18)),url("'+url.replace(/"/g,'%22')+'")';
 v.classList.add('ep-has-category-image');
}
function quickRecs(){
 const drawer=$('.cart-panel'),bottom=$('.cart-bottom');if(!drawer||!bottom||$('.ep-recos',drawer))return;
 const all=products().filter(p=>p.price?.length&&p.price[0]?.amount);
 const picks=all.slice().sort(()=>0.5-Math.random()).slice(0,3);
 const s=document.createElement('section');s.className='ep-recos';
 s.innerHTML='<div class="ep-recos-head"><span>El Patrón</span><b>À ajouter à votre commande</b></div><div class="ep-recos-grid">'+picks.map(p=>'<a href="'+base+'pages/'+esc(p.slug)+'.html#product-'+encodeURIComponent(p.id)+'" class="ep-reco"><strong>'+esc(p.name)+'</strong><span>'+money(p.price[0].amount)+'</span></a>').join('')+'</div>';
 bottom.insertBefore(s,bottom.firstChild);
}
function metaTags(){
 const desc=document.querySelector('meta[name="description"]')?.content||'EL PATRÓN — Restaurant, Bar, Café & Salon de thé à Abidjan.';
 const canonical=document.querySelector('link[rel="canonical"]')||document.head.appendChild(Object.assign(document.createElement('link'),{rel:'canonical'}));
 canonical.href=location.href.split('#')[0];
 const vals={description:desc,'og:title':document.title||'EL PATRÓN','og:description':desc,'og:type':'restaurant','og:url':location.href.split('#')[0],'og:image':new URL(base+'images/logo.webp',location.href).href,'twitter:card':'summary_large_image','twitter:title':document.title||'EL PATRÓN','twitter:description':desc,'twitter:image':new URL(base+'images/logo.webp',location.href).href};
 Object.entries(vals).forEach(([k,v])=>{let sel=k.startsWith('og:')?{name:'property',value:k}:k.startsWith('twitter:')?{name:'name',value:k}:{name:'name',value:k};let el=document.head.querySelector('meta['+sel.name+'="'+sel.value+'"]');if(!el){el=document.createElement('meta');el.setAttribute(sel.name,sel.value);document.head.append(el)}el.content=v});
}
function status(){if($('.ep-status'))return;const m=new Date().getHours()*60+new Date().getMinutes(),open=m>=480||m<120,e=document.createElement('div');e.className='ep-status '+(open?'open':'closed');e.innerHTML='<span class="ep-status-dot"></span><div><b>'+t(open?'openNow':'closed')+'</b><span>'+t('hours')+'</span></div><a href="'+maps+'" target="_blank" rel="noopener">'+t('route')+' ↗</a>';$('.hero,.menu-hero')?.append(e)}
function schema(){if($('script[data-ep-schema]'))return;const s=document.createElement('script');s.type='application/ld+json';s.dataset.epSchema='1';s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Restaurant','name':site.name||'EL PATRÓN','url':site.site||location.origin,'telephone':site.phone||'+225 07 04 40 04 00','email':site.email||'el.patron.abidjan@gmail.com','geo':{'@type':'GeoCoordinates','latitude':5.403111,'longitude':-3.980472},'address':{'@type':'PostalAddress','addressLocality':'Abidjan','addressRegion':'Cocody','addressCountry':'CI'},'openingHoursSpecification':[0,1,2,3,4,5,6].map(d=>({'@type':'OpeningHoursSpecification','dayOfWeek':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d],'opens':'08:00','closes':'02:00'}))});document.head.append(s)}
function pwa(){if('serviceWorker' in navigator)navigator.serviceWorker.register(base+'sw.js',{scope:base}).catch(()=>{});window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();const b=document.createElement('button');b.className='ep-install';b.textContent='＋ '+t('install');b.onclick=async()=>{try{await e.prompt();await e.userChoice}catch{}b.remove()};document.body.append(b)})}
function events(){
 document.addEventListener('click',e=>{
  let b=e.target.closest('[data-ep-fav]');if(b){const f=favs(),id=b.dataset.epFav;setFavs(f.includes(id)?f.filter(x=>x!==id):[...f,id]);syncFav();toast(f.includes(id)?t('removeFav'):t('saved'));return}
  b=e.target.closest('[data-ep-share]');if(b)return shareProduct(b.dataset.epShare);
  b=e.target.closest('[data-ep-img]');if(b)return window.epOpenLb?.(b.dataset.epId,Number(b.dataset.epIndex)||0);
  if(e.target.closest('[data-open-favorites],[data-q-fav]'))return window.epOpenFav?.();
  if(e.target.closest('[data-q-cart]')){const x=$('.open-cart');if(x)x.click();else location.href=base+'pages/panier.html';return}
  if(e.target.closest('[data-q-menu]'))return $('.menu-toggle')?.click();
  if(e.target.closest('[data-q-search]')){const x=$('[data-global-home-search]')||$('[data-category-search]');if(x){x.scrollIntoView({behavior:'smooth',block:'center'});x.focus()}}
 });
 document.addEventListener('click',e=>{const b=e.target.closest('.order-whatsapp');if(!b)return;let c=[];try{c=JSON.parse(localStorage.getItem('elpatronCartV1')||'[]')}catch{};if(!c.length)return;let i={};try{i=JSON.parse(localStorage.getItem(orderKey)||'{}')}catch{};e.preventDefault();e.stopImmediatePropagation();const lines=c.map(x=>'- '+x.name+(x.variant?' — '+x.variant:'')+(x.accompaniment?' — '+x.accompaniment:'')+(x.iceFlavor?' — '+x.iceFlavor:'')+' × '+x.qty+' = '+money(x.amount*x.qty)).join('\\n');const msg='Bonjour EL PATRÓN, je souhaite passer cette commande :\\n\\n'+lines+'\\n\\nType : '+(i.m==='l'?t('delivery'):i.m==='t'?t('take'):t('dine'))+(i.n?'\\nNom : '+i.n:'')+(i.tel?'\\nTéléphone : '+i.tel:'')+(i.x?'\\nNotes : '+i.x:'')+'\\n\\nTotal : '+money(c.reduce((s,x)=>s+(Number(x.amount)||0)*(Number(x.qty)||0),0));location.href='https://wa.me/'+(site.phoneRaw||'')+'?text='+encodeURIComponent(msg)},true);
}
function init(){enhanceProducts();lightbox();favoritesModal();headerFav();mobileBar();reviewsBlock();reservation();orderForm();status();schema();metaTags();categoryVisual();quickRecs();pwa();events();syncFav();const m=new MutationObserver(enhanceProducts);m.observe(document.body,{childList:true,subtree:true});const h=location.hash.match(/^#product-(.+)$/);if(h)setTimeout(()=>{const c=$$('.product-card[data-product-id]').find(x=>x.dataset.productId===decodeURIComponent(h[1]));if(c){c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.add('ep-pulse')}},180)}
const boot=()=>setTimeout(init,60);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();