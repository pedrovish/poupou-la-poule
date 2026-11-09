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
Décor disponible : `grange, soleil, nuage, arbre, fleur, mare, barriere, graines, coeur, etoile, lune, luciole, lanterne, buisson, citrouille, citrouillesourire, feuille, feuillerouge, tasfeuilles, arbreautomne, brouette, soupe, cabane, bottefoin, pomme, parapluie, salade, arcenciel, flaque, panier, pelote, touffe, flocon, betterave, bassine, tricot, gateau, part, oeuf, seau, sacfarine, saladier, four, guirlande, vieilarbre, branche, note, gland, tasglands, carte, pousse, mangeoire, arbrenu (arbre d’hiver givré), planches, bonhommenu / bonhommedeux / bonhommevisage / bonhommeneige (bonhomme de neige, étape par étape), bouleneige, carotte, cailloux, brindilles, chocolat`.
Amis récurrents : **Lumi** (`luciole`), la petite luciole (histoire n°2) ; **Pic-Pic** (`herisson`, `herissondort`), le petit hérisson (n°4) ; **Lili** (`escargot`), la petite escargote à la coquille rose (n°5) ; **Flocon** (`mouton`), le petit mouton timide et tout bouclé (n°6) ; **Noisette** (`souris`), la petite souris maligne au foulard vert (n°7) ; **Plume** (`hibou`, `hibouchante`, `hiboutriste`), le petit hibou tout rond qui fait « pouêt » (n°8) ; **Pirouette** (`ecureuil`, `ecureuiltriste`), le petit écureuil tête en l’air au nœud jaune (n°9) ; **Pépin** (`rougegorge`, `rougegorgefroid`, `rougegorgechante`), le petit rouge-gorge, et ses amies les mésanges (`mesange`) (n°11).
Tous les animaux regardent vers la droite ; `{flip:true}` les retourne.

## API de dessin (scène 800×560, sol vers y≈380)
- `decor(moment, derriere)` — moment : `'jour' | 'coucher' | 'nuit' | 'pluie'` ; `derriere` = SVG dessiné derrière les collines (soleil couchant, lune basse).
- `u(id, x, y, largeur, {flip, rot, op})` — place un dessin (hauteur calculée automatiquement, voir RATIO dans livre.js ; tout nouveau symbole doit y être ajouté).
- `vent(x, y, echelle)`, `confettis(n)`, `bulle(x, y, 'Texte', largeur)` ; on peut aussi concaténer du SVG brut.
- `lancerHistoire({numero, titre, morale, couverture: () => svg, fin: () => svg (optionnel, sinon coucher de soleil), pages: [{scene: () => svg, texte: "..."}]})`.

## Règles d'écriture (demande du papa, à partir de l'histoire n°14)
- **Poupou fait des bêtises et c'est drôle.** Chaque histoire part d'une bêtise de Poupou (curiosité, gourmandise, idée farfelue, envie d'aider qui tourne mal) qui entraîne une suite de catastrophes rigolotes en cascade, chaque page un peu plus folle que la précédente.
- Humour pour 5 ans : situations absurdes, onomatopées (SPLATCH, PATATRA, BLOUP…), répétitions comiques (« Oh oh… »), objets à l'envers, déguisements ratés, animaux tout surpris, Papi Hamid qui découvre le désordre avec de grands yeux. Les dessins montrent la bêtise (taches, plumes partout, objets renversés) et les expressions surprises.
- Les bêtises restent gentilles et sans danger réel : pas de bêtise imitable dangereuse (feu, prises électriques, médicaments, se cacher d'un adulte, grimper très haut, s'approcher de l'eau seule). Personne n'est méchant ni puni durement.
- À la fin, Poupou reconnaît sa bêtise, dit pardon et aide à réparer ; tout le monde rit ensemble. Morale douce et légère.
- **Un peu plus long** : 10 à 12 pages, 2 à 4 phrases courtes par page, vocabulaire de 5 ans, dialogues entre « ».
- Varier les bêtises d'une histoire à l'autre (ne pas répéter une intrigue de histoires.json) ; saisons, météo et amis de la planche (Caramel, Marguerite, Coin-Coin, Lumi, Papi Hamid…).
- Mots importants en `<b>`. Apostrophes typographiques (’).
- Vérifier le rendu de chaque page avant de publier.
