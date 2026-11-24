# DEBUG — Les violences invisibles

**Identifier. Comprendre. Agir.**

## Lancer le jeu

Ouvre `index.html` dans un navigateur récent. Aucun serveur, compte, téléchargement de dépendances ou accès à Internet n’est nécessaire. La page de ressources est intégrée au jeu. Les liens externes demandent une connexion.

Les commandes sont utilisables au clavier. Utilise Tab et Maj + Tab pour te déplacer, puis Entrée pour activer le contrôle sélectionné. Le bouton de réduction des animations et la préférence de l’appareil permettent de jouer sans transitions. Une scène sensible peut être passée avant d’en afficher le contenu.

## Objectif pédagogique

Le jeu s’adresse aux étudiantes et étudiants de l’école 42. En six scènes, il suit une promo fictive du premier rush de la Piscine à Libft et aux interventions des témoins. Le récit explore le sexisme ordinaire, le consentement, le harcèlement, les cyberviolences et les interventions possibles des témoins. Après chaque décision, le jeu montre une conséquence dans l’histoire et propose un repère. Les scènes passées ne produisent pas de recommandation fondée sur un choix présumé.

Le Debug Report s’appuie sur les stratégies exercées et propose des pistes de mise en pratique. Les choix ne donnent lieu à aucun classement.

Avant une diffusion sur un campus, vérifier auprès de celui-ci ses contacts de signalement, les règles de confidentialité et les relais d’accompagnement. La page de ressources indique les informations locales à compléter.

## Structure

- `index.html` contient l’accueil, les commandes et la structure commune.
- `style.css` définit le thème terminal, les adaptations mobiles et les animations.
- `scenes.js` rassemble les scènes, les choix, leurs conséquences et leurs repères pédagogiques. Le quatrième élément facultatif d’un choix identifie une action retenue dans le bilan ou utilisée plus tard dans un dialogue. Le champ `sensitive` active un avertissement avant la scène.
- `game.js` affiche les scènes, gère les choix, la progression et le bilan. L’état reste en mémoire jusqu’à la sortie ou au rechargement de la page. Le jeu ne collecte aucune donnée personnelle.
- `ressources.html` contient les ressources accessibles indépendamment de la simulation.

Pour ajouter ou réviser un dialogue conditionnel, modifie la fonction `messages` de la scène dans `scenes.js`. Elle reçoit l’ensemble des actions retenues jusque-là. Les valeurs de `chapter` vont de 0 à 2.
