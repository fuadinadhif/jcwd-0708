import { Request, Response, NextFunction } from "express";
import { readProductsFile, writeProductsFile } from "../utils/product.util";
import { v4 as uuid } from "uuid";

// GET ALL PRODUCTS
export async function getAllProducts(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const products = await readProductsFile();
    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

// GET BY ID
export async function getProductById(
  request: Request,
  response: Response,
  next: NextFunction
) {
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

// CREATE NEW PRODUCT
export async function createProduct(
  request: Request,
  response: Response,
  next: NextFunction
) {
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

    await writeProductsFile(products);

    response
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    next(error);
  }
}

// EDIT PRODUCT
export async function editProduct(
  request: Request,
  response: Response,
  next: NextFunction
) {
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

// DELETE PRODUCT
export async function deleteProduct(
  request: Request,
  response: Response,
  next: NextFunction
) {
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
