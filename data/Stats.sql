DROP DATABASE IF EXISTS `PlayerStats`;
CREATE DATABASE `PlayerStats`; 
USE `PlayerStats`;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `PStats` (
  `UserID` varchar(18) NOT NULL,
  `STR` int(2) NULL,
  `DEX` int(2) NULL,
  `PREC` int(2) NULL,
  `PERC` int(2) NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `PStats` VALUES (125357999811198976, 10, 10, 10, 10)