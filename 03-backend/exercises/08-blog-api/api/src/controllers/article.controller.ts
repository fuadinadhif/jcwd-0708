import { Request, Response, NextFunction } from "express";

import { prisma } from "@/configs/prisma.config.js";

export async function getAllArticles(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const articles = await prisma.article.findMany({
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
            profilePic: true,
          },
        },
      },
    });

    response.status(200).json(articles);
  } catch (error) {
    next(error);
  }
}

export async function getArticleById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;

    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
            profilePic: true,
          },
        },
      },
    });

    if (!article) {
      return response.status(404).json({ message: "Article not found" });
    }

    response.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

export async function createArticle(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { title, content, image, userId } = request.body;

    const article = await prisma.article.create({
      data: {
        title,
        content,
        image,
        userId,
      },
    });

    response.status(201).json({ message: "Article created", article });
  } catch (error) {
    next(error);
  }
}

export async function updateArticle(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;
    const { title, content, image } = request.body;

    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: { title, content, image },
    });

    response.status(200).json({ message: "Article updated", article });
  } catch (error) {
    next(error);
  }
}

export async function deleteArticle(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;

    await prisma.article.delete({
      where: { id: Number(id) },
    });

    response.status(200).json({ message: "Article deleted" });
  } catch (error) {
    next(error);
  }
}
