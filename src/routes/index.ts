// Imports
// ========================================================
import { Router } from 'express';
import Auth from './auth';
import Users from './users';
import Orgs from './orgs';
import Members from './members';
import Hooks from './hooks';
import Forms from './forms';
import Test from './test';
import Nonce from './nonce';
import Submissions from './submissions';
import Verify from './verify';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use('/auth', Auth);
router.use('/users', Users);
router.use('/orgs', Orgs);
router.use('/orgs', Members);
router.use('/orgs', Hooks);
router.use('/orgs', Forms);
router.use('/test', Test);
router.use('/nonce', Nonce);
router.use('/submissions', Submissions);
router.use('/verify', Verify);

// Exports
// ========================================================
export default router;
