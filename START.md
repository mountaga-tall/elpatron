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

## Modifications intégrées

- 12 tacos distincts issus des 3 recettes et 4 formats existants, triés du moins cher au plus cher.
- Burgers et Snack affichent par défaut le montant du format sandwich, puis l’option « Plat ».
- Les 6 photos de pâtes sont reliées à leurs produits et leurs chemins sont corrigés pour les pages dans `fr\/pages/`, `en\/pages/` et `ar\/pages/`.
- Effet hover « wow » : inclinaison 3D, halo lumineux, zoom des images et révélations décalées, avec respect de `prefers-reduced-motion`.
