import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <section>
        <p className="underline">{article.topic}</p>
        <h3 className="ac-title">{article.title}</h3>
        <p>by {article.author}</p>
        <p>{dayjs().to(dayjs(article.created_at))}</p>
        <p>
          {article.votes} <button className="button-circle">+</button>
        </p>
      </section>
      <img src={article.article_img_url} className="small-img" />
    </article>
  );
}
<image></image>;
