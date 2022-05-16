# Analyse de la sécurité

## Biens à protéger

- Base de données
  - Comptes utilisateurs.
  - Les données publiques ne doivent pas être modifiable sans
    contrôle d'accès.
- Serveur
  - Capacité à traiter les données & requêtes nécessaire.
- Frontend
  - La connection des websockets.

## Risques

> Note: Les estimations de probabilité ne prennent pas en compte les
> contre-mesures mises en places.

### Base de données

- Accès à la machine:

  Probabilité: très élevée

| danger                          | impact pour notre site                                           |
|---------------------------------|------------------------------------------------------------------|
| Accès aux privilèges du serveur | Mêmes que tout les risques liés à la BdD, combinés               |
| Escalade de privilèges          | Tout est permis !                                                |

- Craquage des mots de passe:

  Probabilité: élevée

| danger                                | impact pour notre site                                                                            |
|---------------------------------------|---------------------------------------------------------------------------------------------------|
| Vol de comptes                        | Tout les données liés à l'utilisateur (scénario, inventaire, pseudo, etc.) peuvent être corrompus |
| Compromission globale du mot de passe | Aucun                                                                                             |

- Fuite de données sensibles:

  Probabilité: très élevée

| danger                                           | impact pour notre site                     |
|--------------------------------------------------|--------------------------------------------|
| Augmenter le risque de craquage de mots de passe | Augmentation des risques liés à la sécuité |

- Altération des données.

  Probabilité: élevée

| danger                 | impact pour notre site          |
|------------------------|---------------------------------|
| Pertes de données      | Mauvaise expérience utilisateur |
| Corruption des données | Mauvaise expérience utilisateur |

### Serveur

- Accès à la machine:

  Probabilité: très élevée

| danger                          | impact pour notre site                                           |
|---------------------------------|------------------------------------------------------------------|
| Accès aux privilèges du serveur | Mêmes que tout les risques liés à la BdD et au serveur, combinés |
| Escalade de privilèges          | Tout est permis !                                                |

- Injections SQL par l'API:

  Probabilité: élevée

| danger                                                  | impact pour notre site                     |
|---------------------------------------------------------|--------------------------------------------|
| Éxecution de requêtes arbitraire sur la base de données | Tout les risques liés à la base de données |

- Surcharge et Deny-of-Service:

  Probabilité: faible

| danger               | impact pour notre site                                                      |
|----------------------|-----------------------------------------------------------------------------|
| Latence intempestive | Mauvaise expérience utilisateur                                             |
| Échec de requêtes    | Mauvaise expérience utilisateur, potentielle perte ou corruption de données |
| Crash du serveur     | Mauvaise expérience utilisateur, potentielle perte ou corruption de données   |

- Injection de code par les websockets:

  Probabilité: faible

| danger                                                 | impact pour notre site                                           |
|--------------------------------------------------------|------------------------------------------------------------------|
| Éxecution de code arbitraire sur la machine du serveur | Mêmes que tout les risques liés à la BdD et au serveur, combinés |

## Contre-mesures

### Base de données

| Contre-mesure                                        | Risques mitigés                                       |
|------------------------------------------------------|-------------------------------------------------------|
| Restriction des droits de la BdD à un utilisateur    | \- Fuites des données <br/> \- Altération des données |
| Authentifaction à la BdD par socket Unix             | \- Fuites des données <br/> \- Altération des données |
| Isolation de la BdD dans un réseau privé             | \- Fuites des données <br/> \- Altération des données |
| Réquisition d'une clée SSH pour accéder à la machine | Accès à la machine                                    |
| Hashage et salage des mots de passe                  | Craquage des mots de passe                            |

### Serveur

| Contre-mesure                                                      | Risques mitigés                                                     |
|--------------------------------------------------------------------|---------------------------------------------------------------------|
| Restriction des droits du process du serveur à un utilisateur Unix | \- Accès à la machine <br/> \- Injection de code par les websockets |
| Authentification des utilisateurs                                  | \- Fuites des données <br/> \- Altération des données               |
| Réquisition d'une clée SSH pour accéder à la machine               | Accès à la machine                                                  |
| Isolation du serveur derrière un NAT et un reverse-proxy           | Accès à la machine                                                  |
| Assainissement des paramètres aux requêtes SQL                     | Injections SQL par l'API                                            |
| mettre a jour les différentes dépendances du projet                | dépend de la faille                                                 |

## Suivi de la sécurisation

Chaucun de nos services est lancé en tant qu'`unit` de [`systemd`](https://www.man7.org/linux/man-pages/man1/systemd.1.html),
et nous monitorons par le journal intégré [`journald`](https://www.man7.org/linux/man-pages/man1/journalctl.1.html)

# Validation de la sécurité

Ni le site ni la base de données n'étant dṕloyé pour le moment, non.

# Cadre légal

## Contraintes légales

Mise à part une addresse de contact visible sur le site, nous respectons le RGPD.

# Bilan

Nous nous sommes protégé de certaines failles et attaques plus ou moins
courante, et somme suffisament confiant pour mettre le site en production, même
si la protection parfaite n'existe pas.

