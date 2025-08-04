import express from "express";

import { roleGuard, verifyToken } from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.route("/public").get((request, response, next) => {
  response.status(200).json({ message: "Public" });
});
router.route("/protected").get(verifyToken, (request, response, next) => {
  response.status(200).json({ message: "Protected" });
});
router
  .route("/protected/customer")
  .get(verifyToken, roleGuard("CUSTOMER"), (request, response, next) => {
    response.status(200).json({ message: "Protected customer" });
  });
router
  .route("/protected/event-organizer")
  .get(verifyToken, roleGuard("EVENT_ORGANIZER"), (request, response, next) => {
    response.status(200).json({ message: "Protected event organizer" });
  });

export default router;
