import { Router } from 'express';
import {  CabangIlmuController } from '../controllers/CabangIlmuController.js';
import {  MapelController } from '../controllers/MapelController.js';
import {AdminController} from '../controllers/AdminController.js'
const router = Router();

router.get('/all', AdminController.getAllAdmin)  ;
router.patch('/update', AdminController.updateAdmin)  ;
// router.post('/auth', AdminController.getWesLoginUrung)  ;
router.post('/tambah', AdminController.createAdmin)  ;
router.post('/tambah/batch', AdminController.createManyAdmin)  ;
export default router;
