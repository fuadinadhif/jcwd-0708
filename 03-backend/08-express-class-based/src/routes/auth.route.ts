import express from "express";

import { authController } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(authController.register);

export default router;
