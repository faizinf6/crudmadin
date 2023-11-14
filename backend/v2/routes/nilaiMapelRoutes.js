import { Router } from 'express';
import {  MuridController } from '../controllers/muridController.js';
import {  NilaiMuridController } from '../controllers/nilaiMapelController.js';

const router = Router();

router.get('/rekap', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;
router.get('/', NilaiMuridController.getAllNilai)  ;
router.patch('/update', NilaiMuridController.updateNilaiMurid)  ;
router.get('/perkelas', NilaiMuridController.getAllNilaiBySpecificIdKelas)  ;
router.post('/:id_kelas/:id_mapel', NilaiMuridController.addNilaiMapelByIdKelas)  ;
// router.get('/rekap/', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;
router.get('/permurid', NilaiMuridController.getMapelDanNilaiMurid);

export default router;
