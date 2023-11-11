import { Router } from 'express';
import {  MuridController } from '../controllers/muridController.js';

const router = Router();

router.get('/', MuridController.getAllMurid);
router.get('/get', MuridController.getAllMurid);
router.get('/:id', MuridController.getMuridById);
router.get('/mapel/:id_murid', MuridController.getAllMapelSpecificMurid);
router.post('/', MuridController.createMurid);
router.post('/batch', MuridController.createManyMurid);
router.patch('/:id', MuridController.updateMurid);
router.delete('/:id', MuridController.updateMurid);

export default router;
