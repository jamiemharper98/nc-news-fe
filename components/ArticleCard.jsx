import { createDate } from "../utils/utils";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function ArticleCard({ article }) {
  return (
    <article className="card">
      <section className="left">
        <p className="underline">{article.topic}</p>
        <h3>{article.title}</h3>
        <p>by {article.author}</p>
        <p>{dayjs().to(dayjs(article.created_at))}</p>
        <p>
          {article.votes} <button className="button-circle">+</button>
        </p>
      </section>
      <img src={article.article_img_url} className="small-img" />
      <button className="add-comment button-rectangle">Add Comment</button>
    </article>
  );
}
<image></image>;
