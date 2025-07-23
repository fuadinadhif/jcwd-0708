import { PrismaClient } from "../generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  try {
    console.info(`Seeding database started...`);

    /* ----------------------------- Delete all data ---------------------------- */
    await prisma.wallet.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    /* ------------------------------- Create user ------------------------------ */
    /* ------------------------ Manual create one by one ------------------------ */
    // await prisma.user.create({
    //   data: {
    //     firstName: "John",
    //     lastName: "Doe",
    //     email: "john.doe@mail.com",
    //     age: 70,
    //   },
    // });

    // await prisma.user.create({
    //   data: {
    //     firstName: "Jane",
    //     lastName: "Smith",
    //     email: "jane.smith@mail.com",
    //     age: 70,
    //   },
    // });

    /* --------------------------- Manual create many --------------------------- */
    // const users = [
    //   {
    //     firstName: "John",
    //     lastName: "Doe",
    //     email: "john.doe@mail.com",
    //     age: 70,
    //   },
    //   {
    //     firstName: "Jane",
    //     lastName: "Smith",
    //     email: "jane.smith@mail.com",
    //     age: 70,
    //   },
    // ];

    // await prisma.user.createMany({ data: users });

    /* ----------------------------- Using faker.js ----------------------------- */

    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email();
      const age = faker.number.int({ min: 25, max: 100 });
      const address = faker.location.streetAddress();

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          age,
          address,
          Wallet: {
            create: {
              balance: faker.number.float({ min: 0, max: 1_000_000 }),
            },
          },
        },
      });

      const postCount = faker.number.int({ min: 3, max: 10 });
      for (let j = 0; j < postCount; j++) {
        await prisma.post.create({
          data: {
            caption: faker.lorem.sentence(),
            image: faker.image.url(),
            userId: user.id,
          },
        });
      }
    }

    console.info(`Seeding completed successfully`);
  } catch (error) {
    console.error(`Seeding failed: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
