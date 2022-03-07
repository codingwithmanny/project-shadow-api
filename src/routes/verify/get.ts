// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { NotFound } from '../../utils/errorHandlers';
import dictionary from '../../utils/dictionary.json';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_ORG_FORM } from '../forms/queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const VerifyGet = async (req: Request, res: Response) => {
  const { data } = await QUERY_ORG_FORM(req.params.id);

  if (!data.enabled) {
    throw new NotFound(dictionary.ORG_FORMS.ERROR.READ.NOT_FOUND);
  }

  return res.json(
    buildSuccessResponse({
      id: data?.id,
    }),
  );
};

// Middlewares
// ========================================================
router.get('/:id', VerifyGet);

// Exports
// ========================================================
export default router;
