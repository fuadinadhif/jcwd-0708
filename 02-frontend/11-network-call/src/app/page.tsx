import DeleteButton from "@/components/delete-button";
import Image from "next/image";
import Link from "next/link";

interface Product {
  objectId: string;
  name: string;
  image: string;
  description: string;
  created: number;
  stock: number;
}

export default async function Home() {
  const response = await fetch(
    "https://amatorymagic-us.backendless.app/api/data/products"
  );
  const data = (await response.json()) as Product[];

  return (
    <>
      <main className="py-6 px-4">
        <div className="grid grid-cols-3 gap-4">
          {data.map((product) => (
            <article key={product.objectId}>
              <div className="relative h-32">
                <Image
                  src={product.image}
                  alt={product.description}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h2 className="font-semibold text-2xl mt-2">{product.name}</h2>
              <p>{product.description}</p>
              <div className="mt-2 flex justify-between">
                <div>
                  <button className="border p-2">Edit</button>
                  <DeleteButton objectId={product.objectId} />
                </div>
                <Link
                  href={`/products/${product.objectId}`}
                  className="border p-2"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
