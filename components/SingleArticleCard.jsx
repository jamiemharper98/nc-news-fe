import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import upArrow from "../assets/icons/arrow-up.svg";
dayjs.extend(relativeTime);

export default function SingleArticleCard({ currArticle }) {
  return (
    <article className="single-card">
      <p className="topic underline">{currArticle.topic}</p>
      <p className="date">{dayjs().to(dayjs(currArticle.created_at))}</p>
      <h2 className="title">{currArticle.title}</h2>
      <p className="author">by {currArticle.author}</p>
      <p className="single-body">{currArticle.body}</p>
      <img src={currArticle.article_img_url} className="single-img" />
      <p className="single-votes">
        {currArticle.votes}
        <button className="button-circle">
          <img src={upArrow} className="arrow-up" />
        </button>
      </p>
    </article>
  );
}
