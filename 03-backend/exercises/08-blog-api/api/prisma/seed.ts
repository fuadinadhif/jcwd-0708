import { faker } from "@faker-js/faker";

import { prisma } from "@/configs/prisma.config.js";
import { Role } from "@/generated/prisma/index.js";

async function seed() {
  try {
    console.info(`Seed started...`);

    /* -------------------------- Delete previous data -------------------------- */
    console.info(`\nDelete all previous data...`);
    await prisma.user.deleteMany();
    await prisma.article.deleteMany();
    console.info(`All previous data has been deleted\n`);

    /* ----------------------------- Create new data ---------------------------- */
    for (let i = 0; i < 10; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      const password = "newpass";
      const profilePic = faker.image.avatar();

      let role = "READER";
      if (i === 0) role = "ADMIN";
      else if (i >= 1 && i <= 3) role = "AUTHOR";

      console.info(`Creating ${role} user: ${firstName} ${lastName}...`);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          profilePic,
          role: role as unknown as Role,
        },
      });

      if (role === "AUTHOR") {
        const articleCount = faker.number.int({ min: 3, max: 10 });
        for (let j = 0; j < articleCount; j++) {
          const title = faker.lorem.sentence({ min: 3, max: 5 });
          const content = faker.lorem.paragraphs({ min: 3, max: 10 });
          const image = faker.image.url();

          await prisma.article.create({
            data: { title, content, image, userId: user.id },
          });
        }
      }
    }

    console.info(`\nSeeding data finished successfully`);
  } catch (error) {
    console.error(`Seed failed: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
