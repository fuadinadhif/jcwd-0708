"use client";

import { Product } from "@/types/product.type";
import { Dispatch, SetStateAction } from "react";

export default function DeleteButton({
  objectId,
  setData,
}: {
  objectId: string;
  setData: Dispatch<SetStateAction<Product[] | null>>;
  data: Product[];
}) {
  async function handleDelete(id: string) {
    try {
      // remove data in the server
      await fetch(
        `https://amatorymagic-us.backendless.app/api/data/products/${id}`,
        { method: "DELETE" }
      );

      // remove data in the UI
      // setData(data.filter((product) => {product.objectId !== id}));
      setData((previous) => {
        if (previous) {
          return previous.filter((product) => product.objectId !== id);
        }

        return null;
      });

      alert("Item has been deleted");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button className="border p-2" onClick={() => handleDelete(objectId)}>
      Delete
    </button>
  );
}
