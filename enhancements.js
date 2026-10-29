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
fr:{share:'Partager',search:'Rechercher',cart:'Panier',menu:'Menu',whatsapp:'WhatsApp',book:'Réserver une table',bookSub:'Choisissez vos détails et envoyez la demande sur WhatsApp.',date:'Date',time:'Heure',people:'Personnes',send:'Envoyer la demande',info:'Informations de commande',name:'Nom',phone:'Téléphone',mode:'Type de commande',dine:'Sur place',take:'À emporter',delivery:'Livraison',notes:'Instructions / précision',save:'Enregistrer',saved:'Enregistré',address:'Adresse de livraison',addressPlaceholder:'Quartier, rue, repère…',orderDetailsMissing:'Renseignez votre nom et votre téléphone.',invalidPhone:'Vérifiez le numéro de téléphone.',deliveryAddressRequired:'Ajoutez l’adresse de livraison.',comboKicker:'À composer',comboTitle:'Composez votre formule',comboIntro:'Choisissez un plat et une boisson. Le total reprend les tarifs affichés sur la carte, sans remise automatique.',comboFood:'Plat principal',comboDrink:'Boisson',comboFoodVariant:'Format / option',comboDrinkVariant:'Format / option',comboChoose:'Choisissez…',comboTotal:'Total calculé',comboSubmit:'Ajouter la formule au panier',comboNotice:'Prix calculé à partir de la carte actuelle. Aucune remise n’est appliquée automatiquement.',comboXL:'Passer en XL (+4 000 FCFA)',comboInvalid:'Choisissez un plat, un format et une boisson.',comboAdded:'Les articles de votre formule ont été ajoutés au panier.',install:'Installer l’app',installTitle:'Installer EL PATRÓN',installIntro:'Ajoutez EL PATRÓN à l’écran d’accueil pour retrouver le menu comme une application.',installAndroidTitle:'Installation sur Android',installAndroidPromptStep:'Touchez « Installer maintenant » pour ouvrir la fenêtre d’installation Android.',installAndroidMenuStep:'Dans Chrome, ouvrez le menu ⋮ puis choisissez « Installer l’application » ou « Installer et créer un raccourci », puis confirmez.',installAndroidHint:'Si l’option n’apparaît pas, ouvrez le site dans Google Chrome et vérifiez que la connexion est sécurisée (HTTPS).',installIosTitle:'Installation sur iPhone / iPad',installIosStep1:'Ouvrez cette page dans Safari (ou Chrome sur iOS).',installIosStep2:'Touchez Partager, puis « Sur l’écran d’accueil ».',installIosStep3:'Activez « Ouvrir comme app web » si l’option est proposée, puis touchez Ajouter.',installDesktopTitle:'Installation sur ordinateur',installDesktopStep1:'Dans Chrome, ouvrez le menu ⋮, puis « Cast, enregistrer et partager » → « Installer la page en tant qu’application ».',installDesktopStep2:'Vous pouvez aussi utiliser l’icône Installer dans la barre d’adresse si elle apparaît.',installNow:'Installer maintenant',installClose:'Fermer',open:'Ouvrir',openNow:'Ouvert maintenant',closed:'Fermé',hours:'08:00 — 02:00',route:'Itinéraire',copied:'Lien copié',shared:'Partagé'},
en:{share:'Share',search:'Search',cart:'Cart',menu:'Menu',whatsapp:'WhatsApp',book:'Book a table',bookSub:'Complete the details and send the enquiry on WhatsApp.',date:'Date',time:'Time',people:'Guests',send:'Send request',info:'Order details',name:'Name',phone:'Phone',mode:'Order type',dine:'Dine in',take:'Takeaway',delivery:'Delivery',notes:'Instructions / notes',save:'Save',saved:'Saved',address:'Delivery address',addressPlaceholder:'Area, street, landmark…',orderDetailsMissing:'Enter your name and phone number.',invalidPhone:'Check the phone number.',deliveryAddressRequired:'Add the delivery address.',comboKicker:'Build your own',comboTitle:'Build your own combo',comboIntro:'Choose a main dish and a drink. The total uses current menu prices; no automatic discount is applied.',comboFood:'Main dish',comboDrink:'Drink',comboFoodVariant:'Size / option',comboDrinkVariant:'Size / option',comboChoose:'Choose…',comboTotal:'Calculated total',comboSubmit:'Add combo to cart',comboNotice:'Calculated from the current menu prices. No automatic discount is applied.',comboXL:'Upgrade taco to XL (+4,000 FCFA)',comboInvalid:'Choose a main dish, option and drink.',comboAdded:'Your combo items were added to the cart.',install:'Install app',installTitle:'Install EL PATRÓN',installIntro:'Add EL PATRÓN to your Home Screen for quick access, just like an app.',installAndroidTitle:'Install on Android',installAndroidPromptStep:'Tap “Install now” to open Android’s installation prompt.',installAndroidMenuStep:'In Chrome, open the ⋮ menu, choose “Install app” or “Install and create shortcut”, then confirm.',installAndroidHint:'If no install option appears, open this website in Google Chrome and make sure the connection is secure (HTTPS).',installIosTitle:'Install on iPhone / iPad',installIosStep1:'Open this page in Safari (or Chrome on iOS).',installIosStep2:'Tap Share, then “Add to Home Screen”.',installIosStep3:'Turn on “Open as Web App” if offered, then tap Add.',installDesktopTitle:'Install on your computer',installDesktopStep1:'In Chrome, open the ⋮ menu, then “Cast, save and share” → “Install page as app”.',installDesktopStep2:'You can also use the Install icon in the address bar if it appears.',installNow:'Install now',installClose:'Close',open:'Open',openNow:'Open now',closed:'Closed',hours:'08:00 — 02:00',route:'Directions',copied:'Link copied',shared:'Shared'}
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
function mobileBar(){
 if($('.ep-mobile-bar'))return;
 const b=document.createElement('nav');b.className='ep-mobile-bar';b.setAttribute('aria-label',lang==='en'?'Quick navigation':'Navigation rapide');
 b.innerHTML='<button type="button" data-q-search aria-label="'+esc(t('search'))+'">⌕<span>'+esc(t('search'))+'</span></button><button type="button" data-q-cart aria-label="'+esc(t('cart'))+'">🛍<span>'+esc(t('cart'))+'</span><em data-q-cart-count hidden>0</em></button><a href="https://wa.me/'+esc(site.phoneRaw||'')+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(t('whatsapp'))+'">◉<span>'+esc(t('whatsapp'))+'</span></a><button type="button" data-q-menu aria-label="'+esc(t('menu'))+'">☰<span>'+esc(t('menu'))+'</span></button>';
 document.body.append(b);document.body.classList.add('ep-mobile-ready','ep-has-mobile-bar');
 const syncCount=()=>{let count=0;try{const v=JSON.parse(localStorage.getItem('elpatronCartV1')||'[]');if(Array.isArray(v))count=v.reduce((n,i)=>n+(Number(i.qty)||0),0)}catch{}const badge=$('[data-q-cart-count]',b);if(badge){badge.textContent=String(count);badge.hidden=count===0}const btn=$('[data-q-cart]',b);if(btn)btn.setAttribute('aria-label',count?(lang==='en'?'Cart, '+count+' items':'Panier, '+count+' articles'):t('cart'))};
 syncCount();window.addEventListener('elpatron:cart-updated',syncCount);
}

function formulaBuilder(){
 if(!/\/(fr|en)\/?$/.test(location.pathname)||$('.ep-formula-builder'))return;
 const categoryGrid=$('.category-grid'),anchor=categoryGrid?.closest('.section');if(!anchor)return;
 const foodSlugs=new Set(['pizzas','burgers','tacos-kebab','pastas','snack','manaiches']);
 const drinkSlugs=new Set(['softs','boissons-smoothies','boissons-chaudes','cocktails-sans-alcool']);
 const foods=products().filter(p=>foodSlugs.has(p.slug)&&!p.noteOnly&&Array.isArray(p.price)&&p.price.length);
 const drinks=products().filter(p=>drinkSlugs.has(p.slug)&&!p.noteOnly&&Array.isArray(p.price)&&p.price.length);
 if(!foods.length||!drinks.length)return;
 const copy={k:t('comboKicker'),title:t('comboTitle'),intro:t('comboIntro'),food:t('comboFood'),drink:t('comboDrink'),fv:t('comboFoodVariant'),dv:t('comboDrinkVariant'),choose:t('comboChoose'),total:t('comboTotal'),submit:t('comboSubmit'),notice:t('comboNotice'),xl:t('comboXL'),invalid:t('comboInvalid'),added:t('comboAdded')};
 const chooseProduct=(items,attr)=>'<select data-combo-'+attr+' required><option value="">'+esc(copy.choose)+'</option>'+items.map(p=>{const a=p.price.map(o=>Number(o.amount)).filter(Number.isFinite),min=a.length?Math.min(...a):0;return '<option value="'+esc(p.id)+'">'+esc(p.name)+' — '+esc(money(min))+'</option>'}).join('')+'</select>';
 const section=document.createElement('section');section.className='section ep-formula-builder';section.id='formules';
 section.innerHTML='<div class="container"><div class="section-head"><div><div class="kicker">'+esc(copy.k)+'</div><h2>'+esc(copy.title)+'</h2></div><p class="section-intro">'+esc(copy.intro)+'</p></div>'+
 '<div class="ep-combo-card"><form data-combo-form><div class="ep-combo-grid">'+
 '<label>'+esc(copy.food)+chooseProduct(foods,'food')+'</label>'+
 '<label>'+esc(copy.fv)+'<select data-combo-food-variant required disabled><option value="">'+esc(copy.choose)+'</option></select></label>'+
 '<div class="ep-combo-upgrade" data-combo-upgrade hidden><label><input type="checkbox" data-combo-xl> <span>'+esc(copy.xl)+'</span></label></div>'+
 '<label>'+esc(copy.drink)+chooseProduct(drinks,'drink')+'</label>'+
 '<label>'+esc(copy.dv)+'<select data-combo-drink-variant required disabled><option value="">'+esc(copy.choose)+'</option></select></label>'+
 '</div><div class="ep-combo-summary"><span>'+esc(copy.total)+'</span><strong data-combo-total aria-live="polite">—</strong></div><p class="ep-combo-notice">'+esc(copy.notice)+'</p><button type="submit" class="btn btn-primary">'+esc(copy.submit)+'</button></form></div></div>';
 anchor.insertAdjacentElement('afterend',section);
 const form=$('[data-combo-form]',section),foodSel=$('[data-combo-food]',section),foodVar=$('[data-combo-food-variant]',section),drinkSel=$('[data-combo-drink]',section),drinkVar=$('[data-combo-drink-variant]',section),xlWrap=$('[data-combo-upgrade]',section),xlCheck=$('[data-combo-xl]',section),total=$('[data-combo-total]',section);
 const foodById=id=>foods.find(p=>p.id===id)||null,drinkById=id=>drinks.find(p=>p.id===id)||null;
 const fill=(select,p)=>{const entries=p?.price||[];select.innerHTML='<option value="">'+esc(copy.choose)+'</option>'+entries.map((o,i)=>'<option value="'+i+'">'+esc(o.label||((lang==='en'?'Option ':'Option ')+(i+1)))+' — '+esc(money(o.amount))+'</option>').join('');select.disabled=!entries.length;if(entries.length===1)select.value='0'};
 const tacoXL=id=>{const m=String(id||'').match(/^tacos-kebab-([1-6])$/);return m?'tacos-kebab-'+(Number(m[1])+6):''};
 const chosenFood=()=>{const p=foodById(foodSel.value);if(!p)return null;if(xlCheck.checked){const id=tacoXL(p.id),q=id?(foodById(id)||product(id)):null;if(q?.price?.[0])return{product:q,index:0,amount:Number(q.price[0].amount)}}const i=Number(foodVar.value),o=Number.isInteger(i)?p.price?.[i]:null;return o?{product:p,index:i,amount:Number(o.amount)}:null};
 const chosenDrink=()=>{const p=drinkById(drinkSel.value),i=Number(drinkVar.value),o=Number.isInteger(i)?p?.price?.[i]:null;return o?{product:p,index:i,amount:Number(o.amount)}:null};
 const update=()=>{const f=chosenFood(),d=chosenDrink();total.textContent=f&&d?money(f.amount+d.amount):'—'};
 foodSel.addEventListener('change',()=>{const p=foodById(foodSel.value);fill(foodVar,p);xlWrap.hidden=!tacoXL(p?.id);xlCheck.checked=false;update()});
 foodVar.addEventListener('change',update);xlCheck.addEventListener('change',update);
 drinkSel.addEventListener('change',()=>{fill(drinkVar,drinkById(drinkSel.value));update()});drinkVar.addEventListener('change',update);
 form.addEventListener('submit',e=>{e.preventDefault();const f=chosenFood(),d=chosenDrink();if(!f||!d||typeof window.EL_PATRON_ADD_FROM_COMBO!=='function'){toast(copy.invalid);return}if(!window.EL_PATRON_ADD_FROM_COMBO(f.product.id,f.index))return;if(!window.EL_PATRON_ADD_FROM_COMBO(d.product.id,d.index))return;toast(copy.added)});
}

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
  details:'Contact details',missing:'Please complete your name and phone number.',phoneInvalid:'Enter a valid phone number.',pastDate:'Choose today or a future date.',pastTime:'Choose a future time.'
 }:{
  title:'Préparer votre réservation',intro:'Décrivez votre projet. Les informations ci-dessous seront incluses dans votre demande WhatsApp.',
  occasion:'Motif / type de réservation',date:'Date souhaitée',time:'Heure souhaitée',people:'Nombre de personnes',
  name:'Nom complet',phone:'Numéro de téléphone',company:'Entreprise / organisation (facultatif)',message:'Message personnalisé (facultatif)',
  namePlaceholder:'Votre prénom et votre nom',phonePlaceholder:'+225 …',
  companyPlaceholder:'Nom de l’entreprise',messagePlaceholder:'Précisez l’événement, la disposition souhaitée, les prestations, votre budget indicatif ou toute demande particulière…',
  submit:'Envoyer la demande sur WhatsApp',pageCta:'Cérémonies & événements',pageIntro:'Anniversaire, mariage, cérémonie privée, rendez-vous professionnel ou événement B2B : expliquez-nous votre projet.',
  hello:'Bonjour EL PATRÓN, je souhaite faire une réservation.',
  guests:'Personnes',occasionLine:'Motif',companyLine:'Entreprise / organisation',messageLine:'Message personnalisé',
  details:'Coordonnées',missing:'Veuillez renseigner votre nom et votre numéro de téléphone.',phoneInvalid:'Veuillez vérifier le numéro de téléphone.',pastDate:'Choisissez la date du jour ou une date future.',pastTime:'Choisissez une heure future.'
 };
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
     '<label>'+esc(copy.occasion)+'<select name="occasion" required>'+bookingTypes.map(x=>'<option value="'+esc(x.value)+'">'+esc(x.label)+'</option>').join('')+'</select></label>'+
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

 const dateField=$('input[name="d"]',s),timeField=$('input[name="h"]',s),phoneField=$('input[name="phone"]',s);
 if(dateField)dateField.min=abidjanNow().date;
 const syncTimeMinimum=()=>{
  if(!dateField||!timeField)return;
  const now=abidjanNow(),clock=String(Math.floor(now.minutes/60)).padStart(2,'0')+':'+String(now.minutes%60).padStart(2,'0');
  dateField.setCustomValidity(dateField.value&&dateField.value<now.date?copy.pastDate:'');
  if(dateField.value===now.date)timeField.min=clock;else timeField.removeAttribute('min');
  timeField.setCustomValidity(dateField.value===now.date&&timeField.value&&timeField.value<clock?copy.pastTime:'');
 };
 dateField?.addEventListener('change',syncTimeMinimum);timeField?.addEventListener('change',syncTimeMinimum);
 phoneField?.addEventListener('input',()=>phoneField.setCustomValidity(''));syncTimeMinimum();
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
  syncTimeMinimum();if(phoneField)phoneField.setCustomValidity(phone.replace(/\D/g,'').length<8?copy.phoneInvalid:'');
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
 if(!/pages\/panier\.html$/.test(location.pathname)||$('.ep-order-info'))return;
 const card=$('.cart-actions')?.closest('.contact-card');if(!card)return;
 const saved=loadOrder(),s=document.createElement('section');
 s.className='ep-order-info';
 s.innerHTML='<div class="kicker">'+esc(t('info'))+'</div><h3>'+esc(t('info'))+'</h3>'+
  '<div class="ep-order-grid">'+
   '<label>'+esc(t('name'))+'<input name="n" autocomplete="name" maxlength="100" value="'+esc(saved.n||'')+'"></label>'+
   '<label>'+esc(t('phone'))+'<input name="tel" type="tel" autocomplete="tel" inputmode="tel" maxlength="32" value="'+esc(saved.tel||'')+'"></label>'+
   '<label>'+esc(t('mode'))+'<select name="m"><option value="d">'+esc(t('dine'))+'</option><option value="t">'+esc(t('take'))+'</option><option value="l">'+esc(t('delivery'))+'</option></select></label>'+
  '</div>'+
  '<label class="ep-delivery-address" data-delivery-address>'+esc(t('address'))+'<input name="a" autocomplete="street-address" maxlength="220" placeholder="'+esc(t('addressPlaceholder'))+'" value="'+esc(saved.a||'')+'"></label>'+
  '<label>'+esc(t('notes'))+'<textarea name="x" rows="3" maxlength="1000">'+esc(saved.x||'')+'</textarea></label>'+
  '<button type="button" class="btn btn-glass" data-save-order>'+esc(t('save'))+'</button>';
 const host=$('.cart-actions',card)?.parentElement;if(host)host.prepend(s);
 const mode=$('[name="m"]',s),address=$('[name="a"]',s);mode.value=saved.m||'d';
 const syncAddress=()=>{const needed=mode.value==='l';$('[data-delivery-address]',s).hidden=!needed;address.required=needed};
 const collect=()=>({n:$('[name="n"]',s).value.trim(),tel:$('[name="tel"]',s).value.trim(),m:mode.value,a:address.value.trim(),x:$('[name="x"]',s).value.trim()});
 syncAddress();mode.addEventListener('change',syncAddress);
 $('[data-save-order]',s).onclick=()=>{
  const v=collect();
  if(!v.n){toast(t('orderDetailsMissing'));$('[name="n"]',s).focus();return}
  if(v.tel.replace(/\D/g,'').length<8){toast(t('invalidPhone'));$('[name="tel"]',s).focus();return}
  if(v.m==='l'&&!v.a){toast(t('deliveryAddressRequired'));address.focus();return}
  saveOrder(v);syncAddress();toast(t('saved'));
 };
}
function categoryVisual(){
 const root=$('[data-category-page]'),v=$('.menu-visual');if(!root||!v)return;
 const items=window.EL_PATRON_MENU?.[root.dataset.category]||[],src=items.find(p=>p.images?.length)?.images?.[0];
 if(!src)return;
 const url=String(src).startsWith('http')?src:(base+String(src).replace(/^\.\/?/,''));
 v.style.backgroundImage='linear-gradient(135deg,rgba(23,19,19,.12),rgba(209,31,26,.18)),url("'+url.replace(/"/g,'%22')+'")';
 v.classList.add('ep-has-category-image');
}
function metaTags(){
 const desc=document.querySelector('meta[name="description"]')?.content||'EL PATRÓN — Restaurant, Bar, Café & Salon de thé à Abidjan.';
 const canonical=document.querySelector('link[rel="canonical"]')||document.head.appendChild(Object.assign(document.createElement('link'),{rel:'canonical'}));
 const canonicalUrl=location.href.split('#')[0].split('?')[0];canonical.href=canonicalUrl;
 const vals={description:desc,'og:title':document.title||'EL PATRÓN','og:description':desc,'og:type':'restaurant','og:url':canonicalUrl,'og:image':new URL(base+'images/logo.webp',location.href).href,'twitter:card':'summary_large_image','twitter:title':document.title||'EL PATRÓN','twitter:description':desc,'twitter:image':new URL(base+'images/logo.webp',location.href).href};
 Object.entries(vals).forEach(([k,v])=>{const sel=k.startsWith('og:')?{name:'property',value:k}:k.startsWith('twitter:')?{name:'name',value:k}:{name:'name',value:k};let el=document.head.querySelector('meta['+sel.name+'="'+sel.value+'"]');if(!el){el=document.createElement('meta');el.setAttribute(sel.name,sel.value);document.head.append(el)}el.content=v});
 [['apple-mobile-web-app-capable','yes'],['mobile-web-app-capable','yes'],['apple-mobile-web-app-status-bar-style','black-translucent'],['apple-mobile-web-app-title','EL PATRÓN']].forEach(([name,content])=>{let el=document.head.querySelector('meta[name="'+name+'"]');if(!el){el=document.createElement('meta');el.name=name;document.head.append(el)}el.content=content});
 let appleIcon=document.head.querySelector('link[rel="apple-touch-icon"]');
 if(!appleIcon){appleIcon=document.createElement('link');appleIcon.rel='apple-touch-icon';document.head.append(appleIcon)}
 appleIcon.sizes='180x180';appleIcon.href=new URL(base+'images/logo.png',location.href).href;
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
let deferredInstallPrompt=null;
window.addEventListener('beforeinstallprompt',event=>{
 event.preventDefault();
 deferredInstallPrompt=event;
 window.dispatchEvent(new Event('ep:install-available'));
});
function pwa(){
 if('serviceWorker' in navigator)navigator.serviceWorker.register(base+'sw.js',{scope:base}).catch(()=>{});
 const standalone=window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true;
 if(standalone||$('.ep-install'))return;
 const ua=navigator.userAgent||'';
 const platform=(/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))?'ios':(/Android/i.test(ua)?'android':'desktop');
 const launcher=document.createElement('button');
 launcher.type='button';launcher.className='ep-install';launcher.textContent='＋ '+t('install');
 launcher.setAttribute('aria-haspopup','dialog');launcher.setAttribute('aria-label',t('install'));
 document.body.append(launcher);
 const dialog=document.createElement('div');
 dialog.className='ep-install-dialog';dialog.hidden=true;dialog.setAttribute('aria-hidden','true');
 dialog.innerHTML='<div class="ep-install-backdrop" data-ep-install-close></div><section class="ep-install-panel" role="dialog" aria-modal="true" aria-labelledby="ep-install-title" tabindex="-1"><button type="button" class="ep-install-close" data-ep-install-close aria-label="'+esc(t('installClose'))+'">×</button><div class="ep-install-kicker">EL PATRÓN</div><h2 id="ep-install-title">'+esc(t('installTitle'))+'</h2><p class="ep-install-intro">'+esc(t('installIntro'))+'</p><div class="ep-install-guide" data-ep-install-guide></div><div class="ep-install-actions"><button type="button" class="btn btn-glass" data-ep-install-close>'+esc(t('installClose'))+'</button><button type="button" class="btn btn-primary" data-ep-install-now hidden>'+esc(t('installNow'))+'</button></div></section>';
 document.body.append(dialog);
 const guide=$('[data-ep-install-guide]',dialog),installNow=$('[data-ep-install-now]',dialog),;
 function renderGuide(){
  let title,steps;
  if(platform==='ios'){
   title=t('installIosTitle');steps=[t('installIosStep1'),t('installIosStep2'),t('installIosStep3')];
   installNow.hidden=true;
  }else if(platform==='android'){
   title=t('installAndroidTitle');
   steps=[deferredInstallPrompt?t('installAndroidPromptStep'):t('installAndroidMenuStep'),t('installAndroidHint')];
   installNow.hidden=!deferredInstallPrompt;
  }else{
   title=t('installDesktopTitle');steps=[t('installDesktopStep1'),t('installDesktopStep2')];
   installNow.hidden=!deferredInstallPrompt;
  }
  guide.innerHTML='<h3>'+esc(title)+'</h3><ol>'+steps.map(step=>'<li>'+esc(step)+'</li>').join('')+'</ol>';
 }
 function closeDialog(){
  if(dialog.hidden)return;
  dialog.classList.remove('open');dialog.setAttribute('aria-hidden','true');document.body.classList.remove('ep-install-open');
  window.setTimeout(()=>{dialog.hidden=true;if(document.contains(launcher))launcher.focus()},180);
 }
 function openDialog(){
  renderGuide();dialog.hidden=false;dialog.setAttribute('aria-hidden','false');document.body.classList.add('ep-install-open');
  requestAnimationFrame(()=>dialog.classList.add('open'));$('.ep-install-close',dialog)?.focus();
 }
 launcher.addEventListener('click',openDialog);
 dialog.addEventListener('click',event=>{if(event.target.closest('[data-ep-install-close]'))closeDialog()});
 installNow.addEventListener('click',async()=>{
  const installEvent=deferredInstallPrompt;
  if(!installEvent){renderGuide();return}
  deferredInstallPrompt=null;installNow.disabled=true;
  try{
   await installEvent.prompt();
   const result=await installEvent.userChoice;
   if(result?.outcome==='accepted'){closeDialog();launcher.remove();return}
  }catch(error){}
  finally{installNow.disabled=false;renderGuide()}
 });
 window.addEventListener('ep:install-available',renderGuide);
 window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;closeDialog();launcher.remove()});
 document.addEventListener('keydown',event=>{
  if(dialog.hidden||!dialog.classList.contains('open'))return;
  if(event.key==='Escape'){event.preventDefault();closeDialog();return}
  if(event.key==='Tab'){
   const focusable=$$('button:not([hidden]):not(:disabled)',dialog);
   if(!focusable.length)return;
   const first=focusable[0],last=focusable[focusable.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
 });
 renderGuide();
}
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
  ['formula-builder',formulaBuilder],
   ['reservation',reservation],
  ['order-form',orderForm],
  ['conversion-rail',conversionRail],
  ['opening-status',status],
  ['structured-data',schema],
  ['metadata',metaTags],
  ['category-visual',categoryVisual],
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