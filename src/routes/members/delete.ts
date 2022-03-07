// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { DELETE_ORG_MEMBER } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const DeleteOrgMember = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await DELETE_ORG_MEMBER(req.params.id, userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.delete('/:orgId/members/:id', authMiddleware, DeleteOrgMember);

// Exports
// ========================================================
export default router;
