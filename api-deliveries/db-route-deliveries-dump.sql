-- --------------------------------------------------------
-- Host:                         db-routes-deliveries.c1qklvabr8qr.us-east-1.rds.amazonaws.com
-- Server version:               10.6.7-MariaDB-log - managed by https://aws.amazon.com/rds/
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db-routes-deliveries
CREATE DATABASE IF NOT EXISTS `db-routes-deliveries` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `db-routes-deliveries`;

-- Dumping structure for table db-routes-deliveries.delivery
CREATE TABLE IF NOT EXISTS `delivery` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `latitude` decimal(20,14) NOT NULL DEFAULT 0.00000000000000,
  `longitude` decimal(20,14) NOT NULL DEFAULT 0.00000000000000,
  `started_at` datetime DEFAULT NULL,
  `finished_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db-routes-deliveries.delivery: ~6 rows (approximately)
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
INSERT INTO `delivery` (`id`, `order_id`, `latitude`, `longitude`, `started_at`, `finished_at`) VALUES
	(1, 1, -23.48031415243835, -46.60292076334350, NULL, NULL),
	(2, 1, -23.47305670000000, -46.60136130000000, NULL, NULL),
	(3, 2, -23.48031415243835, -46.60292076334350, NULL, NULL),
	(4, 2, -23.60402770000000, -46.62085940000000, NULL, NULL),
	(9, 5, -15.61215699626543, -56.07369481604043, NULL, NULL),
	(10, 5, -15.64767910000000, -56.15427050000000, NULL, NULL);
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;

-- Dumping structure for table db-routes-deliveries.warehouse
CREATE TABLE IF NOT EXISTS `warehouse` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `additional` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(20,14) NOT NULL,
  `longitude` decimal(20,14) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db-routes-deliveries.warehouse: ~4 rows (approximately)
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
INSERT INTO `warehouse` (`id`, `street`, `district`, `zipcode`, `number`, `city`, `state`, `country`, `additional`, `latitude`, `longitude`, `active`) VALUES
	(1, 'R. Cap. Pacheco e Chaves', 'Vila Prudente', ' 03126000', '313', 'São Paulo', 'SP', 'Brasil', NULL, -23.48031415243835, -46.60292076334350, 1),
	(2, 'R. Paranabi', 'Tucuruvi', '02307120', '218', 'São Paulo', 'SP', 'Brasil', NULL, -23.57958032317702, -46.59437593107794, 1),
	(3, 'Av. Ibirapuera', 'Indianópolis', '04029902', '3103', 'São Paulo', 'SP', 'Brasil', NULL, -23.61011377767355, -46.66670203107746, 1),
	(4, 'Av. Brasília', ' Jardim das Américas', '78060601', '1461', 'Cuiabá', 'MT', 'Brasil', NULL, -15.61215699626543, -56.07369481604043, 1);
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
