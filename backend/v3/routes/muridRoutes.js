import { Router } from 'express';
import {  MuridController } from '../controllers/MuridController.js';
import {  KehadiranController } from '../controllers/KehadiranController.js';
// import {  NilaiMuridController } from '../controllers/nilaiMapelController.js';

const router = Router();

router.get('/', MuridController.getAllMurid);
router.get('/kehadiran/:id_murid', KehadiranController.findOrCreateKehadiran);
router.get('/pelanggaran/:id_murid', KehadiranController.getPelanggaran);
router.get('/kehadiran/perkelas/:id_kelas', KehadiranController.findOrCreateKehadiranByIdKelas);
router.get('/mapel/:id_murid', MuridController.getAllMapelSpecificMurid);
router.get('/rapot/:id_kelas', MuridController.getNilaiRapotMuridPerkelas);
router.get('/terakhirsopo', MuridController.getLastIdMurid);
router.get('/cari/:id', MuridController.getMuridById);
router.get('/boyong-pgnt', MuridController.paginationAllMuridBoyong);

// router.get('/nilai/mapel/', NilaiMuridController.getAllNilai);

router.post('/tambah', MuridController.createMurid);
// router.post('/nilai/mapel/', NilaiMuridController.addNilai);
// router.post('/nilai/mapel/batch', NilaiMuridController.addManyNilai);
router.post('/batch', MuridController.createManyMurid);

router.patch('/:id', MuridController.updateMurid);
router.patch('/kehadiran/:id_murid', KehadiranController.updateKehadiran);

router.delete('/:id', MuridController.updateMurid);

export default router;
