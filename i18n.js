(function(){
'use strict';
var lang=(window.EL_PATRON_LANG||document.documentElement.lang||document.body.getAttribute('data-lang')||'fr').toLowerCase().slice(0,2);
if(['fr','en','ar'].indexOf(lang)<0)return;
var C={
en:{
'petit-dej':['Breakfast','BREAKFAST','Eggs, omelettes and a special set'],
'manaiches':['Manakish','MANAKISH','Levantine know-how, the El Patrón way'],
'salades':['Salads','SALADS','Freshness, crunch and color'],
'entrees':['Starters','STARTERS','To share or to begin gently'],
'snack':['Snack','SNACK','Shawarma, sandwiches and generous recipes'],
'burgers':['Burgers','BURGERS','From classic cheese to chicken mozza'],
'tacos-kebab':['Tacos Kebab','TACOS KEBAB','L & XL formats, sauce, cheese and indulgence'],
'pastas':['Pastas','PASTAS','Creamy, spicy and baked pasta dishes'],
'plats':['Main Courses','MAIN COURSES','House classics and hearty plates'],
'grill':['Grill','GRILL','Skewers and grilled specialties'],
'poulet':['Chicken','CHICKEN','Roasted, braised, fried, sautéed or breaded'],
'supplements':['Extras','EXTRAS','Add your side dish'],
'pizzas':['Pizzas','PIZZAS','Recipes to share in two sizes'],
'boissons-chaudes':['Hot Drinks','HOT DRINKS','Coffee, tea and hot drinks'],
'softs':['Soft Drinks','SOFT DRINKS','Refreshing cold drinks'],
'bieres':['Beers','BEERS','Bottles and cans selection'],
'desserts':['Desserts','DESSERTS','Crêpes, ice cream and fresh fruit'],
'cocktails-sans-alcool':['Alcohol-Free Cocktails','ALCOHOL-FREE COCKTAILS','Fresh, fruity and sparkling'],
'shishas':['Shishas','SHISHAS','Khaloud, Quasar and flavors'],
'boissons-smoothies':['Juices, Smoothies & Milkshakes','JUICES, SMOOTHIES & MILKSHAKES','Fresh, blended and creamy'],
'cocktails-alcoolises':['Cocktails','COCKTAILS','The bar cocktail menu'],
'shots':['Shots','SHOTS','Discover them at the bar'],
'tournees':['Rounds','ROUNDS','Spirits served by the glass, with round prices.'],
'bouteilles':['Bottles','BOTTLES','Spirits, liqueurs and champagnes served by the bottle.'],
'vins':['Wines','WINES','The El Patrón wine cellar']
},
ar:{
'petit-dej':['الإفطار','الإفطار','البيض والعجة والعروض الخاصة'],
'manaiches':['المناقيش','المناقيش','نكهة بلاد الشام بأسلوب إل باترون'],
'salades':['السلطات','السلطات','انتعاش وقرمشة وألوان'],
'entrees':['المقبلات','المقبلات','للمشاركة أو لبدء الوجبة بلطف'],
'snack':['سناك','سناك','شاورما وسندويتشات ووصفات سخية'],
'burgers':['برغر','برغر','من تشيز برغر إلى تشيكن موزاريلا'],
'tacos-kebab':['تاكوس كباب','تاكوس كباب','أحجام L وXL مع الصلصة والجبن والنكهة الغنية'],
'pastas':['الباستا','الباستا','باستا كريمية وحارة ومخبوزة'],
'plats':['الأطباق الرئيسية','الأطباق الرئيسية','أطباق إل باترون الكلاسيكية'],
'grill':['المشاوي','المشاوي','أسياخ ومشاوي على الطريقة الخاصة'],
'poulet':['الدجاج','الدجاج','مشوي ومطهو ومقلي ومشوح ومغطى بالبقسماط'],
'supplements':['الإضافات','الإضافات','اختر طبقك الجانبي'],
'pizzas':['البيتزا','البيتزا','وصفات للمشاركة بحجمين'],
'boissons-chaudes':['المشروبات الساخنة','المشروبات الساخنة','قهوة وشاي ومشروبات ساخنة'],
'softs':['المشروبات الباردة','المشروبات الباردة','مرطبات ومشروبات باردة'],
'bieres':['البيرة','البيرة','اختيار من الزجاجات والعلب'],
'desserts':['الحلويات','الحلويات','كريب وآيس كريم وفواكه'],
'cocktails-sans-alcool':['كوكتيلات بدون كحول','كوكتيلات بدون كحول','منعشة وفاكهية وفوارة'],
'shishas':['الشيشة','الشيشة','خلود وكوازار ونكهات متنوعة'],
'boissons-smoothies':['العصائر والسموثي والشيكات','العصائر والسموثي والشيكات','طازجة ومخلوطة وكريمية'],
'cocktails-alcoolises':['الكوكتيلات','الكوكتيلات','قائمة كوكتيلات البار'],
'shots':['الشوتات','الشوتات','اكتشفها في البار'],
'tournees':['الجولات','الجولات','مشروبات روحية تُقدّم بالكأس مع أسعار الجولات.'],
'bouteilles':['الزجاجات','الزجاجات','مشروبات روحية وليكيورات وشمبانيا تُقدّم بالزجاجة.'],
'vins':['النبيذ','النبيذ','قبو نبيذ إل باترون']
}};
var U={
en:{'Accueil':'Home','Panier':'Cart','Contact':'Contact','Commander sur WhatsApp':'Order on WhatsApp','Commander sur Glovo':'Order on Glovo','Voir le panier':'View cart','Ouvrir le panier':'Open cart','Rechercher dans le menu…':'Search the menu…','La carte':'The menu','Une page pour chaque envie.':'A page for every craving.','Recherche':'Search','Trouvez votre envie.':'Find what you are craving.','Quelques incontournables.':'A few favorites.','Retrouvez ensuite toute la carte par catégorie.':'Explore the full menu by category.','Votre panier est vide.':'Your cart is empty.','Ce produit ne peut pas être ajouté au panier':'This product cannot be added to the cart','Expérience El Patrón':'El Patrón experience','Le goût':'Taste','avec du caractère.':'with character.','Votre commande, sans détour.':'Your order, without the detour.','Votre panier':'Your cart','Vos choix restent enregistrés pendant votre navigation sur le site.':'Your choices stay saved while you browse the site.','Récapitulatif':'Summary','Total':'Total','Nous contacter':'Contact us','Réseaux & commande':'Socials & ordering','Site officiel':'Official website','Chargement de votre expérience':'Loading your experience','Sélection':'Featured','Commande':'Order','Parfum':'Flavor','Accompagnement':'Side','Personnalisez votre choix':'Customize your choice','Annuler':'Cancel','Ajouter au panier':'Add to cart','Choisissez votre accompagnement':'Choose your side','Choisissez votre parfum de glace':'Choose your ice-cream flavor','Inclus':'Included','Sur demande':'On request','produit':'product','produits':'products','Accompagnements au choix : frites, alloco, attiéké, pommes sautées, purée de pommes de terre.':'Choice of sides: fries, alloco, attiéké, sautéed potatoes or mashed potatoes.','Pour plus de choix, visitez notre cave au bar.':'For more choices, visit our wine cellar at the bar.','La formule « Plat » est accompagnée de frites, salade de chou, crudités, ketchup et piment.':'The Plate option comes with fries, coleslaw, fresh vegetables, ketchup and chili.'},
ar:{'Accueil':'الرئيسية','Panier':'السلة','Contact':'اتصل بنا','Commander sur WhatsApp':'الطلب عبر واتساب','Commander sur Glovo':'الطلب عبر Glovo','Voir le panier':'عرض السلة','Ouvrir le panier':'فتح السلة','Rechercher dans le menu…':'ابحث في القائمة…','La carte':'القائمة','Une page pour chaque envie.':'صفحة لكل ذوق.','Recherche':'البحث','Trouvez votre envie.':'اعثر على ما تشتهي.','Quelques incontournables.':'بعض اختياراتنا المميزة.','Retrouvez ensuite toute la carte par catégorie.':'اكتشف القائمة كاملة حسب الفئة.','Expérience El Patrón':'تجربة إل باترون','Le goût':'المذاق','avec du caractère.':'بشخصية مميزة.','Votre commande, sans détour.':'طلبك بكل سهولة.','Votre panier':'سلتك','Vos choix restent enregistrés pendant votre navigation sur le site.':'تبقى اختياراتك محفوظة أثناء تصفح الموقع.','Récapitulatif':'الملخص','Total':'الإجمالي','Nous contacter':'تواصل معنا','Réseaux & commande':'التواصل والطلب','Site officiel':'الموقع الرسمي','Chargement de votre expérience':'جاري تحميل تجربتك','Sélection':'مختارات','Commande':'الطلب','Parfum':'النكهة','Accompagnement':'الطبق الجانبي','Personnalisez votre choix':'خصّص اختيارك','Annuler':'إلغاء','Ajouter au panier':'أضف إلى السلة','Choisissez votre accompagnement':'اختر الطبق الجانبي','Choisissez votre parfum de glace':'اختر نكهة الآيس كريم','Inclus':'مشمول','Sur demande':'عند الطلب','produit':'منتج','produits':'منتجات','Accompagnements au choix : frites, alloco, attiéké, pommes sautées, purée de pommes de terre.':'الأطباق الجانبية حسب الاختيار: بطاطس، ألوكو، أتيكيه، بطاطس سوتيه أو بطاطس مهروسة.','Pour plus de choix, visitez notre cave au bar.':'لخيارات أكثر، تفضل بزيارة قبو النبيذ في البار.','La formule « Plat » est accompagnée de frites, salade de chou, crudités, ketchup et piment.':'خيار الطبق يأتي مع البطاطس والسلطة والخضار الطازجة والكاتشب والفلفل.'}};
var R={
en:[['Œuf au plat','fried egg'],['œuf au plat','fried egg'],['œufs','eggs'],['omelette','omelette'],['fromage','cheese'],['jambon','beef or turkey ham'],['légumes','vegetables'],['viande de bœuf','beef'],['viande','meat'],['poulet','chicken'],['crevettes','shrimp'],['crabe','crab'],['salade','salad'],['tomates','tomatoes'],['concombres','cucumbers'],['oignons','onions'],['poivrons','peppers'],['carottes','carrots'],['maïs','sweet corn'],['olives','olives'],['persil','parsley'],['menthe','mint'],['pain','bread'],['beurre','butter'],['huile d’olive','olive oil'],['sauce','sauce'],['frites','fries'],['riz','rice'],['pommes de terre','potatoes'],['purée','mashed potatoes'],['champignons','mushrooms'],['mozzarella','mozzarella'],['cheddar','cheddar'],['parmesan','parmesan'],['piment','chili'],['sucre','sugar'],['miel','honey'],['glace','ice cream'],['fruits','fruit'],['frais','fresh'],['fraîche','fresh'],['frappé','blended'],['crémeux','creamy'],['accompagné','served with'],['accompagnées','served with'],['maison','house-made'],['bouteille','bottle'],['verre','glass'],['plat','plate'],['grand','large'],['moyen','medium'],['nature','plain'],['spéciale','special'],['spécial','special'],['royale','royal'],['royal','royal'],['sans alcool','alcohol-free'],['alcoolisés','alcoholic'],['alcoolisé','alcoholic']],
ar:[['Œuf au plat','بيض مقلي'],['œuf au plat','بيض مقلي'],['œufs','بيض'],['omelette','عجة'],['fromage','جبن'],['jambon','هام'],['légumes','خضروات'],['viande de bœuf','لحم بقري'],['viande','لحم'],['poulet','دجاج'],['crevettes','روبيان'],['crabe','سلطعون'],['salade','سلطة'],['tomates','طماطم'],['concombres','خيار'],['oignons','بصل'],['poivrons','فلفل'],['carottes','جزر'],['maïs','ذرة حلوة'],['olives','زيتون'],['persil','بقدونس'],['menthe','نعناع'],['pain','خبز'],['beurre','زبدة'],['huile d’olive','زيت الزيتون'],['sauce','صلصة'],['frites','بطاطس مقلية'],['riz','أرز'],['pommes de terre','بطاطس'],['purée','بطاطس مهروسة'],['champignons','فطر'],['mozzarella','موزاريلا'],['cheddar','شيدر'],['parmesan','بارميزان'],['piment','فلفل حار'],['sucre','سكر'],['miel','عسل'],['glace','آيس كريم'],['fruits','فاكهة'],['frais','طازج'],['fraîche','طازج'],['frappé','مخلوط'],['crémeux','كريمي'],['accompagné','يُقدّم مع'],['accompagnées','تُقدّم مع'],['maison','خاص بالمطعم'],['bouteille','زجاجة'],['verre','كأس'],['plat','طبق'],['grand','كبير'],['moyen','متوسط'],['nature','سادة'],['spéciale','خاص'],['spécial','خاص'],['royale','رويال'],['royal','رويال'],['sans alcool','بدون كحول'],['alcoolisés','بالكحول'],['alcoolisé','بالكحول']]
};
function tr(s){
  if(typeof s!=='string'||lang==='fr')return s;
  var exact=U[lang]||{};
  if(Object.prototype.hasOwnProperty.call(exact,s))return exact[s];
  var o=s,rs=R[lang]||[];
  for(var i=0;i<rs.length;i++)o=o.replace(new RegExp(rs[i][0],'gi'),rs[i][1]);
  return o;
}
var cats=window.EL_PATRON_CATEGORIES||[];
window.EL_PATRON_CATEGORIES=cats.map(function(c){
  var m=(C[lang]||{})[c.slug];
  if(!m)return c;
  return Object.assign({},c,{title:m[0],kicker:m[1],description:m[2],note:c.note?tr(c.note):c.note});
});
if(window.EL_PATRON_MENU){
  var out={};
  Object.keys(window.EL_PATRON_MENU).forEach(function(slug){
    out[slug]=(window.EL_PATRON_MENU[slug]||[]).map(function(p){
      var q=Object.assign({},p);
      ['name','sub','desc','note'].forEach(function(k){if(typeof q[k]==='string')q[k]=tr(q[k]);});
      if(Array.isArray(q.price))q.price=q.price.map(function(o){return Object.assign({},o,{label:typeof o.label==='string'?tr(o.label):o.label});});
      return q;
    });
  });
  window.EL_PATRON_MENU=out;
}
if(window.EL_PATRON_SITE){
  window.EL_PATRON_SITE=Object.assign({},window.EL_PATRON_SITE,{
    subtitle:lang==='en'?'Restaurant · Bar · Café':lang==='ar'?'مطعم · بار · مقهى':'Restaurant · Bar · Café'
  });
}
document.documentElement.lang=lang;
document.body.dir=lang==='ar'?'rtl':'ltr';
function rewriteLinks(root){
  var nodes=(root||document).querySelectorAll? (root||document).querySelectorAll('a[href]') : [];
  for(var i=0;i<nodes.length;i++){
    var a=nodes[i],h=a.getAttribute('href');if(a.closest('.language-switcher')||a.closest('.language-mobile'))continue;if(!h||/^(https?:|mailto:|tel:|#|javascript:|data:)/i.test(h))continue;
    var parts=location.pathname.split('/').filter(Boolean),inPages=parts[parts.length-2]==='pages';
    var base=inPages?'../':'./';
    var m=h.match(/pages\/([^?#]+\.html)([?#].*)?$/);
    if(m)a.setAttribute('href',base+'pages/'+m[1]+(m[2]||''));
    else if(/index\.html/.test(h)){var q=h.match(/index\.html([?#].*)?$/);a.setAttribute('href',base+'index.html'+(q?q[1]||'':''));}
  }
}

function addLanguageSwitcher(){
  var langs=['fr','en','ar'],parts=location.pathname.split('/').filter(Boolean),inPages=parts[parts.length-2]==='pages',file=parts[parts.length-1]||'index.html';
  function target(l){return inPages?'../../'+l+'/pages/'+file:'../'+l+'/';}
  function build(cls){
    var box=document.createElement('div');box.className=cls;box.setAttribute('role','tablist');box.setAttribute('aria-label','Language');box.dataset.lang=lang;
    var track=document.createElement('span');track.className='language-thumb';track.setAttribute('aria-hidden','true');box.appendChild(track);
    var labels={fr:'FR',en:'EN',ar:'العربية'};
    for(var i=0;i<langs.length;i++){
      var l=langs[i],link=document.createElement('a');
      link.className='language-option'+(l===lang?' active':'');
      link.href=target(l);link.setAttribute('role','tab');link.setAttribute('aria-selected',l===lang?'true':'false');link.textContent=labels[l];link.setAttribute('aria-label',labels[l]);
      box.appendChild(link);
    }
    return box;
  }
  var actions=document.querySelector('.header-actions');
  if(actions && !actions.querySelector('.language-switcher')) actions.insertBefore(build('language-switcher'),actions.firstChild);
  var links=document.querySelector('.mobile-links');
  if(links && !links.querySelector('.language-mobile')) links.appendChild(build('language-mobile'));
}
function translateDom(){
  var root=document.body,walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),arr=[],n;
  while(n=walker.nextNode())arr.push(n);
  for(var i=0;i<arr.length;i++){
    var v=arr[i].nodeValue;if(!v||!v.trim())continue;
    var s=v.trim(),z=tr(s);
    z=z.replace(/^([0-9]+) produits?$/i,function(_,n){return n+' '+(lang==='en'?'products':'منتجات');});
    if(/^Aucun résultat pour/.test(s)&&lang!=='fr'){
      var q=s.replace(/^Aucun résultat pour «(.+)»\.$/,'$1');
      z=lang==='en'?'No results for “'+q+'”.':'لا توجد نتائج لـ «'+q+'».';
    }
    if(/^Aucun produit ne correspond à/.test(s)&&lang!=='fr'){
      var q2=s.replace(/^Aucun produit ne correspond à «(.+)»\.$/,'$1');
      z=lang==='en'?'No product matches “'+q2+'”.':'لا يوجد منتج يطابق «'+q2+'».';
    }
    if(s!==z)arr[i].nodeValue=v.replace(s,z);
  }
  var els=root.querySelectorAll('input[placeholder],input[aria-label],button[aria-label],a[aria-label]');
  for(var j=0;j<els.length;j++){
    ['placeholder','aria-label'].forEach(function(k){if(els[j].hasAttribute(k))els[j].setAttribute(k,tr(els[j].getAttribute(k)));});
  }
  rewriteLinks(root);
}
translateDom();
window.EL_PATRON_TEXT=function(value){return tr(value);};
window.EL_PATRON_I18N_POST_RENDER=function(){
  translateDom();
  addLanguageSwitcher();
};
new MutationObserver(function(records){
  for(var i=0;i<records.length;i++){
    if(records[i].addedNodes && records[i].addedNodes.length){
      translateDom();
      addLanguageSwitcher();
      break;
    }
  }
}).observe(document.body,{subtree:true,childList:true});
})();