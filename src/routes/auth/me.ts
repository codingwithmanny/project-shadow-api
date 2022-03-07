// Imports
// ========================================================
import { Router, Request, Response } from 'express';
// import { NotFound } from '../../utils/errorHandlers';
import { buildSuccessResponse } from '../../utils/helpers';
// import dictionary from '../../utils/dictionary.json';
// import { UPSERT_USER } from '../users/queries';
import { client } from '../..';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const Me = async (req: Request, res: Response) => {
  // const { data } = await UPSERT_USER(req.body);
  const { data } = await client.from('test').select('*');

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.get('/me', Me);

// Exports
// ========================================================
export default router;
