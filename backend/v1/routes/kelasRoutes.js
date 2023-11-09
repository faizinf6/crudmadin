// routes/kelasRoutes.js
import express from 'express';
import {   createKelas,
    getAllKelas,
    getKelasById,
    updateKelas,
    deleteKelas } from '../controllers/kelasController.js';

const router = express.Router();

// Rute untuk membuat Kelas baru
router.get('/', getAllKelas);
router.post('/', createKelas);

export default router;
