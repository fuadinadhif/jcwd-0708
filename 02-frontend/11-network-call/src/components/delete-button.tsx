"use client";

export default function DeleteButton({ objectId }: { objectId: string }) {
  async function handleDelete(id: string) {
    await fetch(
      `https://amatorymagic-us.backendless.app/api/data/products/${id}`,
      { method: "DELETE" }
    );

    alert("Item has been deleted");
  }

  return (
    <button className="border p-2" onClick={() => handleDelete(objectId)}>
      Delete
    </button>
  );
}
