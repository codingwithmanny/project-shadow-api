// Imports
// ========================================================
import { Router } from 'express';
import ListOrgs from './list';
import CreateOrg from './create';
import ReadOrg from './read';
import UpdateOrg from './update';
import DeleteOrg from './delete';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(ListOrgs);
router.use(CreateOrg);
router.use(ReadOrg);
router.use(UpdateOrg);
router.use(DeleteOrg);

// Exports
// ========================================================
export default router;
