-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.23 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour projet
CREATE DATABASE IF NOT EXISTS `projet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projet`;

-- Listage de la structure de la table projet. inventaire
CREATE TABLE IF NOT EXISTS `inventaire` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `objet` varchar(50) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `id_scenario` mediumint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__scenario` (`id_scenario`),
  CONSTRAINT `fk__scenario` FOREIGN KEY (`id_scenario`) REFERENCES `scenario` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table projet. scenario
CREATE TABLE IF NOT EXISTS `scenario` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `user_id` mediumint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table projet. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `id_scénario` mediumint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_scenario` (`id_scénario`),
  CONSTRAINT `fk_scenario` FOREIGN KEY (`id_scénario`) REFERENCES `scenario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Les données exportées n'étaient pas sélectionnées.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
