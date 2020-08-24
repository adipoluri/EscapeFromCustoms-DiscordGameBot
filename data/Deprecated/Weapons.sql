CREATE DATABASE `Weapons`;
USE `Weapons`;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `Weapons` (
`Weapon` varchar(12) NOT NULL,
`Damage` int(10),
`FULL-AUTO-AMNT` int(10),
`RANGE` varchar(8),
PRIMARY KEY (`WEAPON`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `Weapons` VALUES ('Makarov', 40, 1, 'SHORT');
INSERT INTO `Weapons` VALUES ('PP-9_Klin', 40, 5, 'SHORT');
INSERT INTO `Weapons` VALUES ('M4A1', 50, 3, 'SM');
INSERT INTO `Weapons` VALUES ('AK-74N', 50, 3, 'SM');
INSERT INTO `Weapons` VALUES ('M700', 80, 1, 'LONG');
INSERT INTO `Weapons` VALUES ('M1A', 80, 1, 'ML');
INSERT INTO `Weapons` VALUES ('P90', 49, 5, 'SHORT');
INSERT INTO `Weapons` VALUES ('Mosin', 86, 1, 'LONG');
INSERT INTO `Weapons` VALUES ('SKS', 57, 1, 'MEDIUM');
INSERT INTO `Weapons` VALUES ('KNIFE', 50, 1, 'SHORT');
INSERT INTO `Weapons` VALUES ('Saiga-12', 35, 8, 'SHORT');
