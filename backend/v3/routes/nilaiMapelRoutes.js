import { Router } from 'express';
import {  MuridController } from '../controllers/MuridController.js';
import {  NilaiMuridController } from '../controllers/NilaiMapelController.js';

const router = Router();

router.get('/rekap', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;
router.get('/', NilaiMuridController.getAllNilai)  ;
router.get('/taftisan', NilaiMuridController.getStatusTaftisan)  ;
router.get('/taftisan/all', NilaiMuridController.getAllStatusTaftisan)  ;
router.patch('/update', NilaiMuridController.updateNilaiMurid)  ;
router.patch('/update/taftisan', NilaiMuridController.updateStatusTaftisan)  ;
// router.get('/perkelas', NilaiMuridController.getAllNilaiBySpecificIdKelas)  ;
router.post('/add/batch', NilaiMuridController.addNilaiMapelByIdKelas)  ;
router.post('/add/batch/auto', NilaiMuridController.addNilaiMapelByIdKelasAuto)  ;
// router.get('/rekap/', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;
router.get('/permurid', NilaiMuridController.getMapelDanNilaiMurid);

/*
* rencana untukk taftisan
* buat get data taftisan
* ambil id_kelas sebagai query
* menggunakan id_kelas cari murid siapa saja yang berada di kelas itu
* mneggunakan id_kelas cari mata pelajaran utama apa saja yang disistu,
* menggunakan id_murid dan id_mapel cari dia status taftisanya bagiamana?
*
* */

//Nilai Hafalan Routes
router.get('/hafalan', NilaiMuridController.getNilaiHafalan)  ;
router.post('/hafalan/batch', NilaiMuridController.createBatchNilaiHafalan);
router.post('/hafalan/batch/auto', NilaiMuridController.createBatchNilaiHafalanAutoByIdKelas);
router.patch('/hafalan/update', NilaiMuridController.updateNilaiHafalan);


export default router;
