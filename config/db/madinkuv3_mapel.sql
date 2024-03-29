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
-- Table structure for table `mapel`
--

DROP TABLE IF EXISTS `mapel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mapel` (
  `id_mapel` int unsigned NOT NULL,
  `nama_mapel` varchar(255) NOT NULL,
  `id_angkatan` int unsigned NOT NULL,
  `id_fan` varchar(255) NOT NULL,
  PRIMARY KEY (`id_mapel`),
  KEY `id_angkatan` (`id_angkatan`),
  KEY `id_fan` (`id_fan`),
  CONSTRAINT `mapel_ibfk_1` FOREIGN KEY (`id_angkatan`) REFERENCES `angkatan` (`id_angkatan`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mapel_ibfk_2` FOREIGN KEY (`id_fan`) REFERENCES `cabangilmu` (`id_fan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mapel`
--

LOCK TABLES `mapel` WRITE;
/*!40000 ALTER TABLE `mapel` DISABLE KEYS */;
INSERT INTO `mapel` VALUES (101,'Aqidatul Awam',100,'1f01'),(102,'Wasiatul Mustofa',100,'1f02'),(103,'Mabadi Fiqh 1-2',100,'1f03'),(104,'Hidayatus Shibyan',100,'1f04'),(105,'Lughot Al Arabiyah',100,'1f05'),(106,'Izzul Adab',100,'1f06'),(107,'Alala',100,'1f06'),(108,'Tanbihul Mutaallim',100,'1f06'),(109,'Tarikh Nabi',100,'1f07'),(114,'Riyadloh',100,'1f14'),(115,'Khitobiyah',100,'1f15'),(116,'Musyawarah',100,'1f16'),(117,'Muhafadzoh',100,'1f17'),(118,'Akhlak',100,'1f18'),(119,'Kerajinan',100,'1f19'),(120,'Kerapian',100,'1f20'),(201,'Badiul Amali',200,'2f01'),(202,'Mabadi Fiqih 3',200,'2f02'),(203,'Muqodimah Shorfi',200,'2f03'),(204,'Ilal Jawan',200,'2f04'),(205,'Tanwirul Qori',200,'2f05'),(206,'Jurumiyah Jawan',200,'2f06'),(207,'Syabrowi',200,'2f06'),(208,'Lughot Arobiyah 2',200,'2f09'),(209,'Akhlaqul Banin 1',200,'2f07'),(210,'Khulasoh 1',200,'2f08'),(214,'Riyadloh',200,'2f14'),(215,'Khitobiyah',200,'2f15'),(216,'Musyawarah',200,'2f16'),(217,'Muhafadzoh',200,'2f17'),(218,'Akhlak',200,'2f18'),(219,'Kerajinan',200,'2f19'),(220,'Kerapian',200,'2f20'),(301,'Khoridatul Bahiyah',300,'3f01'),(302,'Mabadi 4',300,'3f02'),(303,'Tashrif Istilah',300,'3f03'),(304,'Qowaid Ilal',300,'3f04'),(305,'Hidayatul Mustafid',300,'3f05'),(306,'Matan Jurumiyah',300,'3f06'),(307,'Akhlaqul Banin 2',300,'3f07'),(308,'Khulasoh 2',300,'3f08'),(309,'Ilal Shorfy',300,'3f04'),(314,'Riyadloh',300,'3f14'),(315,'Khitobiyah',300,'3f15'),(316,'Musyawarah',300,'3f16'),(317,'Muhafadzoh',300,'3f17'),(318,'Akhlak',300,'3f18'),(319,'Kerajinan',300,'3f19'),(320,'Kerapian',300,'3f20'),(401,'Tijan Adurari',400,'4f01'),(402,'Arabain Nawawi',400,'4f02'),(403,'Fathul Qorib',400,'4f03'),(404,'Tashrif Lughowi',400,'4f04'),(405,'Al Irob',400,'4f05'),(406,'Jazariyah',400,'4f06'),(407,'Imrithi',400,'4f07'),(408,'Ta\'lim Mutaalim',400,'4f08'),(409,'Khulasoh 3',400,'4f09'),(414,'Riyadloh',400,'4f14'),(415,'Khitobiyah',400,'4f15'),(416,'Musyawarah',400,'4f16'),(417,'Muhafadzoh',400,'4f17'),(418,'Akhlak',400,'4f18'),(419,'Kerajinan',400,'4f19'),(420,'Kerapian',400,'4f20'),(501,'Jauharu Tauhid',500,'50f01'),(502,'Bulughul Marom',500,'50f02'),(503,'Fathul Qorib',500,'50f03'),(504,'Maqshud',500,'50f04'),(505,'Qowaidul Irob',500,'50f05'),(506,'Hidayatul Mannan',500,'50f06'),(507,'Alfiah 1',500,'50f07'),(508,'Tahliyah',500,'50f08'),(514,'Riyadloh',500,'50f14'),(515,'Khitobiyah',500,'50f15'),(516,'Musyawarah',500,'50f16'),(517,'Muhafadzoh',500,'50f17'),(518,'Akhlak',500,'50f18'),(519,'Kerajinan',500,'50f19'),(520,'Kerapian',500,'50f20'),(551,'Jauharu Tauhid',550,'55f01'),(552,'Bulughul Marom',550,'55f02'),(553,'Fathul Qorib',550,'55f03'),(554,'Maqshud',550,'55f04'),(555,'Qowaidul Irob',550,'55f05'),(556,'Hidayatul Mannan',550,'55f06'),(557,'Alfiah 1',550,'55f07'),(558,'Tahliyah',550,'55f08'),(564,'Riyadloh',550,'55f14'),(565,'Khitobiyah',550,'55f15'),(566,'Musyawarah',550,'55f16'),(567,'Muhafadzoh',550,'55f17'),(568,'Akhlak',550,'55f18'),(569,'Kerajinan',550,'55f19'),(570,'Kerapian',550,'55f20'),(601,'Kifayatul Awam',600,'60f01'),(602,'Bulughul Marom',600,'60f02'),(603,'Fathul Qorib',600,'60f03'),(604,'Alfiah 2',600,'60f04'),(605,'Uddatul Faridl',600,'60f05'),(606,'Sullamu Munawaruq',600,'60f06'),(607,'Mustolah Hadits',600,'60f02'),(614,'Riyadloh',600,'60f14'),(615,'Khitobiyah',600,'60f15'),(616,'Musyawarah',600,'60f16'),(617,'Muhafadzoh',600,'60f17'),(618,'Akhlak',600,'60f18'),(619,'Kerajinan',600,'60f19'),(620,'Kerapian',600,'60f20'),(651,'Kifayatul Awam',650,'65f01'),(652,'Bulughul Marom',650,'65f02'),(653,'Fathul Qorib',650,'65f03'),(654,'Alfiah 2',650,'65f04'),(655,'Mustolah Hdist',650,'65f02'),(664,'Riyadloh',650,'65f14'),(665,'Khitobiyah',650,'65f15'),(666,'Musyawarah',650,'65f16'),(667,'Muhafadzoh',650,'65f17'),(668,'Akhlak',650,'65f18'),(669,'Kerajinan',650,'65f19'),(670,'Kerapian',650,'65f20'),(701,'Faraidul Bahiyah',700,'7f01'),(702,'Tajrid Shorih',700,'7f02'),(703,'Fathul Muin',700,'7f03'),(704,'Idzotun Nasyiin',700,'7f04'),(705,'Tarikh Tasyre\'',700,'7f05'),(706,'Jauharul Maknun',700,'7f06'),(707,'Faraidul Bahiyah',700,'7f07'),(714,'Riyadloh',700,'7f14'),(715,'Khitobiyah',700,'7f15'),(716,'Musyawarah',700,'7f16'),(717,'Muhafadzoh',700,'7f17'),(718,'Akhlak',700,'7f18'),(719,'Kerajinan',700,'7f19'),(720,'Kerapian',700,'7f20'),(801,'Dasuqi',800,'8f01'),(802,'Tajridushorih',800,'8f02'),(803,'Fathul Muin',800,'8f03'),(804,'Faraidul Bahiyah',800,'8f04'),(805,'Jauharul Maknun',800,'8f05'),(806,'Inkasyafal Hisab',800,'8f06'),(814,'Riyadloh',800,'8f14'),(815,'Khitobiyah',800,'8f15'),(816,'Musyawarah',800,'8f16'),(817,'Muhafadzoh',800,'8f17'),(818,'Akhlak',800,'8f18'),(819,'Kerajinan',800,'8f19'),(820,'Kerapian',800,'8f20');
/*!40000 ALTER TABLE `mapel` ENABLE KEYS */;
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
