import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller";

const router = express.Router();

// Base path: http://localhost:8000/api/v1/products
router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProductById).put(editProduct).delete(deleteProduct);

export default router;
