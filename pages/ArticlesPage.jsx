import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticles, getTopics } from "../api/api";
import { Link, useParams, useSearchParams } from "react-router-dom";
import DropDownTopics from "../components/DropDownTopics";
import DropDownSort from "../components/DropDownSort";
import ErrorPage from "./ErrorPage";

export default function ArticlesPage() {
  const { topic } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState({});
  const [query, setQuery] = useState(createQueryFromUrl([...searchParams]));
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [queryError, setQueryError] = useState(false);
  const [getError, setGetError] = useState(null);

  useEffect(() => {
    getArticles(query)
      .then((data) => {
        setArticles({ listOfArticles: data.articles, articleCount: data.total_count });
        return getTopics();
      })
      .then((topicData) => {
        setTopics(topicData.map((topic) => topic.slug));
        setQueryError(false);
        setSearchParams(urlQuery());
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") setQueryError(true);
        else setGetError(err);
      })
      .finally(() => setIsLoading(false));
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

  function createQueryFromUrl(urlQuery) {
    const query = { p: 1, topic: topic, order: "desc", sort_by: null };
    urlQuery.forEach((q) => (query[q[0]] = q[1]));
    return query;
  }

  if (isLoading) return <h2>Loading...</h2>;

  if (getError)
    return (
      <ErrorPage
        err="query"
        setGetError={setGetError}
        setQuery={setQuery}
        createQueryFromUrl={createQueryFromUrl}
        setIsLoading={setIsLoading}
      />
    );

  return (
    <main className="articles-page">
      <section className="query-options">
        <DropDownTopics topics={topics} setQuery={setQuery} query={query} />
        <DropDownSort setQuery={setQuery} query={query} />
        <label>
          <button onClick={changeOrder}>
            {query.order === "desc" ? "Descending" : "Ascending"}
          </button>
        </label>
      </section>
      <p className={`${queryError || "no-display"}`}>An Error has occured with your query. Please try again later!</p>
      {articles.listOfArticles?.map((article) => {
        return (
          <Link to={`/articles/a/${article.article_id}`} className="no-underline" key={article.article_id}>
            <ArticleCard article={article} />
          </Link>
        );
      })}
      <p className="page-count">
        Page {query.p} of {Math.ceil(articles.articleCount / articles.listOfArticles?.length)}
      </p>
    </main>
  );
}
