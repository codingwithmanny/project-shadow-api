// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import authMiddleware from '../../middlewares/authMiddleware';
import Validator from '../../middlewares/validator';
import { body } from 'express-validator';
import { UPDATE_ORG_FORM } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const UpdateForm = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;

  const { data } = await UPDATE_ORG_FORM(
    req.params.id,
    {
      ...req.body,
      orgId: req.params.orgId,
    },
    userId,
  );

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.put(
  '/:orgId/forms/:id',
  authMiddleware,
  body('name').isString(),
  body('enabled').optional(),
  Validator,
  UpdateForm,
);

// Exports
// ========================================================
export default router;
