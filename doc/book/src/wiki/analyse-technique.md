# Architecture 

![diagramme d'architecture](https://github.com/Austreelis/Dev-Web-2022/raw/main/doc/diagrams/architecture.svg)

React est notre frontend, il s'occupe d'afficher les pages sur le navigateur du client. Node js avec la librarie Express s'occupe d'offrir des routes au frontend lui permettant d'accéder à certaines données de la base de données.

En parallèle des websockets permettent de la communication en temps réel entre certains clients présents sur le site.

# Backend

**Node.Js**

1. Justification du choix 

Nous avons choisi Node.js comme technologie backend car elle présente beaucoup d'avantages pour nous dans le cadre de ce projet. 

Tout d'abord le coté real time app qui permet de faire une application pouvant traiter facilement les multiples inputs/outputs des utilisateurs. étant donné qu'on veut faire une app multi-joueurs l'échange en temps réel de données est indispensables. Ce qui rend notre app asynchrone. Contrairement à d'autre langage backend comme php et django. Pour php il est synchrone et pour django n'est pas vraiment adapté pour les real time app. 

Ce qui fait que notre app pour bénéficier de : 

- hautement scalable : nombre de inputs/outputs élevés et temps de réponse et connexion court. 
- polyvalente : nodejs nous permet de faire plusieurs choses comme par exemple un chat, un salon vocal etc.
- écosystème important : grâce à npm on a accès à beaucoup de librairies open-source qui permet de ne pas réinventer la roue.

Par contre Node js ne permet pas de faire des apps qui nécessite un temps processeur trop long comme le traitement d'images ou des longues boucles.

2. Organisation du code

```
.
├── public
│  ├── images
│  │  ├── favicon.ico
│  │  └── favicon.png
│  ├── scripts
│  ├── styles
│  │  └── style.css
│  ├── chota.min.css
│  ├── index.html
│  ├── manifest.json
│  └── robots.txt
├── server
│  ├── app.js
│  ├── env.js
│  └── main.js
├── .babelrc
├── package-lock.json
├── package.json
└── webpack.config.dev.js
└── webpack.config.prod.js
```

Le code source Node du serveur se trouve dans le dossier `server`. Le dossier `public` contient les fichiers statics qui devront être inclus dans l'arborescence de fichier servie par le serveur, générée par webpack.

3. Diagramme de classes UML

[Diagramme de classes] 
[Explication textuelle du diagramme de classes]

4. Fonctionnement

Nous utilisons webpack pour générer notre arborescence de fichiers statics à servir, et express pour gérer nos routes. Lorsqu'un utilisateur arrive sur notre site, son navigateur va envoyer une reqête pour le chemin racine `/`. Pour la racine, le serveur va simplement renvoyer le fichier `index.html` préalabrement généré par webpack.

# API

**Express**
base path : `/api/v0`

méthode | routes     | paramètres                                                                      | argument body | type renvoyé     | retour | revoie de l'élément
------- | ---------- | -----------------------------------------------------------------------------   | ------------- | ---------------- | ------ | -------------------
GET     | /user      |                                                                                 |               |   JSON           | 200    | [{id, pseudo}]
GET     | /inventory | id : id du scenario                                                             |               | JSON             | 200    | [{id, type, nom}, {id, type, nom},...]
POST    | /register  | pseudo : pseudo de l'utilisateur <br> password : mot de passe de l'utilisateur  |{user, psw}    | text             | 200 <br> 404( pseudo already used)| you are logged in
PUT     |/user/:id   | id : identifiant de l'utilisateur                                               |{user, psw}    |text              | 200  | user modified
DELETE  |/user/:id   | id : identifiant de l'utilisateur                                               |               |       text       | 200 <br> 404(user not found) | user delete
POST    |login       |pseudo:pseudo de l'utilisateur <br> password : mot de passe de l'utilisateur     | {user, psw}   | text             | 200 <br> 401(authentification failed) <br> 404 (user not found) <br> 400(wrong body request) | user add

Swagger nous générera la documentation de notre API.

# Base de données

**MariaDB**

MariaDB est une base de données libre d'accès et open source qui utilise un format JSON-Like pour stocker ses tables.

1. Justification du choix

Notre cliente souhaite éviter tout ce qui est compte et MAriaDB permet de ne pas avoir de compte pour pouvoir l'utiliser.

2. Diagrammes

 Example:

 ```json
 {
   "steps": {
     "1": {
       "text": "bla",
       "choices": [
         { "text": "foo", "next": 2 }
         { "text": "END", "next": 0 }
       ]
     },
     "2" : {
       "text": "blu",
       "choices": [
         { "text": "bar", "next": 1 }
         { "text": "END", "next": 0 }
       ]
     }
   }
 }
```

![shéma-db](https://github.com/Austreelis/WebsiteWhereYouAreTheHero/raw/main/mockups/shema_db.jpg)

l’inventaire dépend du scénario et on exporte tout l’inventaire au début de partie pour permettre a un joueur de prendre un objet du scenario.


# Frontend

**React**

1. Justification du choix du framework JS

nous avons choisi d’utiliser React pour sa gestion de la DOM avec sa virtual DOM qui permet un rafraichissement de certains composants de la page. Et aussi pour sa gestion des composants qui nous permettra de gagner du temps au niveau du Frontend pour m’attarder sur les parties plus complexes du projet comme la messagerie.  
![image](https://user-images.githubusercontent.com/63592563/157407852-6581790a-3986-4c11-9d86-6b23053c068c.png)


2. Justification du choix pour la mise en oeuvre du CSS (Framework?)

Nous avons opté pour un framework CSS minimaliste nomé [chota](https://jenil.github.io/chota/). Nous voulons avoir un design responsive, et un framework simple et moderne comme chota nous permet de pouvoir nous concentrer là dessus.

3. Organisation du code

Les fichiers concernant le frontend sont les suivants:

```
.
├── client
│  ├── components
│  │  └── navbar
│  │     ├── index.js
│  │     └── NavBar elements.js
│  ├── pages
│  │  ├── about.js
│  │  ├── creation.js
│  │  ├── index.js
│  │  └── team.js
│  ├── App.css
│  ├── App.js
│  ├── index.css
│  ├── index.js
├── public
│  ├── images
│  │  ├── favicon.ico
│  │  └── favicon.png
│  ├── scripts
│  ├── styles
│  │  └── style.css
│  ├── chota.min.css
│  ├── index.html
│  ├── manifest.json
│  └── robots.txt
├── .babelrc
├── package-lock.json
├── package.json
└── webpack.config.dev.js
└── webpack.config.prod.js
```

Le code source React se trouve dans le dossier `client`. Le dossier `public` contient les fichiers statics qui devront être inclus dans l'arborescence de fichier servie par le serveur, générée par webpack.

4. Apparence

![screenshot_1](https://raw.githubusercontent.com/Austreelis/Dev-Web-2022/pages/blobs/screenshot_1.png)

5.  Fonctionnement

Une partie importante de notre projet est ce qui permet aux joueurs de communiquer: Le chat. Une fois dans une partie (après avoir cliqué sur l'onglet `Play` de la page d'accueil), les joueurs peuvent entrer du texte dans un champ et l'envoyer aux autres en appuyant sur un bouton (`Send`) ou sur leur touche "Entrée". Cette interaction va lancer un événement "submit" qui va appeler un callback préalablement enregistré. Le client va alors envoyer sur une websocket le message (ainsi que quelques informations basiques sur le joueur), qui va être réceptioné par le serveur. Le serveur va alors la renvoyer à tout les clients connecté à cette websocket, y compris l'envoyeur originel. Tous les clients affichent alors le message reçu.
