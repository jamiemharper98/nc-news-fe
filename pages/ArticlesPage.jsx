import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../api/api";
import { Link } from "react-router-dom";

export default function ArticlesPage() {
  const [articles, setArticles] = useState({});
  const [query, setQuery] = useState({ p: 1, order: "desc" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(query).then((data) => {
      setIsLoading(false);
      setArticles({ listOfArticles: data.articles, articleCount: data.total_count });
    });
  }, [query]);

  function changeOrder() {
    setQuery((currQuery) => {
      const updatedQuery = { ...currQuery };
      updatedQuery.order = currQuery.order === "desc" ? "asc" : "desc";
      return updatedQuery;
    });
  }

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <main>
      <button className="button-rectangle">Sort By</button>
      <label>
        <button className="button-rectangle" onClick={changeOrder}>
          Change Order :
        </button>
        {query.order === "desc" ? "Descending" : "Ascending"}
      </label>
      {articles.listOfArticles.map((article) => {
        return (
          <Link to={`/articles/${article.article_id}`} className="no-underline" key={article.article_id}>
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
