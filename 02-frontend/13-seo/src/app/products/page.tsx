import { Product } from "@/types/product.type";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Products() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = (await response.json()) as Product[];

    return (
      <main>
        {data.map((item) => (
          <article key={item.id}>
            <h2>{item.title}</h2>
            <Link href={`/products/${item.id}`}>See more</Link>
          </article>
        ))}
      </main>
    );
  } catch (error) {
    console.error(error);

    return (
      <main>
        <p>Failed to fetch product data</p>
      </main>
    );
  }
}
