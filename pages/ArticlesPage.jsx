import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { getArticles, getTopics } from "../api/api";
import { Link, useLocation } from "react-router-dom";
import DropDownTopics from "../components/DropDownTopics";

export default function ArticlesPage() {
  const location = useLocation();
  const topic = location.state?.topic || null;

  const [articles, setArticles] = useState({});
  const [query, setQuery] = useState({ p: 1, topic: topic });
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
      })
      .catch(() => {
        setQueryError(true);
      });
  }, [query]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <main>
      <DropDownTopics topics={topics} setQuery={setQuery} />
      <button className="button-rectangle">Sort By</button>
      <button className="button-rectangle">Change Order</button>
      <p className={`${queryError || "no-display"}`}>An Error has occured with your query. Please try again later!</p>
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
