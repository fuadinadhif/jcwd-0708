import { Request, Response, NextFunction } from "express";

import { AuthService } from "@/services/auth.service.js";

const authService = new AuthService();

class AuthController {
  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, profilePic } = request.body;

      const user = await authService.registerUser({
        email,
        password,
        lastName,
        firstName,
        profilePic,
      });

      response.status(201).json({ message: "User created", user });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
