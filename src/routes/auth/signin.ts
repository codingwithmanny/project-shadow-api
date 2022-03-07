// Imports
// ========================================================
import { Router, Request, Response } from 'express';
// import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
// import dictionary from '../../utils/dictionary.json';
import { UPSERT_USER } from '../users/queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const Signin = async (req: Request, res: Response) => {
  const { data } = await UPSERT_USER(req.body);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.post('/signin', Signin);

// Exports
// ========================================================
export default router;
