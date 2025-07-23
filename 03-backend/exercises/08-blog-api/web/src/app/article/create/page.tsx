"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ArticleFormInput {
  userId: number;
  title: string;
  content: string;
  image: string;
}

export default function App() {
  const { register, handleSubmit, reset } = useForm<ArticleFormInput>();

  async function onSubmit(data: ArticleFormInput) {
    // console.log("Submitted article:", data);
    try {
      const response = await fetch(`http://localhost:8000/api/articles`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      toast.success("Article created successfully");
      reset();
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Failed to create article");
    }
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl w-full">
        <div className="grid">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            type="number"
            {...register("userId", { valueAsNumber: true })}
          />
        </div>

        <div className="grid">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            {...register("title", { required: true })}
          />
        </div>

        <div className="grid">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            {...register("content", { required: true })}
            rows={4}
          />
        </div>

        <div className="grid">
          <label htmlFor="image">Image URL</label>
          <input id="image" type="text" {...register("image")} />
        </div>

        <div className="bg-white text-black text-center">
          <button type="submit">Create Article</button>
        </div>
      </form>
    </main>
  );
}
