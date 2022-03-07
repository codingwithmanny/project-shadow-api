// Imports
// ========================================================
import { Router } from 'express';
import ListMembers from './list';
import CreateMember from './create';
import ReadMember from './read';
// import UpdateUser from './update';
import DeleteMember from './delete';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(ListMembers);
router.use(CreateMember);
router.use(ReadMember);
// router.use(UpdateUser);
router.use(DeleteMember);

// Exports
// ========================================================
export default router;
