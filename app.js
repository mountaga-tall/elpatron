(function(){
  const KEY='elpatronCartV1';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const money=n=>new Intl.NumberFormat('fr-FR').format(n)+' FCFA';
  const loadCart=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
  const saveCart=c=>localStorage.setItem(KEY,JSON.stringify(c));
  const totalQty=c=>c.reduce((a,i)=>a+i.qty,0);
  const totalPrice=c=>c.reduce((a,i)=>a+i.amount*i.qty,0);

  function cartKey(product,option){return product.id+'::'+(option?.label||'');}
  function addToCart(product, option){
    const cart=loadCart();
    const key=cartKey(product,option);
    const idx=cart.findIndex(i=>i.key===key);
    const chosen=option || product.price[0];
    if(idx>-1) cart[idx].qty+=1;
    else cart.push({key,id:product.id,name:product.name,label:chosen.label||'',amount:chosen.amount,qty:1});
    saveCart(cart); updateCartBadge(); showToast(product.name+' ajouté au panier');
  }
  function updateCartBadge(){
    const count=totalQty(loadCart());
    $$('.cart-badge').forEach(b=>{b.textContent=count; b.hidden=count===0});
    $$('.cart-count-text').forEach(e=>e.textContent=count);
  }
  function renderCart(){
    const list=$('.cart-items'); if(!list)return;
    const cart=loadCart();
    list.innerHTML=cart.length?cart.map(i=>`<article class="cart-item">
      <div class="cart-item-row"><div><div class="cart-item-name">${esc(i.name)}</div><div class="cart-item-meta">${i.label?esc(i.label)+' · ':''}${money(i.amount)}</div></div><strong>${money(i.amount*i.qty)}</strong></div>
      <div class="qty"><button data-cart-action="dec" data-key="${escAttr(i.key)}">−</button><b>${i.qty}</b><button data-cart-action="inc" data-key="${escAttr(i.key)}">+</button><button data-cart-action="del" data-key="${escAttr(i.key)}" style="margin-left:auto">Supprimer</button></div>
    </article>`).join(''):`<div class="empty">Votre panier est vide.<br><small>Ajoutez une spécialité El Patrón pour commencer.</small></div>`;
    const total=totalPrice(cart);
    $$('.cart-total').forEach(e=>e.textContent=money(total));
    $$('.cart-count-text').forEach(e=>e.textContent=totalQty(cart));
  }
  function esc(s){return String(s).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
  function escAttr(s){return esc(s)}
  function openCart(){ $('.cart-drawer')?.classList.add('open'); renderCart(); }
  function closeCart(){ $('.cart-drawer')?.classList.remove('open'); }
  function showToast(t){const e=$('.toast'); if(!e)return; e.textContent=t; e.classList.add('show'); clearTimeout(showToast.t); showToast.t=setTimeout(()=>e.classList.remove('show'),1800)}

  function orderWhatsApp(){
    const cart=loadCart(); if(!cart.length){showToast('Votre panier est vide'); return;}
    let msg='Bonjour EL PATRÓN,\n\nJe souhaite commander :\n';
    cart.forEach(i=>msg+=`- ${i.name}${i.label?' ('+i.label+')':''} × ${i.qty} = ${money(i.amount*i.qty)}\n`);
    msg+=`\nTotal : ${money(totalPrice(cart))}\n\nMerci.`;
    location.href='https://wa.me/'+window.EL_PATRON_SITE.phoneRaw+'?text='+encodeURIComponent(msg);
  }

  function setupCart(){
    $$('.open-cart').forEach(b=>b.addEventListener('click',openCart));
    $$('.close-cart,.cart-backdrop').forEach(b=>b.addEventListener('click',closeCart));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();closeMobile()}});
    document.addEventListener('click',e=>{
      const a=e.target.closest('[data-cart-action]'); if(!a)return;
      const key=a.dataset.key; let cart=loadCart(); const idx=cart.findIndex(i=>i.key===key); if(idx<0)return;
      if(a.dataset.cartAction==='inc')cart[idx].qty+=1;
      if(a.dataset.cartAction==='dec'){cart[idx].qty-=1;if(cart[idx].qty<=0)cart.splice(idx,1)}
      if(a.dataset.cartAction==='del')cart.splice(idx,1);
      saveCart(cart); renderCart(); updateCartBadge();
    });
    $$('.order-whatsapp').forEach(b=>b.addEventListener('click',orderWhatsApp));
    updateCartBadge();
  }

  function renderHeader(){
    const root=$('[data-shell]'); if(!root)return;
    const navCats=window.EL_PATRON_CATEGORIES.slice(0,8);
    const base=root.dataset.base||'';
    root.insertAdjacentHTML('afterbegin',`<header class="site-header"><div class="header-inner">
      <a class="brand" href="${root.dataset.home||'index.html'}" aria-label="El Patrón — accueil"><img src="${root.dataset.logo||'images/logo.png'}" alt="El Patrón"><div class="brand-text"><div class="brand-title">EL PATRÓN</div><div class="brand-sub">Restaurant · Bar · Café</div></div></a>
      <nav class="desktop-nav" aria-label="Navigation principale"><a href="${root.dataset.home||'index.html'}">Accueil</a>${navCats.map(c=>`<a href="${base}pages/${c.slug}.html">${c.title}</a>`).join('')}<a href="${base}pages/contact.html">Contact</a></nav>
      <div class="header-actions"><button class="icon-btn open-cart" aria-label="Ouvrir le panier">${ICONS.bag}<span class="cart-badge" hidden>0</span></button><button class="icon-btn red menu-toggle" aria-label="Ouvrir le menu">${ICONS.menu}</button></div>
    </div></header>
    <div class="mobile-menu" aria-hidden="true"><div class="mobile-menu-head"><a class="brand" href="${root.dataset.home||'index.html'}"><img src="${root.dataset.logo||'images/logo.png'}" alt=""><div class="brand-text"><div class="brand-title">EL PATRÓN</div><div class="brand-sub">Restaurant · Bar · Café</div></div></a><button class="icon-btn close-mobile">${ICONS.close}</button></div><nav class="mobile-links" aria-label="Menu mobile"><a href="${root.dataset.home||'index.html'}">Accueil</a>${window.EL_PATRON_CATEGORIES.map(c=>`<a href="${base}pages/${c.slug}.html">${c.title}</a>`).join('')}<a href="${base}pages/panier.html">Panier <span class="cart-count-text">0</span></a><a href="${base}pages/contact.html">Contact</a></nav></div>`);
    document.body.insertAdjacentHTML('beforeend',`<div class="cart-drawer"><div class="cart-backdrop"></div><aside class="cart-panel" aria-label="Panier"><div class="cart-head"><h2>Votre panier</h2><button class="icon-btn close-cart">${ICONS.close}</button></div><div class="cart-items"></div><div class="cart-bottom"><div class="total-row"><span>Total</span><span class="cart-total">0 FCFA</span></div><div class="cart-actions"><button class="btn btn-primary order-whatsapp">${ICONS.wa}<span>Commander sur WhatsApp</span></button><a class="btn btn-glass" href="${base}pages/panier.html">Voir le panier</a></div></div></aside></div><div class="toast" role="status" aria-live="polite"></div><a class="floating-whatsapp" target="_blank" rel="noopener" href="https://wa.me/${window.EL_PATRON_SITE.phoneRaw}" aria-label="Contacter El Patrón sur WhatsApp"><span class="wa-dot">${ICONS.wa}</span><span class="wa-label">WhatsApp</span></a>`);
    const menu=$('.mobile-menu'); const toggle=$('.menu-toggle');
    toggle?.addEventListener('click',()=>{menu.classList.add('open');menu.setAttribute('aria-hidden','false')});
    function cm(){menu.classList.remove('open');menu.setAttribute('aria-hidden','true')}
    document.querySelectorAll('.close-mobile,.mobile-links a').forEach(x=>x.addEventListener('click',cm));
    window.closeMobile=cm;
    const here=location.pathname.split('/').pop();
    $$('.desktop-nav a').forEach(a=>{const href=a.getAttribute('href');if(href&&href.endsWith(here))a.classList.add('active')});
  }

  function renderPageMeta(){
    const root=$('[data-category-page]'); if(!root)return;
    const slug=root.dataset.category; const cat=window.EL_PATRON_CATEGORIES.find(c=>c.slug===slug); if(!cat)return;
    $('.page-kicker').textContent=cat.kicker; $('.page-title').textContent=cat.title; $('.page-intro').textContent=cat.description;
    document.title=cat.title+' · EL PATRÓN';
    const items=window.EL_PATRON_MENU[slug]||[]; const grid=$('.product-grid'); const count=$('.result-count');
    function draw(filter=''){
      const normalized=filter.trim().toLowerCase();
      const visible=items.filter(p=>(p.name+' '+p.desc+' '+(p.sub||'')).toLowerCase().includes(normalized));
      count.textContent=visible.length+' '+(visible.length>1?'produits':'produit');
      grid.innerHTML=visible.length?visible.map((p,idx)=>productCard(p,idx)).join(''):`<div class="empty">Aucun produit ne correspond à « ${esc(filter)} ».</div>`;
      bindProductButtons(grid);
      observeReveals(grid);
      bindTilts(grid);
    }
    function productCard(p,idx){
      if(p.noteOnly)return `<article class="product-card reveal"><div class="product-top"><div class="product-num">À découvrir</div><div class="product-name">${esc(p.name)}</div></div><div class="product-body"><p class="product-desc">${esc(p.desc)}</p></div></article>`;
      const options=p.price||[];
      const priceMarkup=options.length===1?money(options[0].amount):'À partir de '+money(Math.min(...options.map(x=>x.amount)));
      const optionsMarkup=options.length>1?`<div class="option-list">${options.map((o,i)=>`<button class="option-pill ${i===0?'selected':''}" data-option-index="${i}">${esc(o.label)} · ${money(o.amount)}</button>`).join('')}</div>`:'';
      return `<article class="product-card reveal tilt" data-product-id="${escAttr(p.id)}"><div class="product-top"><div class="product-num">${String(idx+1).padStart(2,'0')} · EL PATRÓN</div>${p.sub?`<span class="sub-chip">${esc(p.sub)}</span>`:''}<div class="product-name">${esc(p.name)}</div></div><div class="product-body"><p class="product-desc">${esc(p.desc||'Composition selon la recette El Patrón.')}</p>${p.note?`<div style="font-size:.71rem;color:#77716e;margin-bottom:10px">${esc(p.note)}</div>`:''}${optionsMarkup}<div class="product-foot"><div class="price" data-price>${priceMarkup}<small>${options.length>1?'choisissez un format':''}</small></div><button class="add-btn" data-add="true" aria-label="Ajouter ${escAttr(p.name)}">${ICONS.plus}</button></div></div></article>`;
    }
    function bindProductButtons(scope){
      $$('.product-card',scope).forEach(card=>{
        const p=items.find(x=>x.id===card.dataset.productId); if(!p)return;
        let selected=0;
        $$('.option-pill',card).forEach((b,i)=>b.addEventListener('click',()=>{selected=i; $$('.option-pill',card).forEach(x=>x.classList.remove('selected'));b.classList.add('selected'); const price=$('[data-price]',card); price.innerHTML=money(p.price[i].amount)+'<small>'+esc(p.price[i].label)+'</small>';}));
        $('[data-add]',card)?.addEventListener('click',()=>addToCart(p,p.price[selected]));
      });
    }
    $('.search-box input')?.addEventListener('input',e=>draw(e.target.value));
    draw();
  }

  function renderHome(){
    const featured=['burgers','pizzas','plats','grill','cocktails-sans-alcool','desserts'];
    const grid=$('.category-grid'); if(!grid)return;
    grid.innerHTML=window.EL_PATRON_CATEGORIES.map(c=>`<a class="category-card reveal tilt" href="pages/${c.slug}.html"><div class="category-icon">${categoryIcon(c.icon)}</div><div class="category-arrow">${ICONS.arrow}</div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p></a>`).join('');
    const fgrid=$('.featured-grid');
    if(fgrid){
      const arr=[]; featured.forEach(slug=>(window.EL_PATRON_MENU[slug]||[]).slice(0,2).forEach(x=>arr.push(x)));
      fgrid.innerHTML=arr.map((p,i)=>`<article class="product-card reveal tilt"><div class="product-top"><div class="product-num">Sélection · ${String(i+1).padStart(2,'0')}</div><div class="product-name">${esc(p.name)}</div></div><div class="product-body"><p class="product-desc">${esc(p.desc||'')||'Composition maison El Patrón.'}</p><div class="product-foot"><div class="price">${p.price.length===1?money(p.price[0].amount):'À partir de '+money(Math.min(...p.price.map(x=>x.amount)))}</div><a class="add-btn" href="pages/${featured.find(s=>(window.EL_PATRON_MENU[s]||[]).some(x=>x.id===p.id))||'burgers'}.html" aria-label="Découvrir">${ICONS.arrow}</a></div></div></article>`).join('');
    }
  }

  function categoryIcon(name){
    const base={stroke:'currentColor','stroke-width':'1.6',fill:'none'};
    const s={egg:'<path d="M12 5c3.8 0 6 3 6 6.2A6 6 0 1 1 6 11.2C6 8 8.2 5 12 5Z"/>',manakish:'<path d="M5 18h14M6 15h12M8 12h8M10 9h4M12 5v2"/>',salad:'<path d="M5 12h14a7 7 0 0 1-14 0Z"/><path d="M8 8c1-2 2-3 4-3M12 7c1-2 2-3 4-3"/>',spark:'<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/>',sandwich:'<path d="M4 9h16M5 15h14M7 5h10M7 19h10"/>',burger:'<path d="M4 10c1-4 4-6 8-6s7 2 8 6"/><path d="M4 10h16M5 14h14M7 18h10"/>',taco:'<path d="M5 17a7 7 0 0 1 14 0c-4 2-10 2-14 0Z"/><path d="M8 13c1-2 3-2 4 0M13 13c1-2 3-2 4 0"/>',pasta:'<path d="M5 7h14M7 7c0 6 4 10 5 10s5-4 5-10"/><path d="M9 5h6"/>',plate:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',grill:'<path d="M5 9h14l-2 8H7L5 9Z"/><path d="M8 5v4M12 5v4M16 5v4"/><path d="M9 19h6"/>',chicken:'<path d="M8 9c0-3 3-5 6-4 3 .8 4 4 2 6l-3 3-3 3c-2 2-6 0-5-3 .4-1.2 1.5-1.9 3-2Z"/>',plus:'<path d="M12 5v14M5 12h14"/>',pizza:'<path d="m4 5 16 7-12 7Z"/><circle cx="11" cy="11" r="1"/><circle cx="15" cy="13" r="1"/>',coffee:'<path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2M8 4c-1 1 1 2 0 3M12 4c-1 1 1 2 0 3"/>',drink:'<path d="M8 4h8l-1 16H9L8 4Z"/><path d="M8 8h8"/>',beer:'<path d="M8 6h8v12H8z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2"/>',dessert:'<path d="M6 16h12l-1 4H7l-1-4Z"/><path d="M8 12a4 4 0 0 1 8 0H8Z"/>',mocktail:'<path d="M7 5h10l-2 7v5H9v-5L7 5Z"/><path d="M6 20h12"/>',shisha:'<path d="M9 5h6M12 5v7M8 12h8M9 12v6h6v-6"/><path d="M15 6c3 0 4 2 4 4"/>',smoothie:'<path d="M8 4h8l-1 16H9L8 4Z"/><path d="M10 2h4M12 4v-2"/>',cocktail:'<path d="M6 5h12l-6 7v4"/><path d="M9 21h6M12 16v5"/>',shot:'<path d="M8 8h8l-1 11H9L8 8Z"/><path d="M9 5h6"/>',wine:'<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M12 13v7M9 20h6"/>'};
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${s[name]||s.spark}</svg>`;
  }

  function renderFooter(){
    const root=$('[data-shell]'); if(!root)return;
    const base=root.dataset.base||'';
    document.body.insertAdjacentHTML('beforeend',`<footer class="footer"><div class="container"><div class="footer-grid"><div><h3>EL PATRÓN</h3><p>${window.EL_PATRON_SITE.subtitle}. Une carte généreuse, le bar, le café et le salon de thé dans une même expérience.</p><div class="socials"><a href="${window.EL_PATRON_SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICONS.facebook}</a><a href="${window.EL_PATRON_SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a><a href="${window.EL_PATRON_SITE.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${ICONS.tiktok}</a></div></div><div><h3>Menu</h3><div class="footer-links">${window.EL_PATRON_CATEGORIES.slice(0,8).map(c=>`<a href="${base}pages/${c.slug}.html">${c.title}</a>`).join('')}<a href="${base}pages/panier.html">Panier</a></div></div><div><h3>Contact</h3><div class="footer-links"><a href="tel:${window.EL_PATRON_SITE.phoneRaw}">${window.EL_PATRON_SITE.phone}</a><a href="mailto:${window.EL_PATRON_SITE.email}">${window.EL_PATRON_SITE.email}</a><a href="${window.EL_PATRON_SITE.glovo}" target="_blank" rel="noopener">Commander sur Glovo</a><a href="${base}pages/contact.html">Voir les informations pratiques</a></div></div></div><div class="copyright"><span>© <span id="year">2026</span> EL PATRÓN</span><span>5°24'11.2"N 3°58'49.7"W</span></div></div></footer>`);
    $('#year').textContent=new Date().getFullYear();
  }

  function observeReveals(root=document){
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.08});
    $$('.reveal',root).forEach(e=>obs.observe(e));
  }
  function bindTilts(root=document){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    $$('.tilt',root).forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5; card.style.transform=`perspective(900px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-5px)`});
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }
  function setupGlobalMotion(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    window.addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')},{passive:true});
    document.addEventListener('click',e=>{
      const b=e.target.closest('.btn,.icon-btn,.add-btn,.option-pill'); if(!b)return;
      b.animate([{transform:'scale(1)'},{transform:'scale(.97)'},{transform:'scale(1)'}],{duration:220,easing:'ease-out'});
    });
    document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href'); if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('tel:'))return; a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();document.body.classList.add('is-leaving');setTimeout(()=>location.href=href,330);})});
  }

  document.addEventListener('DOMContentLoaded',()=>{
    renderHeader(); renderFooter(); setupCart(); renderPageMeta(); renderHome(); observeReveals(); bindTilts(); setupGlobalMotion();
    const path=location.pathname.split('/').pop(); if(path==='panier.html')renderFullCart();
  });
  function renderFullCart(){
    const host=$('.full-cart-list'); if(!host)return;
    function draw(){const c=loadCart(); host.innerHTML=c.length?c.map(i=>`<article class="cart-item"><div class="cart-item-row"><div><div class="cart-item-name">${esc(i.name)}</div><div class="cart-item-meta">${i.label?esc(i.label)+' · ':''}${money(i.amount)}</div></div><strong>${money(i.amount*i.qty)}</strong></div><div class="qty"><button data-cart-action="dec" data-key="${escAttr(i.key)}">−</button><b>${i.qty}</b><button data-cart-action="inc" data-key="${escAttr(i.key)}">+</button><button data-cart-action="del" data-key="${escAttr(i.key)}" style="margin-left:auto">Supprimer</button></div></article>`).join(''):`<div class="empty">Votre panier est vide.</div>`; $('.full-total').textContent=money(totalPrice(c));}
    draw(); document.addEventListener('click',e=>{if(e.target.closest('[data-cart-action]'))setTimeout(draw,0)});
  }
})();
