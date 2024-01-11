-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: madinkuv3
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kelas`
--

DROP TABLE IF EXISTS `kelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kelas` (
  `id_kelas` int unsigned NOT NULL,
  `nama_kelas` varchar(255) NOT NULL,
  `id_angkatan` int unsigned NOT NULL,
  PRIMARY KEY (`id_kelas`),
  KEY `id_angkatan` (`id_angkatan`),
  CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`id_angkatan`) REFERENCES `angkatan` (`id_angkatan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kelas`
--

LOCK TABLES `kelas` WRITE;
/*!40000 ALTER TABLE `kelas` DISABLE KEYS */;
INSERT INTO `kelas` VALUES (1000,'4 Ibt Pa Pagi',100),(1101,'4 Ibt A Pa Siang',100),(1102,'4 Ibt B Pa Siang',100),(1500,'4 Ibt Pi Pagi',100),(1601,'4 Ibt A Pi Siang',100),(1602,'4 Ibt B Pi Siang',100),(2000,'5 Ibt Pa Pagi',200),(2101,'5 Ibt A Pa Siang',200),(2102,'5 Ibt B Pa Siang',200),(2500,'5 Ibt Pi Pagi',200),(2601,'5 Ibt A Pi Siang',200),(2602,'5 Ibt B Pi Siang',200),(3000,'6 Ibt Pa Pagi',300),(3101,'6 Ibt A Pa Siang',300),(3102,'6 Ibt B Pa Siang',300),(3500,'6 Ibt Pi Pagi',200),(3601,'6 Ibt A Pi Siang',300),(3602,'6 Ibt B Pi Siang',300),(4000,'1 Tsn Pa Pagi',400),(4100,'1 Tsn Pa Siang',400),(4500,'1 Tsn Pi Pagi',400),(4600,'1 Tsn Pi Siang',400),(5000,'2 Tsn Pa Pagi',500),(5100,'2 Tsn Pa Siang',550),(5500,'2 Tsn Pi Pagi',500),(5600,'2 Tsn Pi Siang',550),(6000,'3 Tsn Pa Pagi',600),(6100,'3 Tsn Pa Siang',650),(6500,'3 Tsn Pi Pagi',600),(6600,'3 Tsn Pi Siang',650),(7000,'1 Aly Pa Pagi',700),(7500,'1 Aly Pi Pagi',700),(8000,'2 Aly Pagi',800);
/*!40000 ALTER TABLE `kelas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-07 13:36:08
