import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../api/api";
import { Link } from "react-router-dom";

export default function ArticlesPage() {
  const [articles, setArticles] = useState({});
  const [query, setQuery] = useState({ p: 1 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(query).then((data) => {
      setIsLoading(false);
      setArticles({ listOfArticles: data.articles, articleCount: data.total_count });
    });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <main>
      <button className="button-rectangle">Sort By</button>
      <button className="button-rectangle">Change Order</button>
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
