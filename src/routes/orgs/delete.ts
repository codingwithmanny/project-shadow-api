// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';
import { DELETE_ORG } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const DeleteOrg = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await DELETE_ORG(req.params.id, userId);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.delete('/:id', authMiddleware, DeleteOrg);

// Exports
// ========================================================
export default router;
