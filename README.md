# EL PATRÓN — Menu 2027

Site statique multi-pages HTML/CSS/JavaScript, responsive, installable comme PWA et publié via GitHub Pages.

## Langues et pages

- Français : `/fr/`
- English : `/en/`
- Page de réservation et d'événements dans les deux langues : `/fr/pages/reservation.html` et `/en/pages/reservation.html`
- Pages de contact, panier, expérience et catégories de menu dans les deux langues.
- La version arabe et les styles RTL ne font plus partie du site.

## Fichiers principaux

- `index.html` : sélecteur de langue FR / EN.
- `styles.css` : identité visuelle, composants, responsive desktop/tablette/mobile et pastille compacte FR / EN.
- `app.js` : navigation, panier, variantes, recherche et commande WhatsApp.
- `enhancements.js` : formulaire de réservation/événements, données de contact, partage, galerie photo et petites améliorations d'interface.
- `i18n.js` : traductions françaises et anglaises uniquement.
- `menu-data.js` : catalogue, compositions et tarifs.
- `sw.js` et `manifest.webmanifest` : cache PWA et installation.
- `icons.js` : icônes SVG inline.
- `images/logo.webp` et `icons/icon-192.webp` / `icons/icon-512.webp` : logo et icônes PWA.

## Réservations et événements

Le formulaire prend en charge les tables au restaurant, petit-déjeuner/brunch, anniversaires, mariages/fiançailles, repas de famille, cérémonies privées, rendez-vous professionnels, réunions, séminaires, team building, rencontres B2B et privatisation.

Les informations envoyées dans la demande WhatsApp sont : type de réservation, date, heure, nombre de personnes, nom complet et téléphone. Le nom de l'entreprise/organisation et le message personnalisé sont facultatifs. Les disponibilités restent à confirmer par l'équipe.

## Panier et images

- Le panier commun permet d'ajouter, modifier et retirer les articles.
- La commande est préparée dans le navigateur puis transmise via WhatsApp.
- Les produits peuvent afficher une ou plusieurs images WebP si les chemins sont définis dans leurs données.
- Les scripts et styles importants sont revalidés par le service worker afin de limiter l'affichage de fichiers périmés.

## Vérifications

Le workflow GitHub Actions vérifie la syntaxe JavaScript, le manifeste PWA et la présence des fichiers principaux avant de publier le site. Les tests automatiques ne remplacent pas une vérification manuelle de chaque parcours dans un vrai navigateur.

## Développement local

Aucun build n'est requis. Depuis la racine du dépôt :

```bash
python -m http.server 8080
```

Ouvrez ensuite `http://localhost:8080/`.

Le code est publié depuis GitHub. Le domaine personnalisé et ses DNS sont gérés séparément chez Netim.
