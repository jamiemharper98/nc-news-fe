import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { Link, useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);


export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  return (
    <article className="article-card">
      <button
        className="underline ac-topic"
        onClick={() => {
          navigate(`/articles/${article.topic}`);
        }}
      >
        {article.topic}
      </button>
      <Link to={`/articles/a/${article.article_id}`} className="no-underline" >
      <p className="ac-date">{dayjs().to(dayjs(article.created_at))}</p>
      <h2 className="ac-title">{article.title}</h2>
      <p>by {article.author}</p>
      <section className="votes-comments">
        <p>Votes: {article.votes}</p>

        <p> Comments: {article.comment_count}</p>
      </section>
      <img src={article.article_img_url} className="small-img ac-img" alt={article.title} />
      </Link>
    </article>
  );
}
<image></image>;
