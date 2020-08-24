CREATE database `Equipment`;
USE `Equipment`;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `Equip` (
`UserID` varchar(18) NOT NULL,
`Slot1` varchar(20) DEFAULT 'Makarov',
`Slot2` varchar(20) DEFAULT 'EMPTY',
`Slot3` varchar(20) DEFAULT 'EMPTY',
`Slot4` varchar(20) DEFAULT 'EMPTY',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
