import { prisma } from "@/configs/prisma.config.js";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { AppError } from "@/errors/app.error.js";

interface User {
  firstName: string;
  lastName: string;
  profilePic?: string;
  email: string;
  password: string;
}

export class AuthService {
  async isEmailTaken(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return Boolean(user);
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    profilePic: string
  ) {
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePic,
      },
    });
  }

  async registerUser({
    firstName,
    lastName,
    email,
    password,
    profilePic,
  }: User) {
    const emailTaken = await this.isEmailTaken(email);

    if (emailTaken) throw new AppError("Email already exist", 409);

    const hashedPassword = await this.hashPassword(password);
    const user = await this.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      (profilePic = profilePic || faker.image.avatar())
    );

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePic: user.profilePic,
    };
  }
}
