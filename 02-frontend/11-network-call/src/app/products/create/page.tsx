"use client";

import React, { useState } from "react";

export default function Create() {
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    description: "",
    stock: 0,
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await fetch("https://amatorymagic-us.backendless.app/api/data/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    setProductData({ name: "", description: "", image: "", stock: 0 });

    alert("New product added!");
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="productName">Product Name</label>
          <input
            className="border"
            type="text"
            id="productName"
            placeholder="Input the product name"
            value={productData.name}
            onChange={(event) =>
              setProductData({ ...productData, name: event.target.value })
            }
          />
        </div>

        <div className="grid">
          <label htmlFor="productDesc">Product Description</label>
          <textarea
            className="border"
            id="productDesc"
            value={productData.description}
            onChange={(event) =>
              setProductData({
                ...productData,
                description: event.target.value,
              })
            }
          ></textarea>
        </div>

        <div className="grid">
          <label htmlFor="productImage">Product Image</label>
          <input
            className="border"
            type="text"
            id="productImage"
            value={productData.image}
            onChange={(event) =>
              setProductData({ ...productData, image: event.target.value })
            }
          />
        </div>

        <div className="grid">
          <label htmlFor="productStock">Product Stock</label>
          <input
            className="border"
            type="number"
            id="productStock"
            value={productData.stock}
            onChange={(event) =>
              setProductData({
                ...productData,
                stock: Number(event.target.value),
              })
            }
          />
        </div>

        <button type="submit">Add New Product</button>
      </form>
    </main>
  );
}
