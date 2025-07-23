export async function deleteArticleById(request, response) {
  response.status(200).json({ message: "Article has been deleted" });
}
