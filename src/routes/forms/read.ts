// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_ORG_FORM } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ReadOrgForm = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await QUERY_ORG_FORM(req.params.id, userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.get('/:orgId/forms/:id', authMiddleware, ReadOrgForm);

// Exports
// ========================================================
export default router;
