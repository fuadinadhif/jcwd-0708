import fs from "node:fs/promises";

export async function readProductsFile() {
  const productsJSON = await fs.readFile("./data/products.json", "utf-8");
  const products = JSON.parse(productsJSON);
  return products;
}

export async function writeProductsFile(products) {
  await fs.writeFile("./data/products.json", JSON.stringify(products, null, 2));
}
