// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { UPDATE_USER } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const UpdateUser = async (req: Request, res: Response) => {
  const { data } = await UPDATE_USER(req.params.id, req.body);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.put('/:id', UpdateUser);

// Exports
// ========================================================
export default router;
