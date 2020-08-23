USE `PlayersInRaid`;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `Players` (
`UserID` varchar(18) NOT NULL,
`STR` int(2) DEFAULT NULL,
`DEX` int(2) DEFAULT NULL,
`PREC` int(2) DEFAULT NULL,
`PERC` int(2) DEFAULT NULL,
`HeadHP` int(4) DEFAULT 35,
`ChestHP` int DEFAULT 80,
`STOMACH` int DEFAULT 70,
`ARMS` INT DEFAULT 120,
`LEGS` INT DEFAULT 130,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
