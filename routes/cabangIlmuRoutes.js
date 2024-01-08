import { Router } from 'express';
import {  CabangIlmuController } from '../controllers/CabangIlmuController.js';
import {  MapelController } from '../controllers/MapelController.js';

const router = Router();

router.get('/all/mapel', MapelController.getAllMapelWithFan)  ;
router.get('/all', CabangIlmuController.getAllCabangIlmu)  ;
router.post('/batch', CabangIlmuController.addCabangIlmuBatch)  ;
export default router;
