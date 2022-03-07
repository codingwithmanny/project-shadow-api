// Imports
// ========================================================
import { Router } from 'express';
import TestGet from './get';
import TestPost from './post';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(TestGet);
router.use(TestPost);

// Exports
// ========================================================
export default router;
