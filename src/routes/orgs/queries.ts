// Imports
// ========================================================
import { PrismaClient, Prisma, Organization, User } from '@prisma/client';
import { NotFound } from '../../utils/errorHandlers';
import dictionary from '../../utils/dictionary.json';
import { Org, QueryOrgFilters } from './types';

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
export const QUERY_ORGS = async ({
  query = null,
  take = 10,
  skip = 0,
  orderBy = 'id',
  sort = 'asc',
  include,
  userId,
}: QueryOrgFilters) => {
  const optionOrderBy = ['id', 'name'].includes(orderBy) ? orderBy : 'id';
  const optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
  const options: Prisma.OrganizationFindManyArgs = {};

  console.log({ userId });

  if (
    userId &&
    !(await prisma.user.findFirst({
      where: {
        id: userId,
      },
    }))
  ) {
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
      ],
    };
  }

  if (userId) {
    options.where = {
      ...options.where,
      AND: [
        {
          UserOrg: {
            some: {
              userId,
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
    total: await prisma.organization.count(
      options as Prisma.OrganizationCountArgs,
    ),
  };

  options.take = take;
  options.skip = skip;

  const includes = include?.split(',');
  if (includes?.includes('membersCount')) {
    options.include = {
      _count: {
        select: {
          OrgMember: true,
        },
      },
    };
  }

  const data = await prisma.organization.findMany(options);

  return { data, pagination };
};

/**
 *
 * @param id
 */
export const QUERY_ORG = async (id: string, userId?: string) => {
  let options: Prisma.OrganizationFindFirstArgs = {
    where: {
      id,
    },
  };

  if (userId) {
    options.where = {
      ...options.where,
      UserOrg: {
        some: {
          userId,
        },
      },
    };
  }

  const data = await prisma.organization.findFirst(options);

  if (!data) throw new NotFound(dictionary.ORGS.ERROR.READ.NOT_FOUND);

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const CREATE_ORG = async (payload: {
  name: Org['name'];
  userId: Org['userId'];
}) => {
  console.log({ payload });

  const user = await prisma.user.findFirst({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    throw new NotFound(dictionary.USERS.ERROR.READ.NOT_FOUND);
  }

  // @TODO
  const create = {
    name: payload.name as string,
    apiKey: null,
    secretKey: null,
    public: true,
  };

  const data = await prisma.organization.create({
    data: create,
  });

  console.log({ data });
  console.log({ userId: user.id });
  console.log({ orgId: data.id });

  // Create relationship
  await prisma.userOrg.createMany({
    data: [
      {
        userId: user.id as string,
        orgId: data.id as string,
        role: 'admin',
      },
    ],
  });

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const UPDATE_ORG = async (id: string, payload: Partial<Org>) => {
  console.log({ payload });
  if (
    !(await prisma.organization.findFirst({
      where: {
        id,
      },
    }))
  ) {
    throw new NotFound(dictionary.ORGS.ERROR.UPDATE.NOT_FOUND);
  }

  const update: Partial<Organization> = {};

  if (payload?.name) {
    update.name = payload.name;
  }

  if (payload?.public) {
    update.public = payload.public;
  }

  if (Object.keys(payload)?.length > 0) {
    update.updatedAt = new Date();
  }

  const data = await prisma.organization.update({
    where: {
      id,
    },
    data: update,
  });

  return { data };
};

/**
 *
 * @param id
 */
export const QUERY_ORG_BY_FORM_ID = async (id: string) => {
  const options: Prisma.OrganizationDeleteArgs = {
    where: {},
  };
};

/**
 *
 * @param id
 */
export const DELETE_ORG = async (id: string, userId?: string) => {
  if (!(await (await QUERY_ORG(id, userId)).data)) {
    throw new NotFound(dictionary.ORGS.ERROR.DELETE.NOT_FOUND);
  }

  const options: Prisma.OrganizationDeleteArgs = {
    where: {
      id,
    },
  };

  const data = await prisma.organization.delete(options);

  return { data };
};
