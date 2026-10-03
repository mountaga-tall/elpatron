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

/* Arabic catalogue layer: dedicated product-name/description translations. */
var AR_NAME_PHRASES=[
["OMELETTE NATURE","عجة سادة"],["OMELETTE FROMAGE","عجة بالجبن"],["OMELETTE SPÉCIALE","عجة خاصة"],["OMELETTE ROYALE","عجة رويال"],["FORMULE SPÉCIALE","الوجبة الخاصة"],
["SALADE DE CHOUX","سلطة الملفوف"],["AVOCATS CREVETTES","أفوكادو بالروبيان"],["BEIGNETS DE CREVETTES","فطائر الروبيان المقلية"],["FRITES AU FROMAGE","بطاطس مقلية بالجبن"],["POMMES SAUTÉES","بطاطس سوتيه"],["HOUMMOUS VIANDE","حمص باللحم"],["MOZZARELLA STICKS","أصابع موزاريلا"],["CHEESY ROLLS","لفائف الجبن"],["FATAYER VIANDE","فطائر باللحم"],["FATAYER LÉGUMES","فطائر بالخضار"],
["CHAWARMA POULET","شاورما دجاج"],["CHAWARMA VIANDE","شاورما لحم"],["CHAWARMA MIX","شاورما ميكس"],["CHAWARMA BROCHETTE","شاورما بالأسياخ"],
["SANDWICH CHICKEN SUB","سندويتش تشيكن صب"],["SANDWICH CRISPY","سندويتش كريسبي"],["SANDWICH PHILADELPHIA","سندويتش فيلادلفيا"],["SANDWICH FRANCISCO","سندويتش فرانسيسكو"],["SANDWICH FAHITA","سندويتش فاهيتا"],["SANDWICH ZINGER","سندويتش زنجر"],
["LEBANESE BURGER","البرغر اللبناني"],["CHEESE BURGER","تشيز برغر"],["EGG & CHEESE BURGER","برغر بالبيض والجبن"],["AMERICAN BURGER","البرغر الأمريكي"],["BBQ BURGER","برغر بصوص الباربكيو"],["ESCALOPE CHICKEN BURGER","برغر إسكالوب الدجاج"],["CHICKEN BURGER","برغر الدجاج"],["CRISPY BURGER","برغر الدجاج المقرمش"],["CHICKEN MOZZA BURGER","برغر الدجاج بالموزاريلا"],["PLAT DE FRITES","طبق بطاطس مقلية"],
["TACOS POULET —","تاكوس دجاج —"],["TACOS VIANDE —","تاكوس لحم —"],["TACOS MIX —","تاكوس ميكس —"],
["PENNE ARRABIATA","بيني أرابياتا"],["SPAGHETTIS BOLOGNAISE","سباغيتي بولونيز"],["SPAGHETTIS PHILLY STEAK","سباغيتي فيلي ستيك"],["TAGLIATELLES ALFREDO","تاغلياتيل ألفريدو"],["TAGLIATELLES AUX CREVETTES","تاغلياتيل بالروبيان"],["PENNE AL FORNO","بيني بالفرن"],
["PLAT CHAWARMA","طبق شاورما"],["PLAT CRISPY","طبق كريسبي"],["ESCALOPE DE POULET","إسكالوب الدجاج"],["STEAK AU POULET","ستيك الدجاج"],["STEAK AMÉRICAIN","ستيك أمريكي"],["STEAK À LA CRÈME","ستيك بالكريمة"],["CHICKEN HAWAÏ","دجاج هاواي"],
["QUESADILLA POULET","كيساديلا دجاج"],["QUESADILLA VIANDE","كيساديلا لحم"],["FAHITAS AL FORNO","فاهيتا بالفرن"],["PHILADELPHIA AL FORNO","فيلادلفيا بالفرن"],["FAHITAS CREVETTES SAUTÉES","فاهيتا روبيان سوتيه"],["POISSON SOSSO BRAISÉ","سمك سوسو مشوي"],["POISSON CARPE BRAISÉE","سمك الشبوط المشوي"],["RIZ CANTONAIS","أرز كانتوني"],
["BROCHETTES AILES DE POULET","أسياخ أجنحة الدجاج"],["BROCHETTES SHISH TAOUK","أسياخ شيش طاووق"],["BROCHETTES KAFTA","أسياخ كفتة"],["BROCHETTES DE FILET","أسياخ فيليه اللحم"],["BROCHETTES D'AGNEAU","أسياخ لحم الضأن"],["BROCHETTES MIX GRILL","أسياخ مشاوي مشكلة"],
["POULET RÔTI","دجاج مشوي بالفرن"],["POULET BRAISÉ","دجاج مطهو"],["POULET FRIT","دجاج مقلي"],["POULET SAUTÉ","دجاج سوتيه"],["POULET PANÉ","دجاج مقرمش بالبقسماط"],
["PLAT FRITES","طبق بطاطس مقلية"],["PLAT ALLOCO","طبق ألوكو"],["PLAT ATTIÉKÉ","طبق أتيكيه"],["PLAT DE RIZ BASMATI","طبق أرز بسمتي"],["PLAT DE RIZ LÉGUMES","طبق أرز بالخضار"],
["MARGHERITA","مارغريتا"],["VÉGÉTARIENNE","بيتزا خضار"],["ROYALE CRÉMIÈRE","رويال بالكريمة"],["ROYALE","رويال"],["PEPPERONI","بيبروني"],["CALABRAISE","كالابريزية"],["MEXICAINE","مكسيكية"],["POULET CRÉMIÈRE","دجاج بالكريمة"],["POULET","دجاج"],["CORDON BLEU","كوردون بلو"],["THON","تونة"],["CREVETTES","روبيان"],["QUATRE SAISONS","أربعة فصول"],
["ESPRESSO","إسبريسو"],["NESCAFÉ","نسكافيه"],["CAFÉ AU LAIT","قهوة بالحليب"],["CAPPUCCINO","كابتشينو"],["CHOCO CHAUD","شوكولاتة ساخنة"],["NAJAR","نجّار"],["THÉ ORIENTAL","شاي شرقي"],["THÉ GINGEMBRE","شاي بالزنجبيل"],
["PETITE EAU 50 CL","ماء صغير 50 سل"],["GRANDE EAU 1 L","ماء كبير 1 لتر"],
["CRÊPE SALÉE","كريب مالحة"],["CRÊPE NUTELLA","كريب نوتيلا"],["CRÊPE SPECULOOS","كريب سبكولوس"],["CRÊPE OREO CHOCOLAT","كريب أوريو بالشوكولاتة"],["CRÊPE EL PATRÓN","كريب إل باترون"],["BOULE DE GLACE","كرة آيس كريم"],["BANANE SPLIT","بانانا سبليت"],["SALADE DE FRUITS","سلطة فواكه"],["ASSIETTE DE FRUITS","طبق فواكه"],
["VIRGIN MOJITO","موهيتو فيرجن"],["VIRGIN PASSIONNÉE","باشن فيرجن"],["FLEUR D'AMOUR","زهرة الحب"],["PIÑA COLADA","بينا كولادا"],["PARFUMS / GOÛTS","النكهات / الأذواق"],["JUS NATURELS","عصائر طبيعية"],["SMOOTHIES FRAPPÉS","سموثي مثلج"],["MILKSHAKES","ميلك شيك"],["MILKSHAKES SPÉCIAUX","ميلك شيك خاص"],
["MOJITO","موهيتو"],["DESPEJITO","ديسبيجيتو"],["LONG ISLAND","لونغ آيلاند"],["SEX ON THE BEACH","سِكس أون ذا بيتش"],["LA PASSIONNÉE","باشن"],["BLEU LAGOON","بلو لاغون"],["MARGARITA","مارغريتا"],["TEQUILA SUNRISE","تيكيلا صن رايز"],["CHOCOLATINI","شوكولاتيني"],["JAGER BOMB","جيغر بومب"],["SHOT SANGLE","شوت سانغل"],["RAYON DE 6 SHOTS","مجموعة من 6 شوتات"]
];
var AR_DESC_PHRASES=[
["La formule des plat est accompagnée de frites salade de choux, crudité, ketchup et piment.","خيار الطبق يأتي مع البطاطس المقلية وسلطة الملفوف والخضار الطازجة والكاتشب والفلفل الحار."],
["Omelette ou œuf au plat, avec pain et beurre.","عجة أو بيض مقلي، مع الخبز والزبدة."],
["Omelette ou œuf au plat au fromage, avec pain et beurre.","عجة أو بيض مقلي بالجبن، مع الخبز والزبدة."],
["Omelette ou œuf au plat, fromage, jambon et légumes, avec pain et beurre.","عجة أو بيض مقلي، جبن، هام وخضار، مع الخبز والزبدة."],
["Omelette ou œuf au plat, fromage, jambon, légumes, salade et avocat, avec pain et beurre.","عجة أو بيض مقلي، جبن، هام، خضار، سلطة وأفوكادو، مع الخبز والزبدة."],
["Omelette ou œuf au plat spécial, pain et beurre, café au lait ou thé, et jus naturel.","عجة أو بيض مقلي خاص، خبز وزبدة، قهوة بالحليب أو شاي، وعصير طبيعي."],
["Akkawi spécial manaïches.","عكاوي خاصة بالمناقيش."],["Thym oriental.","زعتر شرقي."],["Accompagnées de ketchup.","تُقدّم مع الكاتشب."],["Accompagnés de piment.","تُقدّم مع الفلفل الحار."],["Ailes de poulet grillées (8 pièces), accompagnées de sauce cocktail ou sauce BBQ, pâte à l’ail et piment.","أجنحة دجاج مشوية (8 قطع)، تُقدّم مع صلصة كوكتيل أو صلصة باربكيو، صلصة بالثوم وفلفل حار."],
["Rouleaux croustillants vietnamiens, frits et garnis de viande de bœuf ou de poulet (10 pièces), accompagnés de sauce nems et de piment.","لفائف فيتنامية مقرمشة، مقلية ومحشوة باللحم البقري أو الدجاج (10 قطع)، تُقدّم مع صلصة النيم والفلفل الحار."],
["Purée de pois chiches, accompagnée de légumes, pain, pâte à l’ail et piment.","حمص مهروس، يُقدّم مع الخضار والخبز وصلصة الثوم والفلفل الحار."],["Purée de pois chiches avec viande chawarma, accompagnée de légumes, pain, pâte à l’ail et piment.","حمص مهروس مع لحم الشاورما، يُقدّم مع الخضار والخبز وصلصة الثوم والفلفل الحار."],["Purée d’aubergines, accompagnée de légumes, pain, pâte à l’ail et piment.","باذنجان مهروس، يُقدّم مع الخضار والخبز وصلصة الثوم والفلفل الحار."],
["Format L Royal","بحجم L رويال"],["Format XL Royal","بحجم XL رويال"],["Format L","بحجم L"],["Format XL","بحجم XL"],["portion de frites","حصة من البطاطس المقلية"],["Accompagnement au choix","الطبق الجانبي حسب الاختيار"],
["Pâtes penne, sauce tomate arrabiata et fromage.","باستا بيني، صلصة طماطم أرابياتا وجبن."],["Spaghettis, viande de bœuf hachée et sauce bolognaise.","سباغيتي، لحم بقري مفروم وصلصة بولونيز."],["Spaghettis, sauce tomate épicée et steak de bœuf.","سباغيتي، صلصة طماطم حارة وستيك لحم بقري."],["Tagliatelles, sauce crémière aux champignons et blanc de poulet grillé.","تاغلياتيل، صلصة كريمية بالفطر وصدر دجاج مشوي."],["Tagliatelles, crevettes et sauce crémière aux champignons.","تاغلياتيل، روبيان وصلصة كريمية بالفطر."],["Penne, sauce crémière aux champignons, blanc de poulet et mozzarella fondue au four.","بيني، صلصة كريمية بالفطر، صدر دجاج وموزاريلا مذابة في الفرن."],
["Café court ou allongé.","قهوة إسبريسو قصيرة أو طويلة."],["Tasse de Nescafé.","كوب نسكافيه."],["Café espresso ou Nescafé, lait chaud.","إسبريسو أو نسكافيه مع حليب ساخن."],["Cacao et lait chaud fait maison.","كاكاو وحليب ساخن محضّر في المطعم."],["Chocolat chaud fait maison.","شوكولاتة ساخنة محضّرة في المطعم."],["Carafe de café libanais.","إبريق قهوة لبنانية."],["Carafe orientale à la menthe.","إبريق شاي شرقي بالنعناع."],["Carafe de thé au gingembre et au miel.","إبريق شاي بالزنجبيل والعسل."],
["Nutella, banane, Oreo, sauce chocolat.","نوتيلا، موز، أوريو وصلصة شوكولاتة."],["Jambon de bœuf ou de dinde, fromage mozzarella.","هام بقري أو هام ديك رومي وجبن موزاريلا."],["Vanille, chocolat, fraise, menthe, américain, malaga, plombière, yaourt fraise.","فانيليا، شوكولاتة، فراولة، نعناع، أمريكان، مالاغا، بلومبيير، وزبادي بالفراولة."],["3 boules de glace, banane, chantilly, sauce chocolat et fraise.","3 كرات آيس كريم، موز، كريمة مخفوقة وصلصة شوكولاتة وفراولة."],["3 boules de glace au choix, chantilly, sauce chocolat et fraise, Oreo.","3 كرات آيس كريم حسب الاختيار، كريمة مخفوقة، صلصة شوكولاتة وفراولة، وأوريو."],["Tasse de salade de fruits de saison.","كوب من سلطة فواكه الموسم."],["Fruits de saison.","فواكه الموسم."],
["Menthe fraîche, San Pellegrino, sirop de canne et citron.","نعناع طازج، سان بيليغرينو، شراب قصب السكر وليمون."],["Menthe fraîche, jus de passion frais et citron.","نعناع طازج، عصير باشن فروت طازج وليمون."],["Jus de passion mixé et frais, orange et grenadine.","عصير باشن فروت طازج ومخلوط، برتقال وغرينادين."],["Pulpe de jus d’orange, Perrier et sirop de fraise.","لب عصير البرتقال، بيريه وشراب الفراولة."],["Jus de fraise mixé, orange, passion, ananas et citron.","عصير فراولة مخلوط، برتقال، باشن فروت، أناناس وليمون."],["Jus d’orange, jus de passion, Perrier et curaçao bleu.","عصير برتقال، عصير باشن فروت، بيريه وكوراساو أزرق."],["Lait de coco, jus d’ananas frais et sirop caribéen.","حليب جوز الهند، عصير أناناس طازج وشراب كاريبي."],
["Rhum blanc, menthe fraîche, S. Pellegrino et citron.","روم أبيض، نعناع طازج، سان بيليغرينو وليمون."],["Rhum blanc, menthe fraîche, bière Desperados et citron.","روم أبيض، نعناع طازج، بيرة ديسبيرادوس وليمون."],["Gin, rhum blanc, vodka, tequila, Coca et citron.","جن، روم أبيض، فودكا، تيكيلا، كوكاكولا وليمون."],["Chambord, cranberry, vodka et jus d’orange.","شامبور، توت بري، فودكا وعصير برتقال."],["Vodka, rhum blanc, triple sec, menthe et citron.","فودكا، روم أبيض، تربل سيك، نعناع وليمون."],["Vodka, curaçao bleu et citron.","فودكا، كوراساو أزرق وليمون."],["Cointreau, tequila et citron.","كوانترو، تيكيلا وليمون."],["Tequila, jus d’orange et grenadine.","تيكيلا، عصير برتقال وغرينادين."],["Baileys, Kahlúa et Nutella.","بايليز، كاهلوا ونوتيلا."],["Jägermeister et Red Bull.","ياغرمايستر وريد بُل."],["Tequila, rhum, Jägermeister et Bombay Gin.","تيكيلا، روم، ياغرمايستر وجن بومباي."],["Vodka fruitée.","فودكا بنكهة الفاكهة."],
["Whisky — tournée (verre).","ويسكي — جولة (كأس)."],["Rhum & tequila — tournée (verre).","روم وتيكيلا — جولة (كأس)."],["Gin & vodka — tournée (verre).","جن وفودكا — جولة (كأس)."],["Cognac — tournée (verre).","كونياك — جولة (كأس)."],["Spiritueux, liqueurs & apéritifs — tournée (verre).","مشروبات روحية وليكيورات ومقبلات — جولة (كأس)."],["Champagnes — tournée (verre).","شمبانيا — جولة (كأس)."],
["Whisky — bouteille.","ويسكي — زجاجة."],["Rhum & tequila — bouteille.","روم وتيكيلا — زجاجة."],["Gin & vodka — bouteille.","جن وفودكا — زجاجة."],["Cognac — bouteille.","كونياك — زجاجة."],["Spiritueux, liqueurs & apéritifs — bouteille.","مشروبات روحية وليكيورات ومقبلات — زجاجة."],["Champagnes — bouteille.","شمبانيا — زجاجة."],["Bouteille.","زجاجة."]
];
var AR_LABELS={"Sandwich":"سندويتش","Plat":"طبق","Demi":"نصف","Entier":"كامل","Grand":"كبير","Moyen":"متوسط","Verre":"كأس","Bouteille":"زجاجة","Bouteilles 33 cl":"زجاجات 33 سل","Canettes 50 cl":"علب 50 سل"};
function arApplyPairs(value,pairs){
  var o=value||"";
  for(var i=0;i<pairs.length;i++)o=o.split(pairs[i][0]).join(pairs[i][1]);
  return o;
}
function arName(value){
  var o=arApplyPairs(value,AR_NAME_PHRASES);
  if(o===value){
    var extra=[["NATURE","سادة"],["SPÉCIALE","خاص"],["SPÉCIAL","خاص"],["LÉGUMES","خضار"],["VIANDE","لحم"],["FROMAGE","جبن"],["JAMBON","هام"],["POULET","دجاج"],["CREVETTES","روبيان"],["FRITES","بطاطس مقلية"],["THÉ","شاي"],["JUS","عصير"],["CRÊPE","كريب"],["PIZZA","بيتزا"]];
    for(var i=0;i<extra.length;i++)o=o.split(extra[i][0]).join(extra[i][1]);
  }
  return o;
}
function arDesc(value){
  var o=arApplyPairs(value,AR_DESC_PHRASES);
  var extra=[
["œuf au plat","بيض مقلي"],["œufs","بيض"],["omelette","عجة"],["fromage","جبن"],["jambon","هام"],["légumes","خضار"],["viande de bœuf","لحم بقري"],["viande hachée","لحم مفروم"],["viande","لحم"],["poulet","دجاج"],["filet","فيليه"],["steak","ستيك"],["crevettes","روبيان"],["crabe","سلطعون"],["thon","تونة"],
["salade de chou","سلطة الملفوف"],["salade","سلطة"],["tomates","طماطم"],["concombres","خيار"],["oignons verts","بصل أخضر"],["oignons","بصل"],["poivrons","فلفل"],["champignons","فطر"],["carottes","جزر"],["maïs doux","ذرة حلوة"],["maïs","ذرة"],["olives noires","زيتون أسود"],["olives","زيتون"],["persil","بقدونس"],["menthe","نعناع"],["radis","فجل"],["chou","ملفوف"],["épinards","سبانخ"],["semoule","سميد"],["haricots","فاصوليا"],["petits pois","بازلاء"],
["pommes de terre","بطاطس"],["frites","بطاطس مقلية"],["pain libanais","خبز لبناني"],["pain tortilla","خبز تورتيلا"],["pain","خبز"],["beurre","زبدة"],["mozzarella","موزاريلا"],["cheddar","شيدر"],["parmesan","بارميزان"],["mayonnaise","مايونيز"],["ketchup","كاتشب"],["piment","فلفل حار"],
["ananas","أناناس"],["mangue","مانجو"],["pomme","تفاح"],["orange","برتقال"],["banane","موز"],["fraise","فراولة"],["citron","ليمون"],["passion","باشن فروت"],["fruits","فواكه"],["vanille","فانيليا"],["chocolat","شوكولاتة"],["glace","آيس كريم"],["chantilly","كريمة مخفوقة"],["sirop","شراب مركز"],["lait","حليب"],["café","قهوة"],["thé","شاي"],["gingembre","زنجبيل"],["miel","عسل"],["cacao","كاكاو"],
["sauce cocktail","صلصة كوكتيل"],["Sauce cocktail","صلصة كوكتيل"],["sauce BBQ","صلصة باربكيو"],["sauce blanche crémière","صلصة بيضاء كريمية"],["sauce crémière","صلصة كريمية"],["sauce tomate","صلصة الطماطم"],["sauce mayonnaise","صلصة المايونيز"],["pâte à l’ail","صلصة بالثوم"],["pâte à l'ail","صلصة بالثوم"],
["Rhum","روم"],["rhum","روم"],["Whisky","ويسكي"],["Gin","جن"],["Vodka","فودكا"],["Tequila","تيكيلا"],["Cognac","كونياك"],["Champagnes","شمبانيا"],["liqueurs","ليكيورات"],["Spiritueux","مشروبات روحية"],["bière","بيرة"],
["grillé","مشوي"],["grillée","مشوية"],["grillées","مشوية"],["braisé","مطهو"],["braisée","مطهية"],["frit","مقلي"],["fritte","مقلية"],["pané","مغطى بالبقسماط"],["panée","مغطاة بالبقسماط"],["sauté","سوتيه"],["sautée","سوتيه"],["croustillant","مقرمش"],["croustillante","مقرمشة"],["crémeux","كريمي"],["fraîche","طازجة"],["frais","طازج"],["naturel","طبيعي"],["naturels","طبيعية"],["fait maison","محضّر في المطعم"],["au four","في الفرن"],
["Accompagnement au choix","الطبق الجانبي حسب الاختيار"],["au choix","حسب الاختيار"],["portion","حصة"],["pièce","قطعة"],["pièces","قطع"],["Format","بحجم"],["tournée","جولة"],["verre","كأس"],["bouteille","زجاجة"],
["avec","مع"],[" ou "," أو "],[" ou"," أو"],["et ","و "]
  ];
  for(var j=0;j<extra.length;j++)o=o.split(extra[j][0]).join(extra[j][1]);
  return o.replace(/\\s{2,}/g," ").replace(/\\s+([،.])/g,"$1").trim();
}
function arLabel(value){return AR_LABELS[value]||value;}


AR_NAME_PHRASES.push(
["ZAATAR","زعتر"],["COCKTAIL","كوكتيل"],["FATTOUCHE","فتوش"],["TABOULÉ","تبولة"],["NIÇOISE","نيسواز"],["CÉSAR","سيزر"],["EL PATRÓN","إل باترون"],["CRABE","سلطعون"],["KEBBEH","كبة"],["SAMOUSSA","سمبوسة"],["WINGS","أجنحة الدجاج"],["NUGGETS","ناجتس الدجاج"],["NEMS","نيم"],["ALLOCOS","ألوكو"],["HOUMMOUS","حمص"],["MOUTABBAL","متبل"],["EGG & CHEESE BURGER","برغر بالبيض والجبن"],["MILKSHAKES SPÉCIAUX","ميلك شيك خاص"],
["Fresco","فريسكو"],["Coca - Fanta - Sprite","كوكا - فانتا - سبرايت"],["Orangina - Malta - Cody's - Bavaria - Sanbitter","أورانجينا - مالتا - كودي - بافاريا - سانبيتر"],["Red Bull - Perrier - Schweppes tonic - Schweppes agrumes - Oasis - Lipton Ice Tea","ريد بُل - بيرييه - شويبس تونك - شويبس بالحمضيات - أوازيس - ليبتون آيس تي"],
["Heineken - Guinness - Castel - Desperados","هاينيكن - غينيس - كاستل - ديسبيرادوس"],["Budweiser - Corona - Beaufort","بدوايزر - كورونا - بوفور"],
["Johnny Red Label","جوني ريد ليبل"],["J&B","جيه آند بي"],["Clan Campbell","كلان كامبل"],["Ballantine's","بالانتاينز"],["Jack Daniel's Honey","جاك دانيالز هاني"],["Jack Daniel's","جاك دانيالز"],["Johnny Black Label","جوني بلاك ليبل"],["Johnny Double Black","جوني دابل بلاك"],["Chivas Regal 12","شيفاز ريغال 12"],["Havana","هافانا"],["Saint James","سانت جيمس"],["Rhum Cubano","روم كوبانو"],["Tequilla","تيكيلا"],["Gordon's","غوردنز"],["Bombay Sapphire","بومباي سافير"],["Vodka Absolut","فودكا أبسولوت"],["Vodka Smirnoff","فودكا سميرنوف"],["Belvedere","بلفيدير"],["Grey Goose","غراي غوس"],["Prince d'Arignac VS","برنس دارينيّاك VS"],["Hennessy Cognac","هينيسي كونياك"],["Martell VS","مارتيل VS"],["Get 27","جيت 27"],["Baileys","بايليز"],["Martini Rouge (Rosso)","مارتيني أحمر (روسو)"],["Martini Blanc (Bianco)","مارتيني أبيض (بيانكو)"],["Ricard","ريكارد"],["Pastis 51","باستيس 51"],["Campari","كامباري"],["Nicolas Feuillatte","نيكولا فويّات"],["Laurent Perrier","لوران بيرييه"],["Moët & Chandon","مويت وشاندون"],["Veuve Clicquot","فوف كليكو"],["Ruinart","روينار"],
["Valentino","فالنتينو"],["Baron d’Arignac Demi-Sec","بارون دارينيّاك ديمي-سيك"],["Baron d’Arignac Brut","بارون دارينيّاك بروت"],["Baron d’Arignac","بارون دارينيّاك"],["Chamberi","شامبيري"],["Ch. Rousseau","شاتو روسو"],["Rochet Mazet","روشيه مازي"],["Calvet Moelleux","كالفِيه موالّو"],["Souvenirs","سوفونير"],["Chemin des Sables","شومان دي سابل"],["Kasra Sunset","كاسرا سانسيت"],["Cabernet d’Anjou","كابيرنيه دانجو"],["Mateus","ماتيوس"],["Bleu de Mer","بلو دو مير"],["Gris Blanc","غري بلان"],["Calvet Bordeaux","كالفِيه بوردو"],["Mouton Cadet","موتون كاديه"],["Haussmann","هوسمان"],["Côtes du Rhône","كوت دو رون"],["Château Ferrande Graves","شاتو فيراند غراف"],["J.P. Chenet Ice","جي بي شينيه آيس"],["Calvet Ice","كالفِيه آيس"],["Pierlant Demi-Sec Or","بييرلان ديمي-سيك أور"]
);
AR_NAME_PHRASES.sort(function(a,b){return b[0].length-a[0].length;});
var AR_DESC_SAFE=[
["huile d’olive","زيت الزيتون"],["huile d'olive","زيت الزيتون"],["origan","أوريغانو"],["ail","ثوم"],["cornichons","مخللات"],["cornichon","مخلل"],["bœuf","لحم بقري"],["dinde","ديك رومي"],["hachées","مفرومة"],["hachée","مفروم"],["tranché","مقطّع"],["verte","خضراء"],["vert","أخضر"],["noires","سوداء"],["noirs","سوداء"],["cuits","مطهو"],["cuite","مطهوة"],["marinée","متبلة"],["épicée","حارة"],["épicé","حار"],["fourrée","محشوة"],["fourrés","محشوة"],["fourré","محشو"],["farcie","محشوة"],["farci","محشو"],["enrobées","مغطاة"],["recouvertes","مغطاة"],["recouvert","مغطى"],["Briquettes","رقائق"],["Galette de pain","عجينة خبز"],["Bâtonnets","أصابع"],["Rouleaux","لفائف"],["Morceaux","قطع"],["boulettes","كرات اللحم"],["gésier","قوانص"],["foie","كبد"],["rosto","روستو"],["merguez","مرقاز"],["sojok","سجق سوجوك"],["kafta","كفتة"],["shish taouk","شيش طاووق"],["escalope","إسكالوب"],["chawarma","شاورما"],["tortilla","تورتيلا"],
["crème fraîche","كريمة طازجة"],["crème","كريمة"],["jalapeños","هالابينو"],["haricots","فاصوليا"],["petits pois","بازلاء"],["radis","فجل"],["semoule","سميد"],["aubergines","باذنجان"],["pois chiches","حمص"],["Perrier","بيرييه"],["San Pellegrino","سان بيليغرينو"],["S. Pellegrino","سان بيليغرينو"],["Desperados","ديسبيرادوس"],["Red Bull","ريد بُل"],["Coca","كوكاكولا"],["cranberry","توت بري"],["triple sec","تربل سيك"],["curaçao bleu","كوراساو أزرق"],["Jägermeister","ياغرمايستر"],["Bombay Gin","جن بومباي"],["Kahlúa","كاهلوا"],["Akkawi","عكاوي"],["américain","أمريكان"],["malaga","مالاغا"],["plombière","بلومبيير"],["yaourt","زبادي"],["sauce beignet","صلصة الفطائر"],["sauce nems","صلصة النيم"],["jus","عصير"],["pulpe","لب"],["sirop","شراب مركز"],["caribéen","كاريبي"],["canne","قصب السكر"],["passion","باشن فروت"],["vanille","فانيليا"],["chantilly","كريمة مخفوقة"],["saison","الموسم"],["frappés","مثلج"],["laitue","خس"],["tomates","طماطم"],["concombres","خيار"],["oignons verts","بصل أخضر"],["oignons","بصل"],["poivrons","فلفل"],["champignons","فطر"],["carottes","جزر"],["maïs","ذرة"],["olives","زيتون"],["persil","بقدونس"],["menthe","نعناع"],["chou","ملفوف"],["fromage","جبن"],["œuf","بيض"],["œufs","بيض"],["beurre","زبدة"],["pain","خبز"],["lait","حليب"],["café","قهوة"],["thé","شاي"],["gingembre","زنجبيل"],["miel","عسل"],["pommes de terre","بطاطس"],["frites","بطاطس مقلية"],["riz","أرز"],
["Accompagnées","تُقدّم"],["Accompagnés","تُقدّم"],["Accompagné","يُقدّم"],["accompagnées","تُقدّم"],["accompagnés","تُقدّم"],["accompagné","يُقدّم"],["pané","مغطى بالبقسماط"],["panée","مغطاة بالبقسماط"],["grillé","مشوي"],["grillée","مشوية"],["grillées","مشوية"],["braisé","مطهو"],["braisée","مطهية"],["sauté","سوتيه"],["sautée","سوتيه"],["croustillant","مقرمش"],["croustillante","مقرمشة"],["crémière","كريمية"],["crémeuse","كريمية"],["maison","محضّر في المطعم"],["fait maison","محضّر في المطعم"],["au four","في الفرن"],["au choix","حسب الاختيار"],["portion","حصة"],["pièces","قطع"],["pièce","قطعة"],["Format","بحجم"],["Bouteille","زجاجة"],["Verre","كأس"],["Grand","كبير"],["Moyen","متوسط"],["Demi","نصف"],["Entier","كامل"],["tournée","جولة"],["avec","مع"],["ou","أو"],["et","و"],["aux","بـ"],["au","بـ"],["à","بـ"],["de","من"],["des",""],["du",""],["les",""],["la",""],["le",""]
];
AR_DESC_SAFE.sort(function(a,b){return b[0].length-a[0].length;});
function arRegexApply(value,pairs){
  var o=value||"";
  for(var i=0;i<pairs.length;i++){
    var esc=pairs[i][0].replace(/[.*+?^$()|[\]\\\\{}]/g,"\\\\function tr(s){");
    o=o.replace(new RegExp("(^|[^A-Za-zÀ-ÿŒœ])"+esc+"(?=$|[^A-Za-zÀ-ÿŒœ])","giu"),function(_,pre){return pre+pairs[i][1];});
  }
  return o;
}
function arName(value){return arApplyPairs(value,AR_NAME_PHRASES);}
function arDesc(value){
  var o=arApplyPairs(value,AR_DESC_PHRASES);
  return arRegexApply(o,AR_DESC_SAFE).replace(/\\s{2,}/g," ").replace(/\\s+([،.])/g,"$1").trim();
}
function arLabel(value){return AR_LABELS[value]||arName(value);}

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
      if(lang==='ar'){
        if(typeof q.name==='string')q.name=arName(q.name);
        if(typeof q.sub==='string')q.sub=arName(q.sub);
        if(typeof q.desc==='string')q.desc=arDesc(q.desc);
        if(typeof q.note==='string')q.note=arDesc(q.note);
      }else{
        ['name','sub','desc','note'].forEach(function(k){if(typeof q[k]==='string')q[k]=tr(q[k]);});
      }
      if(Array.isArray(q.price))q.price=q.price.map(function(o){return Object.assign({},o,{label:typeof o.label==='string'?(lang==='ar'?arLabel(o.label):tr(o.label)):o.label});});
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
  var langs=['fr','en','ar'],parts=location.pathname.split('/').filter(Boolean),localeIndex=-1;
  for(var li=0;li<langs.length;li++){var found=parts.indexOf(langs[li]);if(found>=0){localeIndex=found;break;}}
  var hasLocale=localeIndex>=0,inPages=parts[parts.length-2]==='pages',file=parts[parts.length-1]||'index.html';
  function target(l){
    if(inPages)return (hasLocale?'../../':'../')+l+'/pages/'+file;
    return (hasLocale?'../':'./')+l+'/';
  }
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