// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { DELETE_ORG_FORM } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const DeleteOrgForm = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await DELETE_ORG_FORM(req.params.id, userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.delete('/:orgId/forms/:id', authMiddleware, DeleteOrgForm);

// Exports
// ========================================================
export default router;
