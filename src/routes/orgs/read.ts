// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';
import { QUERY_ORG } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ReadOrg = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await QUERY_ORG(req.params.id, userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.get('/:id', authMiddleware, ReadOrg);

// Exports
// ========================================================
export default router;
