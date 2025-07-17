import express from "express";

import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPostById).put(updatePost);

export default router;
