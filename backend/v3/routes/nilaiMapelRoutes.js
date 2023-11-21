import { Router } from 'express';
import {  MuridController } from '../controllers/MuridController.js';
import {  NilaiMuridController } from '../controllers/NilaiMapelController.js';

const router = Router();

router.get('/rekap', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;
router.get('/', NilaiMuridController.getAllNilai)  ;
router.patch('/update', NilaiMuridController.updateNilaiMurid)  ;
// router.get('/perkelas', NilaiMuridController.getAllNilaiBySpecificIdKelas)  ;
router.post('/add/batch', NilaiMuridController.addNilaiMapelByIdKelas)  ;
// router.get('/rekap/', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;
router.get('/permurid', NilaiMuridController.getMapelDanNilaiMurid);

export default router;
