// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import authMiddleware from '../../middlewares/authMiddleware';
import Validator from '../../middlewares/validator';
import { body } from 'express-validator';
import { CREATE_ORG_HOOK } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateHook = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await CREATE_ORG_HOOK(
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
  '/:id/hooks',
  authMiddleware,
  body('name').isString(),
  body('method').isIn(['post', 'get']),
  body('url').isString(),
  // body('url').isURL(),
  Validator,
  CreateHook,
);

// Exports
// ========================================================
export default router;
