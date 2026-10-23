(function(){
'use strict';
if(window.__EL_PATRON_ENHANCEMENTS_INIT__)return;
window.__EL_PATRON_ENHANCEMENTS_INIT__=true;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const base=$('[data-shell]')?.dataset.base||'', lang=(window.EL_PATRON_LANG||document.documentElement.lang||'fr').slice(0,2), site=window.EL_PATRON_SITE||{};
const orderKey='ep-order-v1';
let memoryOrder=window.EL_PATRON_ORDER_DETAILS||{};
const pathParts=location.pathname.split('/').filter(Boolean),localeIndex=pathParts.findIndex(part=>['fr','en'].includes(part));
const localePrefix=localeIndex>=0?'/'+pathParts.slice(0,localeIndex+1).join('/')+'/':'/';
const pageHref=slug=>localePrefix+'pages/'+slug+'.html';
function loadOrder(){try{const raw=localStorage.getItem(orderKey);if(raw!==null){const value=JSON.parse(raw);if(value&&typeof value==='object'&&!Array.isArray(value)){memoryOrder=value;window.EL_PATRON_ORDER_DETAILS=value;return value}}}catch{}return window.EL_PATRON_ORDER_DETAILS||memoryOrder}
function saveOrder(value){memoryOrder=value;window.EL_PATRON_ORDER_DETAILS=value;try{localStorage.setItem(orderKey,JSON.stringify(value))}catch{}}
const T={
fr:{fav:'Favoris',share:'Partager',search:'Rechercher',cart:'Panier',menu:'Menu',whatsapp:'WhatsApp',book:'Réserver une table',bookSub:'Choisissez votre créneau et envoyez la demande sur WhatsApp.',date:'Date',time:'Heure',people:'Personnes',send:'Envoyer la demande',info:'Informations de commande',name:'Nom',phone:'Téléphone',mode:'Type de commande',dine:'Sur place',take:'À emporter',delivery:'Livraison',notes:'Instructions / précision',save:'Enregistrer',saved:'Enregistré',install:'Installer l’app',open:'Ouvrir',emptyFav:'Aucun favori pour le moment.',openNow:'Ouvert maintenant',closed:'Fermé',hours:'08:00 — 02:00',route:'Itinéraire',copied:'Lien copié',shared:'Partagé',addFav:'Ajouter aux favoris',removeFav:'Retirer des favoris'},
en:{fav:'Favorites',share:'Share',search:'Search',cart:'Cart',menu:'Menu',whatsapp:'WhatsApp',book:'Book a table',bookSub:'Choose a time and send the request on WhatsApp.',date:'Date',time:'Time',people:'Guests',send:'Send request',info:'Order details',name:'Name',phone:'Phone',mode:'Order type',dine:'Dine in',take:'Takeaway',delivery:'Delivery',notes:'Instructions / notes',save:'Save',saved:'Saved',install:'Install app',open:'Open',emptyFav:'No favorites yet.',openNow:'Open now',closed:'Closed',hours:'08:00 — 02:00',route:'Directions',copied:'Link copied',shared:'Shared',addFav:'Add to favorites',removeFav:'Remove from favorites'},
ar:{fav:'المفضلة',share:'مشاركة',search:'بحث',cart:'السلة',menu:'القائمة',whatsapp:'واتساب',book:'حجز طاولة',bookSub:'اختر الوقت وأرسل الطلب عبر واتساب.',date:'التاريخ',time:'الوقت',people:'الأشخاص',send:'إرسال الطلب',info:'بيانات الطلب',name:'الاسم',phone:'الهاتف',mode:'نوع الطلب',dine:'في المطعم',take:'استلام',delivery:'توصيل',notes:'ملاحظات',save:'حفظ',saved:'تم الحفظ',install:'تثبيت التطبيق',open:'فتح',emptyFav:'لا توجد مفضلات بعد.',openNow:'مفتوح الآن',closed:'مغلق',hours:'08:00 — 02:00',route:'الاتجاهات',copied:'تم نسخ الرابط',shared:'تمت المشاركة',addFav:'إضافة للمفضلة',removeFav:'إزالة من المفضلة'}
};
const t=k=>T[lang]?.[k]||T.fr[k]||k, esc=s=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
const products=()=>Object.entries(window.EL_PATRON_MENU||{}).flatMap(([slug,items])=>items.filter(p=>!p.noteOnly).map(p=>({...p,slug})));
const product=id=>products().find(p=>p.id===id);
const money=n=>new Intl.NumberFormat(lang==='fr'?'fr-FR':'en-US').format(Number(n)||0)+' FCFA';
const maps='https://www.google.com/maps/search/?api=1&query=5.403111,-3.980472';
function toast(msg){let e=$('.ep-toast');if(!e){e=document.createElement('div');e.className='ep-toast';document.body.append(e)}e.textContent=msg;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1800)}
function enhanceProducts(){
 $$('.product-card[data-product-id]').forEach(card=>{
  if(card.dataset.epReady)return;card.dataset.epReady='1';
  const foot=$('.product-foot',card),id=card.dataset.productId;if(!foot||!product(id))return;
  const box=document.createElement('div');box.className='ep-product-tools';
  box.innerHTML='<button type="button" class="ep-tool" data-ep-share="'+esc(id)+'" aria-label="'+esc(t('share'))+'">↗</button>';
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
function mobileBar(){if($('.ep-mobile-bar'))return;const b=document.createElement('nav');b.className='ep-mobile-bar';b.innerHTML='<button data-q-search>⌕<span>'+esc(t('search'))+'</span></button><button data-q-cart>🛍<span>'+esc(t('cart'))+'</span></button><a href="https://wa.me/'+esc(site.phoneRaw||'')+'" target="_blank" rel="noopener">◉<span>'+esc(t('whatsapp'))+'</span></a><button data-q-menu>☰<span>'+esc(t('menu'))+'</span></button>';document.body.append(b);document.body.classList.add('ep-mobile-ready')}
function reservation(){
 if(!/\/fr\/?$|\/en\/?$|\/ar\/?$|pages\/contact\.html$|pages\/reservation\.html$/.test(location.pathname)||$('.ep-reservation'))return;
 const bookingTypes=lang==='en'?[
  {value:'table',label:'Restaurant table'},
  {value:'celebration',label:'Birthday or celebration'},
  {value:'ceremony',label:'Private ceremony'},
  {value:'professional',label:'Professional event'},
  {value:'private',label:'Private hire / other'}
 ]:lang==='ar'?[
  {value:'table',label:'طاولة في المطعم'},
  {value:'celebration',label:'عيد ميلاد أو احتفال'},
  {value:'ceremony',label:'مناسبة خاصة'},
  {value:'professional',label:'فعالية مهنية'},
  {value:'private',label:'حجز خاص / أخرى'}
 ]:[
  {value:'table',label:'Table au restaurant'},
  {value:'celebration',label:'Anniversaire ou célébration'},
  {value:'ceremony',label:'Cérémonie privée'},
  {value:'professional',label:'Événement professionnel'},
  {value:'private',label:'Privatisation / autre'}
 ];
 const occasionLabel=lang==='en'?'Booking type':lang==='ar'?'نوع الحجز':'Type de réservation';
 const pageCta=lang==='en'?'Ceremonies & events':lang==='ar'?'المناسبات والفعاليات':'Cérémonies & événements';
 const pageIntro=lang==='en'?'Planning a celebration or a professional gathering? Explore our event options.':lang==='ar'?'هل تخطط لاحتفال أو لقاء مهني؟ اكتشف خيارات مناسباتنا.':'Vous préparez une cérémonie ou un événement professionnel ? Découvrez nos possibilités.';
 const s=document.createElement('section');s.className='section ep-reservation';
 s.innerHTML='<div class="container" id="reservation"><div class="ep-reservation-card"><div class="ep-reservation-intro"><div class="kicker">'+esc(t('book'))+'</div><h2>'+esc(t('book'))+'</h2><p>'+esc(t('bookSub'))+'</p><div class="ep-reservation-more"><p>'+esc(pageIntro)+'</p><a class="btn btn-glass" href="'+pageHref('reservation')+'">'+esc(pageCta)+' →</a></div></div><form class="ep-reservation-form"><label>'+esc(occasionLabel)+'<select name="occasion" required>'+bookingTypes.map(x=>'<option value="'+esc(x.value)+'">'+esc(x.label)+'</option>').join('')+'</select></label><label>'+esc(t('date'))+'<input type="date" name="d" required></label><label>'+esc(t('time'))+'<input type="time" name="h" required></label><label>'+esc(t('people'))+'<input type="number" name="p" min="1" max="200" value="2" required></label><button class="btn btn-primary" type="submit">'+esc(t('send'))+'</button></form></div></div>';
 const dateField=$('input[name="d"]',s);if(dateField)dateField.min=abidjanNow().date;
 const slot=$('[data-reservation-slot]');
 const target=slot||$('.ep-reviews')||$('.contact-grid')?.parentElement?.parentElement||$('#contenu');
 if(target){if(slot)slot.appendChild(s);else target.insertAdjacentElement('afterend',s);if(location.hash==='#reservation'||location.hash==='#reservation-slot')requestAnimationFrame(()=>s.scrollIntoView({behavior:'smooth',block:'start'}));}
 s.querySelector('form').addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.currentTarget),selected=bookingTypes.find(x=>x.value===f.get('occasion'))?.label||f.get('occasion');
  const msg=lang==='en'?'Hello EL PATRÓN, I would like to make a reservation.\nType: '+selected+'\nDate: '+f.get('d')+'\nTime: '+f.get('h')+'\nGuests: '+f.get('p'):lang==='ar'?'مرحباً إل باترون، أود إجراء حجز.\nنوع الحجز: '+selected+'\nالتاريخ: '+f.get('d')+'\nالوقت: '+f.get('h')+'\nعدد الأشخاص: '+f.get('p'):'Bonjour EL PATRÓN, je souhaite faire une réservation.\nType : '+selected+'\nDate : '+f.get('d')+'\nHeure : '+f.get('h')+'\nPersonnes : '+f.get('p');
  location.href='https://wa.me/'+(site.phoneRaw||'')+'?text='+encodeURIComponent(msg)
 });
}
function orderForm(){
 if(!/pages\/panier\.html$/.test(location.pathname)||$('.ep-order-info'))return;const card=$('.cart-actions')?.closest('.contact-card');if(!card)return;const saved=loadOrder();
 const s=document.createElement('section');s.className='ep-order-info';s.innerHTML='<div class="kicker">'+esc(t('info'))+'</div><h3>'+esc(t('info'))+'</h3><div class="ep-order-grid"><label>'+esc(t('name'))+'<input name="n" value="'+esc(saved.n||'')+'"></label><label>'+esc(t('phone'))+'<input name="tel" inputmode="tel" value="'+esc(saved.tel||'')+'"></label><label>'+esc(t('mode'))+'<select name="m"><option value="d">'+esc(t('dine'))+'</option><option value="t">'+esc(t('take'))+'</option><option value="l">'+esc(t('delivery'))+'</option></select></label></div><label>'+esc(t('notes'))+'<textarea name="x" rows="3">'+esc(saved.x||'')+'</textarea></label><button type="button" class="btn btn-glass" data-save-order>'+esc(t('save'))+'</button>';
 $('.cart-actions',card)?.parentElement?.prepend(s);s.querySelector('[name="m"]').value=saved.m||'d';s.querySelector('[data-save-order]').onclick=()=>{saveOrder({n:s.querySelector('[name="n"]').value.trim(),tel:s.querySelector('[name="tel"]').value.trim(),m:s.querySelector('[name="m"]').value,x:s.querySelector('[name="x"]').value.trim()});toast(t('saved'))}
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
 const all=products().filter(p=>p.price?.length&&p.price[0]?.amount);let currentIds=new Set();try{currentIds=new Set(JSON.parse(localStorage.getItem('elpatronCartV1')||'[]').map(x=>x.id))}catch{}
 const picks=all.filter(p=>!currentIds.has(p.id)).slice(0,3);if(!picks.length)return;
 const label=lang==='en'?'Add to your order':lang==='ar'?'أضف إلى طلبك':'À ajouter à votre commande';
 const s=document.createElement('section');s.className='ep-recos';s.innerHTML='<div class="ep-recos-head"><span>El Patrón</span><b>'+esc(label)+'</b></div><div class="ep-recos-grid">'+picks.map(p=>'<a href="'+pageHref(p.slug)+'#product-'+encodeURIComponent(p.id)+'" class="ep-reco"><strong>'+esc(p.name)+'</strong><span>'+money(p.price[0].amount)+'</span></a>').join('')+'</div>';bottom.insertBefore(s,bottom.firstChild);
}
function metaTags(){
 const desc=document.querySelector('meta[name="description"]')?.content||'EL PATRÓN — Restaurant, Bar, Café & Salon de thé à Abidjan.';
 const canonical=document.querySelector('link[rel="canonical"]')||document.head.appendChild(Object.assign(document.createElement('link'),{rel:'canonical'}));
 const canonicalUrl=location.href.split('#')[0].split('?')[0];canonical.href=canonicalUrl;
 const vals={description:desc,'og:title':document.title||'EL PATRÓN','og:description':desc,'og:type':'restaurant','og:url':canonicalUrl,'og:image':new URL(base+'images/logo.webp',location.href).href,'twitter:card':'summary_large_image','twitter:title':document.title||'EL PATRÓN','twitter:description':desc,'twitter:image':new URL(base+'images/logo.webp',location.href).href};
 Object.entries(vals).forEach(([k,v])=>{const sel=k.startsWith('og:')?{name:'property',value:k}:k.startsWith('twitter:')?{name:'name',value:k}:{name:'name',value:k};let el=document.head.querySelector('meta['+sel.name+'="'+sel.value+'"]');if(!el){el=document.createElement('meta');el.setAttribute(sel.name,sel.value);document.head.append(el)}el.content=v});
 const parts=location.pathname.split('/').filter(Boolean),first=parts[0];if(['fr','en'].includes(first)){const rest=parts.slice(1).join('/');['fr','en'].forEach(l=>{const href=new URL('/'+l+(rest?'/'+rest:'/'),location.origin).href;let link=document.head.querySelector('link[rel="alternate"][hreflang="'+l+'"]');if(!link){link=document.createElement('link');link.rel='alternate';link.hreflang=l;document.head.append(link)}link.href=href});let x=document.head.querySelector('link[rel="alternate"][hreflang="x-default"]');if(!x){x=document.createElement('link');x.rel='alternate';x.hreflang='x-default';document.head.append(x)}x.href=new URL('/',location.origin).href}
}
function conversionRail(){
 if(!/\/fr\/?$|\/en\/?$|\/ar\/?$/.test(location.pathname)||$('.ep-conversion-rail'))return;
 const rail=document.createElement('section');rail.className='section ep-conversion-rail';
 const labels=lang==='en'?{k:'Your next move',h:'Choose your way into El Patrón.',p:'Discover the menu, reserve a table or send your order directly on WhatsApp.',menu:'Explore the menu',book:'Book a table',wa:'Order on WhatsApp'}:lang==='ar'?{k:'خطوتك التالية',h:'اختر طريقتك إلى إل باترون.',p:'اكتشف القائمة أو احجز طاولة أو أرسل طلبك مباشرة عبر واتساب.',menu:'استكشف القائمة',book:'حجز طاولة',wa:'الطلب عبر واتساب'}:{k:'Votre prochaine étape',h:'Entrez dans l’univers El Patrón.',p:'Découvrez la carte, réservez une table ou envoyez votre commande directement sur WhatsApp.',menu:'Explorer la carte',book:'Réserver une table',wa:'Commander sur WhatsApp'};
 rail.innerHTML='<div class="container"><div class="ep-conversion-grid"><div><div class="kicker">'+esc(labels.k)+'</div><h2>'+esc(labels.h)+'</h2><p>'+esc(labels.p)+'</p></div><div class="ep-conversion-actions"><a class="btn btn-primary" href="#menu">'+esc(labels.menu)+' →</a><a class="btn btn-glass" href="pages/contact.html#reservation">'+esc(labels.book)+'</a><a class="btn btn-quiet" href="https://wa.me/'+esc(site.phoneRaw||'')+'" target="_blank" rel="noopener noreferrer">'+esc(labels.wa)+'</a></div></div></div></section>';$('.hero')?.insertAdjacentElement('afterend',rail);
}
function abidjanNow(){const now=new Date();try{const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Abidjan',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now),v=k=>parts.find(p=>p.type===k)?.value||'00';return{minutes:Number(v('hour'))*60+Number(v('minute')),date:v('year')+'-'+v('month')+'-'+v('day')}}catch{return{minutes:now.getHours()*60+now.getMinutes(),date:now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0')}}}
function status(){if($('.ep-status'))return;const m=abidjanNow().minutes,open=m>=480||m<120,e=document.createElement('div');e.className='ep-status '+(open?'open':'closed');e.innerHTML='<span class="ep-status-dot"></span><div><b>'+t(open?'openNow':'closed')+'</b><span>'+t('hours')+'</span></div><a href="'+maps+'" target="_blank" rel="noopener">'+t('route')+' ↗</a>';$('.hero,.menu-hero')?.append(e)}
function schema(){if($('script[data-ep-schema]'))return;const s=document.createElement('script');s.type='application/ld+json';s.dataset.epSchema='1';s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Restaurant','name':site.name||'EL PATRÓN','url':site.site||location.origin,'telephone':site.phone||'+225 07 04 40 04 00','email':site.email||'el.patron.abidjan@gmail.com','geo':{'@type':'GeoCoordinates','latitude':5.403111,'longitude':-3.980472},'address':{'@type':'PostalAddress','addressLocality':'Abidjan','addressRegion':'Cocody','addressCountry':'CI'},'sameAs':[site.facebook,site.instagram,site.tiktok].filter(Boolean),'openingHoursSpecification':[0,1,2,3,4,5,6].map(d=>({'@type':'OpeningHoursSpecification','dayOfWeek':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d],'opens':'08:00','closes':'02:00'}))});document.head.append(s)}
function pwa(){if('serviceWorker' in navigator)navigator.serviceWorker.register(base+'sw.js',{scope:base}).catch(()=>{});window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();const b=document.createElement('button');b.className='ep-install';b.textContent='＋ '+t('install');b.onclick=async()=>{try{await e.prompt();await e.userChoice}catch{}b.remove()};document.body.append(b)})}
function events(){
 document.addEventListener('click',e=>{
  let b=e.target.closest('[data-ep-share]');if(b)return shareProduct(b.dataset.epShare);
  b=e.target.closest('[data-ep-img]');if(b)return window.epOpenLb?.(b.dataset.epId,Number(b.dataset.epIndex)||0);
  
  if(e.target.closest('[data-q-cart]')){const x=$('.open-cart');if(x)x.click();else location.href=pageHref('panier');return}
  if(e.target.closest('[data-q-menu]'))return $('.menu-toggle')?.click();
  if(e.target.closest('[data-q-search]')){const x=$('[data-global-home-search]')||$('[data-category-search]');if(x){x.scrollIntoView({behavior:'smooth',block:'center'});x.focus()}}
 });


}
window.EL_PATRON_ENHANCEMENTS_STATUS=window.EL_PATRON_ENHANCEMENTS_STATUS||{};
function runEnhancementPart(name,fn){
 try{
  fn();
  window.EL_PATRON_ENHANCEMENTS_STATUS[name]='ok';
 }catch(error){
  window.EL_PATRON_ENHANCEMENTS_STATUS[name]='error';
  console.error('EL PATRÓN enhancement ['+name+']:',error);
 }
}
function init(){
 const parts=[
  ['products',enhanceProducts],
  ['lightbox',lightbox],
  ['mobile-bar',mobileBar],
  ['reservation',reservation],
  ['order-form',orderForm],
  ['conversion-rail',conversionRail],
  ['opening-status',status],
  ['structured-data',schema],
  ['metadata',metaTags],
  ['category-visual',categoryVisual],
  ['cart-recommendations',quickRecs],
  ['pwa',pwa],
  ['click-events',events],
  ['product-observer',()=>{const m=new MutationObserver(enhanceProducts);m.observe(document.body,{childList:true,subtree:true})}],
  ['product-deep-link',()=>{
    const h=location.hash.match(/^#product-(.+)$/);
    if(h)setTimeout(()=>{
      const c=$('.product-card[data-product-id]').find(x=>x.dataset.productId===decodeURIComponent(h[1]));
      if(c){c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.add('ep-pulse')}
    },180);
  }]
 ];
 parts.forEach(([name,fn])=>runEnhancementPart(name,fn));
}
const boot=()=>setTimeout(init,60);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();