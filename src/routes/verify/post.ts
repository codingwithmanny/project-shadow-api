// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const VerifyPost = async (req: Request, res: Response) => {
  return res.json(buildSuccessResponse(true));
};

// Middlewares
// ========================================================
router.post('/', VerifyPost);

// Exports
// ========================================================
export default router;
