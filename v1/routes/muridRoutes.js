import { Router } from 'express';
import { getAllMurids,getMuridById, createMurid, updateMurid, deleteMurid } from '../controllers/muridController.js';

const router = Router();

router.get('/', getAllMurids);
router.get('/:id', getMuridById);
router.post('/', createMurid);
router.patch('/:id', updateMurid);
router.delete('/:id', deleteMurid);

export default router;
