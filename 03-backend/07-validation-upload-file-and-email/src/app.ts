import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import { ZodError, z } from "zod";
import multer from "multer";
import path from "node:path";
import cloudinary from "./configs/cloudinary.config.js";
import fs from "node:fs/promises";

import { userSchema } from "./validations/auth.validation.js";

const app = express();
const prisma = new PrismaClient();
const upload = multer({
  storage: multer.diskStorage({
    destination: (request, file, cb) => {
      return cb(null, "public");
    },
    filename: (request, file, cb) => {
      const uniqueName = `ALFAMART-${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (request, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif|svg/;
    const extName = path.extname(file.originalname);
    const isTypeValid = allowedTypes.test(extName);

    if (isTypeValid) {
      return cb(null, true);
    } else {
      return cb(new Error("Only image files are allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use(express.json());

app.get("/api/health", (request: Request, response: Response) => {
  response.status(200).json({ message: "API running" });
});

app.post(
  "/api/auth/register",
  upload.single("profilePic"),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      // const { name, email, password, profilePic } = userSchema.parse(
      //   request.body
      // );

      const file = request.file;
      const { name, email, password } = request.body;

      if (!file) {
        return response
          .status(400)
          .json({ message: "Profile picture not found" });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return response.status(409).json({ message: "Email has been used" });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path); // Upload ke Cloudinary
      await fs.unlink(file.path); // Delete local data

      await prisma.user.create({
        data: { name, email, password, profilePic: uploadResult.secure_url },
      });

      response.status(200).json({ message: "User created" });
    } catch (error) {
      next(error);
    }
  }
);

// ERROR MIDDLEWARE
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error);

    if (error instanceof ZodError) {
      return response
        .status(400)
        .json({ error: z.flattenError(error).fieldErrors });
    }

    response.status(500).json({ message: error.message || "Unknown error" });
  }
);

const PORT = "8888";
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));

/* ---------------------------------- NOTE ---------------------------------- */
// (_request, response) => {};
// (response: Response) => {};

// File
// [File, File, File]
// {featureImage: [File, File], captionImagi: [File, File, File]}
