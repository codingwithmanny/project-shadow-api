// Imports
// ========================================================
import { Router } from 'express';
import ListHooks from './list';
import CreateHook from './create';
import ReadHook from './read';
import TestHook from './test';
import DeleteHook from './delete';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(ListHooks);
router.use(CreateHook);
router.use(ReadHook);
router.use(TestHook);
// router.use(UpdateUser);
router.use(DeleteHook);

// Exports
// ========================================================
export default router;
