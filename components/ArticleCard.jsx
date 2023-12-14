import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { Link, useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);

export default function ArticleCard({ article, setQuery, setIsLoading }) {
  const navigate = useNavigate();

  function goToArticle() {
    navigate(`/articles/a/${article.article_id}`);
  }

  function formatDate(dateString) {
    if (dateString === "a few seconds ago") return "Now";
    if (dateString.includes("minutes")) return dateString.replace("minutes", "min.");
    if (dateString.includes("minute")) return dateString.replace("minutes", "min");
    return dateString;
  }

  return (
    <article className="article-card">
      <button
        className="underline topic-link"
        onClick={() => {
          setIsLoading(true);
          setQuery((currQuery) => {
            return { ...currQuery, topic: article.topic };
          });
          navigate(`/articles/${article.topic}?topic=${article.topic}`);
        }}
      >
        {article.topic}
      </button>

      <p id="ac-date">{formatDate(dayjs().to(dayjs(article.created_at)))}</p>
      <h2 id="ac-title" onClick={goToArticle}>
        {article.title}
      </h2>
      <p>by {article.author}</p>
      <section id="votes-comments" onClick={goToArticle}>
        <p>Votes: {article.votes}</p>

        <p> Comments: {article.comment_count}</p>
      </section>
      <img src={article.article_img_url} className="small-img" id="ac-img" alt={article.title} onClick={goToArticle} />
    </article>
  );
}
<image></image>;
