// routes/kelasRoutes.js
import express from 'express';
import {   KelasController } from '../controllers/kelasController.js';
import {   AngkatanController } from '../controllers/angkatanController.js';
import {   MapelController } from '../controllers/mapelController.js';

const router = express.Router();

// Rute untuk membuat Kelas baru
router.get('/', KelasController.getAllKelas);
router.get('/murid/all/:id_kelas', KelasController.getAllNamaMurid);
router.get('/mapel/all/:id_kelas', KelasController.getAllMapelSpecificKelas);
router.post('/', KelasController.createKelas);
router.post('/batch', KelasController.createManyKelas);

router.get('/angkatan/all', AngkatanController.getAllAngkatan);
router.post('/angkatan', AngkatanController.createAngkatan);
router.post('/angkatan/batch', AngkatanController.createManyAngkatan);

router.get('/mapel/all', MapelController.getAllMapel);
router.post('/mapel',MapelController.createMapel );
router.post('/mapel/batch',MapelController.createManyMapel );

export default router;
