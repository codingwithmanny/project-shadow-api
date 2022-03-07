// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const TestPost = async (req: Request, res: Response) => {
  return res.json(buildSuccessResponse(req.body));
};

// Middlewares
// ========================================================
router.post('/', TestPost);

// Exports
// ========================================================
export default router;
