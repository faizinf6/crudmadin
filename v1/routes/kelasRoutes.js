// routes/kelasRoutes.js
import express from 'express';
import { getAllKelas,createKelas } from '../controllers/kelasController.js';

const router = express.Router();

// Rute untuk membuat Kelas baru
router.get('/', getAllKelas);
router.post('/', createKelas);

export default router;
