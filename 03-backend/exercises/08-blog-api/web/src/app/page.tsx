"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await fetch(`http://localhost:8000/api/articles`);
        const data = await response.json();

        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    }

    getArticles();
  }, []);

  async function handleDelete(id: number, title: string) {
    const response = await fetch(`http://localhost:8000/api/articles/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete article with id ${id}`);
    }

    setArticles((prev) => prev?.filter((item) => item.id !== id) || null);
    toast.success(`${title} has been deleted`);
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="m-auto w-fit">
        <Link href={"/article/create"} className="mb-4 underline block">
          Add new article
        </Link>

        <table>
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((item) => (
              <tr key={item.id}>
                <td className="border p-2 capitalize">{item.title}</td>
                <td className="border p-2 flex gap-2">
                  <button className="cursor-pointer">Read</button>
                  <button className="cursor-pointer">Edit</button>
                  <button
                    className="cursor-pointer"
                    onClick={() => handleDelete(item.id, item.title)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
