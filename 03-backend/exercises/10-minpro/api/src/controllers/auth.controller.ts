import { Request, Response, NextFunction } from "express";

import { AuthService } from "@/services/auth.service.js";

const authService = new AuthService();
export class AuthController {
  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password, profilePic, referralCode } = request.body;

      const user = await authService.registerUser({
        name,
        email,
        password,
        profilePic,
        referredReferralCode: referralCode,
      });

      response.status(201).json({ message: "User created", user });
    } catch (error) {
      next(error);
    }
  }

  async login() {}

  async logout() {}

  async forgetPassword() {}
}
