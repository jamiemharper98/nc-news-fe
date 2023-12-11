import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-api-cu9g.onrender.com/api",
});

export const getArticles = ({ query }) => {
  return newsApi.get("/articles", { params: query }).then(({ data }) => data);
};

export const getCommentsByArticleId = (articleId) => {
  return newsApi.get(`/articles/${articleId}/comments`).then(({ data: { comments } }) => comments);
};

export const updateVotes = (articleId, voteChange) => {
  return newsApi.patch(`/articles/${articleId}`, voteChange).then(({ data }) => console.log(data));
};
