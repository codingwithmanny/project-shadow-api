// Imports
// ========================================================
import { PrismaClient, Prisma, OrgForm } from '@prisma/client';
import { NotFound } from '../../utils/errorHandlers';
import dictionary from '../../utils/dictionary.json';
import { Form, QueryFormFilters } from './types';
import { QUERY_ORG } from '../orgs/queries';

// Config
// ========================================================
const prisma = new PrismaClient();

// Queries
// ========================================================
/**
 *
 * @param param0
 * @returns
 */
export const QUERY_ORG_FORMS = async ({
  query = null,
  take = 10,
  skip = 0,
  orderBy = 'id',
  sort = 'asc',
  orgId,
  userId,
}: QueryFormFilters) => {
  const optionOrderBy = ['id', 'name', 'enabled', 'createdAt'].includes(orderBy)
    ? orderBy
    : 'id';
  const optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
  const options: Prisma.OrgFormFindManyArgs = {};

  if (!(await (await QUERY_ORG(`${orgId}`, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.READ.NOT_FOUND);
  }

  if (query && userId) {
    options.where = {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
      AND: [
        {
          Org: {
            UserOrg: {
              some: {
                userId,
              },
            },
          },
        },
      ],
    };
  } else if (query) {
    options.where = {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  options.orderBy = {
    [optionOrderBy]: optionSort,
  };

  const pagination = {
    query,
    take,
    skip,
    orderBy: optionOrderBy,
    sort: optionSort,
    total: await prisma.orgForm.count(options as Prisma.OrgFormCountArgs), //OrgFormCountArgs
  };

  options.take = take;
  options.skip = skip;

  const data = await prisma.orgForm.findMany(options);

  return { data, pagination };
};

/**
 *
 * @param id
 * @param userId
 * @returns
 */
export const QUERY_ORG_FORM = async (id: string, userId?: string) => {
  let options: Prisma.OrgFormFindFirstArgs = {
    where: {
      id,
    },
  };

  if (userId) {
    options.where = {
      ...options.where,
      Org: {
        UserOrg: {
          some: {
            userId,
          },
        },
      },
    };
  }

  const data = await prisma.orgForm.findFirst(options);

  if (!data) throw new NotFound(dictionary.ORG_FORMS.ERROR.READ.NOT_FOUND);

  return { data };
};

/**
 *
 * @param id
 * @param userId
 * @returns
 */
export const QUERY_ORG_FROM_API_KEY = async (id: string, apiKey?: string) => {
  let options: Prisma.OrgFormFindFirstArgs = {
    where: {
      id,
    },
  };

  if (apiKey) {
    options.where = {
      ...options.where,
      Org: {
        apiKey,
      },
    };
  }

  const data = await prisma.orgForm.findFirst(options);

  if (!data) throw new NotFound(dictionary.ORG_FORMS.ERROR.READ.NOT_FOUND);

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const CREATE_ORG_FORM = async (
  payload: {
    orgId: OrgForm['orgId'];
    name: OrgForm['name'];
  },
  userId?: string,
) => {
  if (!(await (await QUERY_ORG(`${payload.orgId}`, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.READ.NOT_FOUND);
  }

  let options: Prisma.OrgFormCreateArgs = {
    data: payload,
  };

  if (payload.name) {
    options.data = {
      ...options.data,
      name: payload.name,
    };
  }

  const data = await prisma.orgForm.create(options);

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const UPDATE_ORG_FORM = async (
  id: string,
  payload: {
    orgId: OrgForm['orgId'];
    name: OrgForm['name'];
    enabled: OrgForm['enabled'];
  },
  userId?: string,
) => {
  if (!(await (await QUERY_ORG(`${payload.orgId}`, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.READ.NOT_FOUND);
  }

  // Prisma.OrgFormCreateArgs
  let options: Prisma.OrgFormUpdateArgs = {
    where: {
      id,
    },
    data: {},
  };

  if (payload.name) {
    options.data = {
      ...options.data,
      name: payload.name,
    };
  }

  if (payload.enabled !== undefined || payload.enabled !== null) {
    options.data = {
      ...options.data,
      enabled: payload.enabled,
    };
  }

  const data = await prisma.orgForm.update(options);

  return { data };
};

/**
 *
 * @param id
 */
export const DELETE_ORG_FORM = async (id: string, userId?: string) => {
  if (!(await (await QUERY_ORG_FORM(id, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.DELETE.NOT_FOUND);
  }

  const options: Prisma.OrgFormDeleteArgs = {
    where: {
      id,
    },
  };

  const data = await prisma.orgForm.delete(options);

  return { data };
};
