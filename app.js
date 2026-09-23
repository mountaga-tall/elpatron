// Base de données complète du menu d'El Patrón structurée par catégories[cite: 20]
const menuData = {
    "petit-dej": [
        { name: "Omelette Nature", desc: "Omelette ou œuf au plat, avec du pain et du beurre.", price: 2000 },
        { name: "Omelette Fromage", desc: "Omelette ou œuf au plat au fromage, avec du pain et du beurre.", price: 3000 },
        { name: "Omelette Spéciale", desc: "Omelette ou œuf au plat, fromage, jambon, légumes avec du pain et du beurre.", price: 4000 },
        { name: "Omelette Royale", desc: "Omelette ou œuf au plat, fromage, jambon, légumes, salade, avocats, pain et beurre.", price: 5000 },
        { name: "Formule Spéciale", desc: "Omelette spéciale, pain, beurre, café au lait ou thé et jus naturel.", price: 7000 }
    ],
    "manaiches": [
        { name: "Zaatar", desc: "Thym oriental.", price: 1500 },
        { name: "Légumes", desc: "Tomates, oignons, poivrons, huile d'olives, origan.", price: 2000 },
        { name: "Viande", desc: "Viande de bœuf, oignons, tomates hachée.", price: 2500 },
        { name: "Fromage", desc: "Akkawi spécial manaïches.", price: 2500 },
        { name: "Cocktail", desc: "Viande de bœuf hachée, fromage ou zaatar.", price: 2500 },
        { name: "Jambon Fromage", desc: "Akkawi, jambon de bœuf ou de dinde.", price: 3000 }
    ],
    "salades": [
        { name: "Fattouche", desc: "Salade, tomates, concombres, persil, choux, oignons, radis, menthe, pain croustillant.", price: 4000 },
        { name: "Taboulé", desc: "Salade, tomates, persil, oignons, menthe, semoule.", price: 4000 },
        { name: "Salade de Choux", desc: "Choux tranchés, mayonnaise, carottes, maïs doux.", price: 3000 },
        { name: "Niçoise", desc: "Salade, thon, œufs, pommes de terre, tomates, concombres, olives noires.", price: 6000 },
        { name: "César", desc: "Salade, laitue, steak de poulet, tomates pain croustillant, parmesan.", price: 6000 },
        { name: "El Patrón", desc: "Salade, concombres, tomates, oignons, fromage, pommes de terre, œufs, haricots.", price: 6000 },
        { name: "Avocats Crevettes", desc: "Crevettes, avocats, salade, tomates, concombres.", price: 7000 },
        { name: "Crabe", desc: "Surimi de crabe, salade verte, mangue, pomme, orange, mayonnaise.", price: 7000 }
    ],
    "entrees": [
        { name: "Fatayer Viande", desc: "Galette de pain fourrée à la viande hachée (1 pce) + piment.", price: 1000 },
        { name: "Kebbeh", desc: "Coque de boulgour fine, fourré de viande hachée (5 pcs).", price: 3000 },
        { name: "Mozzarella Sticks", desc: "Bâtonnets de fromage mozzarella panés (5 pcs).", price: 3500 },
        { name: "Wings", desc: "Ailes de poulet grillé (8 pcs) avec sauce cocktail/BBQ.", price: 4000 },
        { name: "Hoummous Viande", desc: "Purée de pois chiche avec de la viande chawarma, pain.", price: 4500 },
        { name: "Frites", desc: "Accompagné de ketchup.", price: 1500 },
        { name: "Allocos", desc: "Bananes plantains frites + piment.", price: 1500 }
    ],
    "snack": [
        { name: "Chawarma Poulet", desc: "Poulet, frites, pâte à l'ail, cornichons.", price: 2500 },
        { name: "Chawarma Viande", desc: "Viande, oignons persillés, tomates, cornichons, tarator.", price: 2500 },
        { name: "Sandwich Crispy", desc: "Blanc de poulet pané, frites, salade, tomate, cheddar, ail.", price: 3500 },
        { name: "Sandwich Francisco", desc: "Poulet, mozzarella, mayonnaise, maïs, cornichons, laitue, soja.", price: 3500 },
        { name: "Sandwich Fahita", desc: "Poulet, poivrons, sauce avocat, oignons, champignons, maïs, mozza.", price: 3500 }
    ],
    "burgers": [
        { name: "Cheese Burger", desc: "Steak de viande, cheddar, mayonnaise, tomates, oignons frais, ketchup.", price: 3000 },
        { name: "American Burger", desc: "Steak de viande, cheddar, sauce cocktail, tomates/oignons cuits, salade.", price: 3500 },
        { name: "BBQ Burger", desc: "Viande, cheddar, sauce BBQ, tomates/oignons cuits, salade.", price: 3500 },
        { name: "Crispy Burger", desc: "Blanc de poulet pané, sauce cocktail, cheddar, tomates, salade.", price: 4500 },
        { name: "Chicken Mozza Burger", desc: "Steak de poulet, mozzarella pané, sauce cocktail, salade.", price: 5000 }
    ],
    "tacos": [
        { name: "Tacos Poulet (L)", desc: "Sauce cocktail, frites, poulet, mozzarella, poivrons sautés + frites.", price: 4000 },
        { name: "Tacos Viande (L)", desc: "Sauce cocktail, mozzarella, viande, frites, salade, poivrons + frites.", price: 4000 },
        { name: "Tacos Mix (L)", desc: "Sauce cocktail, mozzarella, viande et poulet, frites, salade + frites.", price: 4000 },
        { name: "Tacos Poulet Royale (XL)", desc: "Version grand format royale au poulet + portion de frites.", price: 8000 }
    ],
    "pastas": [
        { name: "Penne Arrabiata", desc: "Pâtes Penne, sauce tomate arrabiata, fromage.", price: 4000 },
        { name: "Spaghettis Bolognaise", desc: "Pâtes Spaghetti, viande de bœuf hachée sauce bolognaise.", price: 5000 },
        { name: "Tagliatelles Alfredo", desc: "Pâtes tagliatelles, sauce crémière aux champignons, poulet grillé.", price: 7000 },
        { name: "Tagliatelles aux Crevettes", desc: "Pâtes tagliatelle, crevettes, sauce crémière aux champignons.", price: 8000 },
        { name: "Penne Al Forno", desc: "Pâte Penne, sauce crème champignons, poulet, mozzarella au four.", price: 8500 }
    ],
    "plats": [
        { name: "Plat Chawarma", desc: "Chawarma Poulet ou Viande ou Mix, Acc. de légumes, pâte à l'ail.", price: 7000 },
        { name: "Escalope de Poulet", desc: "Steak de blanc de poulet pané + frites, salade, sauce cocktail.", price: 7000 },
        { name: "Steak à la Crème", desc: "Steak de bœuf à la crème et aux champignons, Acc au choix.", price: 8000 },
        { name: "Fahitas al Forno", desc: "Poulet, poivrons, tomates, oignons, champignons, mozzarella au four.", price: 8000 },
        { name: "Poisson Sosso Braisé", desc: "Poisson sosso braisé avec légumes sautés, Acc au choix.", price: 9000 }
    ],
    "pizzas": [
        { name: "Margherita", desc: "Sauce tomate, mozzarella, origan. (M: 6.000 / G: 7.000)", price: 6000 },
        { name: "Végétarienne", desc: "Sauce tomate, mozzarella, champignons, poivrons, maïs, olives.", price: 6000 },
        { name: "Royale", desc: "Sauce tomate, mozzarella, jambon, champignons, olives noires.", price: 7000 },
        { name: "Pepperoni", desc: "Sauce tomate, mozzarella, pepperoni.", price: 7000 },
        { name: "Mexicaine", desc: "Sauce tomate, mozzarella, viande hachée, poivrons, jalapeños.", price: 7000 },
        { name: "Crevettes", desc: "Sauce tomate, mozzarella, crevettes, oignons, poivrons.", price: 7500 }
    ],
    "boissons": [
        { name: "Espresso", desc: "Café court ou allongé.", price: 1500 },
        { name: "Café au Lait", desc: "Café espresso ou nescafé, lait chaud.", price: 2000 },
        { name: "Virgin Mojito", desc: "Fresh Menthe, San Pellegrino, sirop de canne, citron.", price: 5000 },
        { name: "Piña Colada", desc: "Lait de coco, jus d'ananas frais, sirop Caribbéen.", price: 6000 },
        { name: "Jus Naturels", desc: "Orange, passion, ananas, mangue, pomme.", price: 3000 },
        { name: "Heineken / Desperados", desc: "Bouteille 33cl.", price: 1500 }
    ],
    "desserts": [
        { name: "Crêpe Nutella", desc: "Délicieuse crêpe nappée de Nutella.", price: 3500 },
        { name: "Crêpe El Patrón", desc: "Nutella, banane, Oreo, sauce chocolat.", price: 4000 },
        { name: "Boule de Glace", desc: "Vanille, chocolat, fraise, menthe, etc.", price: 1000 },
        { name: "Banane Split", desc: "3 boules de glace, banane, chantilly, sauces.", price: 4000 },
        { name: "Salade de Fruits", desc: "Tasse de salade de fruits de saison.", price: 3000 }
    ]
};

// Gestion du panier
let cart = JSON.parse(localStorage.getItem('elPatronCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburger
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    // Gestion du Panier (Ouverture/Fermeture)
    const openCartBtn = document.getElementById('openCart');
    const closeCartBtn = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    if(openCartBtn) {
        openCartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('open');
        });
    }

    if(closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartPanel);
    }
    if(cartOverlay) {
        cartOverlay.addEventListener('click', closeCartPanel);
    }

    function closeCartPanel() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    // Si nous sommes sur la page menu.html
    const menuGrid = document.getElementById('menuGrid');
    if(menuGrid) {
        const tabs = document.querySelectorAll('.tab-btn');
        
        // Vérifier s'il y a un paramètre dans l'URL
        const urlParams = new URLSearchParams(window.location.search);
        let activeCat = urlParams.get('cat') || 'petit-dej';

        setActiveTab(activeCat);
        renderMenu(activeCat);

        tabs.forEach(btn => {
            btn.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                const cat = e.target.getAttribute('data-category');
                renderMenu(cat);
            });
        });
    }

    updateCartUI();

    // Bouton de commande WhatsApp
    const checkoutWhatsappBtn = document.getElementById('checkoutWhatsapp');
    if(checkoutWhatsappBtn) {
        checkoutWhatsappBtn.addEventListener('click', sendWhatsAppOrder);
    }
});

// Affichage dynamique des produits
function renderMenu(category) {
    const menuGrid = document.getElementById('menuGrid');
    if(!menuGrid) return;
    
    const items = menuData[category] || [];
    menuGrid.innerHTML = '';

    if(items.length === 0) {
        menuGrid.innerHTML = '<p style="color:var(--text-muted); text-align:center; grid-column:1/-1;">Aucun article disponible dans cette catégorie.</p>';
        return;
    }

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-item-card';
        card.innerHTML = `
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
            </div>
            <div class="item-footer">
                <span class="item-price">${item.price.toLocaleString()} FCFA</span>
                <button class="add-to-cart-btn" onclick="addToCart('${category}', ${index})">Ajouter <i class="fas fa-plus"></i></button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

function setActiveTab(cat) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        if(btn.getAttribute('data-category') === cat) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Actions du Panier
window.addToCart = function(category, index) {
    const item = menuData[category][index];
    const existingIndex = cart.findIndex(cartItem => cartItem.name === item.name);

    if(existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    
    // Ouvrir automatiquement le panier pour un effet fluide
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
}

function saveCart() {
    localStorage.setItem('elPatronCart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cartTotalPrice');

    if(!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalCount = 0;

    if(cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            totalCount += item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span>${item.price.toLocaleString()} FCFA</span>
                </div>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }

    if(cartCount) cartCount.innerText = totalCount;
    if(cartTotalPrice) cartTotalPrice.innerText = total.toLocaleString() + ' FCFA';
}

window.changeQuantity = function(index, delta) {
    cart[index].quantity += delta;
    if(cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
}

// Envoyer la commande par WhatsApp
function sendWhatsAppOrder() {
    if(cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    let message = "Bonjour *El Patrón*, je souhaite passer la commande suivante :\n\n";
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        message += `- ${item.quantity}x ${item.name} (${subtotal.toLocaleString()} FCFA)\n`;
    });

    message += `\n*Total Général : ${total.toLocaleString()} FCFA*\n\nMerci de me confirmer la disponibilité et le délai de livraison.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/2250704400400?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}
