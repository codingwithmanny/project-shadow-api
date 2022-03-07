// Imports
// ========================================================
import { Router } from 'express';
import VerifyGet from './get';
import VerifyPost from './post';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(VerifyGet);
router.use(VerifyPost);

// Exports
// ========================================================
export default router;
