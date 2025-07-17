import express from "express";

import {
  createTransaction,
  deleteAllTransactions,
  deleteTransactionById,
  editTransaction,
  getAllTransactions,
  getTransactionById,
  getTotalTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTransactions)
  .post(createTransaction)
  .delete(deleteAllTransactions);
router.route("/total").get(getTotalTransaction);
router
  .route("/:id")
  .get(getTransactionById)
  .put(editTransaction)
  .delete(deleteTransactionById);

export default router;
