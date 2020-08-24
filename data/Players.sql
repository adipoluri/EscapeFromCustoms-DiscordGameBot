-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Players
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Players
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Players` DEFAULT CHARACTER SET utf8mb4 ;
USE `Players` ;

-- -----------------------------------------------------
-- Table `Players`.`Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Players`.`Equipment` (
  `ID` INT NOT NULL,
  `Slot1` VARCHAR(45) NULL DEFAULT 'Makarov',
  `Slot2` VARCHAR(45) NULL DEFAULT 'EMPTY',
  `Slot3` VARCHAR(45) NULL DEFAULT 'EMPTY',
  `Slot4` VARCHAR(45) NULL DEFAULT 'EMPTY',
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Players`.`Stash`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Players`.`Stash` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `InventoryPath` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Players`.`Playerstats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Players`.`Playerstats` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(45) NULL,
  `LVL` INT NULL DEFAULT 1,
  `EXP` INT NULL DEFAULT 0,
  `STR` INT NULL DEFAULT 5,
  `DEX` INT NULL DEFAULT 5,
  `PREC` INT NULL DEFAULT 5,
  `PERC` INT NULL DEFAULT 5,
  `Equipment_ID` INT NOT NULL,
  `Stash_ID` INT NOT NULL,
  PRIMARY KEY (`UserID`, `Equipment_ID`, `Stash_ID`),
  INDEX `fk_Playerstats_Equipment_idx` (`Equipment_ID` ASC) VISIBLE,
  INDEX `fk_Playerstats_Stash1_idx` (`Stash_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Playerstats_Equipment`
    FOREIGN KEY (`Equipment_ID`)
    REFERENCES `Players`.`Equipment` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Playerstats_Stash1`
    FOREIGN KEY (`Stash_ID`)
    REFERENCES `Players`.`Stash` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Players`.`Weapons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Players`.`Weapons` (
  `Weapon` VARCHAR(12) NOT NULL,
  `Damage` INT NULL,
  `FULL-AUTO-AMNT` INT NULL,
  `Range` VARCHAR(8) NULL,
  PRIMARY KEY (`Weapon`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Players`.`PlayersInRaid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Players`.`PlayersInRaid` (
  `UserID` INT NOT NULL,
  `STR` INT NOT NULL,
  `DEX` INT NOT NULL,
  `PREC` INT NOT NULL,
  `PERC` INT NOT NULL,
  `HeadHP` INT NULL DEFAULT 35,
  `ChestHP` INT NULL DEFAULT 80,
  `Stomach` INT NULL DEFAULT 70,
  `Arms` INT NULL DEFAULT 120,
  `Legs` INT NULL DEFAULT 130,
  PRIMARY KEY (`UserID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Players`.`Items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Players`.`Items` (
  `Item` VARCHAR(45) NOT NULL,
  `Description` TINYTEXT NULL,
  PRIMARY KEY (`Item`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
