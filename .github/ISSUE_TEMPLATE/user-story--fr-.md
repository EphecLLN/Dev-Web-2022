---
name: User Story [FR]
about: Ajouter une User Story
title: 'N: En tant que <Utilisateur-ice>, Je veux <Feature> afin de <But>'
labels: 'kind: US'
assignees: ''

---

> Les blocs de citation doivent êtres retiré du template.

> Le texte entre chevrons (comme <ceci>) doit être adéquatement remplacé.

> <N> Représente le numéro de l'US. Ce numéro est unique aux User Stories et ne correspond pas au numéro d'Issues ou PRs de Github.

### Description

```
- En tant que <Utilisateur-ice>
- Je veux <Feature> 
- Afin de <But>
```

### Estimation: `Aucune`

> Cette section devra être complétée une fois l'US estimée, et `Aucune` remplacé par la valeur de l'estimation. Exemple: `13`.

### Développeur-se

Le-a développeur-se responsable de cette tâche est <nom complet> (a.k.a. \@<pseudo>).

### Reviewer

La personne en charge de la review des changements sera <nom complet> (a.k.a. \@<pseudo>).

### Prérequis

> Liste des features nécessaire à l'implémentation de cette US.

- [ ] ...
- [ ] ...

### Technical Tasks

> Si applicable, ajoutez pour chaque TT un lien vers l'Issue la décrivant, ou le cas échéant la PR l'implémentant. Une même PR peut implémenter plusieurs TT, mais une issue ne devrait en décrire qu'une seule à la fois.

- [ ] Ajout de tests des critères d'acceptation.
- [ ] ...
- [ ] ...

### Critères d'acceptation

- [ ] ...
- [ ] ...

> Optionnellement, ajouter des tests [`cucumber.js`](https://cucumber.io/tools/cucumber-open/) suivant ces critères d'acceptation dans `/tests/integration/gherkin/us<N>.feature`.

### Maquette/Schéma

> Ajoutez des maquettes et/ou schéma si ils aident à mieux comprendre la feature demandée par cette US.

![simple mockup](https://imgur.com/t/aww/30LZ2Cl)

### Divers

Lors de la création de cette US:

- [ ] Indiquer le numéro de cette US dans le titre de cette US.
- [ ] Ajouter un label `US: <N>` avec la couleur `#0052cc`, correspondant au numéro de cette US. Ce label devra être ajouté aux issues et PRs faisant partie de cette US (sous-Us, tâches tecniques, etc.).
- [ ] Ajouter éventuellemt le label `US: <N parent>` de l'US parente.
- [ ] Ajouter l'US dans la colonne `Backlog` du projet.

Lorsque cette US est planifié pour un Sprint:

- [ ] Estimer cette US
- [ ] Déplacer cette Issue dans la colonne `Todo` du projet.
- [ ] Assigner un-e développeur-se responsable de l'US. Son rôle sera de tenir cette Issue à jour.
- [ ] Assigner un-e reviewer à cette US. Son rôle sera de s'assurer de la qualité d'implémentation des tâches techniques relative à cette US.

Lorsque tout les critères d'acceptation sont remplis et les tâches techniques faites:

- [ ] S'assurer que toutes les tâches techniques mentionnent soit une PR mergée les implémentant, soit une issue les décrivant fermée par une PR mergée.
- [ ] Fermer l'issue.
- [ ] Déplacer cette Issue dans la colonne `Archive` du projet.
