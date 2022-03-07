// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { DELETE_ORG_HOOK } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const DeleteOrgHook = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await DELETE_ORG_HOOK(req.params.id, userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.delete('/:orgId/hooks/:id', authMiddleware, DeleteOrgHook);

// Exports
// ========================================================
export default router;
