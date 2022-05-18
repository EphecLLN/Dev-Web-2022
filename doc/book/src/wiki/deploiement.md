# Wiki

## Choix du serveur d'hébergement

Au niveau de notre wiki, il est hébergé sur [github Pages](https://pages.github.com/).
Nous utilisons cela au lieu de la section wiki car, c'est plus simple pour le modifier ainsi que pour la rédaction du wiki en général.
Cela permet de gérer le wiki ainsi que tout le repo depuis un même endroit sans devoir aller sur github pour modifier quelconques fichiers.

## Technique de déploiement

Nous utilisons [mdBook](https://rust-lang.github.io/mdBook/) pour rendre le wiki.
Nous avons des [workflows](https://github.com/Austreelis/WebsiteWhereYouAreTheHero/blob/main/.github/workflows/github-pages.yml) pour transpiler le MarkDown ainsi que le déployer automatiquement sur github Pages en cas de succès.

# Site web

## Choix du serveur d'hébergement

Pour l'hébergement, nous avons choisi d'être hébergé par le kot à projet [Louvain-li-Nux](https://louvainlinux.org/) dans le quel Morganne se trouve.
Ce kot à projet propose un hébèrgement web pour différentes associassions présentes sur Louvain-la-Neuve.

## Technique de déploiement

Le KaP possède un serveur sur lequel [ProxMox](https://www.proxmox.com/en/), un hyperviseur de type 2 basé sur [KVM](https://www.kernel.org/doc/html/latest/virt/kvm/index.html), est installé.
Pour cela, nous avons 2 VMs [nixos](https://nixos.org/), une pour le site web et une pour la base de données,  déployées sur Proxmox.
Chaque "service" (MYsql et le serveur HTTP) est encapsulé dans un service [`systemd`](https://www.man7.org/linux/man-pages/man1/systemd.1.html) assurant son isolation par rapport au reste du système :

- le service tourne sous un namespace (isolé)
- un user Unix est dédié au service
- toutes les directories sont bind-montées soit `read-only`, soit sut un [`tmpfs`](https://www.man7.org/linux/man-pages/man5/tmpfs.5.html)

## réseau

![shéma réseau](https://github.com/Austreelis/WebsiteWhereYouAreTheHero/blob/main/doc/diagrams/schema-reseau.jpg)
