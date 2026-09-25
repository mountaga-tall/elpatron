# EL PATRÓN — Menu 2027

Site statique multi-pages HTML/CSS/JS, pensé mobile-first et installable comme PWA.

## Structure

- `index.html` — accueil + écran de chargement au lancement du site/PWA uniquement
- `styles.css` — identité blanche premium + responsive + animations
- `app.js` — navigation, panier, variantes, WhatsApp, recherche et micro-interactions
- `icons.js` — icônes SVG inline
- `menu-data.js` — contenu du menu source, prix et compositions
- `images/logo.webp` — logo principal en WebP
- `icons/icon-192.webp` / `icons/icon-512.webp` — icônes PWA
- `pages/*.html` — une rubrique par page + panier + contact

## Images produits

Chaque produit peut recevoir jusqu’à **2 images WebP** via :

```js
images: [
  "images/produits/nom-produit-1.webp",
  "images/produits/nom-produit-2.webp"
]
```

Les deux images s’affichent automatiquement en galerie dans la fiche produit et restent responsives sur mobile.

## Règles menu mises en place

- Pizzas : `Grand` puis `Moyen`, avec `Grand` sélectionné par défaut.
- Tacos : `XL Royal` puis `XL` puis `L Royal` puis `L`, avec `XL Royal` sélectionné par défaut.
- Vins : chaque bouteille est un produit individuel avec son nom, son prix et sa catégorie.
- Le panier utilise une icône poubelle pour supprimer un article.

## PWA

- `start_url` : accueil
- écran de chargement visible uniquement à l’ouverture de l’accueil/PWA
- fond et interface blancs
- icônes PWA WebP 192×192 et 512×512

Aucun build n’est nécessaire. Pour tester localement :

```bash
python -m http.server 8080
```
