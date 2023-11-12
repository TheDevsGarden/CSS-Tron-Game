## bonjour

### pour le login, l'usager est admin@testemail.com et le mot de passe est: motdepasse

#### peser sur play pour commencer le jeu

##### notes plus bas

À remettre le 05 mai 2023 avant 23h59
Individuel (40%)
Projet : Jeu TRON

Introduction  
Vous devez terminer le projet sur lequel travaillait un de vos collègues avant de quitter
l’entreprise pour de nouveaux défis. Le coquin est parti avec une bonne partie de la
documentation et il n’est pas joignable.

L’entreprise analyse actuellement les pistes afin de remédier à la situation et envisage la
possibilité d’aller vers des outils de documentation infonuagiques prochainement. En revanche,
il a tout de même été possible de récupérer une partie du code ainsi que certaines exigences du
projet en soi. Voici la liste des fonctionnalités requises :

Cas 1 : Mise en place de la structure (5 points)
Séparer le code afin d’avoir un fichier HTML, CSS et JavaScript à partir du fichier fourni.

Cas 2 : Ajouter une page de connexion (15 points)
Il doit y avoir un formulaire dans la page de connexion qui permet d’entrer un nom d’utilisateur
et un mot de passe. Le formulaire doit faire la validation des informations entrées (nom
d’utilisateur doit être un courriel et les deux champs ne doivent pas être vides). Vous devez
simuler également les informations de connexions étant donné qu’il n’y a pas de BD.
Finalement, lorsque l’authentification est réussie, on doit être redirigé vers la page du jeu.

Cas 3 : Ajouter un 2e joueur (10 points)
Ajoutez un deuxième joueur afin de pouvoir jouer à deux sur le même clavier. Il devra être
contrôlé par les touches WASD. Initialement, il doit commencer du haut de la zone de jeu. On
doit détecter les collisions entre chaque motocyclette, leurs traces respectives et les collisions
avec les bords de la zone de jeu. Le jeu doit s’arrêter dès qu’il y a une collision.

# Cas 4 : Gérer le match nul (10 points)

Il y a match nul si les deux joueurs entrent en collision au même moment : collision frontale, sur
leur propre trace ou sur les bords.

# lorsqu'il y a un jeu nul, un message apparaît pour indiquer que le jeu est annulé

# une partie nulle se produit lorsque les joueurs se heurtent de plein fouet, sur leur propre piste ou sur les bords

# le jeu est alors réinitialisé et le compteur n'est pas mis à jour

# Comment un joueur peut-il gagner un tour si le jeu est annulé aussi facilement?

## On ne peut pas vraiment calculer l'aire saisie à moins que le joeur ferme sa ligne - on pourrait comparer la distance parcourue avant la fin de la ronde, mais je préfère garder ça simple avec un true/false que le joeur à survécu. Et de toute manière, lui qui meurt en premier parcourera trop souvent une distance plus courte que le survivant.

Cas 5 : Gérer plusieurs tours (10 points)
Il faut mettre en place un mécanisme afin d’être en mesure de jouer plusieurs tours sans avoir à
recharger la page. Il faut aussi pouvoir sauvegarder en mémoire le pointage et afficher le
nombre de tours gagnés par chaque joueur.

Cas 6 : Permettre le changement de couleur (10 points)
Ajouter des contrôles pour permettre le changement de couleur de la trace laissée pour chacun
des joueurs. Astuce : <input type=’’color’’>

Cas 7 : Ajouter des boutons de contrôles (10 points)
Pause : pour interrompre le jeu, Start : pour commencer ou reprendre le jeu et Restart : pour
recommencer un tour. Astuce : <button onclick=...>

Cas 8 : Gérer le déplacement avec la souris (10 points)
Il faut aussi pouvoir contrôler le joueur 1 en utilisant la souris avec des gestes de glissements
(drag). Voici les directions qui doivent être possibles : haut, bas, gauche, droite. Exemple de
pseudocode pour ce traitement :  
Lorsque la souris est enfoncée :  
Stocker les coordonnées de souris dans (x0, y0) comme début de glissement  
Lorsque la souris est relâchée :  
Stocker les coordonnées de souris dans (x1, y1), à la fin du glissement  
delta_x = x1 - x0  
delta_y = y1 - y0  
if ( abs(delta_x) > abs(delta_y) ) {  
if ( delta_x > 0 ) ... // vers la droite  
else ... // vers la gauche  
}  
else if ( delta_y > 0 ) ... // vers le bas  
else ... // vers le haut

Cas 9 : Gérer le fil d’exécution – thread (10 points)  
Faire en sorte que votre jeu ne tourne pas sans cesse dans Chrome lorsque vous appuyer sur
pause. Vous pouvez vérifier avec console.log(). Astuce : remplacer setInterval() par
setTimeout().

Cas 10 : Gérer l’accélération (10 points)
Le jeu doit devoir aller de plus en plus vite (accélérer). Il faut cependant qu’on puisse continuer
de jouer donc faites attention à ne pas aller trop vite. Astuce :
http://stackoverflow.com/questions/729921/settimeout-or-setinterval \*/
