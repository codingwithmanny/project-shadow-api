// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';
import { QUERY_ORG_MEMBER } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ReadOrgMember = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await QUERY_ORG_MEMBER(req.params.id, userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.get('/:orgId/members/:id', authMiddleware, ReadOrgMember);

// Exports
// ========================================================
export default router;
