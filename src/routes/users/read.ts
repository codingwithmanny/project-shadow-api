// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_USER } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ReadUser = async (req: Request, res: Response) => {
  const userId = `${
    req.user?.sub === req.params.id ? req.params.id : req.user?.sub
  }`;

  const { data } = await QUERY_USER(userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.get('/:id', authMiddleware, ReadUser);

// Exports
// ========================================================
export default router;
