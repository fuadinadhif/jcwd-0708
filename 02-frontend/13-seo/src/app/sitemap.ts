import { Product } from "@/types/product.type";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = (await response.json()) as Product[];

  const productEntries: MetadataRoute.Sitemap = data.map((item) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${item.id}`,
      // lastModified: new Date(),
      // priority: 1,
      // changeFrequency: ""
    };
  });

  return [
    { url: process.env.NEXT_PUBLIC_BASE_URL as string },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact` },
    ...productEntries,
  ];
}
