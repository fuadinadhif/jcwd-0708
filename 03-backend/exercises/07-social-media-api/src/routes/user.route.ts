import express from "express";

import {
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserPosts,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUserById);
router.route("/:id/post").get(getUserPosts);

export default router;
