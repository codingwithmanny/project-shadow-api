// Imports
// ========================================================
import { PrismaClient, Prisma, OrgHook } from '@prisma/client';
import { NotFound } from '../../utils/errorHandlers';
import dictionary from '../../utils/dictionary.json';
import { Hook, QueryHookFilters } from './types';
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
export const QUERY_ORG_HOOKS = async ({
  query = null,
  take = 10,
  skip = 0,
  orderBy = 'id',
  sort = 'asc',
  orgId,
  userId,
}: QueryHookFilters) => {
  const optionOrderBy = ['id', 'name', 'method', 'url', 'createdAt'].includes(
    orderBy,
  )
    ? orderBy
    : 'id';
  const optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
  const options: Prisma.OrgHookFindManyArgs = {};

  if (!(await (await QUERY_ORG(`${orgId}`, userId)).data)) {
    throw new NotFound(dictionary.USERS.ERROR.READ.NOT_FOUND);
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
        {
          method: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          url: {
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
        {
          method: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          url: {
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
    total: await prisma.orgMember.count(options as Prisma.OrgMemberCountArgs),
  };

  options.take = take;
  options.skip = skip;

  const data = await prisma.orgHook.findMany(options);

  return { data, pagination };
};

/**
 *
 * @param id
 * @param userId
 * @returns
 */
export const QUERY_ORG_HOOK = async (id: string, userId?: string) => {
  let options: Prisma.OrgHookFindFirstArgs = {
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

  const data = await prisma.orgHook.findFirst(options);

  if (!data) throw new NotFound(dictionary.ORG_HOOKS.ERROR.READ.NOT_FOUND);

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const CREATE_ORG_HOOK = async (
  payload: {
    orgId: OrgHook['orgId'];
    name: OrgHook['name'];
    url: OrgHook['url'];
    method: OrgHook['method'];
  },
  userId?: string,
) => {
  if (!(await (await QUERY_ORG(`${payload.orgId}`, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.READ.NOT_FOUND);
  }

  let options: Prisma.OrgHookCreateArgs = {
    data: payload,
  };

  if (payload.name) {
    options.data = {
      ...options.data,
      name: payload.name,
    };
  }

  const data = await prisma.orgHook.create(options);

  return { data };
};

/**
 *
 * @param id
 */
export const DELETE_ORG_HOOK = async (id: string, userId?: string) => {
  if (!(await (await QUERY_ORG_HOOK(id, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.DELETE.NOT_FOUND);
  }

  const options: Prisma.OrgHookDeleteArgs = {
    where: {
      id,
    },
  };

  const data = await prisma.orgHook.delete(options);

  return { data };
};
