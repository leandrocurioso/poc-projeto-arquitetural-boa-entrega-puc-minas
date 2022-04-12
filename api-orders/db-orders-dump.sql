-- --------------------------------------------------------
-- Host:                         db-orders.c1qklvabr8qr.us-east-1.rds.amazonaws.com
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


-- Dumping database structure for db-orders
CREATE DATABASE IF NOT EXISTS `db-orders` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `db-orders`;

-- Dumping structure for table db-orders.order
CREATE TABLE IF NOT EXISTS `order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `client_access_key` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `third_party_order_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_status_id` int(11) NOT NULL DEFAULT 1,
  `client_name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_document_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_document_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_address_street` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_address_district` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_address_number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_address_city` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_address_state` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_address_country` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_address_additional` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_address_zipcode` varchar(10) NOT NULL,
  `client_email` varchar(300) NOT NULL,
  `client_telephone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_client_order` (`client_access_key`,`third_party_order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db-orders.order: ~0 rows (approximately)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`id`, `client_access_key`, `third_party_order_id`, `order_status_id`, `client_name`, `client_document_id`, `client_document_type`, `client_address_street`, `client_address_district`, `client_address_number`, `client_address_city`, `client_address_state`, `client_address_country`, `client_address_additional`, `client_address_zipcode`, `client_email`, `client_telephone`) VALUES
	(1, '0a472bd8-678e-4891-bfce-2399b64dd195', '001', 1, 'Leandro Curioso', '47869681123', 'CPF', 'Rua Guraajá', 'Tucuruvi', '155', 'São Paulo', 'SP', 'BRASIL', NULL, '02310010', 'curioso@gmail.com', '65999877436'),
	(2, '0a472bd8-678e-4891-bfce-2399b64dd195', '002', 1, 'Maria Angélica', '748327771', 'CPF', 'Rua do Arraial', 'Vila Mariana', '209', 'São Paulo', 'SP', 'BRASIL', NULL, '04122030', 'maria@gmail.com', '11999876556'),
	(5, '0a472bd8-678e-4891-bfce-2399b64dd195', '003', 1, 'Lucas Moreira', '1288876732', 'CPF', 'Rua Adelino de Campos', 'Jardim Paula I', '42', 'Várzea Grande', 'MT', 'BRASIL', NULL, '78138300', 'lucas@gmail.com', '65888765645');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table db-orders.order_product
CREATE TABLE IF NOT EXISTS `order_product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL,
  `name` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcode` char(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) unsigned NOT NULL DEFAULT 1,
  `unit_value` decimal(11,2) unsigned NOT NULL DEFAULT 0.00,
  `width` decimal(11,2) unsigned NOT NULL DEFAULT 0.00,
  `height` decimal(11,2) unsigned NOT NULL DEFAULT 0.00,
  `depth` decimal(11,2) unsigned NOT NULL DEFAULT 0.00,
  `weight` decimal(11,2) unsigned NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_order_by_barcode` (`order_id`,`barcode`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db-orders.order_product: ~0 rows (approximately)
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` (`id`, `order_id`, `name`, `barcode`, `quantity`, `unit_value`, `width`, `height`, `depth`, `weight`) VALUES
	(1, 1, 'Caixa de lápis Faber Castell', '7891233245663', 1, 20.25, 8.00, 15.00, 3.00, 100.00),
	(2, 1, 'Panela de Inox Mondial', '7891233245632', 2, 50.99, 40.00, 10.00, 15.00, 2.00),
	(3, 2, 'Caixa de lápis Faber Castell', '7891233245663', 1, 20.25, 8.00, 15.00, 3.00, 100.00),
	(4, 2, 'Panela de Inox Mondial', '7891233245632', 2, 50.99, 40.00, 10.00, 15.00, 2.00),
	(8, 5, 'Calça Azul M', '7891233245663', 1, 20.25, 8.00, 15.00, 3.00, 100.00);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;

-- Dumping structure for table db-orders.order_status
CREATE TABLE IF NOT EXISTS `order_status` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table db-orders.order_status: ~7 rows (approximately)
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` (`id`, `title`) VALUES
	(1, 'Aguardando pagamento'),
	(2, 'Aguardando coleta'),
	(3, 'Coleta em transporte'),
	(4, 'Em rota de entrega'),
	(5, 'Entrega concluída'),
	(6, 'Entrega cancelada'),
	(7, 'Entrega atrasada');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
