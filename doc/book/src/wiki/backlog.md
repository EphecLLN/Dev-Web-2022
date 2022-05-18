# Liste des utilisateurs

* visiteur : utilisateur qui accède au site

* créateur : visiteur qui crée un jeu de rôle

* joueur : visiteur qui est invité à jouer.

# User Stories

estimation sur base de la suite de Fibonacci

[US 1](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919883) estimation : 5

[US 2](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919891) estimation : 13

[US 3](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919895) estimation : 34

[US 4](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919899) estimation : 3

[US 5](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919905) estimation : 5

[US 6](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919907) estimation : 8

[US 7](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919916) estimation : 21

[US 8](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919938) estimation : 21, responsable: Morgane Leclerc

[US 9](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919952) estimation : 21

[US 10](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919958) estimation : 13

[US 11](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919975) estimation : 8

[US 12](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919975) estimation : 8

[US 13](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919980) estimation : 8

[US 14](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78919991) estimation : 5

[US 15](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78920001) estimation : 5

[US 16](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78920009) estimation : 5

[US 17](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78920018) estimation : 5

[US 18](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78920028) estimation : 5

[US 19](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78920036) estimation : 3

[US 20](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-78920045) estimation : 34

[Pour les US persos : Indiquer le nom de l'étudiant responsable]

## User Story n° 17

[17: en tant que joueur, je souhaite pouvoir consulter mon inventaire à tout moment lors du jeu. #21](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-79093026)

### Description

```
- Le joueur 
- doit être capable de consulter son inventaire personnel a tout moment de la partie 
- afin de savoir quel choix spécifique il peux faire en fonction des objet qu'il aurait précédemment récupérer
```

### estimation de la difficulté

la difficulté de cette tâche est estimée à moyenne.

### développeur

Le responsable de cette tache est Simon Nolf

### reviewer

La personne en charge de la vérification sera ...

### prérequis

- pouvoir jouer a une partie
- avoir un inventaire dans la partie backend
- avoir la possibilité de ramasser des objet dans la partie.

### Technical Tasks

- [ ] créer la partie ou l'inventaire s'affichera dans le frontend.
- [ ] mettre du texte a propos des objets dans la partie inventaire
- [ ] avoir un descriptif de l'objet au survol de celui-ci
- [ ] mettre a jour les objet lorsqu'ils ont été utilisés.
- [ ] afficher une image de l'objet.

### critères d'acceptation

* [ ] les objets s'affichent une fois qu'ils ont été récupérés.
* [ ] les objet s'enlèvent lorsqu'ils ont été utilisés

### maquette/schéma

![](https://github.com/Austreelis/Dev-Web-2022/raw/main/mockups/US%2017/play.svg)
![](https://github.com/Austreelis/Dev-Web-2022/raw/main/mockups/US%2017/play-1.svg)

## User Story n° 2

[En tant que créateur, je souhaite pouvoir préciser, lors de la création, le texte qui doit être envoyé ainsi que l’endroit où il doit être écrit, afin d’éviter que je le fasse moi. #6](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-79091356)

### Description

```
- Le-a créateur-rice de la partie doit pouvoir entrer son texte en une fois et le diviser en étape
- Le bot va par après envoyer le texte au bon adéquat.
```

### estimation de la difficulté

La difficulté de cette tâche est estimée à moyenne

### développeur

Le responsable de cette tache est Saskia Libotte

### reviewer

La personne en charge de la vérification est ...

### prérequis

- page création de partie
- page création de l'histoire
- page entrer le texte (ou upload un "fichier texte")
- 
### Technical Tasks

* [ ] zone sur la "page création" qui permet d'entrer le texte (ou upload une fichier)
* [ ] enregistre le texte ou le fichier sous format json

### critères d'acceptation

* [ ] le texte est disponible sous le format json

### maquette/schéma

## User Story n°8

[8: En tant que créateur et joueur, je souhaite avoir un tchat collectif afin de pouvoir communiquer. #12](https://github.com/Austreelis/Dev-Web-2022/issues/12)

### Description

```
- Le-a joueur-se
- doit pouvoir utiliser un tchat 
- afin de pouvoir communiquer avec les autres joueur-se-s
```

### Estimation: `21`

Cette tâche requiert de mettre en place un système potentiellement complexe, avec une latence faible et le support d'un traffic conséquent. Nous avons donc estimé sa difficulté à élevée.

### Développeur-se

La développeuse responsable de cette tâche est Morgane Leclerc (a.k.a. @Austreelis).

### Reviewer

La personne en charge de la vérification sera Simon Nolf (a.k.a. @simonNolf).

### Prérequis

- [ ] Pouvoir jouer à une partie

### Technical Tasks

- [x] Création d'un serveur capable d'écouter/diffuser des messages sur des websockets (#32).
- [x] Ajout d'un mécanisme d'envoie et réception de messages pour les Clients (#32).
- [x] Gestion de l'identité dans les messages et leur affichage (#32).
- [ ] Attribution d'une identité unique par les joueur-se-s (#38)
- [ ] Gestion d'un nombre arbitraire de Joueur-se-s (#39).
- [x] Documentation du protocol utilisé pour l'échange de messages (#32).
- [ ] Ajouts de tests unitaires pour l'implémentation du protocol (#36).
- [ ] Ajout de tests des critères d'acceptation.

### Critères d'acceptation

- [ ] Les Joueur-se-s peuvent s'attribuer une identité.
- [ ] Les Joueur-se-s ne peuvent pas communiquer sans s'être attribuer une identité.
- [x] Les Joueur-se-s peuvent envoyer des messages à tout les Joueur-se-s.
- [x] Les Joueur-se-s peuvent identifier le-a Joueur-se ayant envoyé chacun des messages.
- [ ] Au moins 8 Joueur-se-s peuvent participer à une même partie.
- [ ] Les messages envoyé les plus récemment sont toujours affiché si le-a Joueur-se-s ne prend pas d'actions.

> TODO: Ces critères d'acceptation sont décris plus précisément et testé avec [`cucumber.js`](https://cucumber.io/tools/cucumber-open/), voir [`features/us8.feature` tests](https://github.com/Austreelis/Dev-Web-2022/blob/main/tests/integration/gherkin/us8.feature)

### maquette/schéma

![simple chatmockup](https://github.com/Austreelis/Dev-Web-2022/raw/pages/blobs/screenshot_1.png)

## User Story n° 5

[En tant que joueur, je souhaite que le texte de l'étape soit affiché afin dque je puisse prendre connaissance des événements #5](https://github.com/Austreelis/Dev-Web-2022/projects/1#card-79094104)

### Description

```
- Le-a joueur-se souhaite connaitre la suite de l'histoire
```

### estimation de la difficulté

La difficulté de cette tâche est estimée à facile

### développeur

Le responsable de cette tache est Séverin Robert

### reviewer

La personne en charge de la vérification est ...

### prérequis

- la page jeu est créée

### Technical Tasks

* [ ] zone sur la "page jeu" qui permet d'afficher le texte
* [ ] parser le json pour chercher le texte à afficher

### critères d'acceptation

* [ ] les évènements s'affiche au bon moment dans le salon ou les sous salons 

### maquette/schéma
