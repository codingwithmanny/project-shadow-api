// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_ORG_FORMS } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ListForms = async (req: Request, res: Response) => {
  const userId = `${req?.user?.sub ?? ''}`;

  const { data, pagination } = await QUERY_ORG_FORMS({
    query: req?.query?.q as string | undefined,
    take: req?.query?.take
      ? (parseInt(req.query.take as string, 0) as number)
      : undefined,
    skip: req?.query?.skip
      ? (parseInt(req.query.skip as string, 0) as number)
      : undefined,
    orderBy: req?.query?.orderBy as string | undefined,
    sort: req?.query?.sort as string | undefined,
    userId,
    orgId: req.params.id,
  });
  return res.json(buildSuccessResponse(data, pagination));
};

// Middlewares
// ========================================================
router.get('/:id/forms', authMiddleware, ListForms);

// Exports
// ========================================================
export default router;
