import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getSavedColleges,
  saveCollege,
  unsaveCollege,
} from '../controllers/savedController';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getSavedColleges);
router.post('/:collegeId', saveCollege);
router.delete('/:collegeId', unsaveCollege);

export default router;
