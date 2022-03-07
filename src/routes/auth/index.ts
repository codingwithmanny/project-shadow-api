// Imports
// ========================================================
import { Router } from 'express';
// import ListUsers from './list';
import Signin from './signin';
import Me from './me';
// import UpdateUser from './update';
// import DeleteUser from './delete';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
// router.use(ListUsers);
router.use(Signin);
router.use(Me);
// router.use(UpdateUser);
// router.use(DeleteUser);

// Exports
// ========================================================
export default router;
