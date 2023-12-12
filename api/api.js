import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-api-cu9g.onrender.com/api",
});

export const getArticles = (query) => {
  return newsApi.get("/articles", { params: query }).then(({ data }) => data);
};

export const getCommentsByArticleId = (articleId) => {
  return newsApi.get(`/articles/${articleId}/comments`).then(({ data: { comments } }) => comments);
};

export const getArticleById = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then(({ data: { article } }) => article);
};

export const getTopics = () => {
  return newsApi.get("/topics").then(({ data: { topics } }) => topics);
};
export const postCommentByArticleId = (articleId, newComment) => {
  return newsApi.post(`/articles/${articleId}/comments`, newComment).then(({ data: { comment } }) => comment);
};

export const changeArticleVotes = (articleId, votesChange) => {
  return newsApi.patch(`/articles/${articleId}`, votesChange).then(({ data: { article } }) => article);
};

export const deleteCommentByCommentId = (commentId) => {
  return newsApi.delete(`comments/${commentId}`).then(() => {});
};
