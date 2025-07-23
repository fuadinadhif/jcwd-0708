import { PrismaClient } from "../src/generated/prisma/index.js";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const prisma = new PrismaClient(); // Jembatan menuju database

async function seed() {
  try {
    console.info(`Seed started...`);

    console.info(`\nDelete all previous data...`);
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();
    console.info(`All previous data has been deleted`);

    console.info(`\nStart creating new data`);
    // ADMIN
    await prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@mail.com",
        password: await hash("newpass", 10),
        role: "ADMIN",
      },
    });

    // AUTHOR & READER & ARTICLE
    for (let i = 0; i < 10; i++) {
      await prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: await hash("newpass", 10),
          role: i > 4 ? "READER" : "AUTHOR",
          ...(i < 4 && {
            Article: {
              create: {
                title: faker.lorem.words({ min: 3, max: 6 }),
                content: faker.lorem.paragraphs({ min: 2, max: 5 }),
                image: faker.image.url(),
              },
            },
          }),
        },
      });
    }

    console.info(`All seed data has been created`);
    console.info(`\nSeed finished`);
  } catch (error) {
    console.error(`Seeding failed: ${error}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
