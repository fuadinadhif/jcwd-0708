import express, { Router } from "express";

import { login, register } from "../controllers/auth.controller";

// const router = express.Router(); // Create router
const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);

export default router;
