// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_ORG_HOOK } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ReadOrgHook = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await QUERY_ORG_HOOK(req.params.id, userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.get('/:orgId/hooks/:id', authMiddleware, ReadOrgHook);

// Exports
// ========================================================
export default router;
