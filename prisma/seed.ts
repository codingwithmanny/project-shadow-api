// Imports
// ========================================================
import Prisma from '@prisma/client';
import faker from 'faker';

// Config
// ========================================================
const prisma = new Prisma.PrismaClient();
const NUMBER_TO_GENERATE = 10;

// Main Seeder
// ========================================================
const main = async () => {
  // Users
  const CREATED_USERS: Prisma.User[] = [];

  for (let i = 0; i < NUMBER_TO_GENERATE; i++) {
    CREATED_USERS.push(
      await prisma.user.create({
        data: {
          fullName: faker.fake(`{{name}}`),
          email: faker.internet.email(),
        },
      }),
    );
  }

  console.group('Users Seeding:');
  console.log(`Created: ${CREATED_USERS.length}`);
  console.groupEnd();
};

// Init
// ========================================================
main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
