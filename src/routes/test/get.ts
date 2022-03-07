// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const TestGet = async (req: Request, res: Response) => {
  return res.json(buildSuccessResponse(req.query));
};

// Middlewares
// ========================================================
router.get('/', TestGet);

// Exports
// ========================================================
export default router;
