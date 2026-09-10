import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getComparison,
  addToComparison,
  removeFromComparison,
} from '../controllers/compareController';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getComparison);
router.post('/', addToComparison);
router.delete('/:collegeId', removeFromComparison);

export default router;
