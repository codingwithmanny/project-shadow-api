// Imports
// ========================================================
import { Router } from 'express';
import ListForms from './list';
import CreateForm from './create';
import ReadForm from './read';
import UpdateForm from './update';
import DeleteForm from './delete';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(ListForms);
router.use(CreateForm);
router.use(ReadForm);
router.use(UpdateForm);
router.use(DeleteForm);

// Exports
// ========================================================
export default router;
