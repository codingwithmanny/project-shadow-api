// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import authMiddleware from '../../middlewares/authMiddleware';
import Validator from '../../middlewares/validator';
import { body } from 'express-validator';
import { CREATE_ORG_MEMBER } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateMember = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await CREATE_ORG_MEMBER(
    {
      ...req.body,
      orgId: req.params.id,
    },
    userId,
  );

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.post(
  '/:id/members',
  authMiddleware,
  body('name').optional(),
  body('walletAddress').isString().isLength({ min: 3 }),
  body('validated').optional(),
  Validator,
  CreateMember,
);

// Exports
// ========================================================
export default router;
