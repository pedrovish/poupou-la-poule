# Les aventures de Poupou la poule

Site statique (Vercel, projet `poupou-la-poule`, équipe `bcherradi-4474s-projects`).
Une histoire illustrée par jour pour une petite fille de 5 ans, en français.

## Fichiers
- `index.html` — la bibliothèque ; lit `histoires.json` (ne pas modifier pour ajouter une histoire).
- `histoires.json` — liste des histoires : `numero, titre, resume, date (AAAA-MM-JJ), fichier, couleur (fond de vignette), objet (id d'un dessin affiché sur la vignette, optionnel), nuit (true pour une vignette de nuit, optionnel)`.
- `histoires/NN-slug.html` — une page par histoire (copier la structure de `01-le-chapeau-envole.html`).
- `assets/personnages.svg` — planche de dessins (symboles SVG). On peut y AJOUTER de nouveaux symboles, jamais en retirer ni modifier ceux qui existent.
- `assets/livre.js` — moteur du livre (ne pas casser l'API ci-dessous). `assets/style.css`, `assets/favicon.svg`.

## Personnages (garder leur caractère d'une histoire à l'autre)
- **Poupou** (`poupou`) : petite poule rousse au foulard bleu à pois, très curieuse, courageuse, gentille.
- **Caramel** (`caramel`) : petit cochon rose avec une tache caramel, gourmand et plein d'idées.
- **Marguerite** (`marguerite`) : la vache, douce et un peu rêveuse, une marguerite sur la tête. Dit « Meuh ».
- **Coin-Coin** (`coincoin`) : le caneton jaune, petit, rigolo, bon nageur.
- **Papi Hamid** (`hamid`) : le fermier, moustache grise, salopette bleue, très gentil. Son chapeau : `chapeau`.
Décor disponible : `grange, soleil, nuage, arbre, fleur, mare, barriere, graines, coeur, etoile, lune, luciole, lanterne, buisson, citrouille, citrouillesourire, feuille, feuillerouge, tasfeuilles, arbreautomne, brouette, soupe, cabane, bottefoin, pomme, parapluie, salade, arcenciel, flaque, panier, pelote, touffe, flocon, betterave, bassine, tricot, gateau, part, oeuf, seau, sacfarine, saladier, four, guirlande`.
Amis récurrents : **Lumi** (`luciole`), la petite luciole (histoire n°2) ; **Pic-Pic** (`herisson`, `herissondort`), le petit hérisson (n°4) ; **Lili** (`escargot`), la petite escargote à la coquille rose (n°5) ; **Flocon** (`mouton`), le petit mouton timide et tout bouclé (n°6) ; **Noisette** (`souris`), la petite souris maligne au foulard vert (n°7).
Tous les animaux regardent vers la droite ; `{flip:true}` les retourne.

## API de dessin (scène 800×560, sol vers y≈380)
- `decor(moment, derriere)` — moment : `'jour' | 'coucher' | 'nuit' | 'pluie'` ; `derriere` = SVG dessiné derrière les collines (soleil couchant, lune basse).
- `u(id, x, y, largeur, {flip, rot, op})` — place un dessin (hauteur calculée automatiquement, voir RATIO dans livre.js ; tout nouveau symbole doit y être ajouté).
- `vent(x, y, echelle)`, `confettis(n)`, `bulle(x, y, 'Texte', largeur)` ; on peut aussi concaténer du SVG brut.
- `lancerHistoire({numero, titre, morale, couverture: () => svg, fin: () => svg (optionnel, sinon coucher de soleil), pages: [{scene: () => svg, texte: "..."}]})`.

## Règles d'écriture
- 7 à 9 pages, 1 à 3 phrases courtes par page, vocabulaire de 5 ans, onomatopées, dialogues entre « ».
- Une petite aventure à la ferme avec un problème, une entraide, une fin heureuse et une morale douce.
- Jamais de peur forte, de violence ni de danger réel. Varier : saisons, météo, nuit, fêtes, nouveaux petits personnages (ajoutés à la planche).
- Mots importants en `<b>`. Apostrophes typographiques (’).
- Vérifier le rendu de chaque page avant de publier.
