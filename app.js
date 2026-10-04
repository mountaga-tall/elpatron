(function(){
  'use strict';
  const KEY='elpatronCartV1';
  const LANG=(window.EL_PATRON_LANG||document.documentElement.lang||'fr').toLowerCase().slice(0,2);
  const tx=s=>window.EL_PATRON_TEXT?window.EL_PATRON_TEXT(s):s;
  const UI={
    fr:{home:'Accueil',cart:'Panier',contact:'Contact',openCart:'Ouvrir le panier',openMenu:'Ouvrir le menu',closeMenu:'Fermer le menu',menuMobile:'Menu mobile',search:'Rechercher dans le menu…',searchLabel:'Rechercher dans tout le menu',launchSearch:'Lancer la recherche',emptyCart:'Votre panier est vide.',emptyStart:'Votre panier est vide. Ajoutez une spécialité El Patrón pour commencer.',removeOne:'Retirer un article',addOne:'Ajouter un article',delete:'Supprimer',yourCart:'Votre panier',closeCart:'Fermer le panier',total:'Total',orderWhatsApp:'Commander sur WhatsApp',orderGlovo:'Commander sur Glovo',viewCart:'Voir le panier',customize:'Personnalisez votre choix',options:'Options',chooseSide:'Choisissez votre accompagnement',chooseFlavor:'Choisissez votre parfum de glace',included:'Inclus',cancel:'Annuler',addToCart:'Ajouter au panier',side:'Accompagnement',flavor:'Parfum',request:'Sur demande',noProduct:'Aucun produit ne correspond à',noResults:'Aucun résultat pour',result:'résultat',results:'résultats',from:'À partir de',discover:'Découvrir',imagesOf:'Images de',image:'image',houseDescription:'Composition selon la recette El Patrón.',officialInfo:'Voir les informations pratiques',menu:'Menu',query:'Recherche',footerIntro:'Une carte généreuse et une expérience El Patrón à Abidjan.',cannotAdd:'Ce produit ne peut pas être ajouté au panier'},
    en:{home:'Home',cart:'Cart',contact:'Contact',openCart:'Open cart',openMenu:'Open menu',closeMenu:'Close menu',menuMobile:'Mobile menu',search:'Search the menu…',searchLabel:'Search the full menu',launchSearch:'Start search',emptyCart:'Your cart is empty.',emptyStart:'Your cart is empty. Add an El Patrón specialty to get started.',removeOne:'Remove one item',addOne:'Add one item',delete:'Delete',yourCart:'Your cart',closeCart:'Close cart',total:'Total',orderWhatsApp:'Order on WhatsApp',orderGlovo:'Order on Glovo',viewCart:'View cart',customize:'Customize your choice',options:'Options',chooseSide:'Choose your side',chooseFlavor:'Choose your ice-cream flavor',included:'Included',cancel:'Cancel',addToCart:'Add to cart',side:'Side',flavor:'Flavor',request:'On request',noProduct:'No product matches',noResults:'No results for',result:'result',results:'results',from:'From',discover:'Discover',imagesOf:'Images of',image:'image',houseDescription:'Prepared according to the El Patrón recipe.',officialInfo:'View practical information',menu:'Menu',query:'Search',footerIntro:'A generous menu and the El Patrón experience in Abidjan.',cannotAdd:'This product cannot be added to the cart'},
    ar:{home:'الرئيسية',cart:'السلة',contact:'اتصل بنا',openCart:'فتح السلة',openMenu:'فتح القائمة',closeMenu:'إغلاق القائمة',menuMobile:'القائمة للجوال',search:'ابحث في القائمة…',searchLabel:'ابحث في القائمة كاملة',launchSearch:'بدء البحث',emptyCart:'سلتك فارغة.',emptyStart:'سلتك فارغة. أضف أحد أصناف إل باترون للبدء.',removeOne:'إزالة قطعة',addOne:'إضافة قطعة',delete:'حذف',yourCart:'سلتك',closeCart:'إغلاق السلة',total:'الإجمالي',orderWhatsApp:'الطلب عبر واتساب',orderGlovo:'الطلب عبر Glovo',viewCart:'عرض السلة',customize:'خصّص اختيارك',options:'الخيارات',chooseSide:'اختر الطبق الجانبي',chooseFlavor:'اختر نكهة الآيس كريم',included:'مشمول',cancel:'إلغاء',addToCart:'أضف إلى السلة',side:'الطبق الجانبي',flavor:'النكهة',request:'عند الطلب',noProduct:'لا يوجد منتج يطابق',noResults:'لا توجد نتائج لـ',result:'نتيجة',results:'نتائج',from:'ابتداءً من',discover:'اكتشف',imagesOf:'صور',image:'صورة',houseDescription:'محضّر وفق وصفة إل باترون.',officialInfo:'عرض المعلومات العملية',menu:'القائمة',query:'البحث',footerIntro:'قائمة غنية وتجربة إل باترون في أبيدجان.',cannotAdd:'لا يمكن إضافة هذا المنتج إلى السلة'}
  };
  const t=k=>UI[LANG]?.[k]||UI.fr[k]||k;
  const siteSubtitle=LANG==='en'?'Restaurant · Bar · Café · Tea Room':LANG==='ar'?'مطعم · بار · مقهى · صالون شاي':'Restaurant · Bar · Café · Salon de thé';
  const addedSuffix=LANG==='en'?' added to cart':LANG==='ar'?' تمت إضافته إلى السلة':' ajouté au panier';
  const FREE_ACCOMPANIMENT_IDS=new Set([
    'plats-1','plats-2','plats-3','plats-4','plats-5','plats-6','plats-7','plats-8','plats-9','plats-10','plats-11','plats-12','plats-13','plats-14','plats-15',
    'grill-1','grill-2','grill-3','grill-4','grill-5','grill-6',
    'poulet-1','poulet-2','poulet-3','poulet-4','poulet-5'
  ]);
  const ACCOMPANIMENTS=['Alloco','Attiéké','Frites','Purée de pommes de terre','Pommes de terre sautées','Riz nature','Riz curry','Riz sauce tomate'];
  const ICE_FLAVORS=['Vanille','Américain','Fraise','Malaga','Café','Menthe Chocolat','Chocolat Noir','Plombière','Yaourt Fraise'];
  const ICE_PATTERN=/\bboules?\s+de\s+(?:glace|ice cream)\b|\bscoops?\s+of\s+ice cream\b|\bboules?\s+de\s+(?:آيس كريم|الآيس كريم)\b|كرات\s+(?:من\s+)?الآيس كريم/i;
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const money=n=>(LANG==='ar'?new Intl.NumberFormat('ar-EG',{useGrouping:true}).format(Number(n)||0):new Intl.NumberFormat('fr-FR').format(Number(n)||0))+' FCFA';
  const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const loadCart=()=>{try{const c=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(c)?c:[]}catch{return[]}};
  const saveCart=c=>localStorage.setItem(KEY,JSON.stringify(c));
  const totalQty=c=>c.reduce((a,i)=>a+(Number(i.qty)||0),0);
  const totalPrice=c=>c.reduce((a,i)=>a+(Number(i.amount)||0)*(Number(i.qty)||0),0);
  function esc(s){return String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
  const escAttr=esc;
  function assetUrl(src){
    const value=String(src??'').trim();
    if(!value||/^(?:https?:|data:|blob:|\/)/i.test(value))return value;
    const root=$('[data-shell]');
    const base=root?.dataset.base||'';
    return base+value.replace(/^\.\/?/,'');
  }
  function productImageMarkup(p){
    const images=Array.isArray(p.images)?p.images.filter(Boolean).slice(0,2):[];
    if(!images.length)return '';
    return `<div class="product-images" aria-label="${escAttr(t('imagesOf')+' '+p.name)}">${images.map((src,i)=>`<img src="${escAttr(assetUrl(src))}" alt="${escAttr(p.name)} — ${t('image')} ${i+1}" loading="lazy" decoding="async" onerror="this.closest('.product-images')?.classList.add('image-error')">`).join('')}</div>`;
  }
  function defaultPriceOnly(p,options){
    return Boolean(p.defaultPriceOnly)||((options?.[0]?.label||'')===''&&options.length===1);
  }
  function priceMarkup(p){
    const options=p.price||[];
    if(!options.length)return t('request');
    const first=options[0];
    const small=!defaultPriceOnly(p,options)&&first.label?`<small>${esc(first.label)}</small>`:'';
    return money(first.amount)+small;
  }
  function productCardShellClasses(p){
    return Array.isArray(p.images)&&p.images.some(Boolean)?' has-images':'';
  }
  function hasIceChoice(p,categorySlug){
    if(categorySlug!=='desserts')return false;
    const text=`${p.name||''} ${p.desc||''}`;
    if(/milkshake/i.test(text))return false;
    return ICE_PATTERN.test(text);
  }
  function needsAccompaniment(p){return FREE_ACCOMPANIMENT_IDS.has(p.id)}
  function cartKey(product,option,meta={}){
    return JSON.stringify([product.id,option?.label||'',Number(option?.amount)||0,meta.accompaniment||'',meta.iceFlavor||'']);
  }
  function optionSummary(option,meta={}){
    const parts=[];
    if(option?.label)parts.push(option.label);
    if(meta.accompaniment)parts.push(t('side')+' : '+tx(meta.accompaniment));
    if(meta.iceFlavor)parts.push(t('flavor')+' : '+tx(meta.iceFlavor));
    return parts.join(' · ');
  }
  function addToCart(product,option,meta={}){
    const chosen=option||product.price?.[0];
    if(!chosen){showToast(t('cannotAdd'));return}
    const normalizedMeta={
      accompaniment:meta.accompaniment||'',
      iceFlavor:meta.iceFlavor||''
    };
    const cart=loadCart();
    const key=cartKey(product,chosen,normalizedMeta);
    const idx=cart.findIndex(i=>i.key===key);
    if(idx>-1)cart[idx].qty=(Number(cart[idx].qty)||0)+1;
    else cart.push({
      key,
      id:product.id,
      name:product.name,
      label:optionSummary(chosen,normalizedMeta),
      variant:chosen.label||'',
      accompaniment:normalizedMeta.accompaniment,
      iceFlavor:normalizedMeta.iceFlavor,
      amount:Number(chosen.amount)||0,
      qty:1
    });
    saveCart(cart);updateCartBadge();showToast(product.name+addedSuffix);
  }
  function updateCartBadge(){
    const count=totalQty(loadCart());
    $$('.cart-badge').forEach(b=>{b.textContent=count;b.hidden=count===0});
    $$('.cart-count-text').forEach(e=>e.textContent=count);
  }
  function localizedCartProduct(i){
    const all=Object.values(window.EL_PATRON_MENU||{}).flat();
    return all.find(p=>p.id===i.id)||null;
  }
  function cartMeta(i){
    const product=localizedCartProduct(i);
    const option=product?.price?.find(o=>Number(o.amount)===Number(i.amount));
    const parts=[];
    if(option?.label)parts.push(tx(option.label));
    else if(i.variant)parts.push(tx(i.variant));
    if(i.accompaniment)parts.push(t('side')+' : '+tx(i.accompaniment));
    if(i.iceFlavor)parts.push(t('flavor')+' : '+tx(i.iceFlavor));
    return parts.join(' · ');
  }
  function cartLine(i){
    const product=localizedCartProduct(i);
    const name=product?.name||i.name;
    return `<article class="cart-item"><div class="cart-item-row"><div><div class="cart-item-name">${esc(name)}</div><div class="cart-item-meta">${cartMeta(i)?esc(cartMeta(i))+' · ':''}${money(i.amount)}</div></div><strong>${money(i.amount*i.qty)}</strong></div><div class="qty"><button type="button" data-cart-action="dec" data-key="${escAttr(i.key)}" aria-label="${escAttr(t('removeOne'))}">−</button><b>${i.qty}</b><button type="button" data-cart-action="inc" data-key="${escAttr(i.key)}" aria-label="${escAttr(t('addOne'))}">+</button><button type="button" class="cart-remove" data-cart-action="del" data-key="${escAttr(i.key)}" aria-label="${escAttr(t('delete')+' '+name)}" title="${escAttr(t('delete'))}">${ICONS.trash}</button></div></article>`;
  }
  function renderCart(){
    const list=$('.cart-items');if(!list)return;
    const cart=loadCart();
    list.innerHTML=cart.length?cart.map(cartLine).join(''):`<div class="empty">${esc(t('emptyStart'))}</div>`;
    const total=totalPrice(cart);
    $$('.cart-total').forEach(e=>e.textContent=money(total));
    $$('.cart-count-text').forEach(e=>e.textContent=totalQty(cart));
  }
  function openCart(){$('.cart-drawer')?.classList.add('open');renderCart()}
  function closeCart(){$('.cart-drawer')?.classList.remove('open')}
  function showToast(t){const e=$('.toast');if(!e)return;e.textContent=t;e.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>e.classList.remove('show'),1800)}
  function orderWhatsApp(){
    const cart=loadCart();
    if(!cart.length){showToast(t('emptyCart'));return}
    let msg=LANG==='en'?'Hello EL PATRÓN,\n\nI would like to order:\n':LANG==='ar'?'مرحباً إل باترون،\n\nأرغب في طلب:\n':'Bonjour EL PATRÓN,\n\nJe souhaite commander :\n';
    cart.forEach(i=>{
      const meta=cartMeta(i);
      const product=localizedCartProduct(i);\n      const name=product?.name||i.name;\n      msg+=`- ${name}${meta?' ('+meta+')':''} × ${i.qty} = ${money(i.amount*i.qty)}\n`;
    });
    msg+=`\n${LANG==='en'?'Total':LANG==='ar'?'الإجمالي':'Total'} : ${money(totalPrice(cart))}\n\n${LANG==='en'?'Thank you.':LANG==='ar'?'شكراً لكم.':'Merci.'}`;
    const phone=window.EL_PATRON_SITE?.phoneRaw;
    if(phone){location.href='https://wa.me/'+phone+'?text='+encodeURIComponent(msg);return}
    showToast(LANG==='en'?'WhatsApp number unavailable':LANG==='ar'?'رقم واتساب غير متوفر':'Numéro WhatsApp indisponible');
  }
  function setupCart(){
    $$('.open-cart').forEach(b=>b.addEventListener('click',openCart));
    $$('.close-cart,.cart-backdrop').forEach(b=>b.addEventListener('click',closeCart));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'){
        closeCart();
        closeProductOptions();
        window.closeMobile?.();
      }
    });
    document.addEventListener('click',e=>{
      const a=e.target.closest('[data-cart-action]');if(!a)return;
      const key=a.dataset.key,cart=loadCart(),idx=cart.findIndex(i=>i.key===key);if(idx<0)return;
      if(a.dataset.cartAction==='inc')cart[idx].qty=(Number(cart[idx].qty)||0)+1;
      if(a.dataset.cartAction==='dec'){cart[idx].qty=(Number(cart[idx].qty)||0)-1;if(cart[idx].qty<=0)cart.splice(idx,1)}
      if(a.dataset.cartAction==='del')cart.splice(idx,1);
      saveCart(cart);renderCart();updateCartBadge();
      if(location.pathname.endsWith('/panier.html'))renderFullCart();
    });
    $$('.order-whatsapp').forEach(b=>b.addEventListener('click',orderWhatsApp));
    updateCartBadge();
  }
  function searchMarkup(){
    return `<form class="site-search" data-global-search-form role="search"><span class="site-search-icon">${ICONS.search}</span><input type="search" name="q" placeholder="${escAttr(t('search'))}" aria-label="${escAttr(t('searchLabel'))}"><button type="submit" aria-label="${escAttr(t('launchSearch'))}">${ICONS.arrow}</button></form>`;
  }
  function renderHeader(){
    const root=$('[data-shell]');if(!root)return;
    const cats=window.EL_PATRON_CATEGORIES||[];
    const pathParts=location.pathname.split('/').filter(Boolean);
    const inPages=pathParts[pathParts.length-2]==='pages';
    const pageBase=inPages?'../':'';
    const homeHref=pageBase||'./';
    const categoryHref=slug=>pageBase+'pages/'+slug+'.html';
    const contactHref=pageBase+'pages/contact.html';
    const cartHref=pageBase+'pages/panier.html';
    const brandHref=homeHref;
    const homeLabel=LANG==='en'?'El Patrón — home':LANG==='ar'?'إل باترون — الرئيسية':'El Patrón — accueil';
    root.insertAdjacentHTML('afterbegin',`<header class="site-header"><div class="header-inner"><a class="brand" href="${brandHref}" aria-label="${escAttr(homeLabel)}"><img src="${root.dataset.logo||'images/logo.png'}" alt="El Patrón"><div class="brand-text"><div class="brand-title">EL PATRÓN</div><div class="brand-sub">${esc(siteSubtitle)}</div></div></a><div class="header-actions"><button type="button" class="icon-btn open-cart" aria-label="${escAttr(t('openCart'))}">${ICONS.bag}<span class="cart-badge" hidden>0</span></button><button type="button" class="icon-btn red menu-toggle" aria-label="${escAttr(t('openMenu'))}">${ICONS.menu}</button></div></div></header><div class="mobile-menu" aria-hidden="true"><div class="mobile-menu-head"><a class="brand" href="${brandHref}" aria-label="${escAttr(homeLabel)}"><img src="${root.dataset.logo||'images/logo.png'}" alt="El Patrón"><div class="brand-text"><div class="brand-title">EL PATRÓN</div><div class="brand-sub">${esc(siteSubtitle)}</div></div></a><button type="button" class="icon-btn close-mobile" aria-label="${escAttr(t('closeMenu'))}">${ICONS.close}</button></div><div class="mobile-search-wrap">${searchMarkup()}</div><nav class="mobile-links" aria-label="${escAttr(t('menuMobile'))}"><a href="${homeHref}">${esc(t('home'))}</a>${cats.map(c=>`<a href="${categoryHref(c.slug)}">${esc(c.title)}</a>`).join('')}<a href="${cartHref}">${esc(t('cart'))} <span class="cart-count-text">0</span></a><a href="${contactHref}">${esc(t('contact'))}</a></nav></div>`);
    document.body.insertAdjacentHTML('beforeend',`<div class="cart-drawer"><div class="cart-backdrop"></div><aside class="cart-panel" aria-label="${escAttr(t('cart'))}"><div class="cart-head"><h2>${esc(t('yourCart'))}</h2><button type="button" class="icon-btn close-cart" aria-label="${escAttr(t('closeCart'))}">${ICONS.close}</button></div><div class="cart-items"></div><div class="cart-bottom"><div class="total-row"><span>${esc(t('total'))}</span><span class="cart-total">0 FCFA</span></div><div class="cart-actions"><button type="button" class="btn btn-primary order-whatsapp">${ICONS.wa}<span>${esc(t('orderWhatsApp'))}</span></button><a class="btn btn-glass" href="${cartHref}">${esc(t('viewCart'))}</a></div></div></aside></div><div class="product-options-modal" hidden><div class="product-options-backdrop" data-options-close></div><section class="product-options-panel" role="dialog" aria-modal="true" aria-labelledby="options-title"><button type="button" class="icon-btn product-options-close" data-options-close aria-label="${escAttr(t('closeMenu'))}">${ICONS.close}</button><div class="kicker">${esc(t('customize'))}</div><h2 id="options-title">${esc(t('options'))}</h2><p class="product-options-product" data-options-product></p><form class="product-options-form"><div class="product-option-group" data-accompaniment-group hidden><div class="product-option-label">${esc(t('chooseSide'))} <span>0 F</span></div><div class="product-option-grid" data-accompaniment-list></div></div><div class="product-option-group" data-ice-group hidden><div class="product-option-label">${esc(t('chooseFlavor'))} <span>${esc(t('included'))}</span></div><div class="product-option-grid" data-ice-list></div></div><div class="product-options-actions"><button type="button" class="btn btn-glass" data-options-close>${esc(t('cancel'))}</button><button type="submit" class="btn btn-primary">${esc(t('addToCart'))}</button></div></form></section></div><div class="toast" role="status" aria-live="polite"></div><a class="floating-whatsapp" target="_blank" rel="noopener" href="https://wa.me/${window.EL_PATRON_SITE?.phoneRaw||''}" aria-label="WhatsApp"><span class="wa-dot">${ICONS.wa}</span><span class="wa-label">WhatsApp</span></a>`);
    $$('[data-global-search-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const q=new FormData(form).get('q')?.toString().trim()||'';location.href=homeHref+(q?'?q='+encodeURIComponent(q):'')+'#recherche'}));
    const menu=$('.mobile-menu'),toggle=$('.menu-toggle');
    toggle?.addEventListener('click',()=>{menu?.classList.add('open');menu?.setAttribute('aria-hidden','false');document.body.classList.add('menu-open')});
    const closeMobile=()=>{menu?.classList.remove('open');menu?.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open')};
    $$('.close-mobile,.mobile-links a').forEach(x=>x.addEventListener('click',closeMobile));
    window.closeMobile=closeMobile;
    setupProductOptions();
  }
  function setupProductOptions(){
    const modal=$('.product-options-modal');
    if(!modal||modal.dataset.ready==='true')return;
    modal.dataset.ready='true';
    const form=$('.product-options-form',modal);
    const productName=$('[data-options-product]',modal);
    const accompGroup=$('[data-accompaniment-group]',modal);
    const accompList=$('[data-accompaniment-list]',modal);
    const iceGroup=$('[data-ice-group]',modal);
    const iceList=$('[data-ice-list]',modal);
    let state=null;
    let closeTimer=0;
    function buildButtons(list,values,name){
      list.innerHTML=values.map((value,i)=>`<button type="button" class="modal-choice ${i===0?'selected':''}" data-choice-name="${escAttr(name)}" data-choice-value="${escAttr(value)}" aria-pressed="${i===0?'true':'false'}">${esc(tx(value))}</button>`).join('');
    }
    function open(product,option,categorySlug){
      clearTimeout(closeTimer);
      const hasAcc=needsAccompaniment(product),hasIce=hasIceChoice(product,categorySlug);
      if(!hasAcc&&!hasIce){addToCart(product,option);return}
      state={product,option,categorySlug,accompaniment:hasAcc?ACCOMPANIMENTS[0]:'',iceFlavor:hasIce?ICE_FLAVORS[0]:''};
      productName.textContent=product.name;
      accompGroup.hidden=!hasAcc;iceGroup.hidden=!hasIce;
      if(hasAcc)buildButtons(accompList,ACCOMPANIMENTS,'accompaniment');else accompList.innerHTML='';
      if(hasIce)buildButtons(iceList,ICE_FLAVORS,'iceFlavor');else iceList.innerHTML='';
      modal.hidden=false;
      requestAnimationFrame(()=>modal.classList.add('open'));
      document.body.classList.add('options-open');
      setTimeout(()=>$('.modal-choice',modal)?.focus(),50);
    }
    function close(){
      if(modal.hidden)return;
      modal.classList.remove('open');
      document.body.classList.remove('options-open');
      closeTimer=window.setTimeout(()=>{modal.hidden=true;state=null;closeTimer=0},260);
    }
    modal.addEventListener('click',e=>{
      const choice=e.target.closest('.modal-choice');
      if(choice){
        const group=choice.closest('.product-option-group');
        $$('.modal-choice',group).forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false')});
        choice.classList.add('selected');choice.setAttribute('aria-pressed','true');
        if(state)state[choice.dataset.choiceName]=choice.dataset.choiceValue;
        return;
      }
      if(e.target.closest('[data-options-close]'))close();
    });
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!state)return;
      addToCart(state.product,state.option,{accompaniment:state.accompaniment,iceFlavor:state.iceFlavor});
      close();
    });
    window.openProductOptions=open;
    window.closeProductOptions=close;
  }
  function productCard(p,idx,categoryTitle,categorySlug){
    if(p.noteOnly)return `<article class="product-note reveal"><div class="product-note-kicker">${esc(categoryTitle)}</div><div class="product-note-title">${esc(p.name)}</div><p>${esc(p.desc)}</p></article>`;
    const options=p.price||[],hasPrice=options.length>0;
    const currentPrice=priceMarkup(p);
    const optionsMarkup=options.length>1?`<div class="option-list">${options.map((o,i)=>`<button type="button" class="option-pill ${i===0?'selected':''}" data-option-index="${i}" aria-pressed="${i===0?'true':'false'}">${o.label?esc(o.label)+' · ':''}${money(o.amount)}</button>`).join('')}</div>`:'';
    const imageMarkup=productImageMarkup(p);
    const addButton=hasPrice?`<button type="button" class="add-btn" data-add="true" aria-label="${escAttr(t('addToCart')+' '+p.name)}">${ICONS.plus}</button>`:'';
    return `<article class="product-card reveal tilt${productCardShellClasses(p)}" style="--reveal-delay:${Math.min(idx,10)*45}ms" data-product-id="${escAttr(p.id)}" data-category-slug="${escAttr(categorySlug)}">${imageMarkup}<div class="product-top">${p.sub?`<span class="sub-chip">${esc(p.sub)}</span>`:''}<div class="product-name">${esc(p.name)}</div></div><div class="product-body"><p class="product-desc">${esc(p.desc||t('houseDescription'))}</p>${p.note?`<div class="product-note-inline">${esc(p.note)}</div>`:''}${optionsMarkup}<div class="product-foot"><div class="price" data-price>${currentPrice}</div>${addButton}</div></div></article>`;
  }
  function bindProductButtons(scope,items,categorySlug){
    $$('.product-card',scope).forEach(card=>{
      const p=items.find(x=>x.id===card.dataset.productId);if(!p)return;
      let selected=0;
      $$('.option-pill',card).forEach((b,i)=>b.addEventListener('click',()=>{
        selected=i;
        $$('.option-pill',card).forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false')});
        b.classList.add('selected');b.setAttribute('aria-pressed','true');
        const price=$('[data-price]',card);if(price)price.innerHTML=money(p.price[i].amount)+(p.price[i].label?'<small>'+esc(p.price[i].label)+'</small>':'');
      }));
      $('[data-add]',card)?.addEventListener('click',()=>{
        const option=p.price[selected]||p.price?.[0];
        if(window.openProductOptions&&(needsAccompaniment(p)||hasIceChoice(p,categorySlug)))window.openProductOptions(p,option,categorySlug);
        else addToCart(p,option);
      });
    });
  }
  function renderPageMeta(){
    const root=$('[data-category-page]');if(!root)return;
    const slug=root.dataset.category,cats=window.EL_PATRON_CATEGORIES||[],cat=cats.find(c=>c.slug===slug);if(!cat)return;
    const grid=$('.product-grid'),count=$('.result-count'),search=$('[data-category-search]');
    if(!grid)return;
    $('.page-kicker').textContent=cat.kicker||cat.title.toUpperCase();
    $('.page-title').textContent=cat.title;
    $('.page-intro').textContent=cat.description;
    document.title=cat.title+' · EL PATRÓN';
    let noteBox=$('.category-note');if(!noteBox){noteBox=document.createElement('div');noteBox.className='category-note';grid.insertAdjacentElement('afterend',noteBox)}
    noteBox.textContent=cat.note||'';noteBox.hidden=!cat.note;
    const items=window.EL_PATRON_MENU?.[slug]||[];
    function draw(filter=''){
      const normalized=normalize(filter);
      const visible=items.filter(p=>normalize([p.name,p.desc,p.sub].filter(Boolean).join(' ')).includes(normalized));
      const products=visible.filter(p=>!p.noteOnly);
      count.textContent=`${products.length} ${products.length>1?t('results'):t('result')}`;
      grid.innerHTML=visible.length?visible.map((p,idx)=>productCard(p,idx,cat.title,slug)).join(''):`<div class="empty">${esc(t('noProduct')+' « '+filter+' ».')}</div>`;
      bindProductButtons(grid,items,slug);observeReveals(grid);bindTilts(grid);
    }
    search?.addEventListener('input',e=>draw(e.target.value));
    draw();
  }
  function renderGlobalSearch(){
    const host=$('.global-results'),input=$('[data-global-home-search]');if(!host||!input)return;
    const q=new URLSearchParams(location.search).get('q')||'';
    input.value=q;
    const all=Object.entries(window.EL_PATRON_MENU||{}).flatMap(([slug,items])=>{
      const cat=(window.EL_PATRON_CATEGORIES||[]).find(c=>c.slug===slug);
      return items.filter(p=>!p.noteOnly).map(p=>({...p,categorySlug:slug,categoryTitle:cat?.title||slug}));
    });
    function draw(value){
      const n=normalize(value);
      if(!n){host.hidden=true;host.innerHTML='';return}
      const matches=all.filter(p=>normalize([p.name,p.desc,p.categoryTitle].join(' ')).includes(n));
      host.hidden=false;
      host.innerHTML=matches.length?`<div class="global-results-head"><span>${matches.length} ${matches.length>1?t('results'):t('result')}</span><span>${esc(t('query'))} : « ${esc(value)} »</span></div><div class="product-grid">${matches.map((p,i)=>`<article class="product-card reveal${productCardShellClasses(p)}" style="--reveal-delay:${Math.min(i,10)*35}ms">${productImageMarkup(p)}<div class="product-top"><div class="product-name">${esc(p.name)}</div></div><div class="product-body"><p class="product-desc">${esc(p.desc||'')}</p><div class="product-foot"><div class="price">${p.price.length===1?money(p.price[0].amount):t('from')+' '+money(Math.min(...p.price.map(x=>x.amount)))}</div><a class="add-btn" href="pages/${escAttr(p.categorySlug)}.html" aria-label="${escAttr(t('discover')+' '+p.name)}">${ICONS.arrow}</a></div></div></article>`).join('')}</div>`:`<div class="empty">${esc(t('noResults')+' « '+value+' ».')}</div>`;
      observeReveals(host);
    }
    input.addEventListener('input',e=>draw(e.target.value));
    if(q){draw(q);setTimeout(()=>document.querySelector('#recherche')?.scrollIntoView({behavior:'smooth',block:'start'}),80)}else draw('');
  }
  function renderHome(){
    const grid=$('.category-grid'),cats=window.EL_PATRON_CATEGORIES||[];
    if(grid)grid.innerHTML=cats.map(c=>`<a class="category-card reveal tilt" href="pages/${c.slug}.html"><div class="category-icon">${categoryIcon(c.icon)}</div><div class="category-arrow">${ICONS.arrow}</div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p></a>`).join('');
    const fgrid=$('.featured-grid'),featured=['burgers','pizzas','plats','grill','cocktails-sans-alcool','desserts'];
    if(fgrid){
      const arr=[];featured.forEach(slug=>(window.EL_PATRON_MENU?.[slug]||[]).filter(x=>!x.noteOnly).slice(0,2).forEach(x=>arr.push({p:x,slug})));
      fgrid.innerHTML=arr.map((entry,i)=>{const p=entry.p;return `<article class="product-card reveal tilt${productCardShellClasses(p)}" style="--reveal-delay:${Math.min(i,10)*35}ms">${productImageMarkup(p)}<div class="product-top"><div class="product-name">${esc(p.name)}</div></div><div class="product-body"><p class="product-desc">${esc(p.desc||t('houseDescription'))}</p><div class="product-foot"><div class="price">${p.price.length===1?money(p.price[0].amount):t('from')+' '+money(Math.min(...p.price.map(x=>x.amount)))}</div><a class="add-btn" href="pages/${entry.slug}.html" aria-label="${escAttr(t('discover')+' '+p.name)}">${ICONS.arrow}</a></div></div></article>`}).join('');
    }
    renderGlobalSearch();
  }
  function categoryIcon(name){
    const s={egg:'<path d="M12 5c3.8 0 6 3 6 6.2A6 6 0 1 1 6 11.2C6 8 8.2 5 12 5Z"/>',manakish:'<path d="M5 18h14M6 15h12M8 12h8M10 9h4M12 5v2"/>',salad:'<path d="M5 12h14a7 7 0 0 1-14 0Z"/><path d="M8 8c1-2 2-3 4-3M12 7c1-2 3-3 4-3"/>',spark:'<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/>',sandwich:'<path d="M4 9h16M5 15h14M7 5h10M7 19h10"/>',burger:'<path d="M4 10c1-4 4-6 8-6s7 2 8 6"/><path d="M4 10h16M5 14h14M7 18h10"/>',taco:'<path d="M5 17a7 7 0 0 1 14 0c-4 2-10 2-14 0Z"/><path d="M8 13c1-2 3-2 4 0M13 13c1-2 3-2 4 0"/>',pasta:'<path d="M5 7h14M7 7c0 6 4 10 5 10s5-4 5-10"/><path d="M9 5h6"/>',plate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',grill:'<path d="M5 9h14l-2 8H7L5 9Z"/><path d="M8 5v4M12 5v4M16 5v4"/><path d="M9 19h6"/>',chicken:'<path d="M8 9c0-3 3-5 6-4 3 .8 4 4 2 6l-3 3-3 3c-2 2-6 0-5-3 .4-1.2 1.5-1.9 3-2Z"/>',plus:'<path d="M12 5v14M5 12h14"/>',pizza:'<path d="m4 5 16 7-12 7Z"/><circle cx="11" cy="11" r="1"/><circle cx="15" cy="13" r="1"/>',coffee:'<path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2M8 4c-1 1 1 2 0 3M12 4c-1 1 1 2 0 3"/>',drink:'<path d="M8 4h8l-1 16H9L8 4Z"/><path d="M8 8h8"/>',beer:'<path d="M8 6h8v12H8z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2"/>',dessert:'<path d="M6 16h12l-1 4H7l-1-4Z"/><path d="M8 12a4 4 0 0 1 8 0H8Z"/>',mocktail:'<path d="M7 5h10l-2 7v5H9v-5L7 5Z"/><path d="M6 20h12"/>',shisha:'<path d="M9 5h6M12 5v7M8 12h8M9 12v6h6v-6"/><path d="M15 6c3 0 4 2 4 4"/>',smoothie:'<path d="M8 4h8l-1 16H9L8 4Z"/><path d="M10 2h4M12 4v-2"/>',cocktail:'<path d="M6 5h12l-6 7v4"/><path d="M9 21h6M12 16v5"/>',shot:'<path d="M8 8h8l-1 11H9L8 8Z"/><path d="M9 5h6"/>',wine:'<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M12 13v7M9 20h6"/>'};
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${s[name]||s.spark}</svg>`;
  }
  function renderFooter(){
    const root=$('[data-shell]');if(!root)return;
    const cats=window.EL_PATRON_CATEGORIES||[],pathParts=location.pathname.split('/').filter(Boolean),inPages=pathParts[pathParts.length-2]==='pages',base=inPages?'../':'./';
    document.body.insertAdjacentHTML('beforeend',`<footer class="footer"><div class="container"><div class="footer-grid"><div><h3>EL PATRÓN</h3><p>${esc(siteSubtitle)}. ${esc(t('footerIntro'))}</p><div class="socials"><a href="${window.EL_PATRON_SITE?.facebook||'#'}" target="_blank" rel="noopener" aria-label="Facebook">${ICONS.facebook}</a><a href="${window.EL_PATRON_SITE?.instagram||'#'}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a><a href="${window.EL_PATRON_SITE?.tiktok||'#'}" target="_blank" rel="noopener" aria-label="TikTok">${ICONS.tiktok}</a></div></div><div><h3>${esc(t('menu'))}</h3><div class="footer-links footer-menu-links">${cats.map(c=>`<a href="${base}pages/${c.slug}.html">${esc(c.title)}</a>`).join('')}<a href="${base}pages/panier.html">${esc(t('cart'))}</a></div></div><div><h3>${esc(t('contact'))}</h3><div class="footer-links"><a href="tel:${window.EL_PATRON_SITE?.phoneRaw||''}">${esc(window.EL_PATRON_SITE?.phone||'')}</a><a href="mailto:${window.EL_PATRON_SITE?.email||''}">${esc(window.EL_PATRON_SITE?.email||'')}</a><a href="${window.EL_PATRON_SITE?.glovo||'#'}" target="_blank" rel="noopener">${esc(t('orderGlovo'))}</a><a href="${base}pages/contact.html">${esc(t('officialInfo'))}</a></div></div></div><div class="copyright"><span>© <span id="year">${new Date().getFullYear()}</span> EL PATRÓN</span><span>${esc(window.EL_PATRON_SITE?.address||'')}</span></div></div></footer>`);
  }
  function renderFullCart(){
    const host=$('.full-cart-list');if(!host)return;
    function draw(){
      const c=loadCart();
      host.innerHTML=c.length?c.map(cartLine).join(''):`<div class="empty">${esc(t('emptyCart'))}</div>`;
      const total=$('.full-total');if(total)total.textContent=money(totalPrice(c));
    }
    draw();window.renderFullCart=draw;
  }
  function observeReveals(root=document){
    if(!('IntersectionObserver'in window)){ $$('.reveal',root).forEach(e=>e.classList.add('is-visible'));return }
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.08});
    $$('.reveal',root).forEach(e=>obs.observe(e));
  }
  function bindTilts(root=document){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
    $$('.tilt',root).forEach(card=>{
      if(card.dataset.tiltReady==='true')return;
      card.dataset.tiltReady='true';
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        const px=((x+.5)*100).toFixed(1),py=((y+.5)*100).toFixed(1);
        card.style.setProperty('--shine-x',px+'%');
        card.style.setProperty('--shine-y',py+'%');
        card.style.setProperty('--lift-y','-5px');
        card.style.transform=`perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-5px)`;
      });
      card.addEventListener('pointerenter',()=>card.classList.add('is-tilting'));
      card.addEventListener('pointerleave',()=>{card.style.transform='';card.style.removeProperty('--shine-x');card.style.removeProperty('--shine-y');card.style.removeProperty('--lift-y');card.classList.remove('is-tilting')});
    });
  }
  function setupGlobalMotion(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    window.addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')},{passive:true});
    document.addEventListener('click',e=>{
      const b=e.target.closest('.btn,.icon-btn,.add-btn,.option-pill,.modal-choice');if(!b)return;
      if(typeof b.animate==='function')b.animate([{transform:'scale(1)'},{transform:'scale(.97)'},{transform:'scale(1)'}],{duration:220,easing:'ease-out'});
    });
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');if(!href||href.startsWith('#')||/^(https?:|mailto:|tel:)/i.test(href)||a.target==='_blank')return;
      a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();document.body.classList.add('is-leaving');setTimeout(()=>location.href=href,330)});
    });
  }
  function globalErrorGuard(){window.addEventListener('error',e=>{if(e.message&&/EL_PATRON|Cannot read properties|undefined/.test(e.message))console.error('EL PATRÓN:',e.message)});}
  document.addEventListener('DOMContentLoaded',()=>{
    if(!window.EL_PATRON_MENU||!window.EL_PATRON_CATEGORIES||!window.EL_PATRON_SITE){document.body.classList.add('site-error');return}
    try{
      globalErrorGuard();renderHeader();renderFooter();setupCart();renderPageMeta();renderHome();observeReveals();bindTilts();setupGlobalMotion();renderFullCart();window.EL_PATRON_I18N_POST_RENDER?.();
    }catch(error){console.error('EL PATRÓN init:',error);document.body.classList.remove('site-error');}
  });
})();
