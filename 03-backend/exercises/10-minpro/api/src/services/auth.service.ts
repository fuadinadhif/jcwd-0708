import bcrypt from "bcrypt";

import { prisma } from "@/configs/prisma.config.js";
import { CreateUserInput } from "@/types/user.type.js";
import { generateReferralCode } from "@/utils/generate-code.js";
import { ReferralService } from "./referral.service.js";

export class AuthService {
  referralService = new ReferralService();

  async isEmailTaken(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return Boolean(user);
  }

  async hashedPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  }

  async registerUser({
    name,
    email,
    password,
    profilePic,
    referredReferralCode,
  }: CreateUserInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await this.hashedPassword(password),
        profilePic,
        referralCode: generateReferralCode(name),
      },
      omit: { password: true },
    });

    if (referredReferralCode) {
      await this.referralService.applyReferral(
        referredReferralCode,
        user.id,
        user.name
      );
    }

    return user;
  }
}

/* ---------------------------------- NOTES --------------------------------- */
// const authService = new AuthService();
// authService.registerUser({
//   name: "Joko Pinurbo",
//   email: "joko.pinurbo@mail.com",
//   profilePic: "http://dummy.com",
// });

// DISC-25-OFF-NAD-4X12
