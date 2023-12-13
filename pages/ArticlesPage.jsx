import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticles, getTopics } from "../api/api";
import { Link, useParams, useSearchParams } from "react-router-dom";
import DropDownTopics from "../components/DropDownTopics";
import DropDownSort from "../components/DropDownSort";

export default function ArticlesPage() {
  const { topic } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const [articles, setArticles] = useState({});
  const [query, setQuery] = useState({ p: 1, topic: topic, order: "desc", sort_by: null });
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [queryError, setQueryError] = useState(false);

  useEffect(() => {
    getArticles(query)
      .then((data) => {
        setIsLoading(false);
        setArticles({ listOfArticles: data.articles, articleCount: data.total_count });
        return getTopics();
      })
      .then((topicData) => {
        setTopics(topicData.map((topic) => topic.slug));
        setQueryError(false);
        setSearchParams(urlQuery());
      })
      .catch(() => {
        setQueryError(true);
      });
  }, [query]);

  function changeOrder() {
    setQuery((currQuery) => {
      const updatedQuery = { ...currQuery };
      updatedQuery.order = currQuery.order === "desc" ? "asc" : "desc";
      return updatedQuery;
    });
  }

  function urlQuery() {
    const urlQ = {};
    for (const key in query) {
      if (key !== "topic" && query[key]) urlQ[key] = query[key];
    }
    return urlQ;
  }

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <main>
      <DropDownTopics topics={topics} setQuery={setQuery} />
      <DropDownSort setQuery={setQuery} />
      <label>
        <button className="button-rectangle" onClick={changeOrder}>
          Change Order :
        </button>
        {query.order === "desc" ? "Descending" : "Ascending"}
      </label>
      <p className={`${queryError || "no-display"}`}>An Error has occured with your query. Please try again later!</p>
      {articles.listOfArticles.map((article) => {
        return (
          <Link to={`/articles/a/${article.article_id}`} className="no-underline" key={article.article_id}>
            <ArticleCard article={article} />
          </Link>
        );
      })}
      <p>
        Page {query.p} of {Math.ceil(articles.articleCount / articles.listOfArticles.length)}
      </p>
    </main>
  );
}
