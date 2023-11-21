import { Router } from 'express';
import {  MuridController } from '../controllers/MuridController.js';
import {  KehadiranController } from '../controllers/KehadiranController.js';
// import {  NilaiMuridController } from '../controllers/nilaiMapelController.js';

const router = Router();

router.get('/', MuridController.getAllMurid);
router.get('/kehadiran/:id_murid', KehadiranController.findOrCreateKehadiran);
router.get('/kehadiran/perkelas/:id_kelas', KehadiranController.findOrCreateKehadiranByIdKelas);
router.get('/:id', MuridController.getMuridById);
router.get('/mapel/:id_murid', MuridController.getAllMapelSpecificMurid);
router.get('/rapot/:id_kelas', MuridController.getNilaiRapotMuridPerkelas);
// router.get('/nilai/mapel/', NilaiMuridController.getAllNilai);

router.post('/', MuridController.createMurid);
// router.post('/nilai/mapel/', NilaiMuridController.addNilai);
// router.post('/nilai/mapel/batch', NilaiMuridController.addManyNilai);
router.post('/batch', MuridController.createManyMurid);

router.patch('/:id', MuridController.updateMurid);
router.patch('/kehadiran/:id_murid', KehadiranController.updateKehadiran);

router.delete('/:id', MuridController.updateMurid);

export default router;
