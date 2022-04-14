# Dev-Web-2022

# étudiants réalisant le projet
Morgane Leclecq 

Saskia Libotte

Simon Nolf

Séverin Robert

# projet dev
Le projet consiste a créer un site en ligne afin de créer et pouvoir jouer a un jeu de rôle préalablement réaliser par un autre utilisateur

## Getting started

Install [NodeJS][nodejs-download] v16 or above, and run:

```
npm install && npm run dev
```

## Using [Nix](nixos.org)

This repository is a nix flake. You will need a
[flake-enabled nix installation][nix-enable-flake] to use it.

### Development shell

This flake provides a development environment powered by
[devshell][numtide-devshell]. It comes with node and all the project's
dependencies installed, and some extra niceties. To enter it, run:

```
nix develop
```

[nodejs-download]: https://nodejs.org/en/download/
