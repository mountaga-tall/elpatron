# Démarrage

Ouvrir `index.html` ou servir le dossier avec n’importe quel serveur statique.

Exemple local :

```bash
python -m http.server 8080
```

Aucun build n’est nécessaire.

## Images produits

Les futures photos doivent être ajoutées en **WebP**, idéalement avec deux fichiers par produit. Dans `menu-data.js`, ajouter :

```js
images: [
  "images/produits/nom-1.webp",
  "images/produits/nom-2.webp"
]
```

L’interface les affichera automatiquement en galerie responsive.
