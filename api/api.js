import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-api-cu9g.onrender.com/api",
});

export const getArticles = ({ query }) => {
  return newsApi.get("/articles", { params: query }).then(({ data }) => data);
};
