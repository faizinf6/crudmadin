import { Router } from 'express';
import {  MuridController } from '../controllers/muridController.js';
import {  NilaiMuridController } from '../controllers/nilaiMapelController.js';

const router = Router();

router.get('/', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;
router.get('/rekap/', NilaiMuridController.getAllNilaiBySpecificIdMapel)  ;

export default router;
