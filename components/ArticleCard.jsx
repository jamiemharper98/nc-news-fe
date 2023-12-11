import { createDate } from "../utils/utils";

export default function ArticleCard({ article }) {
  return (
    <section className="card">
      <div className="left">
        <p className="underline">{article.topic}</p>
        <h3>{article.title}</h3>
        <p>by {article.author}</p>
        <p>created {createDate(article.created_at)}</p>
        <p>
          Votes: {article.votes} <button className="button-circle">+</button>
        </p>
      </div>
      <div className="right">
        <img src={article.article_img_url} className="small-img" />
      </div>
      <button className="add-comment button-rectangle">Add Comment</button>
    </section>
  );
}
