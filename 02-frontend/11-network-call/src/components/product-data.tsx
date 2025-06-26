import Image from "next/image";

export default async function ProductData({ objectId }: { objectId: string }) {
  try {
    await new Promise((resolve) => {
      setTimeout(() => resolve(""), 3000);
    });

    const response = await fetch(
      `https://amatorymagic-us.backendless.app/api/data/products/${objectId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data = await response.json();

    return (
      <>
        <div className="relative h-42">
          <Image
            src={data.image}
            alt={data.description}
            fill
            className="object-cover"
          />
        </div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <span>{data.stock}</span>
      </>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="p-4 bg-red-100 text-red-700 text-center">
        <h2 className="text-xl font-semibold mb-2">Error Loading Product</h2>
        <p>
          Sorry, we coul not load the product details. Please try again later.
        </p>
      </div>
    );
  }
}
