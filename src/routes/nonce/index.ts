// Imports
// ========================================================
import { Router } from 'express';
import CreateNonce from './create';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(CreateNonce);

// Exports
// ========================================================
export default router;
