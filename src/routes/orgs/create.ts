// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import authMiddleware from '../../middlewares/authMiddleware';
import Validator from '../../middlewares/validator';
import { body } from 'express-validator';
import { CREATE_ORG } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateOrg = async (req: Request, res: Response) => {
  const userId = req.user?.sub;

  const { data } = await CREATE_ORG({ ...req.body, userId });

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.post(
  '/',
  authMiddleware,
  body('name').isString().isLength({ min: 3 }),
  Validator,
  CreateOrg,
);

// Exports
// ========================================================
export default router;
