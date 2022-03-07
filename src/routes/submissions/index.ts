// Imports
// ========================================================
import { Router } from 'express';
import CreateSubmission from './create';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(CreateSubmission);

// Exports
// ========================================================
export default router;
