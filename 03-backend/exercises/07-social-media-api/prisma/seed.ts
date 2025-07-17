import { PrismaClient } from "../src/generated/prisma/index.js";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 20, max: 50 }),
      password: faker.internet.password(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 20, max: 50 }),
      password: faker.internet.password(),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 20, max: 50 }),
      password: faker.internet.password(),
    },
  });

  await prisma.post.createMany({
    data: Array.from({ length: 5 }).map(() => ({
      userId: user1.id,
      image: faker.image.url(),
      caption: faker.lorem.sentence(),
    })),
  });

  await prisma.post.createMany({
    data: Array.from({ length: 10 }).map(() => ({
      userId: user2.id,
      image: faker.image.url(),
      caption: faker.lorem.sentence(),
    })),
  });
}

main()
  .then(() => {
    console.log("Seeding completed.");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
