import express from "express";

import {
  createCashflow,
  deleteAllCashflow,
  deleteCashflowById,
  editCashflow,
  getAllCashflow,
  getCashFlowById,
  getTotalCashflow,
} from "../controllers/cashflow.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCashflow)
  .post(createCashflow)
  .delete(deleteAllCashflow);
router.route("/total").get(getTotalCashflow);
router
  .route("/:id")
  .get(getCashFlowById)
  .put(editCashflow)
  .delete(deleteCashflowById);

export default router;
