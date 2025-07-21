import express from "express";

import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from "@/controllers/article.controller.js";

const router = express.Router();

router.route("/").get(getAllArticles).post(createArticle);
router
  .route("/:id")
  .get(getArticleById)
  .put(updateArticle)
  .delete(deleteArticle);

export default router;
