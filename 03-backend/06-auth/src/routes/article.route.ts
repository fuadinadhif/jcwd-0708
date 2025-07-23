import express from "express";

import { deleteArticleById } from "../controllers/article.controller";
import { verifyToken } from "../middlewares/verify-token.middleware";

const router = express.Router();

router.route("/:id").delete(
  verifyToken,
  (request, response, next) => {
    const role = request.user.role;

    if (role !== "ADMIN") {
      return response
        .status(403)
        .json({ message: "You are not eligible to access this route" });
    }

    next();
  },
  deleteArticleById
);

export default router;
