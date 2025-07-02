import { Product } from "@/types/product.type";
import { Metadata } from "next";
import Image from "next/image";

export async function generateStaticParams() {
  const response = await fetch(`https://fakestoreapi.com/products`);
  const data = (await response.json()) as Product[];

  return data
    .map((item) => {
      return { id: item.id.toString() };
    })
    .slice(0, 3);

  // return [{ id: 1 }, { id: 2 }, { id: 3 }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = (await response.json()) as Product;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: [{ url: data.image }],
    },
  };
}

export default async function Id({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    await new Promise((resolve) => setTimeout(() => resolve("Done"), 3000));

    const id = (await params).id;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = (await response.json()) as Product;

    return (
      <main>
        <Image
          src={data.image}
          alt={data.description}
          width={300}
          height={100}
        />
        <h2>{data.title}</h2>
        <p>Rp. {data.price}</p>
        <p>Rate {data.rating.rate}</p>
        <p>{data.description}</p>
      </main>
    );
  } catch (error) {
    console.error(error);

    return (
      <main>
        <p>Error fetching detail product data</p>
      </main>
    );
  }
}
