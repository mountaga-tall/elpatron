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
fr:{share:'Partager',search:'Rechercher',cart:'Panier',menu:'Menu',whatsapp:'WhatsApp',book:'Réserver une table',bookSub:'Choisissez vos détails et envoyez la demande sur WhatsApp.',date:'Date',time:'Heure',people:'Personnes',send:'Envoyer la demande',info:'Informations de commande',name:'Nom',phone:'Téléphone',mode:'Type de commande',dine:'Sur place',take:'À emporter',delivery:'Livraison',notes:'Instructions / précision',save:'Enregistrer',saved:'Enregistré',install:'Installer l’app',open:'Ouvrir',openNow:'Ouvert maintenant',closed:'Fermé',hours:'08:00 — 02:00',route:'Itinéraire',copied:'Lien copié',shared:'Partagé'},
en:{share:'Share',search:'Search',cart:'Cart',menu:'Menu',whatsapp:'WhatsApp',book:'Book a table',bookSub:'Complete the details and send the enquiry on WhatsApp.',date:'Date',time:'Time',people:'Guests',send:'Send request',info:'Order details',name:'Name',phone:'Phone',mode:'Order type',dine:'Dine in',take:'Takeaway',delivery:'Delivery',notes:'Instructions / notes',save:'Save',saved:'Saved',install:'Install app',open:'Open',openNow:'Open now',closed:'Closed',hours:'08:00 — 02:00',route:'Directions',copied:'Link copied',shared:'Shared'}
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
function mobileBar(){if($('.ep-mobile-bar'))return;const b=document.createElement('nav');b.className='ep-mobile-bar';b.innerHTML='<button data-q-search>⌕<span>'+esc(t('search'))+'</span></button><button data-q-cart>🛍<span>'+esc(t('cart'))+'</span></button><a href="https://wa.me/'+esc(site.phoneRaw||'')+'" target="_blank" rel="noopener">◉<span>'+esc(t('whatsapp'))+'</span></a><button data-q-menu>☰<span>'+esc(t('menu'))+'</span></button>';document.body.append(b);document.body.classList.add('ep-mobile-ready','ep-has-mobile-bar')}
function reservation(){
 const localizedHome=/\/(fr|en)\/?$/.test(location.pathname);
 const infoPage=/pages\/(contact|reservation)\.html$/.test(location.pathname);
 if((!localizedHome&&!infoPage)||$('.ep-reservation'))return;

 const bookingTypes=lang==='en'?[
  {value:'table',label:'Restaurant table'},
  {value:'brunch',label:'Breakfast / brunch'},
  {value:'birthday',label:'Birthday / celebration'},
  {value:'wedding',label:'Wedding / engagement'},
  {value:'family',label:'Family meal / private ceremony'},
  {value:'business-lunch',label:'Business lunch / professional meeting'},
  {value:'seminar',label:'Seminar / team building'},
  {value:'b2b',label:'B2B event / partner meeting'},
  {value:'private-hire',label:'Private venue hire'},
  {value:'other',label:'Other request'}
 ]:[
  {value:'table',label:'Table au restaurant'},
  {value:'brunch',label:'Petit-déjeuner / brunch'},
  {value:'birthday',label:'Anniversaire / célébration'},
  {value:'wedding',label:'Mariage / fiançailles'},
  {value:'family',label:'Repas de famille / cérémonie privée'},
  {value:'business-lunch',label:'Déjeuner d’affaires / rendez-vous professionnel'},
  {value:'seminar',label:'Réunion / séminaire / team building'},
  {value:'b2b',label:'Événement B2B / rencontre de partenaires'},
  {value:'private-hire',label:'Privatisation du lieu'},
  {value:'other',label:'Autre demande'}
 ];
 const copy=lang==='en'?{
  title:'Plan your reservation',intro:'Tell us what you are planning. The details below will be included in your WhatsApp enquiry.',
  occasion:'Occasion / booking type',date:'Preferred date',time:'Preferred time',people:'Number of guests',
  name:'Full name',phone:'Phone number',company:'Company / organisation (optional)',message:'Personalised message (optional)',
  namePlaceholder:'Your first and last name',phonePlaceholder:'+225 …',
  companyPlaceholder:'Company name',messagePlaceholder:'Tell us about the event, setup, services, timing or any special request…',
  submit:'Send enquiry on WhatsApp',pageCta:'Ceremonies & events',pageIntro:'Birthday, wedding, private ceremony, business meeting or B2B event: tell us what you have in mind.',
  hello:'Hello EL PATRÓN, I would like to make a reservation.',
  guests:'Guests',occasionLine:'Occasion',companyLine:'Company / organisation',messageLine:'Message',
  details:'Contact details',missing:'Please complete your name and phone number.'
 }:{
  title:'Préparer votre réservation',intro:'Décrivez votre projet. Les informations ci-dessous seront incluses dans votre demande WhatsApp.',
  occasion:'Motif / type de réservation',date:'Date souhaitée',time:'Heure souhaitée',people:'Nombre de personnes',
  name:'Nom complet',phone:'Numéro de téléphone',company:'Entreprise / organisation (facultatif)',message:'Message personnalisé (facultatif)',
  namePlaceholder:'Votre prénom et votre nom',phonePlaceholder:'+225 …',
  companyPlaceholder:'Nom de l’entreprise',messagePlaceholder:'Précisez l’événement, la disposition souhaitée, les prestations, votre budget indicatif ou toute demande particulière…',
  submit:'Envoyer la demande sur WhatsApp',pageCta:'Cérémonies & événements',pageIntro:'Anniversaire, mariage, cérémonie privée, rendez-vous professionnel ou événement B2B : expliquez-nous votre projet.',
  hello:'Bonjour EL PATRÓN, je souhaite faire une réservation.',
  guests:'Personnes',occasionLine:'Motif',companyLine:'Entreprise / organisation',messageLine:'Message personnalisé',
  details:'Coordonnées',missing:'Veuillez renseigner votre nom et votre numéro de téléphone.'
 };
 const choiceIllustrations={
  table:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 19h30M12 19l2 18m22-18-2 18M7 37h34M16 19v-6h16v6M21 13V8h6v5"/></svg>',
  brunch:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 22h23v7a9 9 0 0 1-9 9h-5a9 9 0 0 1-9-9zM32 24h4a5 5 0 0 1 0 10h-5M13 17h15M20 10v4M13 12l2 3M29 12l-2 3"/></svg>',
  birthday:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 23h34v16H7zM5 23h38l-4-9H9zM24 14V8M21 8h6M16 18v-3m16 3v-3M13 29h22M13 34h22"/></svg>',
  wedding:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="19" cy="25" r="9"/><circle cx="29" cy="25" r="9"/><path d="m19 25 5 5 8-11M11 10l2 3 3 1-3 2-2 3-2-3-3-2 3-1z"/></svg>',
  family:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="15" cy="15" r="5"/><circle cx="33" cy="15" r="5"/><circle cx="24" cy="12" r="5"/><path d="M5 34c0-7 4-11 10-11 4 0 7 2 9 6 2-4 5-6 9-6 6 0 10 4 10 11v3H5z"/></svg>',
  'business-lunch':'<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="16" width="34" height="23" rx="3"/><path d="M17 16v-5h14v5M7 25h34M20 25v5h8v-5"/></svg>',
  seminar:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="7" width="36" height="23" rx="2"/><path d="M24 30v8M16 39h16M12 23l8-7 7 4 8-8M29 12h6v6"/></svg>',
  b2b:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m7 17 8-7 9 4 4-2 13 8-7 7-6-3-5 5-5-3-4 1-7-6z"/><path d="m16 25 5 4m2-3 4 3m4-5 5 2M8 17l-3 4 7 8 4-3"/></svg>',
  'private-hire':'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 40V17L24 7l17 10v23zM18 40V27h12v13M15 20h4m10 0h4M24 16v5"/></svg>',
  other:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 5 4.5 13.5L42 23l-13.5 4.5L24 41l-4.5-13.5L6 23l13.5-4.5z"/><path d="m37 5 1.5 4.5L43 11l-4.5 1.5L37 17l-1.5-4.5L31 11l4.5-1.5z"/></svg>'
 };
 const choiceMarkup=bookingTypes.map((x,i)=>'<label class="ep-reservation-choice"><input type="radio" name="occasion" value="'+esc(x.value)+'" '+(i===0?'required':'')+'><span class="ep-reservation-choice-art" aria-hidden="true">'+choiceIllustrations[x.value]+'</span><span class="ep-reservation-choice-label">'+esc(x.label)+'</span></label>').join('');

 const s=document.createElement('section');
 s.className='section ep-reservation';
 s.innerHTML=
  '<div class="container" id="reservation">'+
   '<div class="ep-reservation-card">'+
    '<div class="ep-reservation-intro">'+
     '<div class="kicker">'+esc(copy.title)+'</div>'+
     '<h2>'+esc(copy.title)+'</h2>'+
     '<p>'+esc(copy.intro)+'</p>'+
     '<div class="ep-reservation-more"><p>'+esc(copy.pageIntro)+'</p><a class="btn btn-glass" href="'+pageHref('reservation')+'">'+esc(copy.pageCta)+' →</a></div>'+
    '</div>'+
    '<form class="ep-reservation-form" novalidate>'+
     '<fieldset class="ep-reservation-choices"><legend>'+esc(copy.occasion)+'</legend><div class="ep-reservation-choice-grid">'+choiceMarkup+'</div></fieldset>'+
     '<label>'+esc(copy.date)+'<input type="date" name="d" required></label>'+
     '<label>'+esc(copy.time)+'<input type="time" name="h" required></label>'+
     '<label>'+esc(copy.people)+'<input type="number" name="p" min="1" max="200" value="2" required></label>'+
     '<label>'+esc(copy.name)+'<input type="text" name="fullName" autocomplete="name" maxlength="100" placeholder="'+esc(copy.namePlaceholder)+'" required></label>'+
     '<label>'+esc(copy.phone)+'<input type="tel" name="phone" autocomplete="tel" inputmode="tel" maxlength="32" placeholder="'+esc(copy.phonePlaceholder)+'" required></label>'+
     '<label>'+esc(copy.company)+'<input type="text" name="company" autocomplete="organization" maxlength="120" placeholder="'+esc(copy.companyPlaceholder)+'"></label>'+
     '<label class="ep-reservation-message">'+esc(copy.message)+'<textarea name="message" rows="4" maxlength="1500" placeholder="'+esc(copy.messagePlaceholder)+'"></textarea></label>'+
     '<button class="btn btn-primary ep-reservation-submit" type="submit">'+esc(copy.submit)+'</button>'+
    '</form>'+
   '</div>'+
  '</div>';

 const dateField=$('input[name="d"]',s);
 if(dateField)dateField.min=abidjanNow().date;
 const slot=$('[data-reservation-slot]');
 const target=slot||$('.contact-grid')?.parentElement?.parentElement||$('#contenu');
 if(target){
  if(slot)slot.appendChild(s);
  else target.insertAdjacentElement('afterend',s);
  if(location.hash==='#reservation'||location.hash==='#reservation-slot')
   requestAnimationFrame(()=>s.scrollIntoView({behavior:'smooth',block:'start'}));
 }
 const form=s.querySelector('form');
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(form);
  const fullName=String(f.get('fullName')||'').trim();
  const phone=String(f.get('phone')||'').trim();
  if(!fullName||!phone){form.reportValidity();toast(copy.missing);return;}
  if(!form.reportValidity())return;
  const selected=bookingTypes.find(x=>x.value===f.get('occasion'))?.label||String(f.get('occasion')||'');
  const company=String(f.get('company')||'').trim();
  const message=String(f.get('message')||'').trim();
  const lines=[
   copy.hello,
   '',
   copy.occasionLine+': '+selected,
   copy.date+': '+f.get('d'),
   copy.time+': '+f.get('h'),
   copy.guests+': '+f.get('p'),
   '',
   copy.details+':',
   copy.name+': '+fullName,
   copy.phone+': '+phone
  ];
  if(company)lines.push(copy.companyLine+': '+company);
  if(message)lines.push('',copy.messageLine+':',message);
  const url='https://wa.me/'+(site.phoneRaw||'2250704400400')+'?text='+encodeURIComponent(lines.join('\n'));
  window.location.href=url;
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
 const label=lang==='en'?'Add to your order':'À ajouter à votre commande';
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
 if(!/\/(fr|en)\/?$/.test(location.pathname)||$('.ep-conversion-rail'))return;
 const rail=document.createElement('section');rail.className='section ep-conversion-rail';
 const labels=lang==='en'?{k:'Your next move',h:'Choose your way into El Patrón.',p:'Discover the menu, reserve a table or send your order directly on WhatsApp.',menu:'Explore the menu',book:'Book a table',wa:'Order on WhatsApp'}:{k:'Votre prochaine étape',h:'Entrez dans l’univers El Patrón.',p:'Découvrez la carte, réservez une table ou envoyez votre commande directement sur WhatsApp.',menu:'Explorer la carte',book:'Réserver une table',wa:'Commander sur WhatsApp'}
 rail.innerHTML='<div class="container"><div class="ep-conversion-grid"><div><div class="kicker">'+esc(labels.k)+'</div><h2>'+esc(labels.h)+'</h2><p>'+esc(labels.p)+'</p></div><div class="ep-conversion-actions"><a class="btn btn-primary" href="#menu">'+esc(labels.menu)+' →</a><a class="btn btn-glass" href="pages/contact.html#reservation">'+esc(labels.book)+'</a><a class="btn btn-quiet" href="https://wa.me/'+esc(site.phoneRaw||'')+'" target="_blank" rel="noopener noreferrer">'+esc(labels.wa)+'</a></div></div></div></section>';$('.hero')?.insertAdjacentElement('afterend',rail);
}
function abidjanNow(){const now=new Date();try{const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Abidjan',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now),v=k=>parts.find(p=>p.type===k)?.value||'00';return{minutes:Number(v('hour'))*60+Number(v('minute')),date:v('year')+'-'+v('month')+'-'+v('day')}}catch{return{minutes:now.getHours()*60+now.getMinutes(),date:now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0')}}}
function status(){const host=$('.site-header .header-inner');if(!host||$('.ep-status',host))return;const m=abidjanNow().minutes,open=m>=480||m<120,e=document.createElement('div');e.className='ep-status '+(open?'open':'closed');e.innerHTML='<span class="ep-status-dot" aria-hidden="true"></span><div><b>'+t(open?'openNow':'closed')+'</b><span>'+t('hours')+'</span></div><a href="'+maps+'" target="_blank" rel="noopener noreferrer">'+t('route')+' ↗</a>';const brand=$('.brand',host);if(brand)brand.insertAdjacentElement('afterend',e);else host.prepend(e)}
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
      const c=$$('.product-card[data-product-id]').find(x=>x.dataset.productId===decodeURIComponent(h[1]));
      if(c){c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.add('ep-pulse')}
    },180);
  }]
 ];
 parts.forEach(([name,fn])=>runEnhancementPart(name,fn));
}
const boot=()=>setTimeout(init,60);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();