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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id_admin` int unsigned NOT NULL,
  `nama_admin` varchar(255) NOT NULL,
  `no_hp` bigint unsigned NOT NULL,
  `id_kelas` int unsigned NOT NULL,
  `isSuperAdmin` tinyint(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `no_hp` (`no_hp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (204501,'Ust. M. Mujib',6285789465579,1000,1,'madin579'),(204502,'Ust. Nasirudin',6287894751088,2000,0,'madin088'),(204503,'Agus Ali Wafa',6285608385464,3000,0,'madin464'),(204504,'Agus Muhdhor',6289518444098,4000,0,'madin098'),(204505,'Ust. Ainul Basyir',6281539364194,5000,1,'madin194'),(204506,'Ust. Nur Kholis',1986001,6000,0,'madin001'),(204507,'Ust. Saiful Maarif',6285788531781,7000,0,'madin781'),(204508,'Ust. Nur Khoiri',1986002,8000,0,'madin002'),(204509,'Ust. Amat Mutolib',6285758901949,1500,1,'madin949'),(204510,'Ust. Ismail Thohir',6281379406820,2500,0,'madin820'),(204511,'Ust. Rikza Muqtafa',6285783201389,3500,0,'madin389'),(204512,'Ust. Rosyid Ubaidillah',6285789266340,4500,0,'madin340'),(204513,'Ustzh. Ny. Durrotun Nada',6281368912772,5500,0,'madin772'),(204514,'Ust. Wahid Hasim',6285769575161,6500,1,'madin161'),(204515,'Ust  Al Faizin',6289515685147,7500,1,'madin147'),(204516,'Ust. M. Khoirul Anam',6285664227364,1101,0,'madin364'),(204517,'Ust. Nasikun',6285768778298,1102,0,'madin298'),(204518,'Ust. Andriansyah',62857836977312,2101,0,'madin312'),(204519,'Ust. Aly Ma\'ruf',6285366774099,2102,0,'madin099'),(204520,'Ust. Rifki Setiawan Muttaqin',6281278735757,3101,1,'madin757'),(204521,'Ust. Ali Mahsun',6285789462265,3102,0,'madin265'),(204522,'Ust. Samsudin Thohir',6285658628728,4100,0,'madin728'),(204523,'Ust. Alif Zamroni',6285783469596,5100,0,'madin596'),(204524,'Ust. Hasan Bisri',6281368352727,6100,0,'madin727'),(204525,'Ustzh. Nur Mahmudah',6285963969898,1601,0,'madin898'),(204526,'Ustzh. Fitria Mutoharoh',6281369049122,1602,0,'madin122'),(204527,'Ust. M. Muthohir',6285788720260,2601,0,'madin260'),(204528,'Ust. Wahid Hasim',1986003,2602,0,'madin003'),(204529,'Ustzh. Luthfiatul Istianah',6282278135933,3601,0,'madin933'),(204530,'Ustzh. Vina Qonitatul Mar\'ah',6285669722739,3602,0,'madin739'),(204531,'Ustzh. Hindun Qomariyah',6281532627721,4600,0,'madin721'),(204532,'Ust. Fatkhul Irsyad',6285788778671,5600,1,'madin671'),(204533,'Ust. Ainul Basyir',1986004,6600,0,'madin004');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
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
