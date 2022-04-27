-- Migration file init -> v0.1.0

-- Listage de la structure de la base pour site-hero
CREATE DATABASE IF NOT EXISTS `site-hero`
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci
    /*!80016 DEFAULT ENCRYPTION='N' */
;
USE `site-hero`;

-- Listage de la structure de la table site-hero. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) NOT NULL,
  `PASSWORD` binary(64) NOT NULL,
  `SALT` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Listage de la structure de la table site-hero. scenario
CREATE TABLE IF NOT EXISTS `scenario` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `user_id` mediumint NOT NULL,
  `texte` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB;

-- Listage de la structure de la table site-hero. inventaire
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `objet` varchar(50) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `id_scenario` mediumint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__scenario` (`id_scenario`),
  CONSTRAINT `fk__scenario` FOREIGN KEY (`id_scenario`) REFERENCES `scenario` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB;




