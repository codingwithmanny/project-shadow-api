// Imports
// ========================================================
import { PrismaClient, Prisma, OrgMember } from '@prisma/client';
import { NotFound } from '../../utils/errorHandlers';
import dictionary from '../../utils/dictionary.json';
import { Member, QueryMemberFilters } from './types';
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
export const QUERY_ORG_MEMBERS = async ({
  query = null,
  take = 10,
  skip = 0,
  orderBy = 'id',
  sort = 'asc',
  orgId,
  userId,
}: QueryMemberFilters) => {
  const optionOrderBy = [
    'id',
    'name',
    'walletAddress',
    'validated',
    'nonceDate',
    'createdAt',
  ].includes(orderBy)
    ? orderBy
    : 'id';
  const optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
  const options: Prisma.OrgMemberFindManyArgs = {};

  if (!(await (await QUERY_ORG(`${orgId}`, userId)).data)) {
    throw new NotFound(dictionary.USERS.ERROR.READ.NOT_FOUND);
  }

  if (query) {
    options.where = {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          walletAddress: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  if (userId) {
    options.where = {
      ...options.where,
      AND: [
        {
          Org: {
            id: orgId,
            UserOrg: {
              some: {
                userId,
              },
            },
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

  const data = await prisma.orgMember.findMany(options);

  return { data, pagination };
};

/**
 *
 * @param id
 * @param userId
 * @returns
 */
export const QUERY_ORG_MEMBER = async (id: string, userId?: string) => {
  let options: Prisma.OrgMemberFindFirstArgs = {
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

  const data = await prisma.orgMember.findFirst(options);

  if (!data) throw new NotFound(dictionary.ORG_MEMBERS.ERROR.READ.NOT_FOUND);

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const CREATE_ORG_MEMBER = async (
  payload: {
    orgId: OrgMember['orgId'];
    name: OrgMember['name'];
    walletAddress: OrgMember['walletAddress'];
    validated: OrgMember['validated'];
  },
  userId?: string,
) => {
  if (!(await (await QUERY_ORG(`${payload.orgId}`, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.READ.NOT_FOUND);
  }

  let options: Prisma.OrgMemberCreateArgs = {
    data: {
      orgId: payload.orgId,
      walletAddress: payload.walletAddress,
    },
  };

  if (payload.name) {
    options.data = {
      ...options.data,
      name: payload.name,
    };
  }

  if (payload.validated) {
    options.data = {
      ...options.data,
      validated: payload.validated,
    };
  }

  const data = await prisma.orgMember.create(options);

  return { data };
};

export const CREATE_ORG_MEMBER_WITH_FORM = async ({
  formId,
  name,
  walletAddress,
  signature,
}: {
  formId: string;
  name?: string;
  walletAddress: string;
  signature: string;
}) => {
  // const payload = QUERY_ORG_FROM_FORM_ID()
  // let options: Prisma.OrgMemberCreateArgs = {
  //   data: {
  //     orgId: payload.orgId,
  //     walletAddress: payload.walletAddress,
  //     validated: new Date()
  //   },
  // };
  // if (payload.name) {
  //   options.data = {
  //     ...options.data,
  //     name: payload.name,
  //   };
  // }
  // const data = await prisma.orgMember.create(options);
  // return { data };
};

/**
 *
 * @param id
 */
export const DELETE_ORG_MEMBER = async (id: string, userId?: string) => {
  if (!(await (await QUERY_ORG_MEMBER(id, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.DELETE.NOT_FOUND);
  }

  const options: Prisma.OrgMemberDeleteArgs = {
    where: {
      id,
    },
  };

  const data = await prisma.orgMember.delete(options);

  return { data };
};
