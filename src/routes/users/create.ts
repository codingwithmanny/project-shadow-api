// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
import dictionary from '../../utils/dictionary.json';
import { CREATE_USER } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateUser = async (req: Request, res: Response) => {
  const { data } = await CREATE_USER(req.body);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.post('/', CreateUser);

// Exports
// ========================================================
export default router;
