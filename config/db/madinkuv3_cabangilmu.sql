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
-- Table structure for table `cabangilmu`
--

DROP TABLE IF EXISTS `cabangilmu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cabangilmu` (
  `id_fan` varchar(255) NOT NULL,
  `nama_fan` varchar(255) NOT NULL,
  PRIMARY KEY (`id_fan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabangilmu`
--

LOCK TABLES `cabangilmu` WRITE;
/*!40000 ALTER TABLE `cabangilmu` DISABLE KEYS */;
INSERT INTO `cabangilmu` VALUES ('1f01','Aqidah'),('1f02','Hadits'),('1f03','Fiqih'),('1f04','Tajwid'),('1f05','Bahasa Arab'),('1f06','Ilmu Akhlak'),('1f07','Tarikh Nabi'),('1f14','Riyadloh'),('1f15','Khitobiyah'),('1f16','Musyawarah'),('1f17','Muhafadzoh'),('1f18','Akhlak'),('1f19','Kerajinan'),('1f20','Kerapian'),('2f01','Aqidah'),('2f02','Fiqih'),('2f03','Shorof'),('2f04','Qowaid Shorfi'),('2f05','Tajwid'),('2f06','Nahwu'),('2f07','Ilmu Akhlak'),('2f08','Tarikh Nabi'),('2f09','Bahasa Arab'),('2f14','Riyadloh'),('2f15','Khitobiyah'),('2f16','Musyawarah'),('2f17','Muhafadzoh'),('2f18','Akhlak'),('2f19','Kerajinan'),('2f20','Kerapian'),('3f01','Aqidah '),('3f02','Fiqih'),('3f03','Shorof'),('3f04','Qowaidu Shorfy'),('3f05','Tajwid'),('3f06','Nahwu'),('3f07','Ilmu Akhlak'),('3f08','Tarikh Nabi'),('3f14','Riyadloh'),('3f15','Khitobiyah'),('3f16','Musyawarah'),('3f17','Muhafadzoh'),('3f18','Akhlak'),('3f19','Kerajinan'),('3f20','Kerapian'),('4f01','Aqidah '),('4f02','Hadits'),('4f03','Fiqih'),('4f04','Shorof'),('4f05','Qowaidu Shorfy'),('4f06','Tajwid'),('4f07','Nahwu'),('4f08','Ilmu Akhlak'),('4f09','Tarikh Nabi'),('4f14','Riyadloh'),('4f15','Khitobiyah'),('4f16','Musyawarah'),('4f17','Muhafadzoh'),('4f18','Akhlak'),('4f19','Kerajinan'),('4f20','Kerapian'),('50f01','Aqidah '),('50f02','Hadits'),('50f03','Fiqih'),('50f04','Shorof'),('50f05','Qowaidu Shorfy'),('50f06','Tajwid'),('50f07','Nahwu'),('50f08','Ilmu Akhlak'),('50f14','Riyadloh'),('50f15','Khitobiyah'),('50f16','Musyawarah'),('50f17','Muhafadzoh'),('50f18','Akhlak'),('50f19','Kerajinan'),('50f20','Kerapian'),('55f01','Aqidah '),('55f02','Hadits'),('55f03','Fiqih'),('55f04','Shorof'),('55f05','Qowaidu Shorfy'),('55f06','Tajwid'),('55f07','Nahwu'),('55f08','Ilmu Akhlak'),('55f14','Riyadloh'),('55f15','Khitobiyah'),('55f16','Musyawarah'),('55f17','Muhafadzoh'),('55f18','Akhlak'),('55f19','Kerajinan'),('55f20','Kerapian'),('60f01','Aqidah '),('60f02','Hadits'),('60f03','Fiqih'),('60f04','Nahwu'),('60f05','Faraid'),('60f06','Mantiq'),('60f14','Riyadloh'),('60f15','Khitobiyah'),('60f16','Musyawarah'),('60f17','Muhafadzoh'),('60f18','Akhlak'),('60f19','Kerajinan'),('60f20','Kerapian'),('65f01','Aqidah '),('65f02','Hadits'),('65f03','Fiqih'),('65f04','Nahwu'),('65f14','Riyadloh'),('65f15','Khitobiyah'),('65f16','Musyawarah'),('65f17','Muhafadzoh'),('65f18','Akhlak'),('65f19','Kerajinan'),('65f20','Kerapian'),('7f01','Aqidah '),('7f02','Hadits'),('7f03','Fiqih'),('7f04','Ilmu Akhlak'),('7f05','Tarikh Nabi'),('7f06','Balagoh'),('7f07','Ushul Fiqh'),('7f14','Riyadloh'),('7f15','Khitobiyah'),('7f16','Musyawarah'),('7f17','Muhafadzoh'),('7f18','Akhlak'),('7f19','Kerajinan'),('7f20','Kerapian'),('8f01','Aqidah '),('8f02','Hadits'),('8f03','Fiqih'),('8f04','Usul Fiqh'),('8f05','Balagoh'),('8f06','Falak '),('8f14','Riyadloh'),('8f15','Khitobiyah'),('8f16','Musyawarah'),('8f17','Muhafadzoh'),('8f18','Akhlak'),('8f19','Kerajinan'),('8f20','Kerapian');
/*!40000 ALTER TABLE `cabangilmu` ENABLE KEYS */;
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
