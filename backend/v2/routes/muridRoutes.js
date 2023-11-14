import { Router } from 'express';
import {  MuridController } from '../controllers/muridController.js';
import {  NilaiMuridController } from '../controllers/nilaiMapelController.js';

const router = Router();

router.get('/', MuridController.getAllMurid)  ;
router.get('/get', MuridController.getAllMurid);
router.get('/:id', MuridController.getMuridById);
router.get('/mapel/:id_murid', MuridController.getAllMapelSpecificMurid);
router.get('/nilai/mapel/', NilaiMuridController.getAllNilai);
router.get('/babi/', MuridController.getAllMurid);

router.post('/', MuridController.createMurid);
router.post('/nilai/mapel/', NilaiMuridController.addNilai);
router.post('/nilai/mapel/batch', NilaiMuridController.addManyNilai);
router.post('/batch', MuridController.createManyMurid);

router.patch('/:id', MuridController.updateMurid);
router.delete('/:id', MuridController.updateMurid);

export default router;
