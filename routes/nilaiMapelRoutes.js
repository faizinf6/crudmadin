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
router.post('/add/batch/auto', NilaiMuridController.addAllAuto)  ;
// router.get('/rekap/', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;
router.get('/permurid', NilaiMuridController.getMapelDanNilaiMurid);


//Nilai Hafalan Routes
router.get('/hafalan', NilaiMuridController.getNilaiHafalan)  ;
router.post('/hafalan/batch', NilaiMuridController.createBatchNilaiHafalan);
router.post('/hafalan/batch/auto', NilaiMuridController.createBatchNilaiHafalanAutoByIdKelas); //<- tidak di pakai 01/01
router.patch('/hafalan/update', NilaiMuridController.updateNilaiHafalan);


export default router;
