import express, { Request, Response, Application, NextFunction } from "express";
import fs from "node:fs/promises";
import { v4 as uuid } from "uuid";
import { readProductsFile, writeProductsFile } from "./utils/product.util";

const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(express.json());

// HEALTH CHECKUP
app.get("/api/v1/health", (request: Request, response: Response) => {
  response
    .status(200)
    .json({ meesage: "API running!", uptime: process.uptime() });
});

// GET ALL PRODUCTS
app.get(
  "/api/v1/products",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await readProductsFile();
      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

// GET BY ID
app.get(
  "/api/v1/products/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;

      const products = await readProductsFile();
      const product = products.find((item) => {
        return item.id === id;
      });

      if (!product) {
        response.status(404).json({ message: "Product not found" });
        return;
      }

      response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// CREATE NEW PRODUCT
app.post(
  "/api/v1/products",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name, price, stock, code } = request.body;

      if (!name || !price || !stock || !code) {
        response.status(400).json({ message: "Missing required fields" });
        return;
      }

      if (typeof name !== "string" || !name.trim()) {
        response.status(400).json({ message: "Invalid input" });
        return;
      }

      const products = await readProductsFile();
      const existingCode = products.some((item) => item.code === code);
      if (existingCode) {
        response.status(400).json({ message: "Code number already been used" });
      }

      const newProduct = { id: uuid(), name, price, stock, code };
      products.push(newProduct);

      await fs.writeFile(
        "./data/products.json",
        JSON.stringify(products, null, 2)
      );

      response
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      next(error);
    }
  }
);

// EDIT PRODUCT
app.put(
  "/api/v1/products/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newestData = request.body;
      const id = request.params.id;

      const products = await readProductsFile();
      const productIndex = products.findIndex((item) => item.id === id);

      products[productIndex] = { ...products[productIndex], ...newestData };

      await writeProductsFile(products);

      response.status(200).json({
        message: "Product updated successfully",
        product: products[productIndex],
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE PRODUCT
app.delete(
  "/api/v1/products/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;

      const products = await readProductsFile();
      const filteredProducts = products.filter((item) => item.id !== id);

      await writeProductsFile(filteredProducts);

      response.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

// ERROR MIDDLEWARE
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error);
    response.status(500).json({ message: error.message, error: error });
  }
);

const PORT: number = 8000;
app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});

/* ---------------------------------- NOTES --------------------------------- */
// http://localhost:3000/users
// http://localhost:3000/api/v1/users
// http://localhost:3000/api/v2/users

// htpps://purwadhika.com/users
// htpps://purwadhika.com/api/users
// htpps://api.purwadhika.com/users
