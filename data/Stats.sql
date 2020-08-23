CREATE DATABASE `PlayerStats`;
USE `PlayerStats`;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `PStats` (
  `UserID` varchar(18) NOT NULL,
  `Description` TEXT,
  `LVL` int(3) DEFAULT 1,
  `EXP` int DEFAULT 0,
  `STR` int(2) DEFAULT 5,
  `DEX` int(2) DEFAULT 5,
  `PREC` int(2) DEFAULT 5,
  `PERC` int(2) DEFAULT 5,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;