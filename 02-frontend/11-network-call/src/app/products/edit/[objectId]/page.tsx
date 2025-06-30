"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Update({
  params,
}: {
  params: Promise<{ objectId: string }>;
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      stock: 0,
      image: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    async function getProductData() {
      try {
        const objectId = (await params).objectId;
        const response = await fetch(
          `https://amatorymagic-us.backendless.app/api/data/products/${objectId}`
        );
        const data = await response.json();
        reset(data);
      } catch (error) {
        console.error(error);
      }
    }

    getProductData();
  }, [params, reset]);

  async function handleSubmitForm(formData: {
    name: string;
    image: string;
    stock: number;
    description: string;
  }) {
    try {
      const objectId = (await params).objectId;
      const response = await fetch(
        `https://amatorymagic-us.backendless.app/api/data/products/${objectId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Update product success");
        router.push("/");
        return;
      }

      alert("Failed to update product");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="py-6 px-4">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="grid">
          <label htmlFor="productName">Product Name</label>
          <input
            className="border"
            type="text"
            id="productName"
            placeholder="Input the product name"
            {...register("name", { required: true, minLength: 5 })}
          />
        </div>

        <div className="grid">
          <label htmlFor="productDesc">Product Description</label>
          <textarea
            className="border"
            id="productDesc"
            {...register("description")}
          ></textarea>
        </div>

        <div className="grid">
          <label htmlFor="productImage">Product Image</label>
          <input
            className="border"
            type="text"
            id="productImage"
            {...register("image")}
          />
        </div>

        <div className="grid">
          <label htmlFor="productStock">Product Stock</label>
          <input
            className="border"
            type="number"
            id="productStock"
            {...register("stock")}
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </main>
  );
}
