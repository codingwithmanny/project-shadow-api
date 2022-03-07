// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import authMiddleware from '../../middlewares/authMiddleware';
import Validator from '../../middlewares/validator';
import { body } from 'express-validator';
import { CREATE_ORG_FORM } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateForm = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await CREATE_ORG_FORM(
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
  '/:id/forms',
  authMiddleware,
  body('name').isString(),
  Validator,
  CreateForm,
);

// Exports
// ========================================================
export default router;
